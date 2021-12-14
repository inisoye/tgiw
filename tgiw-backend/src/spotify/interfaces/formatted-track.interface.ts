export interface FormattedTrack {
  name: string;
  album: string;
  spotifyId: string;
  spotifyUrl: string;
  snippetUrl: string;
  popularity: number;
  isrc: string;
  images: SpotifyApi.ImageObject[];
  yearReleased: string;
  genreNames: string[];
}
