import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import { User } from 'firebase/auth';
import { ErrorWithResponseObject } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const axios = Axios.create({ baseURL: API_BASE_URL });

export const setAxiosAccessToken = (
  token: string,
  axiosInstance: AxiosInstance
) => {
  axiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};

export const resetAxiosTokenOnRequestError = (
  error: ErrorWithResponseObject,
  user: User
) => {
  const isTokenExpired =
    error?.response.data.message.includes('Firebase ID token is expired') &&
    error.response.status === 401;

  if (isTokenExpired) {
    user?.getIdToken().then((idToken) => {
      setAxiosAccessToken(idToken, axios);
    });
  }
};
