import * as React from 'react';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '@/components/layout';
import { useAuth } from '@/lib/Authentication';

export const withAuth = (Page: NextPageWithLayout) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();

    React.useEffect(() => {
      if (!user) {
        router.replace('/log-in');
      }
    }, [user, router]);

    return <Page {...props} />;
  };

  if (Page.getInitialProps) {
    AuthComponent.getInitialProps = Page.getInitialProps;
  }

  if (Page.getLayout) {
    AuthComponent.getLayout = Page.getLayout;
  }

  return AuthComponent;
};
