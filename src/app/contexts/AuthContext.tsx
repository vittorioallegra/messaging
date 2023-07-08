import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';

import { AuthApi } from '../apis';
import { User } from '../interfaces';
import { createUseContext } from '../utils';

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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = useCallback(
    (email: string) => {
      api
        .login(email)
        .then((user) => {
          setHasLoginError(false);
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(() => {
          setHasLoginError(true);
        });
    },
    [api],
  );

  const logout = useCallback(() => {
    setUser(undefined);
    localStorage.removeItem('user');
  }, []);

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
