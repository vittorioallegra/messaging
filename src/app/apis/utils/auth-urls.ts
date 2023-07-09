function relativeUrl(relative: string): URL {
  return new URL(relative, 'http://confi-codin-1xbkniq7crrwz-645813469.us-west-2.elb.amazonaws.com');
}

export const AuthEndpoint = {
  login: () => relativeUrl('/users/authenticate'),
};
