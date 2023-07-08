import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp, useAuth, useWebSocket } from '../../contexts';
import { Button } from '../button';

export const NavBar = () => {
  const { logout } = useAuth();
  const { toggleThreadsSidebar } = useApp();
  const { disconnect } = useWebSocket();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    disconnect();
    logout();
  }, [disconnect, logout]);

  return (
    <div className="flex justify-between h-12 px-2 w-full bg-opacity-75 bg-black shadow-xl">
      <div className="md:hidden flex flex-col justify-center">
        <Button className="!text-white" onClick={toggleThreadsSidebar} title={t('common.button.menu')} />
      </div>
      <div />
      <div className="flex flex-col justify-center">
        <Button className="!text-white" onClick={handleLogout} title={t('common.button.logout')} />
      </div>
    </div>
  );
};
