/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Heatmap from '@/components/stats/Heatmap';
import TablePersonal from '@/components/stats/TablePersonal';

import { useUser } from '@/utils/useUser';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function HomePage() {
  const router = useRouter();
  const { updateProfile, profile } = useUser();
  const { id } = router.query;
  const { data } = useSWR(`/api/player/${id}`, fetcher);
  const { data: stats } = useSWR(`/api/player/stats/${id}`, fetcher);
  const { data: stats2 } = useSWR(`/api/player/stats/duo/${id}`, fetcher);
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
                        data?.player.avatar_url ??
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
                <h3 className='mt-6 text-center'>@{data?.player.username}</h3>
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
                    <ul className='grid grid-cols-2 gap-12 mx-auto mt-12 md:grid-cols-5'>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats?.stats.played}
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>
                              Solo Games Played
                            </h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.1s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/raised-fist_270a.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats?.stats.schnickeln}
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>
                              Rock, paper & scissors
                            </h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.2s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/goal-net_1f945.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>{stats?.stats.won}</h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Games Won</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.3s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/fire_1f525.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats?.stats.winrate}%
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Winrate</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.4s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/beer-mug_1f37a.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats?.stats.drunk} l
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Beer drunk</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                    </ul>
                  ) : (
                    <ul className='grid grid-cols-2 gap-12 mx-auto mt-12 md:grid-cols-5'>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats2?.stats?.played}
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>
                              Duo Games Played
                            </h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.1s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/raised-fist_270a.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats2?.stats?.draws}
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Draws</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.2s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/goal-net_1f945.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats2?.stats?.wins}
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Games Won</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.3s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/fire_1f525.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats2?.stats?.winrate}%
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Winrate</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                      <ScrollAnimation
                        animateIn='fade-in slide-in-bottom'
                        style={{ animationDelay: '0.4s', opacity: 0 }}
                      >
                        <li className='px-8 text-lg'>
                          <div className='flex justify-center mb-4'>
                            <Image
                              height={48}
                              width={48}
                              alt=''
                              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/beer-mug_1f37a.png'
                              className='mx-auto w-12'
                            />
                          </div>
                          <div>
                            <h3 className='text-center'>
                              {stats2?.stats?.beerdrunk} l
                            </h3>
                          </div>
                          <div>
                            <h5 className='mx-auto text-center'>Beer drunk</h5>
                          </div>
                        </li>
                      </ScrollAnimation>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#cdf9ec' }}
              >
                <TablePersonal id={String(id)} />
              </div>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mt-24'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#FFEEA8' }}
              >
                <Heatmap />
              </div>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mt-24'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#D6E9FF' }}
              >
                <Heatmap />
              </div>
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
