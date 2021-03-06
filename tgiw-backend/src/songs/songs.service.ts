import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddSongDto } from './dto';
import { PaginatedQueryDto } from '@/common/dto';
import { Song } from './entities/song.entity';
import { Genre } from '@/genres/entities/genre.entity';
import { Artist } from '@/artists/entities/artist.entity';
import { User } from '@/auth/entities/user.entity';
import { FormattedArtist, PaginatedResponse } from '@/common/interfaces';
import { genresByCountry } from '@/static/genresByCountry';
import { HelpersService } from '@/helpers/helpers.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private helpersService: HelpersService,
  ) {}

  private readonly logger = new Logger('SongsService');

  async getSongs(
    getSongsQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Song[]>> {
    const query = this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.genres', 'genre')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('song.contributor', 'user')
      .orderBy('song.dateAdded', 'DESC');

    const { filter } = getSongsQueryDto;

    if (filter) {
      query.andWhere(
        `(LOWER(song.name) LIKE LOWER(:filter) OR
         LOWER(song.album) LIKE LOWER(:filter) OR 
         LOWER(genre.name) LIKE LOWER(:filter) OR 
         LOWER(genre.countriesString) LIKE LOWER(:filter) OR 
         LOWER(artist.name) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` },
      );

      query.addOrderBy('song.name', 'ASC');
      query.addOrderBy('artist.name', 'ASC');
    }

    const fullDataLength = (await query.getMany()).length;

    let { take = 12, page = 1 } = getSongsQueryDto;
    take = +take;
    page = +page;
    const skip = (page - 1) * take;

    const selectedData = await query.skip(skip).take(take).getMany();

    return this.helpersService.paginateResponse<Song[]>(
      selectedData,
      page,
      take,
      fullDataLength,
    );
  }

  async get10Songs() {
    return await this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.genres', 'genre')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('song.contributor', 'user')
      .orderBy('song.dateAdded', 'DESC')
      .take(12) // Actually gets 12 songs endpoint and methods not renamed.
      .getMany();
  }

  async getSongById(id: string): Promise<Song> {
    const foundSong = await this.songRepository.findOne({ where: { id } });

    if (!foundSong) {
      this.logger.error(`Song with ID ${id} not found`);
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    this.logger.verbose(`Found song with ID ${id}`);
    return foundSong;
  }

  async populateGenres(
    genreNames: string[],
    songGenres: Genre[],
  ): Promise<void> {
    const uniqueGenreNames = [...new Set(genreNames)]; // Remove duplicates for extra safety

    for (const name of uniqueGenreNames) {
      const foundGenre = await this.genreRepository.findOne({
        where: { name },
      });

      const countries: string[] = genresByCountry[name];
      const countriesString: string = countries?.join(' ');

      if (!foundGenre) {
        const genreColor = this.helpersService.generateRandomColor();
        const color = this.helpersService.darkenColor(genreColor);

        const newGenre = this.genreRepository.create({ name, color });

        newGenre.countries = countries;
        newGenre.countriesString = countriesString;

        await this.genreRepository.save(newGenre);
        songGenres.push(newGenre);
      } else {
        songGenres.push(foundGenre);
      }
    }
  }

  async populateArtists(
    artistsPayload: FormattedArtist[],
    songArtists: Artist[],
  ) {
    for (const artist of artistsPayload) {
      const { name, genres: genreNames, ...rest } = artist;

      const foundArtist = await this.artistRepository.findOne({
        where: { name },
      });

      if (!foundArtist) {
        const artistColor = await this.helpersService.getColorFromImage(
          artist.images,
        );
        const color = this.helpersService.brightenColor(artistColor);

        const newArtist = this.artistRepository.create({
          name,
          color,
          ...rest,
        });

        const genres: Genre[] = [];
        await this.populateGenres(genreNames, genres);
        newArtist.genres = genres;

        await this.artistRepository.save(newArtist);
        songArtists.push(newArtist);
      } else {
        songArtists.push(foundArtist);
      }
    }
  }

  async addSong(
    addSongDto: AddSongDto,
    uid: string,
    role: string,
  ): Promise<Song> {
    if (!role || role !== 'contributor') {
      throw new UnauthorizedException(
        'Only contributors are allowed to add new songs',
      );
    }

    const { genreNames, artists: artistsPayload, ...restOfDto } = addSongDto;

    const songColor = await this.helpersService.getColorFromImage(
      addSongDto.images,
    );
    const color = this.helpersService.brightenColor(songColor);

    const contributor = await this.userRepository.findOne({
      where: { id: uid },
    });

    const song = this.songRepository.create({
      ...restOfDto,
      contributor,
      color,
    });

    // Add genres to song
    const songGenres: Genre[] = [];
    await this.populateGenres(genreNames, songGenres);
    song.genres = songGenres;

    // Add artists to song
    const songArtists: Artist[] = [];
    await this.populateArtists(artistsPayload, songArtists);
    song.artists = songArtists;

    try {
      await this.songRepository.save(song);

      this.logger.verbose(
        `Added new song ${song.name} with genres: ${genreNames.join(', ')} by ${
          contributor?.userName
        }`,
      );
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(`The song, ${song.name} already exists on TGIW`);

        throw new ConflictException(
          `The song, ${song.name} already exists on TGIW`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return song;
  }
}
