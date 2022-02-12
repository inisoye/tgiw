import axios from 'axios';
import { useQueries } from 'react-query';

export const getFlag = async (country: string): Promise<string> => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`,
  );

  return data[0].flag;
};

export const useFlags = (countries: string[] | undefined) => {
  return useQueries(
    // https://react-query.tanstack.com/guides/parallel-queries
    !!countries
      ? countries?.map(country => ({
          queryKey: ['flag', country],
          queryFn: () => getFlag(country),
          enabled: !!countries,
        }))
      : [],
  );
};
