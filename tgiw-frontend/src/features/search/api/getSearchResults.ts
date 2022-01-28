import { useQuery } from 'react-query';

import type { Song } from '@/types';
import { axios } from '@/lib/axios';

interface Params {
  queryKey: (string | { filter: string | undefined })[];
}

export const getSearchResults = async (params: Params): Promise<Song[]> => {
  const { filter } = params.queryKey[1] as { filter: string };
  const { data } = await axios.get(`/songs?filter=${filter}`);
  return data.data; // Extract data from pagination details
};

export const useSearchResults = (filter: string | undefined) =>
  useQuery(['search-results', { filter }], getSearchResults, {
    // enabled: false, // Prevents obtaining searching by default
    keepPreviousData: true,
  });
