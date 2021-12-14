import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi = require('spotify-web-api-node');
import { format } from 'date-fns';
import { SearchTracksDto } from './dtos';
import { FormattedTrack } from './interfaces';

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger('SpotifyService');

  oauthScopes: Array<string> = [
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
    clientId: this.configService.get('spotify.clientId'),
    clientSecret: this.configService.get('spotify.clientSecret'),
    redirectUri: this.configService.get('spotify.redirectUri'),
  });

  createAuthorizeURL(): string {
    return this.spotifyApi.createAuthorizeURL(
      this.oauthScopes,
      this.configService.get('spotify.authState'),
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

      this.logger.verbose(
        'Authentication successful. You can now close the window.',
      );

      setInterval(async () => {
        const data = await this.spotifyApi.refreshAccessToken();

        const { access_token: accessToken } = data.body;

        this.spotifyApi.setAccessToken(accessToken);
      }, (expiresIn / 2) * 1000);

      return;
    } catch (error) {
      const {
        body: { error_description: errorDescription },
        statusCode,
      } = error;

      this.logger.error(
        'Could not generate access token and authenticate API from Spotify.',
      );

      throw new HttpException(
        {
          status: statusCode,
          error: errorDescription,
        },
        statusCode,
      );
    }
  }

  async formatTrackGenres(trackArtists: SpotifyApi.ArtistObjectSimplified[]) {
    const genreNamesNested = await Promise.all(
      trackArtists.map(async ({ id }) => {
        const {
          body: { genres },
        } = await this.spotifyApi.getArtist(id);

        return genres;
      }),
    );

    // Flatten and remove duplicates
    return [...new Set(genreNamesNested.flat())];
  }

  async formatTrackArtists(trackArtists: SpotifyApi.ArtistObjectSimplified[]) {
    const formattedArtists = await Promise.all(
      trackArtists.map(async ({ id }) => {
        const {
          body: {
            genres,
            images,
            external_urls: { spotify: spotifyUrl },
            name,
            id: spotifyId,
          },
        } = await this.spotifyApi.getArtist(id);

        return { name, images, genres, spotifyUrl, spotifyId };
      }),
    );

    return formattedArtists;
  }

  async formatTracks(tracks: SpotifyApi.TrackObjectFull[]) {
    return await Promise.all(
      tracks.map(async (track) => {
        const {
          album: { name: album, release_date, images },
          artists,
          external_ids: { isrc },
          external_urls: { spotify: spotifyUrl },
          id: spotifyId,
          name,
          popularity,
          preview_url: snippetUrl,
        } = track;

        const genreNames = await this.formatTrackGenres(artists);

        const formattedArtists = await this.formatTrackArtists(artists);

        const yearReleased = format(new Date(release_date), 'yyyy');

        return {
          name,
          album,
          artists: formattedArtists,
          spotifyId,
          spotifyUrl,
          snippetUrl,
          popularity,
          isrc,
          images,
          yearReleased,
          genreNames,
        };
      }),
    );
  }

  async searchTracks(
    searchTracksDto: SearchTracksDto,
  ): Promise<FormattedTrack[]> {
    const { name, limit = 10 } = searchTracksDto;

    try {
      const { body: tracksBody } = await this.spotifyApi.searchTracks(name, {
        limit,
      });

      this.logger.verbose(`Fetched tracks that match "${name}" from Spotify`);

      const {
        tracks: { items: trackItems },
      } = tracksBody;

      const formattedTracks = await this.formatTracks(trackItems);

      return formattedTracks;
    } catch (error) {
      const {
        body: {
          error: { status, message },
        },
        statusCode,
      } = error;

      this.logger.error(
        `Could not fetch tracks that match "${name}" from Spotify. Error: ${message}`,
      );

      throw new HttpException(
        {
          status: status,
          error: message,
        },
        statusCode,
      );
    }
  }
}
