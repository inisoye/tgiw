import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { Contribution } from '@/features/contributions';

const createContribution = (newContribution: Contribution) => {
  return axios.post('/songs', newContribution);
};

export const useContribution = () => useMutation(createContribution);
