import type { User as FirebaseUser } from 'firebase/auth';

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
  color: string;
}

export interface Contributor {
  id: string;
  dateAdded: string;
  userName: string;
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
  contributor: Contributor;
  dateAdded: string;
}

export interface DbUser {
  id: string;
  userName: string;
  dateAdded: Date;
  contributions: Song[];
}

// Added to prevent compiler error when obtaining accessToken
export interface UserWithAccessToken extends FirebaseUser {
  stsTokenManager: {
    accessToken: string;
  };
}

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
}
export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface StoredUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}
