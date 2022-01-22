import Link from 'next/link';
import { Player } from 'types';

import { User } from './User';

export function Team({
  player_1,
  player_2,
}: {
  player_1: Player;
  player_2?: Player | undefined;
}) {
  return (
    <Link href={`/player/${player_1.username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className='flex w-44'>
          <User username={player_1.username} avatar_url={player_1.avatar_url} />
        </div>

        {player_2 != undefined && (
          <User username={player_2.username} avatar_url={player_2.avatar_url} />
        )}
      </div>
    </Link>
  );
}
