import * as React from 'react';

import { MainLayout, NextPageWithLayout } from '@/components/layout';
import { withAuth } from '@/features/auth';
import { SongsList, useSongs } from '@/features/songs';

interface SongsProps {}

const Songs: NextPageWithLayout = () => {
  const { data: songs, isError, isLoading } = useSongs();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="mt-8">
      {/* <h1 className="px-8 mb-8 text-3xl text-center text-gray-800 md:hidden">
        Songs
      </h1> */}

      <div className="max-w-6xl px-8">
        <SongsList songs={songs} />
      </div>
    </div>
  );
};

Songs.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default withAuth(Songs);
