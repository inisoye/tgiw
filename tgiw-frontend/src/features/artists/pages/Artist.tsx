import * as React from 'react';
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
      <ArtistDetails
        imageUrl={imageUrl}
        name={name}
        spotifyUrl={spotifyUrl}
        color={color}
      />

      <div className="relative items-start justify-between px-6 py-12 bg-white border-2 border-gray-100 divide-y-2 divide-gray-100 rounded-md lg:divide-y-0 lg:flex lg:px-9">
        <ArtistGenreChips genres={genres} />

        <ArtistSongsList songs={songs} genres={genres} />
      </div>
    </>
  );
};
