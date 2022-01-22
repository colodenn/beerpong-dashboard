import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Background from '@/components/charts/Background';
import Hero from '@/components/landing/Hero';
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
            <section className='mb-48 lg:px-72'>
              <Hero />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mb-24'>
              <Background colour='#cdf9ec' title='Solo table'>
                <Table />
              </Background>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mb-24'>
              <Background colour='#cdf9ec' title='Team table'>
                <TableTeam />
              </Background>
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
