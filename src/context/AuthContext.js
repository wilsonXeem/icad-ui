'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '@/lib/auth';
import { getApiErrorMessage } from '@/lib/api';

const AuthContext = createContext(null);
const SESSION_HINT_COOKIE = 'icad_session';

const setSessionHint = () => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${SESSION_HINT_COOKIE}=active; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
};

const clearSessionHint = () => {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${SESSION_HINT_COOKIE}=; path=/; max-age=0; samesite=lax`;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const commitAuthenticatedUser = (nextUser) => {
    setUser(nextUser);
    setSessionHint();
    return nextUser;
  };

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      return commitAuthenticatedUser(response.data.user);
    } catch (error) {
      setUser(null);
      clearSessionHint();
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (payload) => {
    setIsAuthenticating(true);

    try {
      const response = await loginUser(payload);
      const nextUser = commitAuthenticatedUser(response.data.user);
      return { success: true, user: nextUser };
    } catch (error) {
      clearSessionHint();
      return {
        success: false,
        message: getApiErrorMessage(error, 'Unable to log in.'),
      };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signup = async (payload) => {
    setIsAuthenticating(true);

    try {
      const response = await registerUser(payload);
      const nextUser = commitAuthenticatedUser(response.data.user);
      return { success: true, user: nextUser };
    } catch (error) {
      clearSessionHint();
      return {
        success: false,
        message: getApiErrorMessage(error, 'Unable to create your account.'),
      };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Keep the local session cleared even if the network call fails.
    } finally {
      setUser(null);
      clearSessionHint();
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticating,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, isLoading, isAuthenticating],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
