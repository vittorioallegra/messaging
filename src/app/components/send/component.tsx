import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../contexts';
import { Button } from '../button';
import { TextArea } from '../textarea';

interface SendMessageProps {
  threadId: string;
}

export const SendMessage = ({ threadId }: SendMessageProps) => {
  const { t } = useTranslation();
  const { createMessage } = useApp();
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleClick = useCallback(async () => {
    if (text.trim().length) {
      setHasError(false);
      try {
        await createMessage(threadId, text);
        setText('');
      } catch {
        setHasError(true);
      }
    }
  }, [text, threadId, createMessage]);

  if (!threadId) {
    return <></>;
  }

  return (
    <div className="flex flex-col min-h-[2rem] bg-gray-200 p-2">
      <div className="w-full flex items-center gap-4">
        <TextArea className="w-full" placeholder={t('common.message.create')} value={text} onChange={setText} />
        <Button onClick={handleClick} title={t(`common.button.${hasError ? 'resend' : 'send'}`)} />
      </div>
      {hasError && <span className="text-red-500 mt-1">{t('common.error.message')}</span>}
    </div>
  );
};
