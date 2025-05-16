export function ErrorMessage({ message }: { message?: string }) {
  return (
    <div className='flex flex-col mt-1.5 w-full max-w-md text-sm'>
      {message && (
        <div className='text-red-500 border-l-2 border-red-500 px-4'>
          {message}
        </div>
      )}
    </div>
  );
}
