import React, { createContext, useContext, useState } from 'react';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  track: string;
  currentDay: number;
  streak: number;
  completedDays: number;
  totalDays: number;
  githubConnected: boolean;
  linkedinConnected: boolean;
  college?: string;
  avatarUrl?: string;
}

export const defaultMockUser: MockUser = {
  id: 'user_001',
  name: 'Shravya',
  email: 'shravya@example.com',
  track: 'Frontend Development',
  currentDay: 12,
  streak: 12,
  completedDays: 11,
  totalDays: 60,
  githubConnected: true,
  linkedinConnected: true,
  college: 'Nitte Meenakshi Institute of Technology',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: MockUser | null;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string, track: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'abtalks_is_authenticated';
const USER_KEY = 'abtalks_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [user, setUser] = useState<MockUser | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultMockUser;
      }
    }
    return isAuthenticated ? defaultMockUser : null;
  });

  const handleSetAuthUser = (newUser: MockUser | null) => {
    if (newUser) {
      setIsAuthenticated(true);
      setUser(newUser);
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(USER_KEY);
    }
  };

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 900));
    const newUser: MockUser = {
      ...defaultMockUser,
      email: email || defaultMockUser.email,
      name: email && email.includes('@') ? email.split('@')[0].replace('.', ' ') : defaultMockUser.name,
    };
    handleSetAuthUser(newUser);
    return true;
  };

  const signUp = async (name: string, email: string, pass: string, track: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 1000));
    const newUser: MockUser = {
      id: `user_${Date.now().toString().slice(-4)}`,
      name: name || 'Shravya',
      email: email || 'shravya@example.com',
      track: track || 'Frontend Development',
      currentDay: 12,
      streak: 12,
      completedDays: 11,
      totalDays: 60,
      githubConnected: true,
      linkedinConnected: true,
      college: 'Nitte Meenakshi Institute of Technology',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    };
    handleSetAuthUser(newUser);
    return true;
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 900));
    const googleUser: MockUser = {
      ...defaultMockUser,
      name: 'Shravya',
      email: 'shravya@gmail.com',
    };
    handleSetAuthUser(googleUser);
    return true;
  };

  const signOut = () => {
    handleSetAuthUser(null);
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 600));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
