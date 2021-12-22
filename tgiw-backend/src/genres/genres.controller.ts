import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginatedResponse } from '../common/interfaces';
import { PaginatedQueryDto } from '../common/dto';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  getGenres(
    @Query() getGenresQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Genre[]>> {
    return this.genresService.getGenres(getGenresQueryDto);
  }

  @Get('/:id')
  getGenreById(@Param('id') id: string): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }
}
