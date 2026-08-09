import React, { createContext, useContext, useState } from 'react';
import { CompletedJourney } from '../types';

export interface MockUser {
  id: string;
  name: string;
  username: string;
  role: string;
  email: string;
  track: string;
  currentDay: number;
  streak: number;
  completedDays: number;
  totalDays: number;
  totalBuilds: number;
  totalProofs: number;
  longestStreak: number;
  githubConnected: boolean;
  linkedinConnected: boolean;
  githubVerified: boolean;
  linkedinVerified: boolean;
  challengeCompleted: boolean;
  college?: string;
  avatarUrl?: string;
  githubHandle?: string;
  linkedinHandle?: string;
  completedJourneys?: CompletedJourney[];
}

export const defaultMockUser: MockUser = {
  id: 'user_001',
  name: 'Shravya',
  username: 'shravya',
  role: 'Frontend Developer',
  email: 'shravya@example.com',
  track: 'Frontend Development',
  currentDay: 12,
  streak: 12,
  completedDays: 11,
  totalDays: 60,
  totalBuilds: 11,
  totalProofs: 10,
  longestStreak: 32,
  githubConnected: true,
  linkedinConnected: true,
  githubVerified: true,
  linkedinVerified: true,
  challengeCompleted: false,
  college: 'Nitte Meenakshi Institute of Technology',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  githubHandle: 'shravyams',
  linkedinHandle: 'shravyamsalian',
  completedJourneys: [],
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: MockUser | null;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string, track: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  complete60DayChallenge: () => void;
  startNewChallenge: (newTrack: string) => void;
  updateUser: (fields: Partial<MockUser>) => void;
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

  const updateUser = (fields: Partial<MockUser>) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    handleSetAuthUser(updated);
  };

  const complete60DayChallenge = () => {
    if (!user) return;
    const existingJourneys = user.completedJourneys || [];
    const alreadySaved = existingJourneys.some((j) => j.track === user.track);
    
    let updatedJourneys = existingJourneys;
    if (!alreadySaved) {
      const newJourney: CompletedJourney = {
        id: `journey_${Date.now()}`,
        track: user.track || 'Frontend Development',
        completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        totalDays: 60,
        totalBuilds: 60,
        totalProofs: 60,
        longestStreak: 32,
        githubHandle: user.githubHandle || 'shravyams',
        linkedinHandle: user.linkedinHandle || 'shravyamsalian',
      };
      updatedJourneys = [newJourney, ...existingJourneys];
    }

    const completedUser: MockUser = {
      ...user,
      currentDay: 60,
      completedDays: 60,
      totalBuilds: 60,
      totalProofs: 60,
      longestStreak: Math.max(user.longestStreak || 32, 32),
      challengeCompleted: true,
      githubVerified: true,
      linkedinVerified: true,
      completedJourneys: updatedJourneys,
    };
    handleSetAuthUser(completedUser);
  };

  const startNewChallenge = (newTrack: string) => {
    if (!user) return;
    const newChallengeUser: MockUser = {
      ...user,
      track: newTrack,
      currentDay: 1,
      completedDays: 0,
      streak: 0,
      totalBuilds: 0,
      totalProofs: 0,
      challengeCompleted: false,
      githubVerified: false,
      linkedinVerified: false,
    };
    handleSetAuthUser(newChallengeUser);
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
      username: (name || 'shravya').toLowerCase().replace(/\s+/g, ''),
      role: track || 'Frontend Developer',
      email: email || 'shravya@example.com',
      track: track || 'Frontend Development',
      currentDay: 12,
      streak: 12,
      completedDays: 11,
      totalDays: 60,
      totalBuilds: 11,
      totalProofs: 10,
      longestStreak: 32,
      githubConnected: true,
      linkedinConnected: true,
      githubVerified: true,
      linkedinVerified: true,
      challengeCompleted: false,
      college: 'Nitte Meenakshi Institute of Technology',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      githubHandle: 'shravyams',
      linkedinHandle: 'shravyamsalian',
      completedJourneys: [],
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
        complete60DayChallenge,
        startNewChallenge,
        updateUser,
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
