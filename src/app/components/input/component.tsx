import classNames from 'classnames';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps {
  className?: string;
  placeholder?: string;
  error?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ className, placeholder, error, value, onChange }: InputProps) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={classNames('flex', className)}>
      <input
        className="w-full border rounded p-2 border-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <span className="text-red-500 mt-3">{t('common.error')}</span>}
    </div>
  );
};
