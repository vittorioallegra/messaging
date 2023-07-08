import { useEffect } from 'react';

import { MessageList, NavBar, Page, SendMessage, ThreadsSidebar } from '../../components';
import { useApp, useWebSocket } from '../../contexts';

export const Home = () => {
  const { fetchThreads } = useApp();
  const { threadId } = useWebSocket();

  useEffect(() => {
    fetchThreads();
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <NavBar />
      <div className="flex w-full h-full">
        <ThreadsSidebar />
        {threadId && (
          <div className="flex flex-col max-md:w-full md:w-[calc(100%-320px)] h-full bg-white">
            <MessageList />
            <SendMessage threadId={threadId} />
          </div>
        )}
      </div>
    </Page>
  );
};
