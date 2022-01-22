/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export function TeamStats({ id }: { id: string }) {
  const { data: stats2 } = useSWR(`/api/player/stats/duo/${id}`, fetcher);

  return (
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
            <h3 className='text-center'>{stats2?.stats?.played}</h3>
          </div>
          <div>
            <h5 className='mx-auto text-center'>Duo Games Played</h5>
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
            <h3 className='text-center'>{stats2?.stats?.draws}</h3>
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
            <h3 className='text-center'>{stats2?.stats?.wins}</h3>
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
            <h3 className='text-center'>{stats2?.stats?.winrate}%</h3>
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
            <h3 className='text-center'>{stats2?.stats?.beerdrunk} l</h3>
          </div>
          <div>
            <h5 className='mx-auto text-center'>Beer drunk</h5>
          </div>
        </li>
      </ScrollAnimation>
    </ul>
  );
}
