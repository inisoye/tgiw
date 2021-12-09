import { Controller, Get, Logger, Query, Redirect } from '@nestjs/common';
import { SearchTracksDto } from './dto/search-tracks.dto';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  private readonly logger = new Logger('SpotifyController');
  constructor(private spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  signIn(): { url: string } {
    this.logger.verbose('Redirecting to Spotify auth page');
    return { url: this.spotifyService.createAuthorizeURL() };
  }

  @Get('/callback')
  callback(@Query('code') code: string): Promise<void> {
    return this.spotifyService.executeAuthentication(code);
  }

  @Get('/tracks')
  searchTracks(
    @Query() searchTracksDto: SearchTracksDto,
  ): Promise<SpotifyApi.SearchResponse> {
    return this.spotifyService.searchTracks(searchTracksDto);
  }
}
