import { Rotate as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

import { useUser } from '@/utils/useUser';

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, logoutUser } = useUser();

  function changeTheme() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <header className='bg-primary border-b-3 fixed top-0 z-50 pb-4 mx-auto w-full bg-white bg-opacity-60 border-b-2 border-gray-200 backdrop-filter backdrop-blur-md backdrop-saturate-150'>
      <div className='container grid grid-cols-3 auto-cols-max mx-auto mt-6 w-full'>
        <div className='flex items-center'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          {isOpen && (
            <ul className='fade-in slide-in-bottom flex ml-8'>
              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                {!user ? (
                  <Link href='/login'>login</Link>
                ) : (
                  <span onClick={() => logoutUser()}>logout</span>
                )}
              </li>
              {user && (
                <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                  <Link href='/profile'>profile</Link>
                </li>
              )}

              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                table
              </li>
              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                gameplan
              </li>
              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                rules
              </li>
            </ul>
          )}
        </div>
        <div className='flex justify-center items-center text-xl font-bold'>
          <Link href='/'>beerpong.</Link>
        </div>

        <div
          data-toggle-theme='dark,light'
          className='flex justify-end items-center'
        >
          {' '}
          <DarkModeToggle
            onChange={() => changeTheme()}
            checked={isDarkMode}
            size={55}
          />
        </div>
      </div>
    </header>
  );
}
