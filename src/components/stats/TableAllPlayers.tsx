/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from 'react';
import useSWR from 'swr';

import { User } from './User';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table() {
  const { data } = useSWR('/api/players/stats', fetcher);
  return (
    <>
      <div className='overflow-x-auto right-4'>
        <table className='table overflow-y-scroll w-full bg-white rounded-lg'>
          <thead className='bg-white'>
            <tr className='bg-white'>
              <th className='bg-white'>Player</th>
              <td className='bg-white'>Games Won</td>
              <td className='bg-white'>Played</td>
              <td className='bg-white'>Schnickeln</td>
              <td className='bg-white'>Draws</td>
              <td className='bg-white'>Winrate</td>
              <td className='bg-white'>Drunk</td>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.players?.map((e: any, i: Key | null | undefined) => {
                return (
                  <tr key={i} className=''>
                    <td>
                      <User username={e.player} avatar_url={e.avatar_url} />
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
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Player</th>
              <td className='bg-white'>Games Won</td>
              <td className='bg-white'>Played</td>
              <td className='bg-white'>Schnickeln</td>
              <td className='bg-white'>Draws</td>
              <td className='bg-white'>Winrate</td>
              <td className='bg-white'>Drunk</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
