import { useMutation } from 'react-query';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { firebaseClient } from '@/lib/firebaseClient';

const logOut = () => signOut(firebaseClient);

export const useLogOut = () => {
  const router = useRouter();

  return useMutation(logOut, {
    onSettled: () => {
      router.replace('/');
    },
  });
};
