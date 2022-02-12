import { QueryClient, useQuery } from 'react-query';

import type { Artist } from '@/types';
import { axios } from '@/lib/axios';

interface GetArtistParams {
  queryKey: (string | { id: string | undefined })[];
}

export const getArtist = async (params: GetArtistParams): Promise<Artist> => {
  const { id } = params.queryKey[1] as { id: string };
  const { data } = await axios.get(`artists/${id}`);
  return data;
};

export const prefetchArtist = async (
  queryClient: QueryClient,
  id: string | undefined,
) =>
  await queryClient.prefetchQuery(['artist', { id }], getArtist, {
    retry: 1,
    staleTime: 10 * 1000, // only prefetch if older than 10 seconds
  });

export const useArtist = (id: string | undefined) =>
  useQuery(['artist', { id }], getArtist);
