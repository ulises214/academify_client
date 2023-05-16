import { useOutlet } from 'react-router-dom';

import { UserChecker } from '../../../user/presentation/components/organisms/user.checker';
import { Footer } from './footer';
import { Header } from './header';

export const MainLayout = () => {
  const outlet = useOutlet();

  return (
    <main className='flex h-full w-full flex-col'>
      <div>
        <UserChecker>{({ user }) => <Header user={user} />}</UserChecker>
      </div>
      <div className='container mx-auto w-full grow py-4'>{outlet}</div>
      <div>
        <Footer />
      </div>
    </main>
  );
};
