import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { User } from 'firebase/auth';
import { ErrorWithResponseObject } from '@/types';
import { QueryClient } from 'react-query';

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
  const queryClient = new QueryClient();

  const isTokenExpired =
    error.response.data.message ===
    'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.';

  if (isTokenExpired) {
    window.location.reload();

    try {
      user?.getIdToken().then((idToken) => {
        console.log(idToken);

        setAxiosAccessToken(idToken, axios);
        queryClient.refetchQueries();
      });
    } catch (error) {
      console.log(error);
    }
  }
};
