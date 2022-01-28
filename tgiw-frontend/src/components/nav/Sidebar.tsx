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
  { link: '/about', text: 'About TGIW', className: 'mt-10 hidden' },
];

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { user } = useAuth();
  const { data } = useUser(user?.uid);

  // dbUser refers to data for user stored on app database i.e not on Firebase's servers
  const dbUser = data?.dbUser;

  return (
    <div className="md:p-8 md:h-full md:pr-0">
      <Logo />

      <nav className="hidden w-full max-w-[11.875rem] h-[calc(100%-7.9rem)] mt-8 text-sm md:flex md:flex-col py-9 ">
        <ul className="px-4 space-y-4 overflow-auto">
          {sidebarLinks.map(({ link, text, className }) => (
            <li key={link} className="relative">
              <SidebarLink link={link} text={text} className={className} />
            </li>
          ))}
        </ul>

        {user ? <ProfileMenu dbUser={dbUser} /> : <SidebarAuthLinks />}
      </nav>
    </div>
  );
};
