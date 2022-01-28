import { useMutation } from 'react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';

import type { LoginDto } from '@/features/auth';
import { firebaseClient } from '@/lib/firebaseClient';

const logIn = (loginDto: LoginDto) => {
  const { email, password } = loginDto;
  return signInWithEmailAndPassword(firebaseClient, email, password);
};

export const useLogIn = () => useMutation(logIn);
