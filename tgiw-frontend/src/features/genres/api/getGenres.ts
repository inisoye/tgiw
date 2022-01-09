import { useQuery } from 'react-query';

import type { Genre, PaginatedResponse } from '@/types';
import { axios } from '@/lib/axios';

interface Params {
  queryKey: (string | { page: number })[];
}

export const getGenres = async (
  params: Params
): Promise<PaginatedResponse<Genre[]>> => {
  const { page } = (params?.queryKey[1] as { page: number }) || {};
  const { data } = await axios.get(`/genres?page=${page}`);
  return data;
};

export const useGenres = (page: number) =>
  useQuery(['genres', { page }], getGenres, {
    keepPreviousData: true,
  });
