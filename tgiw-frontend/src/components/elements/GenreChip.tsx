import Link from 'next/link';
import clsx from 'clsx';
import { useQueryClient } from 'react-query';

import { prefetchGenre } from '@/features/genres';

interface GenreChipProps {
  id: string;
  name: string;
  color: string;
  isBaseTextSize?: boolean;
  isExtraSmallTextSize?: boolean;
  hasPrefetch?: boolean;
}

export const GenreChip: React.FunctionComponent<GenreChipProps> = ({
  id,
  name,
  color,
  isBaseTextSize,
  isExtraSmallTextSize,
  hasPrefetch,
}) => {
  const queryClient = useQueryClient();

  return (
    <>
      <Link href={`/genres/${id}`}>
        <a
          className={clsx(
            'chip inline-block rounded-md py-1.5 px-2 capitalize text-white transition duration-300 ease-in-out hover:scale-105 active:scale-[0.95]',
            {
              'text-sm': !isBaseTextSize && !isExtraSmallTextSize,
              'text-base': isBaseTextSize,
              'text-xs': isExtraSmallTextSize,
            },
          )}
          // onMouseEnter={async () => {
          //   if (hasPrefetch) prefetchGenre(queryClient, id);
          // }}
        >
          {name === 'world' ? `${name} (ew!)` : name}
        </a>
      </Link>

      <style jsx>{`
        .chip {
          background-color: ${color};
        }
      `}</style>
    </>
  );
};
