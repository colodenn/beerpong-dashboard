/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { Key } from 'react';
import useSWR from 'swr';

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function Table() {
  const { data } = useSWR('/api/solos', fetcher);

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table overflow-y-scroll w-full h-24 bg-white rounded-lg'>
          <thead className='bg-white'>
            <tr className='bg-white'>
              <th className='bg-white'>Player 1</th>
              <th className='bg-white'>Player 2</th>
              <th className='bg-white'>Score</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.games.map((e: any, i: Key | null | undefined) => {
                return (
                  <tr key={i} className=''>
                    <td>
                      <Link
                        href={`/player/${e.player1.username}`}
                        passHref={true}
                      >
                        <div className='flex items-center space-x-3 cursor-pointer'>
                          <div className='avatar'>
                            <div className='mask mask-squircle w-12 h-12'>
                              <Image
                                height={55}
                                width={55}
                                src={e.player1.avatar_url}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>
                              {e.player1.username}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/player/${e.player2.username}`}
                        passHref={true}
                      >
                        <div className='flex items-center space-x-3 cursor-pointer'>
                          <div className='avatar'>
                            <div className='mask mask-squircle w-12 h-12'>
                              <Image
                                height={55}
                                width={55}
                                src={e.player2.avatar_url}
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>
                              {e.player2.username}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className=''>{e.cupsleft}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Player 1</th>
              <th className='bg-white'>Player 2</th>
              <th className='bg-white'>Score</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
