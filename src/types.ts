export type DayStatus = 'completed' | 'current' | 'upcoming' | 'missed';

export interface ChallengeDay {
  day: number;
  title: string;
  category: 'Frontend' | 'Backend' | 'Fullstack' | 'Database' | 'DevOps' | 'Algorithms' | 'System Design';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  description: string;
  mission: string;
  practiceTopics: {
    title: string;
    description: string;
    icon: string;
  }[];
  checklist: string[];
  status: DayStatus;
  githubUrl?: string;
  linkedInUrl?: string;
  completedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  category: 'Streak' | 'Commit' | 'Social' | 'Milestone';
}

export interface StudentProfile {
  name: string;
  college: string;
  track: string;
  avatarUrl: string;
  currentDay: number;
  streakDays: number;
  totalCompleted: number;
  githubSubmissions: number;
  linkedInPosts: number;
  bio?: string;
  githubHandle?: string;
  linkedInHandle?: string;
}

export type ViewModeState = 'normal' | 'firstDay' | 'missedDay' | 'emptyProfile';
