import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedQueryDto } from '@/common/dto';
import { Genre } from './entities/genre.entity';
import { PaginatedResponse } from '@/common/interfaces';
import { HelpersService } from '@/helpers/helpers.service';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    private helpersService: HelpersService,
  ) {}

  private readonly logger = new Logger('SongsService');

  async getGenres(
    getGenresQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Genre[]>> {
    const query = this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.songs', 'song')
      .leftJoinAndSelect('genre.artists', 'artist');

    const { filter } = getGenresQueryDto;
    if (filter) {
      query.andWhere(
        `(LOWER(genre.name) LIKE LOWER(:filter) OR
         LOWER(song.name) LIKE LOWER(:filter) OR
         LOWER(artist.name) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` },
      );
    }

    const fullDataLength = (await query.getMany()).length;

    let { take = 10, page = 1 } = getGenresQueryDto;
    take = +take;
    page = +page;
    const skip = (page - 1) * take;

    const selectedData = await query.skip(skip).take(take).getMany();

    return this.helpersService.paginateResponse<Genre[]>(
      selectedData,
      page,
      take,
      fullDataLength,
    );
  }

  async getGenreById(id: string): Promise<Genre> {
    const query = this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.songs', 'song')
      .leftJoinAndSelect('genre.artists', 'artist')
      .where('genre.id = :id', { id });

    const foundGenre = await query.getOne();

    if (!foundGenre) {
      this.logger.error(`Genre with ID ${id} not found`);
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    this.logger.verbose(`Found Genre with ID ${id}`);
    return foundGenre;
  }
}
