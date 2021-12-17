import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { Genre } from '../genres/entities/genre.entity';
import { AddSongDto } from './dto';
import { Artist } from '../artists/entities/artist.entity';
import { User } from '../auth/entities/user.entity';
import { FormattedArtist } from '../common/interfaces';

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
  ) {}

  private readonly logger = new Logger('SongsService');

  async getSongs(filter: string): Promise<Song[]> {
    const query = this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.genres', 'genre')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('song.contributor', 'user');

    if (filter) {
      query.andWhere(
        '(LOWER(song.name) LIKE LOWER(:filter) OR LOWER(song.album) LIKE LOWER(:filter))',
        { filter: `%${filter}%` },
      );
    }

    return await query.getMany();
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

  async populateGenres(genreNames: string[], genres: Genre[]): Promise<void> {
    // Remove duplicates for extra safety
    const uniqueGenreNames = [...new Set(genreNames)];

    for (const name of uniqueGenreNames) {
      const foundGenre = await this.genreRepository.findOne({
        where: { name },
      });

      if (!foundGenre) {
        const newGenre = this.genreRepository.create({ name });
        await this.genreRepository.save(newGenre);
        genres.push(newGenre);
      } else {
        genres.push(foundGenre);
      }
    }
  }

  async populateArtists(artistsPayload: FormattedArtist[], artists: Artist[]) {
    for (const artist of artistsPayload) {
      const { name, genres: genreNames, ...rest } = artist;

      const foundArtist = await this.artistRepository.findOne({
        where: { name },
      });

      if (!foundArtist) {
        const newArtist = this.artistRepository.create({ name, ...rest });

        const genres: Genre[] = [];
        await this.populateGenres(genreNames, genres);
        newArtist.genres = genres;

        await this.artistRepository.save(newArtist);
        artists.push(newArtist);
      } else {
        artists.push(foundArtist);
      }
    }
  }

  async addSong(addSongDto: AddSongDto, uid: string): Promise<Song> {
    const { genreNames, artists: artistsPayload, ...restOfDto } = addSongDto;

    const contributor = await this.userRepository.findOne({
      where: { id: uid },
    });

    const song = this.songRepository.create({ ...restOfDto, contributor });

    // Add genres to song
    const genres: Genre[] = [];
    await this.populateGenres(genreNames, genres);
    song.genres = genres;

    // Add artists to song
    const artists: Artist[] = [];
    await this.populateArtists(artistsPayload, artists);
    song.artists = artists;

    try {
      await this.songRepository.save(song);
      this.logger.verbose(
        `Added new song ${song.name} with genres: ${genreNames.join(', ')} by ${
          contributor.userName
        }`,
      );
    } catch (error) {
      console.log(error);
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
