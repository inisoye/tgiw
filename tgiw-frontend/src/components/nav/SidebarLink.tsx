import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { useRouter } from 'next/router';

interface SidebarLinkProps {
  link: string;
  text: string;
  className: string | undefined;
}

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = ({
  link,
  text,
  className,
}) => {
  const router = useRouter();

  const isLinkActive = router.pathname === link;

  return (
    <Link href={link}>
      <a
        className={clsx(
          'block w-full px-8 py-3 hover:text-tgiwOrange transition duration-500 ease-in-out',
          {
            'bg-opacity-40 border-r-4 border-r-tgiwOrange': isLinkActive,
          },
          className
        )}
      >
        {text}
      </a>
    </Link>
  );
};
