import * as React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { MainLayout, NextPageWithLayout } from '@/components/layout';
import { SpotifyLink } from '@/components/elements';
import { useSongs, useAudio, SnippetButton } from '@/features/songs';
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
    <div className="w-full max-w-6xl px-8 mt-8">
      <div style={{ background: `#${bg}` }} className="w-full p-3 rounded-md">
        <div className="p-4 mx-auto text-center bg-black rounded-md bg-opacity-5 md:text-left md:flex md:justify-between md:space-x-6">
          <div className="w-2/5 min-w-[150px] max-w-[250px] overflow-hidden rounded-md mx-auto md:mx-0">
            <Image
              src={imageUrl}
              alt={name}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="md:text-right md:w-[50%] md:max-w-[50%]">
            <h1 className="mt-6 text-4xl text-gray-800 md:mt-0 lg:text-5xl">
              {name}
            </h1>

            <ul className="flex flex-wrap justify-center gap-2 mx-auto mt-6 md:mx-0 md:flex-row md:justify-end md:inline-flex md:w-full">
              {artists?.map(({ id, name, images }) => {
                const imageUrl = images?.[1].url;

                return (
                  <li key={id} className="w-max max-w-[90%] md:inline">
                    <Link href={`/artists/${id}`}>
                      <a className="flex items-center px-3 py-1.5 space-x-3 transition duration-500 ease-in-out bg-black rounded-md bg-opacity-10 hover:bg-opacity-5">
                        <div className="w-8 h-8 overflow-hidden rounded-full shrink-0">
                          <Image
                            src={imageUrl}
                            alt={name}
                            width="100%"
                            height="100%"
                            layout="responsive"
                            objectFit="contain"
                          />
                        </div>
                        <span className="text-sm text-gray-800 truncate shrink text-opacity-90">
                          {name}
                        </span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="inline-flex flex-wrap justify-center w-full gap-2 mt-6 md:justify-end">
              {!!duration && (
                <li className="inline w-max">
                  <SnippetButton toggle={toggle} isPlaying={isPlaying} />
                </li>
              )}
              <li className="inline w-max">
                <SpotifyLink spotifyUrl={spotifyUrl} />
              </li>
            </ul>
          </div>
        </div>

        {/* Progress meters left as div elements as to be used by sighted users only */}
        {!!duration && (
          <div className="w-full h-3 mt-3 bg-black rounded-sm bg-opacity-5">
            <div
              style={{ width: `${trackProgressPercentage}%` }}
              className="h-full transition-all duration-200 ease-linear rounded-sm bg-slate-800"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

Song.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default withAuth(Song);
