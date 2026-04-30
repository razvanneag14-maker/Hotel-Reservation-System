import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser } from '../types/users';
import {
  MOCK_ADMIN_CREDENTIALS,
  MOCK_ADMIN_USER,
  MOCK_GUEST_CREDENTIALS,
  MOCK_GUEST_USER,
} from '../constants/mockData';

interface StoredAccount {
  email: string;
  password: string;
  name: string;
  role: 'guest';
}

const STORAGE_KEY = 'hotel_registered_users';

const getStoredAccounts = (): StoredAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
};

interface AuthContextValue {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (firstName: string, lastName: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string) => {
    if (
      email === MOCK_ADMIN_CREDENTIALS.email &&
      password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      setCurrentUser(MOCK_ADMIN_USER);
      return { success: true, message: 'Welcome back, Admin!' };
    }
    if (
      email === MOCK_GUEST_CREDENTIALS.email &&
      password === MOCK_GUEST_CREDENTIALS.password
    ) {
      setCurrentUser(MOCK_GUEST_USER);
      return { success: true, message: 'Welcome, Maria!' };
    }

    const stored = getStoredAccounts();
    const match = stored.find((a) => a.email === email && a.password === password);
    if (match) {
      const user: AuthUser = { email: match.email, name: match.name, role: 'guest' };
      setCurrentUser(user);
      return { success: true, message: `Welcome, ${match.name}!` };
    }

    return { success: false, message: 'Invalid email or password.' };
  }, []);

  const register = useCallback((firstName: string, lastName: string, email: string, password: string) => {
    if (
      email === MOCK_ADMIN_CREDENTIALS.email ||
      email === MOCK_GUEST_CREDENTIALS.email
    ) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const stored = getStoredAccounts();
    if (stored.some((a) => a.email === email)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const fullName = `${firstName} ${lastName}`;
    const newAccount: StoredAccount = { email, password, name: fullName, role: 'guest' };
    saveAccounts([...stored, newAccount]);

    const user: AuthUser = { email, name: fullName, role: 'guest' };
    setCurrentUser(user);
    return { success: true, message: `Welcome, ${firstName}! Your account has been created.` };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value: AuthContextValue = {
    currentUser,
    isAuthenticated: currentUser !== null,
    isAdmin: currentUser?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useStoreAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useStoreAuth must be used within an AuthProvider');
  }
  return context;
};
