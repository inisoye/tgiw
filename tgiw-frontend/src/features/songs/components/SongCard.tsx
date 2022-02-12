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
            <div className="song-background card-background block cursor-pointer rounded-md p-4 text-center shadow-lg transition duration-500 ease-in-out hover:scale-[1.02] hover:shadow-none hover:filter-none active:scale-[0.98]">
              <div className="overflow-hidden rounded-md">
                <ImageWithFallback
                  key={id}
                  src={imageUrl}
                  fallbackSrc="/images/song.jpg"
                  alt={name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  className="relative h-full w-full"
                />
              </div>

              <p className="mt-4 max-w-full truncate font-heading text-tgiwPurplish md:text-lg">
                {name}
              </p>
              <div className="mt-1 flex items-center justify-center space-x-2 text-sm text-tgiwPurplish text-opacity-70">
                <p className="max-w-[80%] truncate">{artistsNames}</p>
                <div>&#8226;</div>
                <p>{yearReleased}</p>
              </div>
            </div>
          </HoverCardPrimitive.Trigger>
        </Link>

        <HoverCardPrimitive.Content side="top" sideOffset={5} avoidCollisions>
          <div className="song-background hidden w-max max-w-[234px] rounded-md p-3 transition duration-500 ease-in-out md:block">
            {!!genres.length ? (
              <ul className="flex flex-wrap justify-center gap-1.5">
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
      `}</style>
    </>
  );
};
