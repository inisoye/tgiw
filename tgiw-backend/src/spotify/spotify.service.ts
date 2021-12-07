import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  scopes: Array<string> = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify',
  ];

  spotifyApi: SpotifyWebApi = new SpotifyWebApi({
    clientId: this.configService.get<string>('spotify.clientId'),
    clientSecret: this.configService.get<string>('spotify.clientSecret'),
    redirectUri: this.configService.get<string>('spotify.redirectUri'),
  });

  createAuthorizeURL(): string {
    return this.spotifyApi.createAuthorizeURL(
      this.scopes,
      this.configService.get<string>('spotify.authState'),
    );
  }

  async getTokensFromApi(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const {
      body: { access_token, refresh_token, expires_in },
    } = await this.spotifyApi.authorizationCodeGrant(code);

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  }

  setAccessAndRefreshTokens(accessToken: string, refreshToken: string): void {
    this.spotifyApi.setAccessToken(accessToken);
    this.spotifyApi.setRefreshToken(refreshToken);
  }

  async executeAuthentication(code: string): Promise<void> {
    try {
      const { accessToken, refreshToken, expiresIn } =
        await this.getTokensFromApi(code);

      this.setAccessAndRefreshTokens(accessToken, refreshToken);

      console.log('Success! You can now close the window.');

      setInterval(async () => {
        const data = await this.spotifyApi.refreshAccessToken();

        const { access_token: accessToken } = data.body;

        this.spotifyApi.setAccessToken(accessToken);
      }, (expiresIn / 2) * 1000);

      return;
    } catch (error) {
      console.error('Error getting Tokens:', error);
    }
  }
}
