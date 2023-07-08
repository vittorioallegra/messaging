import { I18nextProvider } from 'react-i18next';

import { i18n } from './config';
import { AppProvider, WebSocketProvider, useAuth } from './contexts';
import './index.css';
import { Home, Login } from './pages';

export const App = () => {
  const { user } = useAuth();

  return (
    <I18nextProvider i18n={i18n}>
      {user ? (
        <WebSocketProvider authorization={user.id}>
          <AppProvider user={user}>
            <Home />
          </AppProvider>
        </WebSocketProvider>
      ) : (
        <Login />
      )}
    </I18nextProvider>
  );
};
