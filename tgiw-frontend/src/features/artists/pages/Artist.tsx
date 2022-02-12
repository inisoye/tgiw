import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  ArtistDetails,
  ArtistGenreChips,
  ArtistSongsList,
  useArtist,
} from '@/features/artists';
import { Loader } from '@/components/elements';

interface ArtistProps {}

export const Artist: React.FunctionComponent<ArtistProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: artist, isLoading, isError } = useArtist(id as string);
  const { images, genres, songs, spotifyUrl, name, color } = artist || {};
  const imageUrl = images?.[0]?.url as string;

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <>
      <Head>
        <title>
          Genres and Songs associated with {name} - The Genre isn&apos;t World
        </title>
        <meta
          name="description"
          content={`Genres and Songs associated with ${name}.`}
        />
      </Head>

      <ArtistDetails
        imageUrl={imageUrl}
        name={name}
        spotifyUrl={spotifyUrl}
        color={color}
      />

      <div className="relative items-start justify-between divide-y-2 divide-gray-100 rounded-md border-2 border-gray-100 bg-white px-6 py-12 lg:flex lg:divide-y-0 lg:px-9">
        <ArtistGenreChips genres={genres} />

        <ArtistSongsList songs={songs} genres={genres} />
      </div>
    </>
  );
};
