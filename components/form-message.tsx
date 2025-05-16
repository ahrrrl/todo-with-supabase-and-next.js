export function FormMessage({ message }: { message?: string }) {
  return (
    <p className='text-sm text-foreground border-l-2 border-foreground px-4'>
      {message}
    </p>
  );
}
