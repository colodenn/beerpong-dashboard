/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import useSWR from 'swr';
import { Player } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { User } from './User';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export function Team({
  player_1,
  player_2,
}: {
  player_1: Player;
  player_2?: Player | undefined;
}) {
  const [season] = useLocalStorageState('SS 22');

  const { data: players } = useSWR('/api/players/stats/' + season, fetcher);

  const king = players?.['players']?.[0]?.['player'];

  return (
    <Link href={`/player/${player_1.username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className='flex w-44'>
          <User
            username={player_1.username}
            avatar_url={player_1.avatar_url}
            king={king == player_1.username}
          />
        </div>

        {player_2 != undefined && (
          <User
            username={player_2.username}
            avatar_url={player_2.avatar_url}
            king={king == player_2.username}
          />
        )}
      </div>
    </Link>
  );
}
