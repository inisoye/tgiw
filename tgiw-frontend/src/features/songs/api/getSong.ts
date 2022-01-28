import { QueryClient, useQuery } from 'react-query';

import type { Song } from '@/types';
import { axios } from '@/lib/axios';

interface GetSongParams {
  queryKey: (string | { id: string | undefined })[];
}

export const getSong = async (params: GetSongParams): Promise<Song> => {
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
  useQuery(['song', { id }], getSong, { refetchOnWindowFocus: false });
