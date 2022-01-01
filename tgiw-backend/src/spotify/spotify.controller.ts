import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

import { SearchTracksQueryDto, AuthCallbackQueryDto } from './dtos';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  private readonly logger = new Logger('SpotifyController');
  constructor(
    private spotifyService: SpotifyService,
    private configService: ConfigService,
  ) {}

  private authStateKey = this.configService.get('spotify.authStateKey');
  private authState = this.configService.get('spotify.authState');

  @Get('/login')
  @Redirect()
  signIn(@Res({ passthrough: true }) res: Response): { url: string } {
    res.cookie(this.authStateKey, this.authState);

    this.logger.verbose('Redirecting to Spotify auth page');
    return { url: this.spotifyService.createAuthorizeURL() };
  }

  @Get('/callback')
  callback(
    @Query() authCallbackQueryDto: AuthCallbackQueryDto,
    @Req() req: Request,
  ): Promise<void> {
    const storedState = req.cookies[this.authStateKey];

    return this.spotifyService.executeAuthentication(
      authCallbackQueryDto,
      storedState,
    );
  }

  @Get('/tracks')
  searchTracks(@Query() searchTracksQueryDto: SearchTracksQueryDto) {
    return this.spotifyService.searchTracks(searchTracksQueryDto);
  }

  @Get('/track/:id')
  getTrackDetails(@Param('id') id: string) {
    return this.spotifyService.getTrackDetails(id);
  }
}
