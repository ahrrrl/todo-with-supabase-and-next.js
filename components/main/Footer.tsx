import { ThemeSwitcher } from '../theme-switcher';

export function Footer() {
  return (
    <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
      <p>
        Made by{' '}
        <a
          href='https://github.com/ahrrrl'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Ahrrrl
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}
