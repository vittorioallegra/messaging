import { useCallback, useEffect, useState } from 'react';

import { useAuth, useMessages } from '../../contexts';
import { Message } from '../../interfaces';
import { MessageUpdateModal } from '../modals';
import { MessageBubble } from './components';

export const MessageList = () => {
  const { user } = useAuth();
  const { messages } = useMessages();
  const [message, setMessage] = useState<Message | undefined>(undefined);

  const openModal = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setMessage([...messages].reverse().find((it) => it.checkSum === user?.id));
      }
    },
    [messages, user?.id],
  );
  const closeModal = useCallback(() => setMessage(undefined), []);

  useEffect(() => {
    document.addEventListener('keydown', openModal, true);
    return () => {
      document.removeEventListener('keydown', openModal, true);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto flex-1 p-2 flex flex-col gap-2 bg-white">
      {messages.map((it) => (
        <MessageBubble key={it.id} message={it} />
      ))}
      {message && <MessageUpdateModal isOpen={true} message={message} onClose={closeModal} />}
    </div>
  );
};
