import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../../../contexts';
import { Thread } from '../../../../interfaces';
import { Modal } from '../../../modal/component';
import { TextArea } from '../../../textarea';

interface ThreadUpdateModalProps {
  isOpen: boolean;
  thread: Thread;
  onClose: () => void;
}

export const ThreadUpdateModal = ({ isOpen, thread, onClose }: ThreadUpdateModalProps) => {
  const { t } = useTranslation();
  const { updateThread } = useApp();
  const [hasError, setHasError] = useState(false);
  const [title, setTitle] = useState(thread.title);

  useEffect(() => {
    setHasError(false);
    setTitle(isOpen ? thread.title : '');
    // eslint-disable-next-line
  }, [isOpen]);

  const handleUpdate = useCallback(async () => {
    if (title.trim().length) {
      setHasError(false);
      try {
        await updateThread(thread.id, title);
        onClose();
      } catch {
        setHasError(true);
      }
    }
  }, [thread.id, title, updateThread, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title={t('common.thread.update')}
      onClose={onClose}
      action={{
        title: t('common.button.save'),
        onClick: handleUpdate,
      }}
    >
      <TextArea
        className="w-full"
        placeholder={t('common.thread.title')}
        error={hasError}
        value={title}
        onChange={setTitle}
      />
    </Modal>
  );
};
