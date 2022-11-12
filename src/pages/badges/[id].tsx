/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { fetcher } from '@/utils/fetch';

export default function HomePage() {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useSWR(`/api/badges/${id}`, fetcher);
  return (
    <>
      <Layout>
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <Badge
            image_url={data?.badges[0].url}
            name={data?.badges[0].name}
            description={data?.badges[0].description}
          />
        </main>
        <Footer />
      </Layout>
    </>
  );
}

const Badge = (props: {
  image_url: string;
  name: string;
  description: string;
}) => {
  return !props.name ? (
    <>loading..</>
  ) : (
    <div className='flex'>
      <div className='relative'>
        <div>
          <Image
            src={props.image_url}
            height={250}
            width={250}
            objectFit='contain'
            alt={props.description}
          />
        </div>
        <div className='-z-10 absolute top-0 w-full h-full blur-2xl brightness-150'>
          <Image
            src={props.image_url}
            height={250}
            width={250}
            objectFit='contain'
            alt={props.description}
          />
        </div>
      </div>
      <div className='ml-8'>
        <h1 className='mb-4 text-4xl'>{props.name}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
};
