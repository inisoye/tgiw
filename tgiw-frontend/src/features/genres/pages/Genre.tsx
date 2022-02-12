import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  GenreCountriesList,
  GenreSongsList,
  useFlags,
  useGenre,
} from '@/features/genres';
import { Loader } from '@/components/elements';
import { convertToTitleCase } from '@/utils';

interface GenreProps {}

export const Genre: React.FunctionComponent<GenreProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: genre, isLoading, isError } = useGenre(id as string);

  const { name, color, songs, countries } = genre || {};

  const flagsResponse = useFlags(countries);
  const flags = flagsResponse.map(r => r.data);

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <>
      <Head>
        <title>
          {convertToTitleCase(name as string)} Songs - The Genre isn&apos;t
          World
        </title>
        <meta
          name="description"
          content={`Curated songs within the ${convertToTitleCase(
            name as string,
          )} genre.`}
        />
      </Head>

      <div className="genre-background rounded-md px-4 py-6 pt-36 lg:px-9">
        <h1 className="max-w-[70%] break-words text-4xl capitalize text-white lg:text-5xl">
          {name === 'world' ? `${name} (ew!)` : name}
        </h1>
      </div>

      <div className="relative mt-6 items-start justify-between divide-y-2 divide-gray-100 rounded-md border-2 border-gray-100 bg-white px-6 py-12 lg:flex lg:divide-y-0 lg:px-9">
        <GenreCountriesList countries={countries} flags={flags} />

        <GenreSongsList countries={countries} songs={songs} />
      </div>

      <style jsx>{`
        .genre-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
