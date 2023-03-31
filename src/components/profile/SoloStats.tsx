/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollAnimation from 'react-animate-on-scroll';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { Stat } from './Stat';
import { StatSwitcher } from './StatSwitcher';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export function SoloStats({ id }: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data: stats } = useSWR(`/api/player/stats/${id}/${season}`, fetcher);
  const { data: elo } = useSWR(
    `/api/player/stats/elo/${id}/${season}`,
    fetcher
  );
  const errorString = '0';

  return (
    <ul className='grid grid-cols-2 gap-12 mx-auto mt-12 md:grid-cols-7'>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0s', opacity: 0 }}
      >
        <Stat
          text={'Elo Score'}
          stats={elo?.stats?.elo ? elo.stats.elo : errorString}
          imageUrl={'/images/icons/chess.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <Stat
          text={'Solo Games Played'}
          stats={stats?.stats?.played ? stats.stats.played : errorString}
          imageUrl={'/images/icons/crown.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.2s', opacity: 0 }}
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
        style={{ animationDelay: '0.3s', opacity: 0 }}
      >
        <Stat
          text={'Games Won'}
          stats={stats?.stats?.wins ? stats.stats.wins : errorString}
          imageUrl={'/images/icons/goal.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.4s', opacity: 0 }}
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
        style={{ animationDelay: '0.5s', opacity: 0 }}
      >
        <Stat
          text={'Beer drunk'}
          stats={`${
            stats?.stats?.beerdrunk ? stats.stats.beerdrunk : errorString
          } l`}
          imageUrl={'/images/icons/beer.png'}
        />
      </ScrollAnimation>
      <ScrollAnimation
        animateIn='fade-in slide-in-bottom'
        style={{ animationDelay: '0.6s', opacity: 0 }}
      >
        <StatSwitcher
          stats={[
            {
              text: 'Cup Difference Win',
              stats: `${
                stats?.stats?.cup_difference_win
                  ? stats.stats.cup_difference_win
                  : errorString
              }`,
              imageUrl: '/images/icons/divide-green.png',
            },
            {
              text: 'Cup Difference Loss',
              stats: `${
                stats?.stats?.cup_difference_loss
                  ? stats.stats.cup_difference_loss
                  : errorString
              }`,
              imageUrl: '/images/icons/divide-red.png',
            },
            {
              text: 'Cup Difference Overall',
              stats: `${
                stats?.stats?.cup_difference_overall
                  ? stats.stats.cup_difference_overall
                  : errorString
              }`,
              imageUrl: '/images/icons/divide-gray.png',
            },
          ]}
        />
      </ScrollAnimation>
    </ul>
  );
}
