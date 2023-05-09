import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { UserProvider } from './lib/user/presentation/context/user.provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
