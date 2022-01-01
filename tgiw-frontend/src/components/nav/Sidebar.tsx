import * as React from 'react';
import Link from 'next/link';

import { Logo } from '../elements';
import { SidebarLink } from './SidebarLink';

interface SidebarProps {}

const sidebarLinks = [
  { link: '/songs', text: 'Songs' },
  { link: '/genres', text: 'Genres' },
  { link: '/artists', text: 'Artists' },
  { link: '/genre-finder', text: 'Genre Finder' },
  {
    link: '/about',
    text: 'About TGIW',
    className: 'text-gray-400 text-opacity-70 mt-10',
  },
];

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  return (
    <div className="md:p-8 md:h-full md:pr-0">
      <Logo />

      <nav className="hidden w-full h-[calc(100%-8rem)] mt-8 text-sm bg-white rounded-md border-2 border-gray-100 py-9 overflow-auto md:flex md:flex-col">
        <ul className="space-y-1">
          {sidebarLinks.map(({ link, text, className }) => (
            <li key={link}>
              <SidebarLink link={link} text={text} className={className} />
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="px-4">
            <Link href="/log-in">
              <a className="block w-full px-4 py-2 mt-20 transition duration-500 ease-in-out rounded-md active:scale-[0.98] bg-gray-200 bg-opacity-40 hover:bg-gray-300">
                Log in
              </a>
            </Link>
          </div>

          <div className="px-4">
            <Link href="/sign-up">
              <a className="block w-full px-4 py-2 mt-4 transition duration-500 ease-in-out border-2 rounded-md active:scale-[0.98] border-gray-800 hover:border-transparent hover:bg-gray-800 hover:text-white">
                Sign up
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
