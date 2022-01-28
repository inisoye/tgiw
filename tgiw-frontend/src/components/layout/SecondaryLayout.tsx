import clsx from 'clsx';
import * as React from 'react';

import { SecondaryLogo } from '@/components/elements';
import { MobileNav } from '@/components/nav';

interface SecondaryLayoutProps {
  hasChildrenMargin?: boolean;
  hasCenteredLogo?: boolean;
}

export const SecondaryLayout: React.FunctionComponent<SecondaryLayoutProps> = ({
  children,
  hasChildrenMargin,
  hasCenteredLogo,
}) => {
  return (
    <div className="h-full min-h-screen bg-gray-900">
      <header>
        <SecondaryLogo isCentered={hasCenteredLogo} />
      </header>

      <MobileNav />

      <main
        className={clsx(
          'min-h-[calc(100vh-79px)]  bg-gray-900 pb-8 overflow-auto',
          {
            'px-8 md:px-14': hasChildrenMargin,
          }
        )}
      >
        <div
          className={clsx('min-h-full', {
            'md:mx-auto md:max-w-[1280px]': hasChildrenMargin,
          })}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
