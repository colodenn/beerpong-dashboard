/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export function SoloStats({ id }: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data: stats } = useSWR(`/api/player/stats/${id}/${season}`, fetcher);
  const errorString = '0';

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
            <h3 className='text-center'>
              {stats?.stats?.played ? stats.stats.played : errorString}
            </h3>
          </div>
          <div>
            <h5 className='mx-auto text-center'>Solo Games Played</h5>
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
            <h3 className='text-center'>
              {stats?.stats?.schnickelwins
                ? stats.stats.schnickelwins
                : errorString}
            </h3>
          </div>
          <div>
            <h5 className='mx-auto text-center'>Rock, paper & scissors</h5>
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
            <h3 className='text-center'>
              {stats?.stats?.wins ? stats.stats.wins : errorString}
            </h3>
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
            <h3 className='text-center'>
              {stats?.stats?.winrate ? stats.stats.winrate : errorString}%
            </h3>
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
            <h3 className='text-center'>
              {stats?.stats?.beerdrunk ? stats.stats.beerdrunk : errorString} l
            </h3>
          </div>
          <div>
            <h5 className='mx-auto text-center'>Beer drunk</h5>
          </div>
        </li>
      </ScrollAnimation>
    </ul>
  );
}
