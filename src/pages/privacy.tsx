import Image from 'next/image';
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
                <h3 className='text-5xl'>Datenschutz</h3>

                <p className='mt-8 md:text-2xl 2xl:w-2/3'>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                  persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der
                  gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklärung.
                  <br />
                  <br />
                  Wenn Sie diese Website benutzen, werden verschiedene
                  personenbezogene Daten erhoben. Personenbezogene Daten sind
                  Daten, mit denen Sie persönlich identifiziert werden können.
                  Die vorliegende Datenschutzerklärung erläutert, welche Daten
                  wir erheben und wofür wir sie nutzen.
                  <br />
                  <br />
                  Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                  Wir weisen darauf hin, dass die Datenübertragung im Internet
                  (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken
                  aufweisen kann. Ein lückenloser Schutz der Daten vor dem
                  Zugriff durch Dritte ist nicht möglich.
                </p>
                <div className='mt-12'>
                  <Image
                    width={500}
                    height={500}
                    alt=''
                    className='mt-24'
                    src='https://media3.giphy.com/media/1N3zxEgVuLeJ9OzOSf/giphy.gif'
                  />
                </div>
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
