import * as React from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

import { firebaseAuth, axios } from '@/config';
import { getStoredUser, setAxiosAccessToken } from '@/utils';
import type { StoredUser } from '@/types';

type LogIn = (email: string, password: string) => Promise<User | undefined>;

type SignUp = (
  email: string,
  password: string,
  userName: string
) => Promise<User | undefined>;

type LogOut = () => Promise<void>;

interface State {
  user: User | StoredUser | null;
  logIn: LogIn;
  signUp: SignUp;
  logOut: LogOut;
  isUserLoading: Boolean;
}

const AuthContext = React.createContext<Partial<State>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | StoredUser | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState<Boolean>(true);

  // Fetch locally stored user from IndexDB before remote Firebase verification
  // Prevents the immediate trigger of unauthenticated requests
  React.useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      setIsUserLoading(false);
    };

    fetchUser();
  }, []);

  // Add the access token to the Axios instance everytime the user object change
  React.useEffect(() => {
    setAxiosAccessToken(user, axios);
  }, [user]);

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userName: string
  ): Promise<User | undefined> => {
    try {
      return await axios.post('/auth/users', { email, password, userName });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      return await signOut(firebaseAuth);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        setIsUserLoading(false);
        setAxiosAccessToken(user, axios);
      } else {
        setUser(null);
        setIsUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, logIn, signUp, logOut, isUserLoading }}
    >
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
