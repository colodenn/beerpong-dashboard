/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
// import Link from 'next/link';
import { Key } from 'react';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { User } from './User';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table(props: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data } = useSWR(
    `/api/player/stats/against/${props.id}/${season}`,
    fetcher
  );
  const front: any = [];
  const back: any = [];
  data?.stats?.map((e: any) => {
    if (e.played < 5) {
      back.push(e);
    } else {
      front.push(e);
    }
  });
  const stats = front.concat(back);

  return (
    <>
      <div className='overflow-x-auto h-96'>
        <table className='table overflow-y-scroll w-full h-24 bg-white rounded-lg'>
          <thead className='bg-white'>
            <tr className='bg-white'>
              <th className='bg-white'>Opponent</th>
              <th className='bg-white'>Winrate</th>
              <th className='bg-white'>Played</th>
              <th className='bg-white'>Draws</th>
              <th className='bg-white'>Beerdrunk</th>
              <th className='bg-white'>Schnickel-Winrate</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              stats.map((e: any, i: Key | null | undefined) => {
                return (
                  <>
                    <tr key={i} className=''>
                      <td>
                        <User username={e.player} avatar_url={e.avatar_url} />
                      </td>
                      <td>
                        <div className='font-bold'>{e.winrate} %</div>
                      </td>
                      <td>
                        <div className='font-bold'>{e.played}</div>
                      </td>
                      <td>
                        <div className='font-bold'>{e.draws}</div>
                      </td>
                      <td>
                        <div className='font-bold'>{e.beerdrunk} l</div>
                      </td>
                      <td>
                        <div className='font-bold'>{e.schnickelwinrate} %</div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Opponent</th>
              <th className='bg-white'>Winrate</th>
              <th className='bg-white'>Played</th>
              <th className='bg-white'>Draws</th>
              <th className='bg-white'>Beerdrunk</th>
              <th className='bg-white'>Schnickel-Winrate</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}