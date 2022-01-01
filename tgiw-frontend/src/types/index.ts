export interface PaginatedResponse<DataType> {
  data: DataType;
  count: any;
  currentPage: any;
  nextPage: any;
  prevPage: number;
  lastPage: number;
}

export interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

export interface FormattedArtist {
  id: string;
  name: string;
  images: ImageObject[];
  genres: string[];
  spotifyUrl: string;
  spotifyId: string;
}

export interface Genre {
  id: string;
  name: string;
  countries: string[];
}

export interface Song {
  id: string;
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
  contributorNote: string;
  genres: Genre[];
}
