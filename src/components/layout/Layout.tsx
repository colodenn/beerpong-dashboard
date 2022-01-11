/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import useSWR from 'swr';

import 'react-datepicker/dist/react-datepicker.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const [toggle, setToggle] = useState(false);
  const [lat, setLat] = useState<null | number>(null);
  const [lng, setLng] = useState<null | number>(null);
  const [status, setStatus] = useState<null | string>(null);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');
  const [schnickel, setSchnickel] = useState('');
  const [cups, setCups] = useState(0);
  const [over, setOver] = useState(false);
  const [t1_player1, setT1_player1] = useState('');
  const [t1_player2, setT1_player2] = useState('');
  const [t2_player1, setT2_player1] = useState('');
  const [t2_player2, setT2_player2] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const fetcher = (args: any) => fetch(args).then((res) => res.json());
  const { data } = useSWR('/api/players', fetcher);
  const playerOptions = data?.['players'].map((e: any) => {
    return {
      value: e.username,
      label: (
        <div className='flex items-center space-x-2'>
          <Image
            className='mx-8 rounded-xl'
            width={35}
            height={35}
            src={e.avatar_url}
            alt=''
          />
          <p className='font-semibold'>{e.username}</p>
        </div>
      ),
    };
  });
  const playerSelect = (
    field: any,
    onChangeFunction: any,
    playerOptions: any
  ) => {
    return (
      <Select
        className='basic-single'
        isSearchable={true}
        isClearable={true}
        onChange={(e) => onChangeFunction(e?.value)}
        classNamePrefix='select'
        defaultValue={playerOptions?.['Max']}
        placeholder='Select Player'
        options={playerOptions}
        value={playerOptions?.filter((option: any) => {
          return option.value == field;
        })}
      />
    );
  };

  function addGame(isDuo: boolean) {
    if (!isDuo) {
      fetch('/api/addSolo', {
        body: JSON.stringify({
          player1: player1 == '' ? data['players'][0].username : player1,
          player2: player2 == '' ? data['players'][0].username : player2,
          winner: winner == '' ? data['players'][0].username : winner,
          schnickel: schnickel == '' ? data['players'][0].username : schnickel,
          cups: cups,
          lng: lng,
          lat: lat,
          startDate: startDate,
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      fetch('/api/addDuo', {
        body: JSON.stringify({
          t1_player1:
            t1_player1 == '' ? data['players'][0].username : t1_player1,
          t1_player2:
            t1_player2 == '' ? data['players'][0].username : t1_player2,
          t2_player1:
            t2_player1 == '' ? data['players'][0].username : t2_player1,
          t2_player2:
            t2_player2 == '' ? data['players'][0].username : t2_player2,
          winner: winner == '' ? 'Team 1' : winner,
          schnickel: schnickel == '' ? data['players'][0].username : schnickel,
          cups: cups,
          lng: lng,
          lat: lat,
          startDate: startDate,
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };
  const router = useRouter();

  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
      <a
        href='#my-modal'
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        className='border-full flex fixed right-0 bottom-0 z-50 justify-center items-center p-4 mr-4 mb-4 text-white bg-blue-500 bg-opacity-60 rounded-full shadow-xl backdrop-filter backdrop-blur-md backdrop-saturate-150 md:mr-16 md:mb-16 hover:bg-blue-600'
      >
        <Image
          width={72}
          height={72}
          alt=''
          src={over ? '/images/BallHitCup.gif' : '/images/BallHitCup.png'}
          className='mx-auto my-auto'
        />
      </a>
      <div id='my-modal' className='modal'>
        <div className='modal-box'>
          <div className='flex'>
            <h5 className='mr-2'>Solo</h5>
            <input
              type='checkbox'
              checked={toggle}
              onClick={() => setToggle(!toggle)}
              className='toggle'
            />
            <h5 className='ml-2'>Duo</h5>
          </div>
          <div className='mt-8'>
            {!toggle ? (
              <>
                <form action='/api/addSolo' method='post'>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Player 1</span>
                    </label>
                    {playerSelect(
                      player1,
                      setPlayer1,
                      playerOptions?.filter((option: any) => {
                        return !['unentschieden', player2].includes(
                          option.value
                        );
                      })
                    )}
                    <label className='label'>
                      <span className='label-text'>Player 2</span>
                    </label>
                    {playerSelect(
                      player2,
                      setPlayer2,
                      playerOptions?.filter((option: any) => {
                        return !['unentschieden', player1].includes(
                          option.value
                        );
                      })
                    )}
                    <label className='label'>
                      <span className='label-text'>Schnickel winner</span>
                    </label>
                    {playerSelect(
                      schnickel,
                      setSchnickel,
                      playerOptions?.filter((option: any) => {
                        return (
                          option.value != 'unentschieden' &&
                          [player1, player2].includes(option.value)
                        );
                      })
                    )}
                    <label className='label'>
                      <span className='label-text'>Winner</span>
                    </label>
                    {playerSelect(
                      winner,
                      setWinner,
                      playerOptions?.filter((option: any) => {
                        return [player1, player2, 'unentschieden'].includes(
                          option.value
                        );
                      })
                    )}
                    <label className='label'>
                      <span className='label-text'>Cups left</span>
                    </label>
                    <input
                      type='number'
                      name='cupsleft'
                      placeholder='Cups left'
                      className='input input-bordered'
                      value={cups}
                      onChange={(e) => setCups(Number(e.target.value))}
                    />
                  </div>
                  <div className='hidden mt-6'>
                    <p>lat:{lat}</p>
                    <p>long:{lng}</p>
                  </div>
                  <div>
                    <label className='label'>
                      <span className='label-text'>Date</span>
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                  </div>
                </form>
              </>
            ) : (
              <>
                <form action='/api/addSolo' method='post'>
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text'>Team 1: Player 1</span>
                    </label>
                    {playerSelect(
                      t1_player1,
                      setT1_player1,
                      playerOptions?.filter((option: any) => {
                        return ![
                          'unentschieden',
                          t1_player2,
                          t2_player1,
                          t2_player2,
                        ].includes(option.value);
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Team 1: Player 2</span>
                    </label>
                    {playerSelect(
                      t1_player2,
                      setT1_player2,
                      playerOptions?.filter((option: any) => {
                        return ![
                          'unentschieden',
                          t1_player1,
                          t2_player1,
                          t2_player2,
                        ].includes(option.value);
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Team 2: Player 1</span>
                    </label>
                    {playerSelect(
                      t2_player1,
                      setT2_player1,
                      playerOptions?.filter((option: any) => {
                        return ![
                          'unentschieden',
                          t1_player1,
                          t1_player2,
                          t2_player2,
                        ].includes(option.value);
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Team 2: Player 2</span>
                    </label>
                    {playerSelect(
                      t2_player2,
                      setT2_player2,
                      playerOptions?.filter((option: any) => {
                        return ![
                          'unentschieden',
                          t1_player1,
                          t1_player2,
                          t2_player1,
                        ].includes(option.value);
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Schnickel winner</span>
                    </label>
                    {playerSelect(
                      schnickel,
                      setSchnickel,
                      playerOptions?.filter((option: any) => {
                        return (
                          option.value != 'unentschieden' &&
                          [
                            t1_player1,
                            t1_player2,
                            t2_player1,
                            t2_player2,
                          ].includes(option.value)
                        );
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Winner</span>
                    </label>
                    {playerSelect(
                      winner,
                      setWinner,
                      playerOptions?.filter((option: any) => {
                        return [
                          t1_player1,
                          t1_player2,
                          t2_player1,
                          t2_player2,
                          'unentschieden',
                        ].includes(option.value);
                      })
                    )}

                    <label className='label'>
                      <span className='label-text'>Cups left</span>
                    </label>
                    <input
                      type='number'
                      name='cupsleft'
                      placeholder='Cups left'
                      className='input input-bordered'
                      value={cups}
                      onChange={(e) => setCups(Number(e.target.value))}
                    />
                  </div>
                  <div className='mt-6'>
                    <p>lat:{lat}</p>
                    <p>long:{lng}</p>
                  </div>
                  <div className='mt-4 w-full'>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
          <div className='modal-action'>
            <a
              href=''
              onClick={() => {
                addGame(toggle);
              }}
              type='submit'
              className='btn btn-primary'
            >
              Accept
            </a>
            <a href='' className='btn'>
              Close
            </a>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
