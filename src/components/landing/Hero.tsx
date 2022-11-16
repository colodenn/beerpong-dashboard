import { trpc } from '@/utils/trpc';

export default function Hero() {
  const firstQuery = trpc.example.whatUp.useQuery({ name: 'jo' });

  if (firstQuery.error || firstQuery.isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <h1 className='flex justify-center items-center mx-auto text-center lg:text-8xl'>
        Winter Season 22/23{' '}
      </h1>
      <p>{firstQuery.data.info}</p>
      <p className='mt-8 text-2xl text-center'>
        Beer pong, also known as Beirut, is a drinking game in which players
        throw a ping pong ball across a table with the intent of landing the
        ball in a cup of beer on the other end.
      </p>
    </>
  );
}
