import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  private readonly logger = new Logger('SongsService');

  async getArtists(filter: string): Promise<Artist[]> {
    const query = this.artistRepository
      .createQueryBuilder('artist')
      .leftJoinAndSelect('artist.songs', 'song')
      .leftJoinAndSelect('artist.genres', 'genre');

    if (filter) {
      query.andWhere('(LOWER(artist.name) LIKE LOWER(:filter))', {
        filter: `%${filter}%`,
      });
    }

    return await query.getMany();
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
