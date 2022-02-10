import * as React from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import nookies from 'nookies';

import { firebaseClient, getStoredUser } from './firebaseClient';
import { axios, setAxiosAccessToken } from './axios';
import type { StoredUser } from '@/types';

interface AuthState {
  user: User | StoredUser | null;
  userRole: string | null;
  isUserLoading: Boolean;
}

const AuthContext = React.createContext<Partial<AuthState>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | StoredUser | null>(null);
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState<Boolean>(true);

  // Fetch locally stored user from IndexDB before remote Firebase verification
  // Prevents the immediate trigger of unauthenticated requests
  React.useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getStoredUser();
      const storedToken = storedUser?.stsTokenManager.accessToken;

      setUser(storedUser);
      setAxiosAccessToken(storedToken, axios);
      nookies.set(undefined, 'token', storedToken, { path: '/' });
      setIsUserLoading(false);
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return onIdTokenChanged(firebaseClient, async (user) => {
      if (!user) {
        setUser(null);

        nookies.destroy(null, 'token');
        nookies.set(undefined, 'token', '', { path: '/' });
        setIsUserLoading(false);

        return;
      }

      setUser(user);
      const idToken = await user.getIdToken();
      const idTokenResult = await user.getIdTokenResult();

      setAxiosAccessToken(idToken, axios);
      nookies.destroy(null, 'token');
      nookies.set(undefined, 'token', idToken, { path: '/' });

      /**
       * Handle authorization with custom claims
       * https://firebase.google.com/docs/auth/admin/custom-claims#access_custom_claims_on_the_client
       * */
      setUserRole(idTokenResult.claims.role as string);

      setIsUserLoading(false);
    });
  }, []);

  React.useEffect(() => {
    const handleTokenRefresh = setInterval(async () => {
      const user = firebaseClient.currentUser;

      if (user) {
        const idToken = await user.getIdToken(true);
        setAxiosAccessToken(idToken, axios);
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(handleTokenRefresh);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, isUserLoading }}>
      {!isUserLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
