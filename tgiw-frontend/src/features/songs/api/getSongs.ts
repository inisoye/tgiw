import { QueryClient, useInfiniteQuery, useQuery } from 'react-query';

import type { PaginatedResponse, Song } from '@/types';
import { axios } from '@/lib/axios';

export const getSongs = async ({
  pageParam = 1,
}): Promise<PaginatedResponse<Song[]>> => {
  const { data } = await axios.get(`/songs?page=${pageParam}`);
  return data;
};

export const useInfiniteSongs = () =>
  useInfiniteQuery('infinite-songs', getSongs, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

export const get10Songs = async (): Promise<Song[]> => {
  const { data } = await axios.get('/songs/10');
  return data;
};

export const use10Songs = () => useQuery('10songs', get10Songs);

interface Params {
  queryKey: (string | { id: string | undefined })[];
}

export const getSong = async (params: Params): Promise<Song> => {
  const { id } = params.queryKey[1] as { id: string };
  const { data } = await axios.get(`songs/${id}`);
  return data;
};

export const prefetchSong = async (
  queryClient: QueryClient,
  id: string | undefined
) =>
  await queryClient.prefetchQuery(['song', { id }], getSong, {
    retry: 1,
    staleTime: 10 * 1000, // only prefetch if older than 10 seconds
  });

export const useSong = (id: string | undefined) =>
  useQuery(['song', { id }], getSong);
