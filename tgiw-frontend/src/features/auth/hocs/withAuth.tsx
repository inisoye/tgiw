import * as React from 'react';
import { useRouter } from 'next/router';

import { NextPageWithLayout } from '@/components/layout';
import { useAuth } from '@/lib/authentication';

export const withAuth = (Page: NextPageWithLayout) => {
  const AuthComponent = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

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
