import * as React from 'react';
import { Palette } from 'color-thief-react';
import Image from 'next/image';
import Link from 'next/link';
import tinycolor from 'tinycolor2';

import { Song } from '@/types';
import { formatBgColor, pickArtistsNames } from '@/utils';

interface SongCardProps {
  song: Song;
}

export const SongCard: React.FunctionComponent<SongCardProps> = ({ song }) => {
  const { name, artists, images, yearReleased, id } = song;

  const imageUrl = images?.[0].url as string;
  const artistsNames = pickArtistsNames(artists);

  return (
    <Palette src={imageUrl} colorCount={2} crossOrigin="anonymous" format="hex">
      {({ data, loading }) => {
        if (loading) return;

        let defaultBg1 = data?.[0] || '#f4f4f5';

        const bg1 = formatBgColor(defaultBg1);

        return (
          <Link href={`/songs/${id}?bg=${bg1.substring(1)}`}>
            <a>
              <div className="p-4 text-center transition duration-300 ease-in-out rounded-md shadow-lg card-background hover:filter-none hover:scale-[0.98] hover:shadow-none">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={name}
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
                <p className="max-w-full mt-4 text-lg text-gray-800 truncate font-heading">
                  {name}
                </p>
                <div className="flex items-center justify-center mt-1 space-x-2 text-sm text-gray-800 text-opacity-70">
                  <p className="truncate max-w-[80%]">{artistsNames}</p>
                  <div>&#8226;</div>
                  <p>{yearReleased}</p>
                </div>
              </div>

              <style jsx>{`
                .card-background {
                  background-color: ${bg1};
                }

                .card-background:hover {
                  background-color: ${tinycolor(bg1).brighten(10).toString()};
                }
              `}</style>
            </a>
          </Link>
        );
      }}
    </Palette>
  );
};
