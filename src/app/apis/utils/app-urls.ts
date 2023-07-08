function relativeUrl(relative: string): URL {
  return new URL(relative, 'http://confi-codin-1xbkniq7crrwz-645813469.us-west-2.elb.amazonaws.com');
}

export const ApiEndpoint = {
  login: () => relativeUrl('/users/authenticate'),

  getThreads: () => relativeUrl('/threads'),
  getThread: (id: string) => relativeUrl(`/threads/${id}`),
  createThread: () => relativeUrl('/threads/new'),
  updateThread: (id: string) => relativeUrl(`/threads/${id}`),
  deleteThread: (id: string) => relativeUrl(`/threads/${id}`),

  createMessage: () => relativeUrl('/messages/new'),
  updateMessage: (id: string) => relativeUrl(`/messages/${id}`),
  deleteMessage: (id: string) => relativeUrl(`/messages/${id}`),
};
