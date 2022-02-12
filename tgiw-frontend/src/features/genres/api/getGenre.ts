import { QueryClient, useQuery } from 'react-query';

import type { Genre } from '@/types';
import { axios } from '@/lib/axios';

interface GetGenreParams {
  queryKey: (string | { id: string | undefined })[];
}

export const getGenre = async (params: GetGenreParams): Promise<Genre> => {
  const { id } = params.queryKey[1] as { id: string };
  const { data } = await axios.get(`genres/${id}`);
  return data;
};

export const prefetchGenre = async (
  queryClient: QueryClient,
  id: string | undefined,
) =>
  await queryClient.prefetchQuery(['genre', { id }], getGenre, {
    retry: 1,
    staleTime: 10 * 1000, // only prefetch if older than 10 seconds
  });

export const useGenre = (id: string | undefined) =>
  useQuery(['genre', { id }], getGenre);
