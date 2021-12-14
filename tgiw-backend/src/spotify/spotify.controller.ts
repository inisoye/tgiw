import {
  Controller,
  Get,
  Logger,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { SearchTracksDto, AuthCallbackQueryDto } from './dtos';
import { FormattedTrack } from './interfaces';
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
    const { state, code } = authCallbackQueryDto;
    const storedState = req.cookies[this.authStateKey];

    if (!state || state !== storedState) {
      throw new Error('State validation failed');
    }

    this.logger.verbose(`Received auth code: ${code}`);
    return this.spotifyService.executeAuthentication(code);
  }

  @Get('/tracks')
  searchTracks(
    @Query() searchTracksDto: SearchTracksDto,
  ): Promise<FormattedTrack[]> {
    return this.spotifyService.searchTracks(searchTracksDto);
  }
}
