/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Heatmap from '@/components/stats/Heatmap';
import Table from '@/components/stats/Table';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function HomePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/player/${id}`, fetcher);
  const { data: stats } = useSWR(`/api/player/stats/${id}`, fetcher);
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
              </div>
              <h3 className='mt-6 text-center'>@{data?.player.username}</h3>
              <div className='flex justify-center mx-auto'>
                <ul className='grid grid-cols-2 gap-12 mx-auto mt-12 md:grid-cols-5'>
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
                      <h3 className='text-center'>{stats?.stats.played}</h3>
                    </div>
                    <div>
                      <h5 className='mx-auto text-center'>Solo Games Played</h5>
                    </div>
                  </li>
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
                      <h3 className='text-center'>{stats?.stats.schnickeln}</h3>
                    </div>
                    <div>
                      <h5 className='mx-auto text-center'>
                        Rock, paper & scissors
                      </h5>
                    </div>
                  </li>
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
                      <h3 className='text-center'>{stats?.stats.winrate}%</h3>
                    </div>
                    <div>
                      <h5 className='mx-auto text-center'>Winrate</h5>
                    </div>
                  </li>
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
                      <h3 className='text-center'>{stats?.stats.drunk} l</h3>
                    </div>
                    <div>
                      <h5 className='mx-auto text-center'>Beer drunk</h5>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#cdf9ec' }}
              >
                <Table />
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
