import { Trans, useTranslation } from 'react-i18next';

import { Logo } from '../../components';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center bg-slate-600 w-full h-full">
      <Logo className="h-[40px] animate-spin" />
      <div className="text-white w-full text-center">
        <Trans i18nKey="pages.home.title" components={[<code key="code" />]} />
        <a className="text-blue-400" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          {t('pages.home.link')}
        </a>
      </div>
    </div>
  );
};
