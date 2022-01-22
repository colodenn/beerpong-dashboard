/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { Key, useState } from 'react';
import useSWR from 'swr';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table(props: { id: string }) {
  const { data } = useSWR(`/api/player/games/${props.id}`, fetcher);
  let [lastDate] = useState(new Date());
  function setLastDate(date: Date) {
    date.getUTCHours() < 8
      ? date.setDate(date.getDate() - 1)
      : date.setDate(date.getDate());
    lastDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      8,
      0,
      0
    );
  }

  return (
    <>
      <div className='overflow-x-auto h-96'>
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
                const currentDate = new Date(e.timestamp);
                let additionalHTML = <></>;
                if (currentDate < lastDate) {
                  setLastDate(currentDate);
                  additionalHTML = (
                    <tr className='border-[#202a38] border-t-2 border-solid'>
                      <td>
                        <h4 className='ml-6 underline'>
                          {lastDate.toDateString()}
                        </h4>
                      </td>
                    </tr>
                  );
                }
                return (
                  <>
                    {additionalHTML}
                    <tr key={i} className=''>
                      <td>
                        <Link
                          href={`/player/${
                            e.player2.username == props.id
                              ? e.player1.username
                              : e.player2.username
                          }`}
                          passHref={true}
                        >
                          <div className='flex items-center space-x-3 cursor-pointer'>
                            <div className='flex items-center mr-2 w-12 h-12'>
                              {e.winner != props.id && (
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
                                  src={
                                    e.player2.username == props.id
                                      ? e.player1.avatar_url
                                      : e.player2.avatar_url
                                  }
                                  alt='Avatar Tailwind CSS Component'
                                />
                              </div>
                            </div>
                            <div>
                              <div className='font-bold'>
                                {e.player2.username == props.id
                                  ? e.player1.username
                                  : e.player2.username}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`/player/${
                            e.player1.username == props.id
                              ? props.id
                              : e.player2.username
                          }`}
                          passHref={true}
                        >
                          <div className='flex items-center space-x-3 cursor-pointer'>
                            <div className='flex items-center'>
                              <div className='flex items-center mr-2 w-12 h-12'>
                                {e.winner == props.id && (
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
                                    src={
                                      e.player1.username == props.id
                                        ? e.player1.avatar_url
                                        : e.player2.avatar_url
                                    }
                                    alt='Avatar Tailwind CSS Component'
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className='font-bold'>
                                {e.player1.username == props.id
                                  ? props.id
                                  : e.player2.username}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className=''>{e.cupsleft}</td>
                    </tr>
                  </>
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
