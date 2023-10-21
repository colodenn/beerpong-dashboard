/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from 'react';
import { BiBeer } from 'react-icons/bi';
import useSWR from 'swr';
import { PlayerStats } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { User } from './User';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

const emptyMessage = () => {
  return (
    <tr>
      <td colSpan={100} className='p-[200px] w-full'>
        <div className='flex flex-col justify-center items-center'>
          <BiBeer className='w-20 h-20' />
          <h3 className='mt-4'>So much empty ...</h3>
          <p className='mt-1 text-gray-400'>
            No player found for your search input.
          </p>
        </div>
      </td>
    </tr>
  );
};

export default function Table(props: { search?: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data } = useSWR('/api/players/stats/' + season, fetcher);
  const { data: elo } = useSWR('/api/players/elo/' + season, fetcher);
  const king = elo?.['players']?.[0]?.['player_name'];

  // append elo to player stats
  //TODO: vll bissel sketchy, man könnte auch die player_stats_function anpassen damit die direkt joined, aber wollte erstmal nicht so viel ändern
  if (data && elo) {
    data.players.forEach((player: any) => {
      const playerElo = elo.players.find(
        (e: any) => e.player_name === player.player
      );
      player.elo = playerElo?.elo;
    });
  }

  // sort data by elo descending
  //TODO: wäre nice wenn wir en table benutzen würden das selber sortieren kann
  if (data) {
    data.players.sort((a: any, b: any) => {
      return b.elo - a.elo;
    });
  }

  const filterBySearch = (input: string): boolean => {
    if (props.search) {
      return input.toLowerCase().includes(props.search.toLowerCase());
    }

    return true;
  };

  return (
    <>
      <div className='overflow-x-auto right-4'>
        <table className='table overflow-y-scroll w-full bg-white rounded-lg'>
          <thead className='bg-white'>
            <tr className='bg-white'>
              <th className='sticky top-0 z-10 bg-white'>Player</th>
              <td className='sticky top-0 z-10 bg-white'>Elo</td>
              <td className='sticky top-0 z-10 bg-white'>Games Won</td>
              <td className='sticky top-0 z-10 bg-white'>Played</td>
              <td className='sticky top-0 z-10 bg-white'>Schnickeln</td>
              <td className='sticky top-0 z-10 bg-white'>Draws</td>
              <td className='sticky top-0 z-10 bg-white'>Winrate</td>
              <td className='sticky top-0 z-10 bg-white'>Drunk</td>
              <td className='sticky top-0 z-10 bg-white'>
                Cup Difference Overall
              </td>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.players.map((e: any, i: Key | null | undefined) => {
                return (
                  <tr
                    key={i}
                    className={filterBySearch(e.player) ? '' : 'hidden'}
                  >
                    <td>
                      <User
                        username={e.player}
                        avatar_url={e.avatar_url}
                        king={king == e.player}
                      />
                    </td>
                    <td>
                      <div className='font-bold'>{e.elo}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.wins}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.played}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.schnickelwins}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.draws}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.winrate} %</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.beerdrunk} l</div>
                    </td>
                    <td>
                      <div className='font-bold'>
                        {e.cup_difference_overall}
                      </div>
                    </td>
                  </tr>
                );
              })}
            {data &&
              (data.players.length === 0 ||
                data.players.filter((player: PlayerStats) => {
                  return filterBySearch(player.player);
                }).length === 0) &&
              emptyMessage()}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Player</th>
              <td className='bg-white'>Elo</td>
              <td className='bg-white'>Games Won</td>
              <td className='bg-white'>Played</td>
              <td className='bg-white'>Schnickeln</td>
              <td className='bg-white'>Draws</td>
              <td className='bg-white'>Winrate</td>
              <td className='bg-white'>Drunk</td>
              <td className='bg-white'>Cup Difference Overall</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
