import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../../contexts';
import { Message, User } from '../../../../interfaces';
import { Button } from '../../../button';
import { ContextMenu } from '../../../contextmenu';
import { MessageDeleteModal, MessageUpdateModal } from '../../../modals';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const messageUser: Pick<User, 'id' | 'firstName' | 'lastName'> = useMemo(
    () => JSON.parse(message.displayName),
    [message.displayName],
  );

  const isUserMessage = useMemo(() => messageUser.id === user?.id, [messageUser, user?.id]);
  const isMessageDeleted = useMemo(() => message.text === 'common.message.deleted', [message.text]);

  const openContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (isUserMessage && !isMessageDeleted) {
        e.preventDefault();
        setContextMenuOpen(true);
      }
    },
    [isUserMessage, isMessageDeleted],
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

  const avatar = useMemo(() => {
    const first = messageUser.firstName.substring(0, 1).toUpperCase();
    const last = messageUser.lastName.substring(0, 1).toUpperCase();
    return `${first}${last}`;
  }, [messageUser]);

  const name = useMemo(() => {
    return `${messageUser.firstName} ${messageUser.lastName}`;
  }, [messageUser]);

  const getDateTime = useCallback((isoDateTime: string) => format(parseISO(isoDateTime), 'dd.MM.yyyy HH:mm'), []);

  const datetime = useMemo(() => {
    if (isMessageDeleted) {
      return t('common.message.deletedAt', { datetime: getDateTime(message.updatedAt) });
    }
    if (message.createdAt !== message.updatedAt) {
      return t('common.message.updatedAt', { datetime: getDateTime(message.updatedAt) });
    }
    return getDateTime(message.createdAt);
  }, [isMessageDeleted, message, getDateTime, t]);

  return (
    <div
      ref={ref}
      className={classNames('relative min-h-[2rem]  max-w-[calc(100%-3rem)]', {
        'ml-auto': isUserMessage,
        'mr-auto': !isUserMessage,
      })}
      onContextMenu={openContextMenu}
    >
      <div
        className={classNames('flex gap-2 items-center rounded-full border border-gray-800', {
          'px-2': isUserMessage,
          'pl-0.5 pr-4': !isUserMessage,
        })}
      >
        {!isUserMessage && (
          <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 w-10 h-10">
            {avatar}
          </div>
        )}
        <div
          className={classNames({
            'w-full': isUserMessage,
            'w-[calc(100%-2.5rem)]': !isUserMessage,
          })}
        >
          {!isUserMessage && <p className="text-sm text-gray-500">{name}</p>}
          <p
            className={classNames({
              'text-right': isUserMessage,
            })}
          >
            {isMessageDeleted ? t('common.message.deleted') : message.text}
          </p>
        </div>
        <ContextMenu isOpen={isContextMenuOpen} triggerRef={ref} onClose={closeContextMenu}>
          <Button onClick={openUpdateModal} title={t('common.button.edit')} />
          <Button onClick={openDeleteModal} title={t('common.button.delete')} />
        </ContextMenu>
      </div>
      <div
        className={classNames('text-xs', {
          'text-right': isUserMessage,
        })}
      >
        {datetime}
      </div>
      <MessageUpdateModal isOpen={isUpdateModalOpen} message={message} onClose={closeUpdateModal} />
      <MessageDeleteModal isOpen={isDeleteModalOpen} message={message} onClose={closeDeleteModal} />
    </div>
  );
};
