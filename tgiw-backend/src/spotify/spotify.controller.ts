import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  signIn(): { url: string } {
    return { url: this.spotifyService.createAuthorizeURL() };
  }

  @Get('/callback')
  async callback(@Query('code') code: string): Promise<void> {
    return this.spotifyService.executeAuthentication(code);
  }

  @Get('/tracks')
  getTasks(@Res() res: Response) {
    return this.spotifyService.spotifyApi
      .searchTracks('Born this way', { limit: 1 })
      .then((data) => {
        console.log(data.body);
        res.json(data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  @Get('/artists')
  getArtists(@Res() res: Response) {
    return this.spotifyService.spotifyApi
      .searchArtists('Gaga', { limit: 1 })
      .then((data) => {
        console.log(data.body);
        res.json(data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
