import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { Artist } from './entities/artist.entity';
import { ArtistsService } from './artists.service';
import { PaginatedQueryDto } from '@/common/dto';
import { PaginatedResponse } from '@/common/interfaces';
import { FirebaseAuthGuard } from '@/auth/guards/firebase-auth.guard';

@Controller('artists')
@UseGuards(FirebaseAuthGuard)
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getArtists(
    @Query() getArtistsQueryDto: PaginatedQueryDto,
  ): Promise<PaginatedResponse<Artist[]>> {
    return this.artistsService.getArtists(getArtistsQueryDto);
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.getArtistById(id);
  }
}
