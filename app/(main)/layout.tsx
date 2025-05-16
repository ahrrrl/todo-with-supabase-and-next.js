import { Footer } from '@/components/main/Footer';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <div className='flex flex-1 flex-col items-center justify-center h-full  p-5'>
        {children}
      </div>
      <Footer />
    </div>
  );
}
