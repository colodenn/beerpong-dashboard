import { ReactChild } from 'react';

export default function Background(props: {
  colour: string;
  title: string;
  children: ReactChild;
}) {
  return (
    <>
      <div
        className='py-4 rounded-lg shadow-lg md:p-8'
        style={{ backgroundColor: props.colour }}
      >
        <div className='flex justify-start mb-4 ml-6 md:mb-6 md:ml-0'>
          <h1>{props.title}</h1>
        </div>
        {props.children}
      </div>
    </>
  );
}
