import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';

import { AuthApi } from '../apis';
import { User } from '../interfaces';
import { Store, createUseContext } from '../utils';

interface AuthContextProps {
  user?: User;
  hasLoginError: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<null | AuthContextProps>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [api] = useState(new AuthApi());
  const [store] = useState(new Store<User>('user'));
  const [user, setUser] = useState<User | undefined>(undefined);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const user = store.getItem();
    if (user) {
      setUser(user);
    }
    // eslint-disable-next-line
  }, []);

  const login = useCallback(
    (email: string) => {
      api
        .login(email)
        .then((user) => {
          setHasLoginError(false);
          setUser(user);
          store.setItem(user);
        })
        .catch(() => {
          setHasLoginError(true);
        });
    },
    [api, store],
  );

  const logout = useCallback(() => {
    setUser(undefined);
    store.removeItem();
  }, [store]);

  return (
    <AuthContext.Provider
      value={{
        user,
        hasLoginError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = createUseContext(AuthContext);
