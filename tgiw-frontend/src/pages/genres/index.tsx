import * as React from 'react';

import { MainLayout } from '@/components/layout';
import { AnimatedCircles, useInfiniteGenres } from '@/features/genres';
import { Loader } from '@/components/elements';
import type { NextPageWithLayout } from '@/types';

interface GenreProps {}

const Genre: NextPageWithLayout = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteGenres();

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  const allFetchedGenres = data?.pages
    ?.map((page) => page.data.map((genre) => genre))
    .flat();

  return (
    <div>
      Genre
      <div className="relative w-full">
        <AnimatedCircles />
      </div>
    </div>
  );
};

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;
