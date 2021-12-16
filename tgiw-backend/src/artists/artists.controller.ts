import { Controller, Get, Param, Query } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getArtists(@Query('filter') filter: string): Promise<Artist[]> {
    return this.artistsService.getArtists(filter);
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.getArtistById(id);
  }
}
