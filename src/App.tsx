import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from './lib/common/presentation/layout/main.layout';
import { HomePage } from './lib/home/presentation/pages/home.page';
import { useUser } from './lib/user/presentation/context/user.context';
import { NotLogged } from './lib/user/presentation/pages/not-logged';

function App() {
  const user = useUser();

  if (!user.data) {
    return <div>Loading...</div>;
  }

  if (!user.data.status) {
    return <NotLogged />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/student'>
            <Route path='*' element={<div>Student</div>} />
          </Route>
          <Route path='/teacher'>
            <Route path='*' element={<div>Teacher</div>} />
          </Route>
          <Route path='/admin'>
            <Route path='*' element={<div>Admin</div>} />
          </Route>
          <Route path='/profile'>
            <Route path='*' element={<div>Profile</div>} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
