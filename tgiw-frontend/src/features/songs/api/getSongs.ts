import { axios } from '@/config';
import { useInfiniteQuery, useQuery } from 'react-query';

import type { PaginatedResponse, Song } from '@/types';

export const getSongs = async ({
  pageParam = 1,
}): Promise<PaginatedResponse<Song[]>> => {
  const { data } = await axios.get(`/songs?page=${pageParam}`);
  return data;
};

export const useSongs = () => useQuery('songs', getSongs);

export const useInfiniteSongs = () =>
  useInfiniteQuery('infinite-songs', getSongs, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

export const get10Songs = async (): Promise<Song[]> => {
  const { data } = await axios.get('/songs/10');
  return data;
};

export const use10Songs = () => useQuery('10songs', get10Songs);
