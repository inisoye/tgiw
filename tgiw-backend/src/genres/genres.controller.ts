import { Controller, Get, Param, Query } from '@nestjs/common';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  getGenres(@Query('filter') filter: string): Promise<Genre[]> {
    return this.genresService.getGenres(filter);
  }

  @Get('/:id')
  getGenreById(@Param('id') id: string): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }
}
