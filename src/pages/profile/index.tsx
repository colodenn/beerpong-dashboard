import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const [avatar] = useState('');
  function updateUser() {
    updateProfile(username, avatar);
  }
  const router = useRouter();
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
                    height={240}
                    width={240}
                    alt=''
                    className='mx-auto rounded-full'
                    src={profile.avatar_url}
                  />
                  <h3 className='mt-6 text-center'>@{profile.username}</h3>
                </>
              ) : (
                <div>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Username</span>
                    </label>
                    <input
                      placeholder='username'
                      className='input input-bordered'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <button
                    className='btn btn-primary mt-4'
                    onClick={() => {
                      updateUser();
                      router.push('/');
                    }}
                  >
                    Set username
                  </button>
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
