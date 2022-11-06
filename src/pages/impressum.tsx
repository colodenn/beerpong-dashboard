import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />
        <main className='container mx-auto mt-48 mb-24'>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='container mx-auto mt-32 lg:px-28'>
              <div className='px-8 md:px-48'>
                <h3 className='text-5xl'>Impressum</h3>
                <h5 className='mt-8 text-2xl font-bold'>
                  Angaben gemäß § 5 TMG
                </h5>
                <ul className='mt-4 mb-8 text-xl'>
                  <li>Cornelius Denninger</li>
                  <li>Im Birkenfeld 9</li>
                  <li>66125 Dudweiler</li>
                </ul>
                <h3 className='mt-8 text-2xl'>Kontakt</h3>
                <ul className='mt-4 text-xl'>
                  <li>Telefon: +49 (0)176 82964396</li>
                  <li>Email: cornelius@codenn.de</li>
                  <li>
                    Webseite:{' '}
                    <Link passHref={true} href={'https://www.codenn.de/'}>
                      codenn.de
                    </Link>
                  </li>
                </ul>

                <Image
                  width={400}
                  height={400}
                  alt=''
                  className='mt-8'
                  src='https://media3.giphy.com/media/1N3zxEgVuLeJ9OzOSf/giphy.gif'
                />
              </div>
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
