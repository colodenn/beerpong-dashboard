/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rotate as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';
import { Season } from 'types';
import useLocalStorageState from 'use-local-storage-state';

import { useUser } from '@/utils/useUser';
const fetcher = (args: any) => fetch(args).then((res) => res.json());

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const { user, logoutUser, profile } = useUser();
  const { data } = useSWR(`/api/seasons`, fetcher);
  const seasonDropdownOptions = data?.['seasons'].map((e: Season) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const [season, setSeason] = useLocalStorageState('SS 22');
  useEffect(() => {
    setSeason(season ? season : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function changeTheme() {
  //   setIsDarkMode(!isDarkMode);
  // }

  const getNavOptions = () => {
    return (
      <ul className='fade-in slide-in-bottom py-8 ml-2 space-y-4 text-4xl md:flex md:py-0 md:ml-8 md:space-y-0 md:text-lg'>
        <li className='underline-offset-2 ml-1 font-semibold underline cursor-pointer md:ml-4'>
          {!user ? (
            <Link href='/login'>login</Link>
          ) : (
            <span onClick={() => logoutUser()}>logout</span>
          )}
        </li>
        {user && (
          <li className='underline-offset-2 ml-1 font-semibold underline cursor-pointer md:ml-4'>
            <Link
              href={
                profile?.username ? `/player/${profile.username}` : '/profile'
              }
            >
              profile
            </Link>
          </li>
        )}
        <li className='underline-offset-2 ml-1 font-semibold underline cursor-pointer md:ml-4'>
          <Link href={'/players'}>players</Link>
        </li>
        <li className='underline-offset-2 ml-1 font-semibold underline cursor-pointer md:ml-4'>
          <Link href={'/rules'}>rules</Link>
        </li>
        <li className='underline-offset-2 ml-1 font-semibold underline cursor-pointer md:ml-4'>
          <Link href={'/badges'}>badges</Link>
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
    );
  };

  return (
    <div>
      <header className='bg-primary border-b-3 fixed top-0 z-50 px-8 pb-4 mx-auto w-full bg-white bg-opacity-60 border-b-2 border-gray-200 backdrop-filter backdrop-blur-md backdrop-saturate-150'>
        <div className='container grid grid-cols-3 auto-cols-max mx-auto mt-6 w-full'>
          <div className='flex items-center'>
            <Hamburger toggled={isOpen} toggle={setOpen} />
            <div className='hidden md:block'>{isOpen && getNavOptions()}</div>
          </div>
          <div className='flex justify-center items-center text-xl font-bold'>
            <Link passHref={true} href='/'>
              <div className='flex justify-center items-center text-xl font-bold'>
                <div className='mr-2 cursor-pointer'>
                  <Image
                    alt='logo'
                    objectFit='cover'
                    width={120}
                    height={56}
                    className='mx-atuo my-auto'
                    src='/images/logo.png'
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
              id={'season-select'}
              instanceId={'season-select'}
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
        <div
          className={`flex justify-center text-xl md:hidden ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {getNavOptions()}
        </div>
      </header>
    </div>
  );
}
