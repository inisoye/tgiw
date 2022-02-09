import * as React from 'react';
import Link from 'next/link';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import type { Song } from '@/types';
import { pickArtistsNames } from '@/utils';
import { GenreChip, ImageWithFallback } from '@/components/elements';

interface SongCardProps {
  song: Song;
}

export const SongCard: React.FunctionComponent<SongCardProps> = ({ song }) => {
  const { name, artists, images, yearReleased, id, color, genres } = song;

  const imageUrl = images?.[0]?.url as string;
  const artistsNames = pickArtistsNames(artists);

  return (
    <>
      <HoverCardPrimitive.Root openDelay={0} closeDelay={100}>
        {/* eslint-disable-next-line @next/next/link-passhref */}
        <Link href={`/songs/${id}`}>
          {/* Trigger ends up rendering an anchor tag. */}
          <HoverCardPrimitive.Trigger>
            <div className="p-4 cursor-pointer block text-center transition duration-500 ease-in-out rounded-md shadow-lg song-background card-background hover:filter-none hover:scale-[1.02] active:scale-[0.98] hover:shadow-none">
              <div className="overflow-hidden rounded-md">
                <ImageWithFallback
                  key={id}
                  src={imageUrl}
                  fallbackSrc="/images/song.jpg"
                  alt={name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  className="relative w-full h-full"
                />
              </div>

              <p className="max-w-full mt-4 truncate md:text-lg text-tgiwPurplish font-heading">
                {name}
              </p>
              <div className="flex items-center justify-center mt-1 space-x-2 text-sm text-tgiwPurplish text-opacity-70">
                <p className="truncate max-w-[80%]">{artistsNames}</p>
                <div>&#8226;</div>
                <p>{yearReleased}</p>
              </div>
            </div>
          </HoverCardPrimitive.Trigger>
        </Link>

        <HoverCardPrimitive.Content side="top" sideOffset={5} avoidCollisions>
          <div className="max-w-[234px] w-max p-3 rounded-md song-background transition duration-500 ease-in-out hidden md:block">
            {!!genres.length ? (
              <ul className="flex flex-wrap justify-center gap-1.5 genres-list">
                {genres?.map(({ color, id, name }) => {
                  return (
                    <li key={id}>
                      <GenreChip
                        id={id}
                        name={name}
                        color={color}
                        isExtraSmallTextSize
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-tgiwPurplish text-opacity-60">
                No genres found
              </p>
            )}
            <HoverCardPrimitive.Arrow style={{ fill: color }} />
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>

      <style jsx>{`
        @keyframes slideDownAndFade {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .song-background {
          background-color: ${color};
          animation-name: slideDownAndFade;
          animation-duration: 600ms;
          animation-timing-function: ease-in-out;
          will-change: transform, opacity;
        }

        .song-background:hover {
        }
      `}</style>
    </>
  );
};
