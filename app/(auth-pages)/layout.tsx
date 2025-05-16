export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center'>
      {children}
    </div>
  );
}
