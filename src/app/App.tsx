import { I18nextProvider } from 'react-i18next';

import { i18n } from './config';
import { AppProvider, MessagesProvider, useAuth } from './contexts';
import './index.css';
import { Home, Login } from './pages';

export const App = () => {
  const { user } = useAuth();

  return (
    <I18nextProvider i18n={i18n}>
      {user ? (
        <MessagesProvider>
          <AppProvider user={user}>
            <Home />
          </AppProvider>
        </MessagesProvider>
      ) : (
        <Login />
      )}
    </I18nextProvider>
  );
};
