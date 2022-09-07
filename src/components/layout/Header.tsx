/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rotate as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';
import { Season } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { useUser } from '@/utils/useUser';
const fetcher = (args: RequestInfo | URL) =>
  fetch(args).then((res) => res.json());

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, logoutUser, profile } = useUser();
  const { data } = useSWR(`/api/seasons`, fetcher);
  const seasonDropdownOptions = data?.['seasons'].map((e: Season) => {
    return {
      value: e.id,
      label: e.name,
    };
  });
  const [season, setSeason] = useLocalStorageState('SS 22');

  // function changeTheme() {
  //   setIsDarkMode(!isDarkMode);
  // }
  return (
    <header className='bg-primary border-b-3 fixed top-0 z-50 pb-4 mx-auto w-full bg-white bg-opacity-60 border-b-2 border-gray-200 backdrop-filter backdrop-blur-md backdrop-saturate-150'>
      <div className='container grid grid-cols-3 auto-cols-max mx-auto mt-6 w-full'>
        <div className='flex items-center'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          {isOpen && (
            <ul className='fade-in slide-in-bottom ml-2 md:flex md:ml-8'>
              <li className='underline-offset-2 ml-1 text-lg font-semibold underline cursor-pointer md:ml-4'>
                {!user ? (
                  <Link href='/login'>login</Link>
                ) : (
                  <span onClick={() => logoutUser()}>logout</span>
                )}
              </li>
              {user && (
                <li className='underline-offset-2 ml-1 text-lg font-semibold underline cursor-pointer md:ml-4'>
                  <Link
                    href={
                      profile?.username
                        ? `/player/${profile.username}`
                        : '/profile'
                    }
                  >
                    profile
                  </Link>
                </li>
              )}
              <li className='underline-offset-2 ml-1 text-lg font-semibold underline cursor-pointer md:ml-4'>
                <Link href={'/players'}>players</Link>
              </li>
              <li className='underline-offset-2 ml-1 text-lg font-semibold underline cursor-pointer md:ml-4'>
                <Link href={'/rules'}>rules</Link>
              </li>
              {/* <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                table
              </li>
              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                gameplan
              </li>
              <li className='underline-offset-2 ml-4 text-lg font-semibold underline cursor-pointer'>
                rules
              </li> */}
            </ul>
          )}
        </div>
        <div className='flex justify-center items-center text-xl font-bold'>
          <Link passHref={true} href='/'>
            <div className='flex justify-center items-center text-xl font-bold'>
              <div className='mr-2 cursor-pointer'>
                <Image
                  alt='logo'
                  width={48}
                  height={48}
                  className='mx-atuo my-auto'
                  src='/images/redcuplogo.png'
                />
              </div>
            </div>
          </Link>
        </div>
        <div className='flex justify-end items-center'>
          <Select
            className='basic-single max-w-fit'
            isSearchable={false}
            isClearable={false}
            classNamePrefix='select'
            options={seasonDropdownOptions}
            value={seasonDropdownOptions?.filter((option: any) => {
              return option.value == season;
            })}
            onChange={(e) => setSeason(e.value)}
          ></Select>
        </div>

        {/* <div
          data-toggle-theme='dark,light'
          className='flex items-center justify-end'
        >
          {' '}
          <DarkModeToggle
            onChange={() => changeTheme()}
            checked={isDarkMode}
            size={55}
          />
        </div> */}
      </div>
    </header>
  );
}
