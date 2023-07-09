import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from '../../contexts';
import { useInterval } from '../../hooks';
import { Button } from '../button';
import { ThreadCreateModal } from '../modals';
import { ThreadButton } from './components';

export const ThreadsSidebar = () => {
  const { threads, isThreadsSidebarOpen, fetchThread } = useApp();
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>(undefined);

  useInterval(
    useCallback(() => {
      if (threadId) {
        fetchThread(threadId);
      }
    }, [threadId, fetchThread]),
    3000,
  );

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div
      className={classNames(
        'flex flex-col h-full md:w-80 max-md:w-3/4 bg-gray-500 p-2 max-md:fixed max-md:top-11 max-md:bottom-0 max-md:z-10 transition-all',
        {
          'max-md:-left-3/4': isThreadsSidebarOpen,
          'max-md:left-0': !isThreadsSidebarOpen,
        },
      )}
    >
      <div className="flex-1 overflow-y-auto">
        {threads.map((it) => (
          <ThreadButton key={it.id} thread={it} onClick={setThreadId} />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button onClick={openModal} title={`+ ${t('common.button.createThread')}`} />
      </div>
      <ThreadCreateModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
