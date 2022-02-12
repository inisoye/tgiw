import { useQuery } from 'react-query';
import type { User as FirebaseUser } from 'firebase/auth';

import type { DbUser } from '@/types';
import { axios } from '@/lib/axios';

interface Params {
  queryKey: (string | { id: string | undefined })[];
}

export const getUser = async (
  params: Params,
): Promise<{
  firebaseUser: FirebaseUser;
  dbUser: DbUser;
}> => {
  const { id } = params.queryKey[1] as { id: string };
  const { data } = await axios.get(`auth/users/${id}`);
  return data;
};

export const useUser = (id: string | undefined) =>
  useQuery(['user', { id }], getUser, {
    keepPreviousData: true,
    enabled: !!id,
  });
