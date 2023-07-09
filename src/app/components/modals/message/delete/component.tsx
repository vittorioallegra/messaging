import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../../../contexts';
import { Message } from '../../../../interfaces';
import { Modal } from '../../../modal/component';

interface MessageDeleteModalProps {
  isOpen: boolean;
  message: Message;
  onClose: () => void;
}

export const MessageDeleteModal = ({ isOpen, message, onClose }: MessageDeleteModalProps) => {
  const { t } = useTranslation();
  const { deleteMessage } = useApp();
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setHasError(false);
    onClose();
  }, [onClose]);

  const handleDelete = useCallback(async () => {
    setHasError(false);
    try {
      await deleteMessage(message.id);
      handleClose();
    } catch {
      setHasError(true);
    }
  }, [message.id, deleteMessage, handleClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      action={{
        title: t('common.button.delete'),
        onClick: handleDelete,
      }}
    >
      <div className="flex flex-col">
        <p>{t('common.message.delete')}</p>
        {hasError && <p className="text-red-500">{t('common.error.generic')}</p>}
      </div>
    </Modal>
  );
};
