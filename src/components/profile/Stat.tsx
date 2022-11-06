import Image from 'next/image';
export interface StatType {
  text: string;
  stats: string;
  imageUrl: string;
}
export const Stat = (props: StatType) => {
  return (
    <li className='px-8 text-lg'>
      <div className='flex justify-center mb-4'>
        <Image
          height={48}
          width={48}
          alt=''
          src={props.imageUrl}
          className='mx-auto w-12'
        />
      </div>
      <div>
        <h3 className='text-center'>{props.stats}</h3>
      </div>
      <div>
        <h5 className='mx-auto text-center'>{props.text}</h5>
      </div>
    </li>
  );
};
