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
              <td>Games Won</td>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.players.map((e: any, i: Key | null | undefined) => {
                return (
                  <tr key={i} className=''>
                    <td>
                      <Link
                        href={`/player/${e.winner.username}`}
                        passHref={true}
                      >
                        <div className='flex items-center space-x-3 cursor-pointer'>
                          <div className='flex items-center'>
                            <div className='flex items-center mr-2 w-12 h-12'>
                              {e.winner == e.winner.username && (
                                <Image
                                  alt=''
                                  className='mx-auto my-auto mr-2'
                                  height={25}
                                  width={25}
                                  src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                                />
                              )}
                            </div>
                            <div className='avatar'>
                              <div className='mask mask-squircle w-12 h-12'>
                                <Image
                                  height={55}
                                  width={55}
                                  src={e.winner.avatar_url}
                                  alt='Avatar Tailwind CSS Component'
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>{e.winner.username}</div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td>
                      <div className='font-bold'>{e.count}</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Player</th>
              <td>Games Won</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
