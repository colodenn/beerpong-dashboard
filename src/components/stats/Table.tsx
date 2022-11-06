import React, { Key, useState } from 'react';
import useSWR from 'swr';
import { SoloGame } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { TableWrapper } from './TableWrapper';
import { Team } from './Team';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table() {
  const [season] = useLocalStorageState('SS 22');
  const { data } = useSWR('/api/solos/' + season, fetcher);
  let [lastDate] = useState(new Date());
  function setLastDate(date: Date) {
    date.getHours() < 8
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
    <div className='overflow-x-auto right-4 h-96 lg:h-[36rem]'>
      <TableWrapper columns={['Winner', 'Loser', 'Score']}>
        {data &&
          data?.games?.map((e: SoloGame, i: Key) => {
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
                <tr>
                  <td>
                    <Team player_1={player_left} />
                  </td>
                  <td>
                    <Team player_1={player_right} />
                  </td>
                  <td>{e.cupsleft}</td>
                </tr>
              </React.Fragment>
            );
          })}
      </TableWrapper>
    </div>
  );
}
