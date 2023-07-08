import { PropsWithChildren, createContext, useCallback, useState } from 'react';

import { AppApi } from '../apis';
import { Thread, User } from '../interfaces';
import { createUseContext } from '../utils';
import { useWebSocket } from './WebSocketContext';

interface AppContextProps {
  threads: Thread[];
  isThreadsSidebarOpen: boolean;
  toggleThreadsSidebar: () => void;
  fetchThreads: () => void;
  createThread: (title: string) => Promise<void>;
  updateThread: (id: string, title: string) => Promise<void>;
  deleteThread: (id: string) => Promise<void>;
  createMessage: (threadId: string, text: string) => Promise<void>;
  updateMessage: (id: string, text: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

const AppContext = createContext<null | AppContextProps>(null);
AppContext.displayName = 'AppContext';

type AppProviderProps = PropsWithChildren<{
  user: User;
}>;

export const AppProvider = ({ user, children }: AppProviderProps) => {
  const { updateMessage: updateWebSocketMessage, deleteMessage: deleteWebSocketMessage } = useWebSocket();
  const [api] = useState(new AppApi(user.id));
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isThreadsSidebarOpen, setThreadsSidebarOpen] = useState(false);

  const toggleThreadsSidebar = useCallback(
    () => setThreadsSidebarOpen((isThreadsSidebarOpen) => !isThreadsSidebarOpen),
    [],
  );

  const fetchThreads = useCallback(async () => {
    try {
      const threads = await api.getThreads();
      setThreads(threads);
    } catch {
      return;
    }
  }, [api]);

  const createThread = useCallback(
    async (title: string) => {
      try {
        const thread = await api.createThread(title);
        setThreads((threads) => [...threads, thread]);
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api],
  );

  const updateThread = useCallback(
    async (id: string, title: string) => {
      try {
        const thread = await api.updateThread(id, title);
        setThreads((threads) => threads.map((it) => (it.id === id ? thread : it)));
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api],
  );

  const deleteThread = useCallback(
    async (id: string) => {
      try {
        await api.deleteThread(id);
        setThreads((threads) => threads.filter((it) => it.id !== id));
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api],
  );

  const createMessage = useCallback(
    async (threadId: string, text: string) => {
      try {
        await api.createMessage({
          checkSum: user.id,
          displayName: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
          }),
          text,
          threadId,
        });
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api, user.id, user.firstName, user.lastName],
  );

  const updateMessage = useCallback(
    async (id: string, text: string) => {
      try {
        const message = await api.updateMessage(id, text);
        updateWebSocketMessage(message);
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api, updateWebSocketMessage],
  );

  const deleteMessage = useCallback(
    async (id: string) => {
      try {
        await api.deleteMessage(id);
        deleteWebSocketMessage(id);
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    },
    [api, deleteWebSocketMessage],
  );

  return (
    <AppContext.Provider
      value={{
        threads,
        isThreadsSidebarOpen,
        toggleThreadsSidebar,
        fetchThreads,
        createThread,
        updateThread,
        deleteThread,
        createMessage,
        updateMessage,
        deleteMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = createUseContext(AppContext);
