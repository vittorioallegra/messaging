import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../../../contexts';
import { Input } from '../../../input';
import { Modal } from '../../../modal/component';

interface ThreadCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreadCreateModal = ({ isOpen, onClose }: ThreadCreateModalProps) => {
  const { t } = useTranslation();
  const { createThread } = useApp();
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setTitle('');
    setHasError(false);
    onClose();
  }, [onClose]);

  const handleCreate = useCallback(async () => {
    if (title.trim().length > 0) {
      setHasError(false);
      try {
        await createThread(title);
        handleClose();
      } catch {
        setHasError(true);
      }
    }
  }, [title, createThread, handleClose]);

  return (
    <Modal
      isOpen={isOpen}
      title={t('common.thread.create')}
      onClose={handleClose}
      action={{
        title: t('common.button.save'),
        onClick: handleCreate,
      }}
    >
      <Input
        className="w-full"
        placeholder={t('common.thread.title')}
        error={hasError}
        value={title}
        onChange={setTitle}
      />
    </Modal>
  );
};
