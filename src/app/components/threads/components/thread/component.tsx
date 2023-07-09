import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp, useAuth, useWebSocket } from '../../../../contexts';
import { Thread } from '../../../../interfaces';
import { Button } from '../../../button';
import { ContextMenu } from '../../../contextmenu';
import { ThreadDeleteModal, ThreadUpdateModal } from '../../../modals';

interface ThreadButtonProps {
  thread: Thread;
  onClick: (threadId: string) => void;
}

export const ThreadButton = ({ thread, onClick }: ThreadButtonProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toggleThreadsSidebar } = useApp();
  const { connect, threadId } = useWebSocket();
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (thread.createdBy.id === user?.id) {
        e.preventDefault();
        setContextMenuOpen(true);
      }
    },
    [thread.createdBy.id, user?.id],
  );
  const closeContextMenu = useCallback(() => setContextMenuOpen(false), []);

  const openUpdateModal = useCallback(() => {
    closeContextMenu();
    setUpdateModalOpen(true);
  }, [closeContextMenu]);
  const closeUpdateModal = useCallback(() => setUpdateModalOpen(false), []);

  const openDeleteModal = useCallback(() => {
    closeContextMenu();
    setDeleteModalOpen(true);
  }, [closeContextMenu]);
  const closeDeleteModal = useCallback(() => setDeleteModalOpen(false), []);

  const handleClick = useCallback(() => {
    toggleThreadsSidebar();
    connect(thread.id);
    onClick(thread.id);
  }, [toggleThreadsSidebar, thread.id, connect, onClick]);

  return (
    <div ref={ref} className="relative border-b border-black" onContextMenu={openContextMenu}>
      <Button
        className={classNames('w-full text-left', {
          '!text-white': thread.id === threadId,
        })}
        onClick={handleClick}
        title={thread.title}
      />
      <ContextMenu className="left-0" isOpen={isContextMenuOpen} triggerRef={ref} onClose={closeContextMenu}>
        <Button onClick={openUpdateModal} title={t('common.button.edit')} />
        <Button onClick={openDeleteModal} title={t('common.button.delete')} />
      </ContextMenu>
      <ThreadUpdateModal isOpen={isUpdateModalOpen} thread={thread} onClose={closeUpdateModal} />
      <ThreadDeleteModal isOpen={isDeleteModalOpen} thread={thread} onClose={closeDeleteModal} />
    </div>
  );
};
