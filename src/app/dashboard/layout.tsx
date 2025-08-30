import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth-routes/route';
import { redirect } from 'next/navigation';
import { Header } from './common/header';
import { Sidebar } from './common/sidebar';
import { Footer } from './common/footer';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-6'>{children}</main>
      </div>{' '}
      <Footer />
    </>
  );
};
export default DashboardLayout;
