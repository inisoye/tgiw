import * as React from 'react';

interface SpotifyLinkProps {
  spotifyUrl: string | undefined;
}

export const SpotifyLink: React.FunctionComponent<SpotifyLinkProps> = ({
  spotifyUrl,
}) => {
  return (
    <a
      href={spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 rounded-md bg-spotifyGreen p-2 px-3 text-sm text-white transition duration-500 ease-in-out hover:scale-105 active:scale-[0.95]"
    >
      <span>Spotify</span>
      <span>
        <svg
          width={17}
          height={17}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.683.682c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.56-8-8-8Zm3.68 11.56c-.16.24-.44.32-.681.161-1.881-1.16-4.241-1.401-7.041-.761-.279.081-.52-.119-.6-.36-.08-.28.12-.519.361-.6 3.039-.68 5.68-.4 7.76.881.28.12.32.439.2.68Zm.96-2.2c-.2.28-.56.4-.841.2-2.16-1.318-5.44-1.72-7.96-.92-.318.082-.68-.08-.759-.398-.08-.322.08-.682.4-.762 2.92-.88 6.52-.44 9 1.081.24.12.36.52.16.8Zm.08-2.24c-2.56-1.52-6.84-1.68-9.281-.918a.751.751 0 0 1-.92-.48.75.75 0 0 1 .48-.923c2.84-.84 7.52-.68 10.481 1.082.36.2.48.68.28 1.04-.2.28-.68.398-1.04.198Z"
            fill="#fff"
          />
        </svg>
      </span>
    </a>
  );
};
