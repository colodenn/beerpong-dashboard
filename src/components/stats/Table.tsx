/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState } from 'react';
import useSWR from 'swr';

import { Player } from './Player';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table() {
  const { data } = useSWR('/api/solos', fetcher);
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
      <div className='overflow-x-auto right-4 h-96 lg:h-[36rem]'>
        <table className='table overflow-y-scroll w-full h-96 bg-white rounded-lg'>
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
                        <Player
                          username={e.player1.username}
                          winner={e.winner}
                          avatar_url={e.player1.avatar_url}
                        />
                      </td>
                      <td>
                        <Player
                          username={e.player2.username}
                          winner={e.winner}
                          avatar_url={e.player2.avatar_url}
                        />
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
