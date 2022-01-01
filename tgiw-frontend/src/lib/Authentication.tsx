import * as React from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

import { firebaseAuth, axios } from '@/config';

type LogIn = (email: string, password: string) => Promise<User | undefined>;

type SignUp = (
  email: string,
  password: string,
  userName: string
) => Promise<User | undefined>;

type LogOut = () => Promise<void>;

interface State {
  user: User | null;
  logIn: LogIn;
  signUp: SignUp;
  logOut: LogOut;
  isUserLoading: Boolean;
}

// Added to prevent compiler error when obtaining accessToken
interface UserWithAccessToken extends User {
  accessToken: string;
}

const AuthContext = React.createContext<Partial<State>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState<Boolean>(true);

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

        const userWithAccessToken = user as UserWithAccessToken;

        axios.defaults.headers.common = {
          Authorization: `Bearer ${userWithAccessToken.accessToken}`,
        };
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
    throw new Error('useAuth must be used within a CountProvider');
  }

  return context;
};
