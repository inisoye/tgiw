import * as React from 'react';
import { useRouter } from 'next/router';
import { format as formatDate } from 'date-fns';

import { MainLayout } from '@/components/layout';
import { Loader } from '@/components/elements';
import {
  useSong,
  useAudio,
  ArtistLinks,
  TrackProgressMeter,
  LargeSongCardImage,
  LargeSongCardActionButtons,
  getSongMoodMessage,
  SmallSongDescriptor,
  SongGenreChips,
} from '@/features/songs';
import { withAuth } from '@/features/auth';
import type { NextPageWithLayout } from '@/types';

interface SongProps {}

const Song: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useSong(id as string);

  const {
    name,
    artists,
    images,
    yearReleased,
    spotifyUrl,
    snippetUrl,
    genres,
    valence,
    contributorNote,
    contributor,
    dateAdded,
    color,
  } = data || {};

  const { isPlaying, toggle, trackProgressPercentage, duration } = useAudio(
    snippetUrl as string
  );

  const imageUrl = images?.[0].url as string;

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <>
      <div className="max-w-6xl p-8">
        <section className="w-full p-6 rounded-md card-background">
          <div className="p-4 mx-auto text-center bg-black rounded-md bg-opacity-5 lg:text-left lg:flex lg:justify-between lg:space-x-6">
            <LargeSongCardImage imageUrl={imageUrl} name={name as string} />

            <div className="lg:text-right lg:w-[50%] lg:max-w-[50%]">
              <h1 className="mt-10 text-4xl text-gray-800 lg:mt-0 lg:text-5xl">
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

          <TrackProgressMeter
            trackProgressPercentage={trackProgressPercentage}
          />
        </section>

        <div className="px-6 mt-6 bg-white border-2 border-gray-100 divide-y divide-gray-200 rounded-md sm:py-12 sm:flex sm:space-x-14 sm:divide-y-0 sm:divide-x">
          <div className="py-12 space-y-12 sm:py-0 sm:w-3/5">
            {!!genres?.length && (
              <section>
                <h2 className="text-2xl">Associated Genres</h2>
                <SongGenreChips genres={genres} />
              </section>
            )}

            <section>
              <h2 className="text-2xl">{"Contributor's Note"}</h2>
              <p className="mt-4 text-gray-800 text-opacity-70">
                {contributorNote}
              </p>
            </section>
          </div>

          <div className="py-12 space-y-8 sm:py-0 sm:px-6">
            <SmallSongDescriptor heading="Song Mood">
              {getSongMoodMessage(valence)}
            </SmallSongDescriptor>

            <SmallSongDescriptor heading="Added">
              {!!dateAdded &&
                formatDate(new Date(dateAdded as string), 'MMM dd, yyyy')}{' '}
              by <span className="capitalize">{contributor?.userName}</span>
            </SmallSongDescriptor>

            <SmallSongDescriptor heading="Year of Release">
              {yearReleased}
            </SmallSongDescriptor>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};

Song.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default withAuth(Song);
