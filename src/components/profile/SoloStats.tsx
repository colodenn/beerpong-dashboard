/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { Stat } from './Stat';

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
        <Stat
          text={'Solo Games Played'}
          stats={stats?.stats?.played ? stats.stats.played : errorString}
          imageUrl={'/images/icons/crown.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <Stat
          text={'Rock, paper & scissors'}
          stats={
            stats?.stats?.schnickelwins
              ? stats.stats.schnickelwins
              : errorString
          }
          imageUrl={'/images/icons/fist.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.2s', opacity: 0 }}
      >
        <Stat
          text={'Games Won'}
          stats={stats?.stats?.wins ? stats.stats.wins : errorString}
          imageUrl={'/images/icons/goal.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <Stat
          text={'Games Won'}
          stats={`${
            stats?.stats?.winrate ? stats.stats.winrate : errorString
          }%`}
          imageUrl={'/images/icons/fire.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.4s', opacity: 0 }}
      >
        <Stat
          text={'Beer drunk'}
          stats={`${
            stats?.stats?.beerdrunk ? stats.stats.beerdrunk : errorString
          } l`}
          imageUrl={'/images/icons/beer.png'}
        />
      </ScrollAnimation>
    </ul>
  );
}
