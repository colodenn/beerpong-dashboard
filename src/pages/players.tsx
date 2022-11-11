import * as React from 'react';
import { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TableAllPlayers from '@/components/stats/TableAllPlayers';

import { fetcher } from '@/utils/fetch';
export default function HomePage() {
  const [search, setSearch] = useState('');
  const { data, error } = useSWR('api/searchSuggestions', fetcher, {
    refreshInterval: 30000,
    refreshWhenHidden: true,
    fallback: {
      searchTerm: 'player',
    },
  });

  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-32 mb-24'>
          <div className='flex flex-col justify-center items-center p-8 mb-4 md:mb-6 md:ml-0'>
            <form
              onSubmit={(e) => e.preventDefault()}
              className='w-full max-w-xl drop-shadow-md'
            >
              <div className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-0 bottom-0 left-3 my-auto w-6 h-6 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='black'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                <input
                  type='text'
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    'Search for a ' +
                    (!data || error ? 'player' : data.searchTerm)
                  }
                  className='selected: p-4 py-5 pr-4 pl-12 w-full text-xl text-black bg-white rounded-md border-2 border-transparent shadow-none focus:outline-0 focus:bg-white focus:border-black focus:ring-0'
                />
              </div>
            </form>
          </div>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <div
              className='bg-[#cdf9ec] py-4 rounded-lg shadow-lg md:p-8'
              style={{ backgroundColor: '#cdf9ec' }}
            >
              <div className='flex justify-start mb-4 ml-6 md:mb-6 md:ml-0'>
                <h1>Player</h1>
              </div>
              <TableAllPlayers search={search} />
            </div>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
