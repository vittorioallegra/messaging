import classNames from 'classnames';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TextAreaProps {
  className?: string;
  placeholder?: string;
  error?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const TextArea = ({ className, placeholder, error, value, onChange }: TextAreaProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '0px';
      const scrollHeight = ref.current.scrollHeight + 12;
      const maxHeight = 160;
      const height = scrollHeight > maxHeight ? maxHeight : scrollHeight;
      ref.current.style.height = height + 'px';
    }
  }, [ref, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={classNames('flex', className)}>
      <textarea
        ref={ref}
        className="w-full border rounded p-2 border-gray-500 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <span className="text-red-500 mt-3">{t('common.error')}</span>}
    </div>
  );
};
