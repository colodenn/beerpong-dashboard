/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
// import Link from 'next/link';
import { Key, useState } from 'react';
import useSWR from 'swr';

import { Team } from './Team';

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
              <th className='bg-white'>Winner</th>
              <th className='bg-white'>Loser</th>
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
                const player_left =
                  e.winner == e.player1.username ? e.player1 : e.player2;
                const player_right =
                  e.winner == e.player1.username ? e.player2 : e.player1;
                return (
                  <>
                    {additionalHTML}
                    <tr key={i} className=''>
                      <td>
                        <Team player_1={player_left} />
                      </td>
                      <td>
                        <Team player_1={player_right} />
                      </td>
                      <td className=''>{e.cupsleft}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th className='bg-white'>Winner</th>
              <th className='bg-white'>Loser</th>
              <th className='bg-white'>Score</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
