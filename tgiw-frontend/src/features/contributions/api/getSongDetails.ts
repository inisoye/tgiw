import { QueryClient, useQuery } from 'react-query';

import type { ContributedSongDetails } from '@/features/contributions';
import { axios } from '@/lib/axios';

interface GetSongDetailsParams {
  queryKey: (string | { id: string | undefined })[];
}

export const getSongDetails = async (
  params: GetSongDetailsParams
): Promise<ContributedSongDetails> => {
  const { id } = params.queryKey[1] as { id: string };
  const { data } = await axios.get(`/spotify/tracks/${id}`);
  return data;
};

export const prefetchSongDetails = async (
  queryClient: QueryClient,
  id: string | undefined
) =>
  await queryClient.prefetchQuery(
    ['contribution-song-details', { id }],
    getSongDetails,
    {
      retry: 1,
      staleTime: 10 * 1000, // only prefetch if older than 10 seconds
    }
  );

export const useSongDetails = (id: string | undefined) =>
  useQuery(['contribution-song-details', { id }], getSongDetails, {
    refetchOnWindowFocus: false,
  });
