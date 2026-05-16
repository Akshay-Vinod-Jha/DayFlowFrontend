import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import httpClient from '../services/httpClient';
import { fetchCurrentUser, loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(null);

const STORAGE_KEY = 'dayflow_auth';

const setAuthHeader = (token) => {
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const syncStorage = (nextToken, nextUser) => {
    if (!nextToken || !nextUser) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: nextToken,
        user: nextUser,
      })
    );
  };

  const applySession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    setAuthHeader(nextToken);
    syncStorage(nextToken, nextUser);
  };

  const clearSession = () => {
    setToken('');
    setUser(null);
    setAuthHeader('');
    syncStorage(null, null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
          setIsBooting(false);
          return;
        }

        const parsed = JSON.parse(saved);

        if (!parsed?.token) {
          setIsBooting(false);
          return;
        }

        setAuthHeader(parsed.token);
        const response = await fetchCurrentUser();

        applySession(parsed.token, response.data.user);
      } catch (_error) {
        clearSession();
      } finally {
        setIsBooting(false);
      }
    };

    restoreSession();
  }, []);

  const register = async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await registerUser(payload);
      applySession(response.data.token, response.data.user);
      toast.success('Welcome to DayFlow.');
      return response.data.user;
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed.';
      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const login = async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await loginUser(payload);
      applySession(response.data.token, response.data.user);
      toast.success('Logged in successfully.');
      return response.data.user;
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed.';
      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    clearSession();
    toast.success('You are logged out.');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isBooting,
      isSubmitting,
      isAuthenticated: Boolean(user && token),
      register,
      login,
      logout,
    }),
    [user, token, isBooting, isSubmitting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider.');
  }
  return context;
};
