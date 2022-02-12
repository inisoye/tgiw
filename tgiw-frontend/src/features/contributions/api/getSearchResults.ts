import { useQuery } from 'react-query';

import type { Song } from '@/types';
import { axios } from '@/lib/axios';

interface Params {
  queryKey: (string | { filter: string | undefined })[];
}

export const getSearchResults = async (params: Params): Promise<Song[]> => {
  const { filter } = params.queryKey[1] as { filter: string };
  // Default filter added here to prevent 500 errors.
  const { data } = await axios.get(
    `/spotify/tracks?name=${filter || 'love'}&limit=50`,
  );
  return data;
};

export const useSearchResults = (filter: string | undefined) =>
  useQuery(['contributions-search-results', { filter }], getSearchResults, {
    // enabled: false, // Prevents obtaining searching by default
    keepPreviousData: true,
  });
