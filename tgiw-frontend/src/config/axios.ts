import Axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const axios = Axios.create({ baseURL: API_BASE_URL });
