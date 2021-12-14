import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  private readonly logger = new Logger('SongsService');

  async getGenres(filter: string): Promise<Genre[]> {
    const query = this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.songs', 'song')
      .leftJoinAndSelect('genre.artists', 'artist');

    if (filter) {
      query.andWhere('(LOWER(genre.name) LIKE LOWER(:filter))', {
        filter: `%${filter}%`,
      });
    }

    return await query.getMany();
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
