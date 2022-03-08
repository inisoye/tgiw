import * as React from 'react';

import { Logo } from '@/components/elements';
import { useAuth } from '@/lib/authentication';
import { useUser } from '@/features/auth';
import { SidebarAuthLinks } from './SidebarAuthLinks';
import { SidebarLink } from './SidebarLink';
import { ProfileMenu } from './ProfileMenu';

interface SidebarProps {}

const sidebarLinks = [
  { link: '/songs', text: 'All Songs' },
  { link: '/search', text: 'Search' },
  { link: '/genre-finder', text: 'Genre Finder' },
  {
    link: 'https://portfolio-hpr.pages.dev/projects/tgiw',
    text: 'About TGIW',
    className: 'mt-10',
    type: 'external',
  },
];

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { user } = useAuth();
  const { data } = useUser(user?.uid);

  // dbUser refers to data for user stored on app database i.e not on Firebase's servers
  const dbUser = data?.dbUser;

  return (
    <div className="md:h-full md:p-8 md:pr-0">
      <Logo />

      <nav className="mt-8 hidden h-[calc(100%-7.9rem)] w-full max-w-[11.875rem] py-9 text-sm md:flex md:flex-col ">
        <ul className="space-y-4 overflow-auto px-4">
          {sidebarLinks.map(({ link, text, className, type }) => (
            <li key={link} className="relative">
              <SidebarLink
                link={link}
                text={text}
                className={className}
                type={type}
              />
            </li>
          ))}
        </ul>

        {user ? <ProfileMenu dbUser={dbUser} /> : <SidebarAuthLinks />}
      </nav>
    </div>
  );
};
