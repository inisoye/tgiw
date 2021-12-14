import { IsNotEmpty } from 'class-validator';
import { FormattedArtist } from 'src/common/interfaces';

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
  images: SpotifyApi.ImageObject[];

  @IsNotEmpty()
  yearReleased: string;

  @IsNotEmpty()
  genreNames: string[];
}
