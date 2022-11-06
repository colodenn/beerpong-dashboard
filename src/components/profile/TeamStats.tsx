/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { Stat } from './Stat';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export function TeamStats({ id }: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data: stats2 } = useSWR(
    `/api/player/stats/duo/${id}/${season}`,
    fetcher
  );
  const errorString = '0';

  return (
    <ul className='grid grid-cols-2 gap-12 mx-auto mt-12 md:grid-cols-5'>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0s', opacity: 0 }}
      >
        <Stat
          text={'Duo Games Played'}
          stats={stats2?.stats?.played ? stats2.stats.played : errorString}
          imageUrl={'/images/icons/crown.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <Stat
          text={'Draws'}
          stats={stats2?.stats?.draws ? stats2.stats.draws : errorString}
          imageUrl={'/images/icons/fist.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.2s', opacity: 0 }}
      >
        <Stat
          text={'Games Won'}
          stats={stats2?.stats?.wins ? stats2.stats.wins : errorString}
          imageUrl={'/images/icons/goal.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <Stat
          text={'Winrate'}
          stats={`${
            stats2?.stats?.winrate ? stats2.stats.winrate : errorString
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
            stats2?.stats?.beerdrunk ? stats2.stats.beerdrunk : errorString
          } l`}
          imageUrl={'/images/icons/beer.png'}
        />
      </ScrollAnimation>
    </ul>
  );
}
