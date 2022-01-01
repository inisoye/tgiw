import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi = require('spotify-web-api-node');
import { format as formatDate } from 'date-fns';
import { AuthCallbackQueryDto, SearchTracksQueryDto } from './dtos';

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
    console.log(this.spotifyApi);

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

  async executeAuthentication(
    authCallbackQueryDto: AuthCallbackQueryDto,
    storedState: string,
  ): Promise<void> {
    const { state, code } = authCallbackQueryDto;

    if (!state || state !== storedState) {
      throw new Error('State validation failed');
    }

    this.logger.verbose(`Received auth code: ${code}`);

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

  formatSearchedTracks(tracks: SpotifyApi.TrackObjectFull[]) {
    return tracks.map((track) => {
      const {
        album: { name: album, release_date, images },
        artists: trackArtists,
        id: spotifyId,
        name,
      } = track;

      const yearReleased = formatDate(new Date(release_date), 'yyyy');

      return {
        name,
        album,
        artists: trackArtists,
        spotifyId,
        images,
        yearReleased,
      };
    });
  }

  // Format Spotify Errors
  throwFormattedTrackError(error) {
    const {
      body: {
        error: { status, message },
      },
      statusCode,
    } = error;

    throw new HttpException(
      {
        status: status,
        error: message,
      },
      statusCode,
    );
  }

  async searchTracks(searchTracksQueryDto: SearchTracksQueryDto) {
    const { name, limit = 10 } = searchTracksQueryDto;

    try {
      const { body: tracksBody } = await this.spotifyApi.searchTracks(name, {
        limit,
      });

      this.logger.verbose(`Fetched tracks that match "${name}" from Spotify`);

      const {
        tracks: { items: trackItems },
      } = tracksBody;

      const formattedTracks = this.formatSearchedTracks(trackItems);

      return formattedTracks;
    } catch (error) {
      this.logger.error(
        `Could not fetch tracks that match "${name}" from Spotify.`,
      );

      if (error.body.error) {
        this.throwFormattedTrackError(error);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async formatTrackArtistsAndGenres(
    trackArtists: SpotifyApi.ArtistObjectSimplified[],
  ) {
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

    const nestedGenreNames = formattedArtists.map(({ genres }) => genres);
    // Flatten and remove duplicates
    const genreNames = [...new Set(nestedGenreNames.flat())];

    return { formattedArtists, genreNames };
  }

  async formatTrackAudioFeatures(id: string) {
    const {
      body: { valence, energy, danceability },
    } = await this.spotifyApi.getAudioFeaturesForTrack(id);
    return { valence, energy, danceability };
  }

  async formatTrackDetails(track: SpotifyApi.TrackObjectFull) {
    const {
      album: { name: album, release_date, images },
      artists: trackArtists,
      external_ids: { isrc },
      external_urls: { spotify: spotifyUrl },
      id: spotifyId,
      name,
      popularity,
      preview_url: snippetUrl,
    } = track;

    const { formattedArtists: artists, genreNames } =
      await this.formatTrackArtistsAndGenres(trackArtists);

    const audioFeatures = await this.formatTrackAudioFeatures(spotifyId);

    const yearReleased = formatDate(new Date(release_date), 'yyyy');

    return {
      name,
      album,
      artists,
      spotifyId,
      spotifyUrl,
      snippetUrl,
      popularity,
      isrc,
      images,
      yearReleased,
      genreNames,
      ...audioFeatures,
    };
  }

  async getTrackDetails(id: string) {
    try {
      const { body: track } = await this.spotifyApi.getTrack(id);

      return await this.formatTrackDetails(track);
    } catch (error) {
      this.logger.error('Could not fetch track details from Spotify.');

      if (error.body.error) {
        this.throwFormattedTrackError(error);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
