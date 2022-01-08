/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const [toggle, setToggle] = useState(true);
  const [lat, setLat] = useState<null | number>(null);
  const [lng, setLng] = useState<null | number>(null);
  const [status, setStatus] = useState<null | string>(null);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');
  const [schnickel, setSchnickel] = useState('');
  const [cups, setCups] = useState(0);
  const fetcher = (args: any) => fetch(args).then((res) => res.json());
  const { data } = useSWR('/api/players', fetcher);

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

  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
      <a
        href='#my-modal'
        className='border-full fixed right-0 bottom-0 z-50 p-8 mr-4 mb-4 text-white bg-red-500 rounded-full shadow-xl md:mr-16 md:mb-16 hover:bg-red-800'
      >
        <Image
          width={55}
          height={55}
          alt=''
          src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/beer-mug_1f37a.png'
          className='w-10'
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

                    <select
                      className='select select-bordered w-full max-w-xs'
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                    >
                      {data['players'].map((e: any, i: any) => {
                        return (
                          <option value={e.username} selected={i == 0} key={i}>
                            {e.username}
                          </option>
                        );
                      })}
                    </select>
                    <label className='label'>
                      <span className='label-text'>Player 2</span>
                    </label>
                    <select
                      className='select select-bordered w-full max-w-xs'
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                    >
                      {data['players'].map((e: any, i: any) => {
                        return <option key={i}>{e.username}</option>;
                      })}
                    </select>
                    <label className='label'>
                      <span className='label-text'>Schnickel winner</span>
                    </label>
                    <select
                      className='select select-bordered w-full max-w-xs'
                      value={schnickel}
                      onChange={(e) => setSchnickel(e.target.value)}
                    >
                      <option disabled={true} selected={true}>
                        Choose player
                      </option>
                      {data['players'].map((e: any, i: any) => {
                        return <option key={i}>{e.username}</option>;
                      })}
                    </select>

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
                    <label className='label'>
                      <span className='label-text'>Winner</span>
                    </label>
                    <select
                      className='select select-bordered w-full max-w-xs'
                      value={winner}
                      onChange={(e) => setWinner(e.target.value)}
                    >
                      {data['players'].map((e: any, i: any) => {
                        return <option key={i}>{e.username}</option>;
                      })}
                    </select>
                  </div>
                  <div className='mt-6'>
                    <p>lat:{lat}</p>
                    <p>long:{lng}</p>
                  </div>
                </form>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='modal-action'>
            <button
              onClick={() => addGame(toggle)}
              type='submit'
              className='btn btn-primary'
            >
              Accept
            </button>
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
