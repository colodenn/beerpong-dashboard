import { GetServerSideProps } from 'next';
import { MouseEvent, useState } from 'react';

import { supabase } from '@/utils/client';
import { useUser } from '@/utils/useUser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const loginUser = useUser();

  async function login(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    const { error } = await loginUser?.loginUser(email);
    if (error) {
      setMessage('Something went wront...Try again');
    } else {
      setMessage('Check your emails to log in!');
    }
  }

  return (
    <main className='align-center dotted flex justify-center mx-auto w-full h-screen'>
      <div className='mt-48'>
        <h1 className='mb-8 text-3xl text-center text-black md:text-4xl'>
          beerpong.
        </h1>
        <form className='p-8 w-96 bg-gray-50 rounded shadow'>
          <h1 className='text-3xl text-center text-black md:text-4xl'>Login</h1>
          <p className='mt-2 text-black'>
            Enter your email address to sign in or create a new account.
            We&apos;ll send you a login link.
          </p>
          <input
            className='mt-4 w-full text-black rounded'
            type='email'
            placeholder='user@ertappen.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <br />
          <button
            onClick={(e) => {
              login(e);
            }}
            className='btn mt-2 w-full'
          >
            Send login link
          </button>
          <p className='text-black'>{message}</p>
        </form>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: { user }, redirect: { destination: '/' } };
  }

  return { props: {} };
};
