import Image from 'next/image';
import Link from 'next/link';

export function User({
  username,
  avatar_url,
  king,
}: {
  username: string;
  avatar_url: string;
  king?: boolean;
}) {
  return (
    <Link href={`/player/${username}`} passHref={true}>
      <div className='flex items-center space-x-3 cursor-pointer'>
        <div className=''>
          <div className='relative w-12 h-12'>
            <div className='absolute'>
              <Image
                height={55}
                width={55}
                src={
                  avatar_url != ''
                    ? avatar_url
                    : 'https://i.imgur.com/WxNkK7J.png'
                }
                className='rounded-2xl'
                alt={username}
              />
            </div>
            {king && (
              <div className='absolute top-0 z-50 w-full h-full -translate-y-1/2'>
                <Image
                  height={55}
                  width={55}
                  src={'/images/crown.gif'}
                  className=''
                  alt={'crown'}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='font-bold'>{username}</div>
        </div>
      </div>
    </Link>
  );
}
