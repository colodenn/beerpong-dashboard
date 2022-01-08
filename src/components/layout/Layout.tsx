/* eslint-disable unused-imports/no-unused-vars */
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const [toggle, setToggle] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');
  const [schnickel, setSchnickel] = useState('');
  const [cups, setCups] = useState(0);

  function addGame(isDuo: boolean) {
    if (!isDuo) {
      fetch('/api/addSolo', {
        body: JSON.stringify({
          player1: player1,
          player2: player2,
          winner: winner,
          schnickel: schnickel,
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
        {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg> */}
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
                    <input
                      name='player1'
                      type='text'
                      placeholder='Player 1'
                      className='input input-bordered'
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                    />
                    <label className='label'>
                      <span className='label-text'>Player 2</span>
                    </label>
                    <input
                      type='text'
                      name='player2'
                      placeholder='Player 2'
                      className='input input-bordered'
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                    />
                    <label className='label'>
                      <span className='label-text'>Schnickel winner</span>
                    </label>
                    <input
                      type='text'
                      name='schnickel'
                      placeholder='Scnickel winner'
                      className='input input-bordered'
                      value={schnickel}
                      onChange={(e) => setSchnickel(e.target.value)}
                    />

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
                    <input
                      type='text'
                      placeholder='Winner'
                      name='winner'
                      value={winner}
                      onChange={(e) => setWinner(e.target.value)}
                      className='input input-bordered'
                    />
                  </div>
                  <div>
                    {lat}:{lng}
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
            <a href='#' className='btn'>
              Close
            </a>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
