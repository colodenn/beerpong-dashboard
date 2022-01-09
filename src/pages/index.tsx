import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/stats/Table';
import TableTeam from '@/components/stats/Table_team';
export default function HomePage() {
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <div className='mb-48 lg:px-72'>
              <h1 className='flex justify-center items-center mx-auto text-center lg:text-8xl'>
                Season WS21/22{' '}
              </h1>
              <p className='mt-8 text-2xl text-center'>
                Beer pong, also known as Beirut, is a drinking game in which
                players throw a ping pong ball across a table with the intent of
                landing the ball in a cup of beer on the other end.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mb-24'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#cdf9ec' }}
              >
                <div className='flex justify-start mb-4 ml-6 md:mb-6 md:ml-0'>
                  <h1>Solo Table</h1>
                </div>
                <Table />
              </div>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mb-24'>
              <div
                className='py-4 rounded-lg shadow-lg md:p-8'
                style={{ backgroundColor: '#cdf9ec' }}
              >
                <div className='flex justify-start mb-4 ml-6 md:mb-6 md:ml-0'>
                  <h1>Team table</h1>
                </div>
                <TableTeam />
              </div>
            </section>
          </ScrollAnimation>

          {/* <div className='flex justify-center xl:text-9xl'>
            <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>l
          </div> */}
        </main>
        <Footer />
      </Layout>
    </>
  );
}
