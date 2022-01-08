import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useUser } from '@/utils/useUser';

export default function HomePage() {
  const { profile, updateProfile } = useUser();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  function updateUser() {
    updateProfile(username, avatar);
  }
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <div className='flex justify-center'>
            <div>
              {profile ? (
                <>
                  <Image
                    alt=''
                    className='mx-auto rounded-full'
                    src={profile.avatar_url}
                  />
                  <h3 className='mt-6 text-center'>@{profile.username}</h3>
                </>
              ) : (
                <div>
                  <input
                    placeholder='imgur.net/asf242'
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <input
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button onClick={() => updateUser()}>Update</button>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
