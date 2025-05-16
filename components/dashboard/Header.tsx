import AuthButton from '../header-auth';

export function Header() {
  return (
    <nav className='sticky w-full flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm'>
        <AuthButton />
      </div>
    </nav>
  );
}
