/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { fetcher } from '@/utils/fetch';
export default function HomePage() {
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <section className='mx-auto mt-32'>
            <h1 className='text-5xl'>Badges</h1>
            <div>
              <Badges />
            </div>
          </section>

          {/* <div className='flex justify-center xl:text-9xl'>
            <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>l
          </div> */}
        </main>
        <Footer />
      </Layout>
    </>
  );
}

// Bad practice. Dont fetch in the component rather create Badge component and feed it with the data via props.
const Badges = () => {
  const { data: badges } = useSWR(`/api/badges`, fetcher);

  return !badges ? (
    <>Loading</>
  ) : (
    <div className='grid grid-cols-2 gap-6 mt-12 md:grid-cols-4 lg:grid-cols-6'>
      {badges?.badges.map((e: any, key: number) => (
        <div key={key} className='flex justify-start'>
          <ScrollAnimation
            animateIn='fade-in slide-in-bottom'
            style={{ animationDelay: 0 + key * 0.1 + 's', opacity: 0 }}
          >
            <div className=''>
              <div
                className='tooltip tooltip-top flex justify-center'
                data-tip={e.description}
              >
                <Image
                  height={140}
                  width={140}
                  alt={e.description}
                  src={e.url}
                  className='mx-auto'
                />
              </div>
              <h3 className='mt-1 text-lg font-semibold text-center'>
                {e.name}
              </h3>
            </div>
          </ScrollAnimation>
        </div>
      ))}
    </div>
  );
};
