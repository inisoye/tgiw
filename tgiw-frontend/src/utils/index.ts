import tinycolor from 'tinycolor2';
import { openDB } from 'idb';
import type { User } from 'firebase/auth';
import { AxiosInstance } from 'axios';

import type {
  ImageObject,
  FormattedArtist,
  StoredUser,
  UserWithAccessToken,
} from '@/types';

import { FIREBASE_CONFIG } from '@/config';

export const filterImageSizes = (
  imagesArray: ImageObject[] | undefined,
  selectedSize: number
) =>
  imagesArray?.find(
    ({ height, width }) => height === selectedSize && width === selectedSize
  );

export const pickArtistsNames = (artistsObjects: FormattedArtist[]) =>
  artistsObjects.map(({ name }) => name).join(', ');

export const brightenBgColor = (color: string) => {
  if (tinycolor(color).getBrightness() < 150) {
    if (tinycolor(color).getBrightness() > 100) {
      return tinycolor(color).brighten(20).toString();
    }

    if (tinycolor(color).getBrightness() < 30) {
      return tinycolor(color).brighten(70).toString();
    }

    return tinycolor(color).brighten(50).toString();
  }

  return color;
};

export const darkenBgColor = (color: string) => {
  if (tinycolor(color).getBrightness() > 150) {
    if (tinycolor(color).getBrightness() > 200) {
      return tinycolor(color).darken(20).toString();
    }

    return tinycolor(color).darken(10).toString();
  }

  return color;
};

export const getInitials = (string: string) => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

export const getStoredUser = async (): Promise<StoredUser> => {
  const db2 = await openDB('firebaseLocalStorageDb');
  const tx = db2.transaction('firebaseLocalStorage', 'readonly');
  const store = tx.objectStore('firebaseLocalStorage');
  const result = await store.get(
    `firebase:authUser:${FIREBASE_CONFIG.apiKey}:[DEFAULT]`
  );
  return result?.value;
};

export const setAxiosAccessToken = (
  user: User | StoredUser | null,
  axiosInstance: AxiosInstance
) => {
  const userWithAccessToken = user as unknown as UserWithAccessToken;

  axiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${userWithAccessToken?.stsTokenManager?.accessToken}`,
  };
};
