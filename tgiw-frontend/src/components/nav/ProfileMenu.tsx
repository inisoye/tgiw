import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

import { Avatar } from './Avatar';
import type { DbUser } from '@/types';

interface ProfileMenuProps {
  dbUser: DbUser | undefined;
}

const ProfileMenu: React.FunctionComponent<ProfileMenuProps> = ({ dbUser }) => {
  return (
    <div className="w-full px-4 mt-auto">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger className="flex items-center w-full px-4 py-2 space-x-4 text-left transition duration-500 ease-in-out bg-gray-200 rounded-md mt-36 active:scale-90 bg-opacity-40 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ">
          <Avatar dbUser={dbUser} />

          <span className="w-[calc(100%_-_3rem)] inline-block truncate text-gray-800 text-opacity-90">
            {dbUser?.userName}
          </span>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content className="bg-gray-100 w-[9.625rem] -translate-y-2 rounded-md">
          <DropdownMenuPrimitive.Item className="w-full px-4 py-2 text-sm text-gray-800 rounded-md cursor-pointer text-opacity-90 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
            <Link href="/edit-profile">
              <a className="inline-block w-full h-full">Edit Profile</a>
            </Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item className="w-full px-4 py-2 text-sm text-gray-800 rounded-md cursor-pointer text-opacity-90 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
            Log Out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default ProfileMenu;
