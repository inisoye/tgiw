import * as React from 'react';
import Head from 'next/head';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { SongsList, useInfiniteSongs } from '@/features/songs';
import { Loader } from '@/components/elements';

interface SongsProps {}

export const Songs: React.FunctionComponent<SongsProps> = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteSongs();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage as boolean,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  const allFetchedSongs = data?.pages
    ?.map((page) => page.data.map((song) => song))
    .flat();

  return (
    <>
      <Head>
        <title>The Genre isn&apos;t World Songs - Most Recent</title>
        <meta
          name="description"
          content="Extend your music taste with songs from a diverse catalogue spanning numerous genres."
        />
      </Head>

      <h1 className="sr-only">Songs</h1>

      <SongsList songs={allFetchedSongs} />

      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader isInfiniteLoader />
        </div>
      )}
    </>
  );
};
