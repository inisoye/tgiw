import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { HelpersService } from '../helpers/helpers.service';
import { PaginatedQueryDto } from '../common/dto';
import { PaginatedResponse } from '../common/interfaces';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private helpersService: HelpersService,
  ) {}

  private readonly logger = new Logger('SongsService');

  async getArtists(
    getArtistsQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Artist[]>> {
    const query = this.artistRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.songs', 'song')
      .leftJoinAndSelect('artist.genres', 'genre');

    const { filter } = getArtistsQueryDto;
    if (filter) {
      query.andWhere(
        `(LOWER(artist.name) LIKE LOWER(:filter) OR
         LOWER(song.name) LIKE LOWER(:filter) OR
         LOWER(genre.name) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` },
      );
    }

    const fullDataLength = (await query.getMany()).length;

    let { take = 10, page = 1 } = getArtistsQueryDto;
    take = +take;
    page = +page;
    const skip = (page - 1) * take;

    const selectedData = await query.skip(skip).take(take).getMany();

    return this.helpersService.paginateResponse<Artist[]>(
      selectedData,
      page,
      take,
      fullDataLength,
    );
  }

  async getArtistById(id: string): Promise<Artist> {
    const query = this.artistRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.songs', 'song')
      .leftJoinAndSelect('artist.genres', 'genre')
      .where('artist.id = :id', { id });

    const foundArtist = await query.getOne();

    if (!foundArtist) {
      this.logger.error(`Artist with ID ${id} not found`);
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    this.logger.verbose(`Found Artist with ID ${id}`);
    return foundArtist;
  }
}
