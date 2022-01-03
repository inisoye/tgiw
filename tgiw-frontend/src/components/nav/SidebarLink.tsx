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
          'block w-full px-4 py-2 transition duration-500 ease-in-out hover:bg-gray-200 rounded-md',
          {
            'text-gray-800': isLinkActive,
            'text-gray-400 hover:text-gray-600': !isLinkActive,
          },
          className
        )}
      >
        <span>{text}</span>
      </a>
    </Link>
  );
};
