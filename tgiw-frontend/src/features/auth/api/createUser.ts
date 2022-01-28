import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { CreateUserDto } from '@/features/auth';

const signUp = (newUser: CreateUserDto) => {
  return axios.post('/auth/users', newUser);
};

export const useCreateUser = () => useMutation(signUp);
