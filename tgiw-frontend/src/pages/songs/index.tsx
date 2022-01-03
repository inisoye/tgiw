import * as React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { MainLayout, NextPageWithLayout } from '@/components/layout';
import { Loader } from '@/components/elements';
import { withAuth } from '@/features/auth';
import { SongsList, useInfiniteSongs } from '@/features/songs';

interface SongsProps {}

const Songs: NextPageWithLayout = () => {
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

  const allFetchedsongs = data?.pages
    ?.map((page) => page.data.map((song) => song))
    .flat();

  return (
    <div className="max-w-6xl p-8">
      <h1 className="px-8 mb-8 text-3xl text-center text-gray-800 sr-only">
        Songs
      </h1>

      <SongsList songs={allFetchedsongs} />

      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader isInfiniteLoader />
        </div>
      )}
    </div>
  );
};

Songs.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default withAuth(Songs);
