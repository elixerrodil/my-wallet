import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth-routes/route';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
};

export default Home;
