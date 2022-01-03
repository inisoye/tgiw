import { axios } from '@/config';
import { useQuery } from 'react-query';

import type { PaginatedResponse, Song } from '@/types';

export const getSongs = async (): Promise<PaginatedResponse<Song[]>> => {
  const { data } = await axios.get('/songs');
  return data;
};

export const useSongs = () => useQuery('songs', getSongs);

export const get10Songs = async (): Promise<Song[]> => {
  const { data } = await axios.get('/songs/10');
  return data;
};

export const use10Songs = () => useQuery('10songs', get10Songs);
