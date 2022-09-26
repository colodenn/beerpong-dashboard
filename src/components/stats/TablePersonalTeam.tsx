/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import useSWR from 'swr';

import { Team } from './Team';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table(props: { id: string }) {
  const { data } = useSWR(`/api/player/games/duo/${props.id}`, fetcher);
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
              <th className='bg-white'>Winner</th>
              <th className='bg-white'>Loser</th>
              <th className='bg-white'>Score</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.games.map((e: any, i: any) => {
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
                  <>
                    <>{additionalHTML}</>
                    <tr key={i} className=''>
                      <td>
                        <Team
                          player_1={player_left_1}
                          player_2={player_left_2}
                        />
                      </td>
                      <td>
                        <Team
                          player_1={player_right_1}
                          player_2={player_right_2}
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
