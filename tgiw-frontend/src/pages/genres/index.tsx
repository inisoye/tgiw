import * as React from 'react';

import { MainLayout } from '@/components/layout';
import {
  circleDiameter,
  GenreLink,
  getInitialCirclesPositions,
  getFinalCirclesPositions,
  useGenres,
  useWindowSize,
} from '@/features/genres';
import { Loader } from '@/components/elements';
import { Genre, NextPageWithLayout } from '@/types';

interface GenreProps {}

const Genre: NextPageWithLayout = () => {
  const [page, setPage] = React.useState(1);
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGenres(page);
  const viewDimensions = useWindowSize();

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  const { data: genres, nextPage, prevPage } = data || {};

  const initialCirclesPositions = getInitialCirclesPositions(
    viewDimensions,
    genres?.length as number,
    circleDiameter
  );

  const finalCirclesPositions = getFinalCirclesPositions(
    initialCirclesPositions
  );

  return (
    <div>
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
        {!!prevPage && (
          <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
            Previous Page
          </button>
        )}

        <div className="bg-blue-200 rounded-full w-52 h-52">
          {genres?.map(({ id, name, color }, index) => (
            <GenreLink
              key={id}
              id={id}
              name={name}
              color={color}
              initialPosition={initialCirclesPositions[index]}
              finalPosition={finalCirclesPositions[index]}
            />
          ))}
        </div>

        {!!nextPage && (
          <button
            onClick={() => {
              if (!isPreviousData) {
                setPage((prevPage) => prevPage + 1);
              }
            }}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

Genre.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default Genre;
