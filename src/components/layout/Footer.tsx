import Link from 'next/link';

export default function Header() {
  return (
    <div className='container py-8 mx-auto'>
      <footer className='container flex justify-center md:justify-between'>
        <div>
          <ul className='flex justify-center mb-2 text-center md:justify-start'>
            <li className='mr-2 underline'>
              <Link href='/impressum'>Impressum</Link>
            </li>
            <li className='underline'>
              <Link href='/cookies'>Cookies</Link>
            </li>
          </ul>
          <div>Made with ❤️ in Saarland</div>
        </div>
        <div></div>
      </footer>
    </div>
  );
}
