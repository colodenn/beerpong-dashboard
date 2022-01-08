/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUser, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/utils/client';

import { Subscription, UserDetails } from '../../types';
type UserContextInterface = {
  user: AuthUser | null;
  loginUser: (email: string) => Promise<any>;
  logoutUser: () => Promise<any> | void;
  setUser: (user: AuthUser) => void;
  session: Session | null;
  subscription: Subscription | null;
  profile: null | any;
  updateProfile: (username: string, avatar_url: string) => void;
};

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const getUserDetails = () =>
    supabase.from<UserDetails>('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from<Subscription>('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data);

          if (subscriptionPromise.status === 'fulfilled')
            setSubscription(subscriptionPromise.value.data);

          setUserLoaded(true);
        }
      );
    }
  }, [user]);
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    getProfile();
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  async function loginUser(email: string) {
    const { user, session, error } = await supabase.auth.signIn({ email });
    return { error, session, user };
  }

  async function updateProfile(username: any, avatar_url: any) {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        username: username,
        avatar_url: avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error?.message);
    }
  }

  async function getProfile() {
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`*`)
      .eq('id', user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      setProfile(data);
    }
  }

  async function logoutUser() {
    setUser(null);
    router.push('/');
    return await supabase.auth.signOut();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        setUser,
        session,
        subscription,
        profile,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
