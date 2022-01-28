import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';

interface updateUserVariables {
  email: string;
  password: string;
  id: string | undefined;
}

const updateUser = ({ email, password, id }: updateUserVariables) => {
  return axios.patch(`/auth/users/${id}`, { email, password });
};

export const useUpdateUser = () => useMutation('update-user', updateUser);
