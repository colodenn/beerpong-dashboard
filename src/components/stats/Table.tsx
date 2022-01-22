import { Key } from 'react';
import useSWR from 'swr';
import { SoloGame } from 'types';

import { Team } from './Team';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table() {
  const { data } = useSWR('/api/solos', fetcher);

  return (
    <div className='overflow-x-auto right-4 h-96 lg:h-[36rem]'>
      <table className='table overflow-y-scroll w-full h-96 bg-white rounded-lg'>
        <thead className='bg-white'>
          <tr className='bg-white'>
            <th className='bg-white'>Winner</th>
            <th className='bg-white'>Loser</th>
            <th className='bg-white'>Score</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.games.map((e: SoloGame, i: Key | null | undefined) => {
              const player_left =
                e.winner == e.player1.username ? e.player1 : e.player2;
              const player_right =
                e.winner == e.player1.username ? e.player2 : e.player1;
              return (
                <tr key={i} className=''>
                  <td>
                    <Team player_1={player_left} />
                  </td>
                  <td>
                    <Team player_1={player_right} />
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
  );
}
