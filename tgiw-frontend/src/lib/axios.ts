import Axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const axios = Axios.create({ baseURL: API_BASE_URL });

export const setAxiosAccessToken = (
  token: string,
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
