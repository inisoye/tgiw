import * as React from 'react';
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
    snippetUrl as string
  );

  const imageUrl = images?.[0].url as string;

  if (isLoading) {
    return <Loader isFullHeight />;
  }

  return (
    <div className="max-w-6xl p-8 pb-24 md:px-16">
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

      <div className="px-6 mt-6 text-center bg-white border-2 border-gray-100 divide-y-2 divide-gray-100 rounded-md lg:text-left lg:py-12 lg:flex lg:space-x-12 lg:divide-y-0 lg:divide-x-2">
        <div className="py-12 space-y-12 lg:py-0 lg:w-3/5">
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

        <div className="py-12 space-y-8 lg:py-0 lg:px-6">
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
  );
};
