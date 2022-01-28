import * as React from 'react';
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
    <div className="max-w-6xl p-8 pb-24 md:px-16">
      <h1 className="sr-only">Songs</h1>

      <SongsList songs={allFetchedSongs} />

      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader isInfiniteLoader />
        </div>
      )}
    </div>
  );
};
