/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
// import Link from 'next/link';
import React, { Key, useState } from 'react';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { Team } from './Team';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table(props: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data } = useSWR(`/api/player/games/${props.id}/${season}`, fetcher);
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
              <th className='sticky top-0 z-10 bg-white'>Winner</th>
              <th className='sticky top-0 z-10 bg-white'>Loser</th>
              <th className='sticky top-0 z-10 bg-white'>Score</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.games?.map((e: any, i: Key | null | undefined) => {
                const currentDate = new Date(e.timestamp);
                let additionalHTML = <></>;
                if (currentDate < lastDate) {
                  setLastDate(currentDate);
                  additionalHTML = (
                    <tr>
                      <td>
                        <h4 className='ml-6'>{lastDate.toDateString()}</h4>
                      </td>
                    </tr>
                  );
                }
                const player_left =
                  e.winner == e.player1.username ? e.player1 : e.player2;
                const player_right =
                  e.winner == e.player1.username ? e.player2 : e.player1;
                return (
                  <React.Fragment key={i}>
                    {additionalHTML}
                    <tr className=''>
                      <td>
                        <Team player_1={player_left} />
                      </td>
                      <td>
                        <Team player_1={player_right} />
                      </td>
                      <td className=''>{e.cupsleft}</td>
                    </tr>
                  </React.Fragment>
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
