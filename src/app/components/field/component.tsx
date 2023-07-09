import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

export interface FieldProps {
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Field = ({ className, error, errorMessage, children }: PropsWithChildren<FieldProps>) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('flex flex-col', className)}>
      {children}
      {error && <span className="text-red-500 mt-1">{errorMessage ?? t('common.error.generic')}</span>}
    </div>
  );
};
