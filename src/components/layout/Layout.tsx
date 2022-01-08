import Image from 'next/image';
import * as React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
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
          <p>
            Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut
            adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea
            quasi eligendi. Saepe velit autem minima.
          </p>
          <div className='modal-action'>
            <a href='#' className='btn btn-primary'>
              Accept
            </a>
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
