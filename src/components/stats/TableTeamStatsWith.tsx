/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from 'next/image';
// import Link from 'next/link';
import { Key } from 'react';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { TableWrapper } from './TableWrapper';
import { User } from './User';

const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Table(props: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data } = useSWR(
    `/api/player/stats/duo/with/${props.id}/${season}`,
    fetcher
  );
  const front: any = [];
  const back: any = [];
  data?.stats?.map((e: any) => {
    if (e.played < 5) {
      back.push(e);
    } else {
      front.push(e);
    }
  });
  const stats = front.concat(back);
  const { data: players } = useSWR('/api/players/stats/' + season, fetcher);

  const king = players['players'][0]['player'];
  return (
    <>
      <div className='overflow-x-auto h-96'>
        <TableWrapper
          columns={['Teammate', 'Winrate', 'Played', 'Draws', 'Beerdrunk']}
        >
          {data &&
            stats.map((e: any, i: Key | null | undefined) => {
              return (
                <>
                  <tr key={i}>
                    <td>
                      <User
                        username={e.player}
                        avatar_url={e.avatar_url}
                        king={king == e.player}
                      />
                    </td>
                    <td>
                      <div className='font-bold'>{e.winrate} %</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.played}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.draws}</div>
                    </td>
                    <td>
                      <div className='font-bold'>{e.beerdrunk} l</div>
                    </td>
                  </tr>
                </>
              );
            })}
        </TableWrapper>
      </div>
    </>
  );
}
