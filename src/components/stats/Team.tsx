import Image from 'next/image';
import Link from 'next/link';
import { Player } from 'types';

import { User } from './User';

export function Team({
  player_1,
  player_2,
  winner,
}: {
  player_1: Player;
  player_2?: Player | undefined;
  winner: boolean;
}) {
  return (
    <Link href={`/player/${player_1.username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className='flex justify-center items-center my-auto w-12 h-12'>
          {winner == true && (
            <Image
              alt=''
              className='mx-auto my-auto mr-2'
              height={25}
              width={25}
              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
            />
          )}
        </div>
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
