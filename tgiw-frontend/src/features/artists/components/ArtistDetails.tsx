import * as React from 'react';

import { ImageWithFallback, SpotifyLink } from '@/components/elements';

interface ArtistDetailsProps {
  imageUrl: string;
  name: string | undefined;
  spotifyUrl: string | undefined;
  color: string | undefined;
}

export const ArtistDetails: React.FunctionComponent<ArtistDetailsProps> = ({
  imageUrl,
  name,
  spotifyUrl,
  color,
}) => {
  return (
    <>
      <div className="relative w-full overflow-hidden rounded-md h-96 lg:h-[30rem]">
        <ImageWithFallback
          src={imageUrl}
          fallbackSrc="/images/artist.jpg"
          alt={name as string}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="relative flex items-center justify-between gap-4 px-4 py-6 mx-4 rounded-md bg-tgiwBlue-light lg:gap-9 lg:mx-9 bottom-12 lg:px-9 artist-background">
        <h1 className="text-4xl lg:text-5xl max-w-[70%] break-words">{name}</h1>

        <SpotifyLink spotifyUrl={spotifyUrl} />
      </div>

      <style jsx>{`
        .artist-background {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
