/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { Key } from 'react';
import useSWR from 'swr';
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
                      <Link href={`/player/${e.player}`} passHref={true}>
                        <div className='flex items-center space-x-3 cursor-pointer'>
                          <div className='flex items-center'>
                            <div className='avatar'>
                              <div className='mask mask-squircle w-12 h-12'>
                                <Image
                                  height={55}
                                  width={55}
                                  src={e.avatar_url}
                                  alt='Avatar Tailwind CSS Component'
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>{e.player}</div>
                          </div>
                        </div>
                      </Link>
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
