import * as React from 'react';
import { useRouter } from 'next/router';

import { MainLayout, NextPageWithLayout } from '@/components/layout';
import {
  useSongs,
  useAudio,
  ArtistLinks,
  TrackProgressMeter,
  LargeSongCardImage,
  LargeSongCardActionButtons,
} from '@/features/songs';
import { Song } from '@/types';
import { withAuth } from '@/features/auth';

interface SongProps {}

const Song: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: songs, isError, isLoading } = useSongs();

  const { id, bg } = router.query;

  const { name, artists, images, yearReleased, spotifyUrl, snippetUrl } =
    songs?.data.find((s) => s.id === id) || {};

  const { isPlaying, toggle, trackProgressPercentage, duration } = useAudio(
    snippetUrl as string
  );

  if (isLoading) {
    return <div>Loading..</div>;
  }

  const imageUrl = images?.[0].url as string;

  return (
    <div className="max-w-6xl px-8 mt-8">
      <div style={{ background: `#${bg}` }} className="w-full p-6 rounded-md">
        <div className="p-4 mx-auto text-center bg-black rounded-md bg-opacity-5 md:text-left md:flex md:justify-between md:space-x-6">
          <LargeSongCardImage imageUrl={imageUrl} name={name} />

          <div className="md:text-right md:w-[50%] md:max-w-[50%]">
            <h1 className="mt-6 text-4xl text-gray-800 md:mt-0 lg:text-5xl">
              {name}
            </h1>

            <ArtistLinks artists={artists} />

            <LargeSongCardActionButtons
              duration={duration}
              toggle={toggle}
              isPlaying={isPlaying}
              spotifyUrl={spotifyUrl}
            />
          </div>
        </div>

        {/* Progress meters left as div elements as to be used by sighted users only */}
        {!!duration && (
          <TrackProgressMeter
            duration={duration}
            trackProgressPercentage={trackProgressPercentage}
          />
        )}
      </div>
    </div>
  );
};

Song.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default withAuth(Song);
