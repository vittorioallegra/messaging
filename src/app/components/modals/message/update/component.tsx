import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../../../contexts';
import { Message } from '../../../../interfaces';
import { Modal } from '../../../modal/component';
import { TextArea } from '../../../textarea';

interface MessageUpdateModalProps {
  isOpen: boolean;
  message: Message;
  onClose: () => void;
}

export const MessageUpdateModal = ({ isOpen, message, onClose }: MessageUpdateModalProps) => {
  const { t } = useTranslation();
  const { updateMessage } = useApp();
  const [hasError, setHasError] = useState(false);
  const [text, setText] = useState(message.text);

  useEffect(() => {
    setHasError(false);
    setText(isOpen ? message.text : '');
    // eslint-disable-next-line
  }, [isOpen]);

  const handleUpdate = useCallback(async () => {
    if (text.trim().length) {
      setHasError(false);
      try {
        await updateMessage(message.id, text);
        onClose();
      } catch {
        setHasError(true);
      }
    }
  }, [message.id, text, updateMessage, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title={t('common.message.update')}
      onClose={onClose}
      action={{
        title: t('common.button.save'),
        onClick: handleUpdate,
      }}
    >
      <TextArea
        className="w-full"
        placeholder={t('common.message.text')}
        error={hasError}
        value={text}
        onChange={setText}
      />
    </Modal>
  );
};
