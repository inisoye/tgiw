import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format as formatDate } from 'date-fns';

import {
  useAudio,
  useSong,
  LargeSongCard,
  SmallSongDescriptor,
  SongGenreChips,
  getSongMoodMessage,
} from '@/features/songs';
import { Loader } from '@/components/elements';
import { TrackFeatureGauge } from '../components';
import { pickArtistsNames } from '@/utils';
import { Artist } from '@/types';

interface SongProps {}

export const Song: React.FunctionComponent<SongProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: song, isLoading, isError } = useSong(id as string);

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
    popularity,
    danceability,
    energy,
  } = song || {};

  const { isPlaying, toggle, trackProgressPercentage, duration } = useAudio(
    snippetUrl as string,
  );

  const imageUrl = images?.[0].url as string;

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <>
      <Head>
        <title>
          {name} by {pickArtistsNames(artists as Artist[])} - The Genre
          isn&apos;t World
        </title>
        <meta
          name="description"
          content={`${name} by ${pickArtistsNames(
            artists as Artist[],
          )}. ${contributorNote}`}
        />
      </Head>

      <LargeSongCard
        imageUrl={imageUrl}
        name={name}
        artists={artists}
        duration={duration}
        toggle={toggle}
        isPlaying={isPlaying}
        spotifyUrl={spotifyUrl}
        trackProgressPercentage={trackProgressPercentage}
        color={color}
      />

      <div className="mt-6 divide-y-2 divide-gray-100 rounded-md border-2 border-gray-100 bg-white px-6 text-center lg:flex lg:space-x-12 lg:divide-y-0 lg:divide-x-2 lg:py-12 lg:text-left">
        <div className="space-y-12 py-12 lg:w-3/5 lg:py-0">
          {!!genres?.length && (
            <section>
              <h2 className="text-2xl">Associated Genres</h2>
              <SongGenreChips genres={genres} />
            </section>
          )}

          <section>
            <h2 className="text-2xl">{"Contributor's Note"}</h2>
            <p className="mt-4 leading-relaxed text-tgiwPurplish text-opacity-70 ">
              {contributorNote}
            </p>
          </section>

          <section>
            <h2 className="text-2xl">Other Features</h2>

            <div className="mt-4 space-y-1">
              <TrackFeatureGauge
                featureName="Happiness Score"
                featureValue={(valence as number) * 100}
              />

              <TrackFeatureGauge
                featureName="Popularity"
                featureValue={popularity as number}
              />

              <TrackFeatureGauge
                featureName="Danceability"
                featureValue={(danceability as number) * 100}
              />

              <TrackFeatureGauge
                featureName="Energy"
                featureValue={(energy as number) * 100}
              />
            </div>
          </section>
        </div>

        <div className="space-y-8 py-12 lg:py-0 lg:px-6">
          <SmallSongDescriptor heading="Song Mood">
            {getSongMoodMessage(valence)}
          </SmallSongDescriptor>

          <SmallSongDescriptor heading="Added">
            {!!dateAdded &&
              formatDate(new Date(dateAdded as string), 'MMM dd, yyyy')}{' '}
            by <span>{contributor?.userName}</span>
          </SmallSongDescriptor>

          <SmallSongDescriptor heading="Year of Release">
            {yearReleased}
          </SmallSongDescriptor>
        </div>
      </div>
    </>
  );
};
