import { IsNotEmpty } from 'class-validator';
import { FormattedArtist } from '../../common/interfaces';

export class AddSongDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  artists: FormattedArtist[];

  @IsNotEmpty()
  album: string;

  @IsNotEmpty()
  spotifyId: string;

  @IsNotEmpty()
  spotifyUrl: string;

  @IsNotEmpty()
  snippetUrl: string;

  @IsNotEmpty()
  popularity: number;

  @IsNotEmpty()
  isrc: string;

  @IsNotEmpty()
  valence: number;

  @IsNotEmpty()
  energy: number;

  @IsNotEmpty()
  danceability: number;

  @IsNotEmpty()
  images: SpotifyApi.ImageObject[];

  @IsNotEmpty()
  yearReleased: string;

  @IsNotEmpty()
  contributorNote: string;

  @IsNotEmpty()
  genreNames: string[];
}
