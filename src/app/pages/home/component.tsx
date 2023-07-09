import { useEffect } from 'react';

import { MessageList, NavBar, Page, SendMessage, ThreadsSidebar } from '../../components';
import { useApp, useMessages } from '../../contexts';

export const Home = () => {
  const { fetchThreads } = useApp();
  const { threadId } = useMessages();

  useEffect(() => {
    fetchThreads();
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <NavBar />
      <div className="flex w-full h-[calc(100%-3rem)]">
        <ThreadsSidebar />
        {threadId && (
          <div className="flex flex-col max-md:w-full md:w-[calc(100%-20rem)] h-full bg-white">
            <MessageList />
            <SendMessage threadId={threadId} />
          </div>
        )}
      </div>
    </Page>
  );
};
