import { useCallback, useEffect, useState } from 'react';
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

  useEffect(() => {
    setHasError(false);
    setTitle('');
    // eslint-disable-next-line
  }, [isOpen]);

  const handleCreate = useCallback(async () => {
    if (title.trim().length > 0) {
      setHasError(false);
      try {
        await createThread(title);
        onClose();
      } catch {
        setHasError(true);
      }
    }
  }, [title, createThread, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title={t('common.thread.create')}
      onClose={onClose}
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
