import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { getInitials } from '@/utils';
import type { DbUser } from '@/types';

interface AvatarProps {
  dbUser: DbUser | undefined;
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({ dbUser }) => {
  return (
    <AvatarPrimitive.Root
      aria-hidden
      className="inline-flex items-center justify-center text-sm text-white bg-teal-600 rounded-full w-7 h-7"
    >
      <AvatarPrimitive.Fallback>
        {!!dbUser && getInitials(dbUser?.userName)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
