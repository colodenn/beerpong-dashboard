import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TableAllPlayers from '@/components/stats/TableAllPlayers';
export default function HomePage() {
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <div
              className='py-4 rounded-lg shadow-lg md:p-8'
              style={{ backgroundColor: '#cdf9ec' }}
            >
              <div className='flex justify-start mb-4 ml-6 md:mb-6 md:ml-0'>
                <h1>Player</h1>
              </div>
              <TableAllPlayers />
            </div>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
