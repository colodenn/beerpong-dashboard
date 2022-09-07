import Image from 'next/image';
import Link from 'next/link';

export function User({
  username,
  avatar_url,
}: {
  username: string;
  avatar_url: string;
}) {
  return (
    <Link href={`/player/${username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className='avatar'>
          <div className='mask mask-squircle w-12 h-12'>
            <Image
              height={55}
              width={55}
              src={
                avatar_url != ''
                  ? avatar_url
                  : 'https://i.imgur.com/WxNkK7J.png'
              }
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
