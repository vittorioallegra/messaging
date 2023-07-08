import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Input, Page } from '../../components';
import { useAuth } from '../../contexts';

export const Login = () => {
  const { t } = useTranslation();
  const { login, hasLoginError } = useAuth();
  const [email, setEmail] = useState('');

  const handleClick = useCallback(() => {
    if (email.trim().length) {
      login(email);
    }
  }, [email, login]);

  return (
    <Page>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col rounded bg-white min-w-[300px] max-w-xs p-4">
          <Input className="mb-3" placeholder={t('pages.login.email')} value={email} onChange={setEmail} />
          {hasLoginError && <p className="text-red-400">{t('pages.login.error')}</p>}
          <Button className="w-full" title={t('pages.login.button')} onClick={handleClick} />
        </div>
      </div>
    </Page>
  );
};
