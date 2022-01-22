/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from 'react';
import useSWR from 'swr';

import { Player } from './Player';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table() {
  const { data } = useSWR('/api/solos', fetcher);

  return (
    <>
      <div className='overflow-x-auto right-4 h-96'>
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
                return (
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
