import { axios } from '@/lib/axios';
import { useInfiniteQuery } from 'react-query';

import type { PaginatedResponse, Song } from '@/types';

export const getGenres = async ({
  pageParam = 1,
}): Promise<PaginatedResponse<Song[]>> => {
  const { data } = await axios.get(`/genres?page=${pageParam}`);
  return data;
};

export const useInfiniteGenres = () =>
  useInfiniteQuery('infinite-genres', getGenres, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });
