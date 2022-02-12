import * as React from 'react';
import Link from 'next/link';

interface SidebarAuthLinksProps {}

export const SidebarAuthLinks: React.FunctionComponent<
  SidebarAuthLinksProps
> = () => {
  return (
    <div className="mt-auto px-4">
      <div>
        <Link href="/log-in">
          <a className="mt-20 block w-full rounded-md bg-gray-300 bg-opacity-50 px-4 py-2 transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-200 active:scale-[0.95]">
            Log in
          </a>
        </Link>
      </div>

      <div>
        <Link href="/sign-up">
          <a className="mt-4 block w-full rounded-md bg-tgiwPurplish px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-105 active:scale-[0.95]">
            Sign up
          </a>
        </Link>
      </div>
    </div>
  );
};
