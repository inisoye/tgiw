import { FormattedArtist, ImageObject } from '@/types';

export interface ContributedSongDetails {
  name: string;
  artists: FormattedArtist[];
  album: string;
  spotifyId: string;
  spotifyUrl: string;
  snippetUrl: string;
  popularity: number;
  isrc: string;
  valence: number;
  energy: number;
  danceability: number;
  images: ImageObject[];
  yearReleased: string;
  genreNames: string[];
}

export interface Contribution extends ContributedSongDetails {
  contributorNote: string;
}
