/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

import Background from '@/components/charts/Background';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import { SoloStats } from '@/components/profile/SoloStats';
import { TeamStats } from '@/components/profile/TeamStats';
import Seo from '@/components/Seo';
import TablePersonal from '@/components/stats/TablePersonal';
import TablePersonalTeam from '@/components/stats/TablePersonalTeam';

import { useUser } from '@/utils/useUser';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function HomePage() {
  const router = useRouter();
  const { updateProfile, profile } = useUser();
  const { id } = router.query;
  const { data } = useSWR(`/api/player/${id}`, fetcher);
  const [editAvatar, setAvatarName] = useState(data?.player?.avatar_url);
  const [avatarToggle, setAvatarToggle] = useState(true);
  const [solos, setSolos] = useState('Solos');
  React.useEffect(() => {
    setAvatarName(data?.player?.avatar_url);
  }, [data]);
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <div className='flex justify-center'>
            <div>
              <div className='flex justify-center mx-auto rounded-full'>
                <div className='flex ml-4'>
                  {avatarToggle ? (
                    <Image
                      height={250}
                      width={250}
                      alt=''
                      className='mx-auto rounded-full'
                      src={
                        data?.player?.avatar_url ??
                        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                      }
                    />
                  ) : (
                    <div className='form-control'>
                      <input
                        type='text'
                        value={editAvatar}
                        onChange={(e) => setAvatarName(e.target.value)}
                        className='input input-bordered'
                      />
                    </div>
                  )}

                  {avatarToggle ? (
                    <>
                      {id == profile?.username ? (
                        <div
                          className=''
                          onClick={() => {
                            setAvatarToggle(!avatarToggle);
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                            />
                          </svg>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div
                      className=''
                      onClick={() => {
                        setAvatarToggle(!avatarToggle);

                        updateProfile(data?.player.username, editAvatar);
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <h3 className='mt-6 text-center'>@{data?.player?.username}</h3>
              </div>
              <div className=''>
                <div className='flex justify-center mt-8 md:justify-end'>
                  <select
                    value={solos}
                    onChange={(e) => setSolos(e.target.value)}
                    className='select select-bordered w-24'
                  >
                    <option value='Solos'>Solos</option>
                    <option value='Duos'>Duos</option>
                  </select>
                </div>

                <div className='flex justify-center mx-auto'>
                  {solos == 'Solos' ? (
                    <SoloStats id={String(id)} />
                  ) : (
                    <TeamStats id={String(id)} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              <Background title='Solo Games' colour='#cdf9ec'>
                <TablePersonal id={String(id)} />
              </Background>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              <Background title='Team Games' colour='#cdf9ec'>
                <TablePersonalTeam id={String(id)} />
              </Background>
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
