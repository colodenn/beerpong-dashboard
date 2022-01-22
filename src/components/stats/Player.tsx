import Image from 'next/image';
import Link from 'next/link';

export function Player({
  username,
  winner,
  avatar_url,
}: {
  username: string;
  winner: string;
  avatar_url: string;
}) {
  return (
    <Link href={`/player/${username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className='flex justify-center items-center my-auto w-12 h-12'>
          {winner == username && (
            <Image
              alt=''
              className='mx-auto my-auto mr-2'
              height={25}
              width={25}
              src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
            />
          )}
        </div>
        <div className='avatar'>
          <div className='mask mask-squircle w-12 h-12'>
            <Image
              height={55}
              width={55}
              src={avatar_url}
              alt='Avatar Tailwind CSS Component'
            />
          </div>
        </div>
        <div>
          <div className='font-bold'>{username}</div>
        </div>
      </div>
    </Link>
  );
}
