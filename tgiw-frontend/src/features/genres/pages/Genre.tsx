import * as React from 'react';
import { useRouter } from 'next/router';

import {
  GenreCountriesList,
  GenreSongsList,
  useFlags,
  useGenre,
} from '@/features/genres';
import { Loader } from '@/components/elements';

interface GenreProps {}

export const Genre: React.FunctionComponent<GenreProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: genre, isLoading, isError } = useGenre(id as string);

  const { name, color, songs, countries } = genre || {};

  const flagsResponse = useFlags(countries);
  const flags = flagsResponse.map((r) => r.data);

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <>
      <div className="w-full max-w-6xl p-8 pb-24 md:px-16">
        <div className="px-4 py-6 rounded-md pt-36 genre-background lg:px-9">
          <h1 className="text-white capitalize text-4xl lg:text-5xl max-w-[70%] break-words">
            {name === 'world' ? `${name} (ew!)` : name}
          </h1>
        </div>

        <div className="relative items-start justify-between px-6 py-12 mt-6 bg-white border-2 border-gray-100 divide-y-2 divide-gray-100 rounded-md lg:divide-y-0 lg:flex lg:px-9">
          <GenreCountriesList countries={countries} flags={flags} />

          <GenreSongsList countries={countries} songs={songs} />
        </div>
      </div>

      <style jsx>{`
        .genre-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
