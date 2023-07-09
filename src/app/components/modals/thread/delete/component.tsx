import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../../../contexts';
import { Thread } from '../../../../interfaces';
import { Modal } from '../../../modal/component';

interface ThreadDeleteModalProps {
  isOpen: boolean;
  thread: Thread;
  onClose: () => void;
}

export const ThreadDeleteModal = ({ isOpen, thread, onClose }: ThreadDeleteModalProps) => {
  const { t } = useTranslation();
  const { deleteThread } = useApp();
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setHasError(false);
    onClose();
  }, [onClose]);

  const handleDelete = useCallback(async () => {
    setHasError(false);
    try {
      await deleteThread(thread.id);
      handleClose();
    } catch {
      setHasError(true);
    }
  }, [thread.id, deleteThread, handleClose]);

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
        <p>{t('common.thread.delete')}</p>
        {hasError && <p className="text-red-500">{t('common.error.generic')}</p>}
      </div>
    </Modal>
  );
};
