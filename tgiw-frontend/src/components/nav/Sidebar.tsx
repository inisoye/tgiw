import * as React from 'react';

import { Logo } from '../elements';
import { SidebarLink } from './SidebarLink';
import { useAuth } from '@/lib/Authentication';
import { useUser } from '@/features/auth';
import ProfileMenu from './ProfileMenu';
import { SidebarAuthLinks } from './SidebarAuthLinks';

interface SidebarProps {}

const sidebarLinks = [
  { link: '/songs', text: 'Songs' },
  { link: '/genres', text: 'Genres' },
  { link: '/artists', text: 'Artists' },
  { link: '/genre-finder', text: 'Genre Finder' },
  { link: '/about', text: 'About TGIW', className: 'mt-10' },
];

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { user } = useAuth();
  const { data } = useUser(user?.uid);

  // dbUser refers to data for user stored on app database i.e not on Firebase's servers
  const dbUser = data?.dbUser;

  return (
    <div className="md:p-8 md:h-full md:pr-0">
      <Logo />

      <nav className="hidden w-full max-w-[11.875rem] h-[calc(100%-7.9rem)] mt-8 text-sm  overflow-auto md:flex md:flex-col py-9 ">
        <ul className="px-4 space-y-2">
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
