import { Key } from 'react';
import useSWR from 'swr';
import { TeamGame } from 'types';

import { Team } from './Team';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function TableTeam() {
  const { data } = useSWR('/api/teams', fetcher);

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
            data?.games.map((e: TeamGame, i: Key | null | undefined) => {
              let player_left_1;
              let player_left_2;
              let player_right_1;
              let player_right_2;
              if (e.winner1 == e.team1_player1.username) {
                player_left_1 = e.team1_player1;
                player_left_2 = e.team1_player2;
                player_right_1 = e.team2_player1;
                player_right_2 = e.team2_player2;
              } else {
                player_left_1 = e.team2_player1;
                player_left_2 = e.team2_player2;
                player_right_1 = e.team1_player1;
                player_right_2 = e.team1_player2;
              }
              return (
                <tr key={i} className=''>
                  <td>
                    <Team player_1={player_left_1} player_2={player_left_2} />
                  </td>
                  <td>
                    <Team player_1={player_right_1} player_2={player_right_2} />
                  </td>

                  <td className=''>{e.cupsleft}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th className='bg-white'>Team 1</th>
            <th className='bg-white'>Team 2</th>
            <th className='bg-white'>Score</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
