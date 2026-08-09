import { ChallengeDay, Achievement, StudentProfile } from '../types';

export const initialProfile: StudentProfile = {
  name: 'Shravya',
  college: 'Nitte Meenakshi Institute of Technology',
  track: 'Full Stack Development',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  currentDay: 12,
  streakDays: 12,
  totalCompleted: 11,
  githubSubmissions: 11,
  linkedInPosts: 10,
  bio: '60-Day builder crafting full-stack web products & REST APIs.',
  githubHandle: 'shravyams',
  linkedInHandle: 'shravyamsalian',
};

export const emptyProfile: StudentProfile = {
  name: '',
  college: '',
  track: 'Select Track',
  avatarUrl: '',
  currentDay: 1,
  streakDays: 0,
  totalCompleted: 0,
  githubSubmissions: 0,
  linkedInPosts: 0,
  bio: '',
  githubHandle: '',
  linkedInHandle: '',
};

export const achievementsData: Achievement[] = [
  {
    id: 'first_commit',
    title: 'First Commit',
    description: 'Submitted your first GitHub proof on Day 01',
    unlocked: true,
    unlockedAt: 'Day 1',
    iconName: 'GitCommit',
    category: 'Commit',
  },
  {
    id: 'streak_7',
    title: '7 Day Streak',
    description: 'Maintained 7 consecutive days of building & publishing',
    unlocked: true,
    unlockedAt: 'Day 7',
    iconName: 'Flame',
    category: 'Streak',
  },
  {
    id: 'public_builder',
    title: 'Public Builder',
    description: 'Published 10 LinkedIn proof posts documenting your journey',
    unlocked: true,
    unlockedAt: 'Day 10',
    iconName: 'Share2',
    category: 'Social',
  },
  {
    id: 'halfway_there',
    title: 'Halfway There',
    description: 'Complete 30 consecutive days of proof',
    unlocked: false,
    iconName: 'Award',
    category: 'Milestone',
  },
  {
    id: 'streak_30',
    title: '30 Day Streak',
    description: 'Unstoppable consistency for 30 full days',
    unlocked: false,
    iconName: 'Zap',
    category: 'Streak',
  },
  {
    id: 'legend_60',
    title: '60-Day Finisher',
    description: 'Completed the full 60-day ABTalks coding challenge',
    unlocked: false,
    iconName: 'Trophy',
    category: 'Milestone',
  },
];

export const generate60Days = (currentDay: number = 12, isMissedDay: boolean = false): ChallengeDay[] => {
  const categories: ChallengeDay['category'][] = ['Frontend', 'Backend', 'Fullstack', 'Database', 'DevOps', 'Algorithms', 'System Design'];
  
  return Array.from({ length: 60 }, (_, index) => {
    const dayNumber = index + 1;
    let status: ChallengeDay['status'] = 'upcoming';

    if (dayNumber < currentDay) {
      if (isMissedDay && dayNumber === 11) {
        status = 'missed';
      } else {
        status = 'completed';
      }
    } else if (dayNumber === currentDay) {
      status = 'current';
    }

    const category = categories[(dayNumber - 1) % categories.length];
    
    // Day 12 detailed payload
    if (dayNumber === 12) {
      return {
        day: 12,
        title: 'Build a REST API with Authentication',
        category: 'Backend',
        difficulty: 'Intermediate',
        estimatedMinutes: 60,
        description: 'Create a secure Express REST API featuring JWT authentication, user registration, bcrypt password hashing, and protected route middleware.',
        mission: 'Build a REST API that allows users to register, log in safely, access protected user profile endpoints, and receive structured standard JSON error responses.',
        practiceTopics: [
          { title: 'RESTful Architecture', description: 'Designing clean resource routes and HTTP verb conventions', icon: 'Server' },
          { title: 'JWT Authentication', description: 'Signing and verifying JSON Web Tokens with secret rotation', icon: 'Key' },
          { title: 'Express Middleware', description: 'Intercepting requests for validation and Auth headers', icon: 'ShieldCheck' },
          { title: 'Error Handling', description: 'Standardized async try/catch handlers & custom error classes', icon: 'AlertCircle' },
        ],
        checklist: [
          'Registration endpoint (/api/auth/register) validates input & hashes password',
          'Login endpoint (/api/auth/login) returns JWT token on success',
          'Protected route middleware rejects unauthorized request headers with 401',
          'Async error handling returns structured JSON errors with status codes',
          'Project code is committed and pushed to public GitHub repository',
        ],
        status,
        githubUrl: status === 'completed' ? 'https://github.com/shravyams/abtalks-day12-rest-auth' : '',
        linkedInUrl: status === 'completed' ? 'https://linkedin.com/posts/shravyams_abtalks-day12-restapi' : '',
      };
    }

    // Day 01 detailed payload
    if (dayNumber === 1) {
      return {
        day: 1,
        title: 'Setup Developer Workspace & First CLI Build',
        category: 'Frontend',
        difficulty: 'Beginner',
        estimatedMinutes: 45,
        description: 'Initialize your 60-day repository, structure clean folder architecture, and build a CLI portfolio generator.',
        mission: 'Set up your core project directory, configure Git version control, and build an interactive Node.js CLI script that prints your 60-day challenge manifesto.',
        practiceTopics: [
          { title: 'Git & GitHub Workflow', description: 'Repository initialization, branching, and commit conventions', icon: 'GitBranch' },
          { title: 'Node.js CLI Basics', description: 'Reading process arguments and formatting terminal output', icon: 'Terminal' },
        ],
        checklist: [
          'GitHub repository initialized with README and .gitignore',
          'CLI script created and tested in terminal',
          'First commit pushed to main branch',
        ],
        status: currentDay === 1 ? 'current' : status,
        githubUrl: dayNumber < currentDay ? 'https://github.com/shravyams/abtalks-60day-journey' : '',
        linkedInUrl: dayNumber < currentDay ? 'https://linkedin.com/posts/shravyams_abtalks-day01' : '',
      };
    }

    // Generic challenges for days 2..60
    const sampleTitles = [
      'Design a Responsive Navbar with Framer Motion',
      'Build a Custom React Hook for Local Storage Sync',
      'Implement Debounced Search Input Component',
      'Construct a PostgreSQL Database Schema with Drizzle',
      'Build an In-Memory Caching Service with Redis',
      'Deploy a Dockerized Node Application to Cloud Run',
      'Implement Rate Limiting Middleware with Sliding Window',
      'Build a Real-Time WebSocket Chat Component',
      'Design an Interactive Kanban Task Board',
      'Optimize React Bundle Size with Lazy Loading & Suspense',
      'Implement OAuth 2.0 Google Sign-In Flow',
      'Build a Stripe Payment Webhook Listener',
      'Implement Vector Search with Embeddings API',
      'Design a File Upload Pipeline with S3 Signed URLs',
      'Construct a Infinite Scroll Virtualized List',
      'Build a Custom Markdown Renderer Component',
      'Implement Full-Text Search with Postgres Trigrams',
      'Design a Dark Mode Theme Engine with CSS Variables',
      'Build a Notification Bell with Unread Badge State',
      'Implement Role-Based Access Control (RBAC) System',
    ];

    const titleIndex = (dayNumber - 1) % sampleTitles.length;
    const title = sampleTitles[titleIndex];

    return {
      day: dayNumber,
      title: `Day ${dayNumber.toString().padStart(2, '0')}: ${title}`,
      category,
      difficulty: dayNumber <= 20 ? 'Beginner' : dayNumber <= 45 ? 'Intermediate' : 'Advanced',
      estimatedMinutes: 45 + (dayNumber % 3) * 15,
      description: `Complete Day ${dayNumber} challenge focusing on core ${category} patterns, clean code principles, and real-world implementation.`,
      mission: `Master ${category} fundamentals by building a practical module and publishing proof on GitHub and LinkedIn.`,
      practiceTopics: [
        { title: `${category} Fundamentals`, description: `Core concepts and execution patterns for Day ${dayNumber}`, icon: 'Code' },
        { title: 'Clean Code Practices', description: 'Type safety, modular architecture, and error resilience', icon: 'CheckCircle' },
      ],
      checklist: [
        `Complete core ${category} code implementation`,
        'Verify edge cases and write clean inline documentation',
        'Push commit to GitHub & share building update on LinkedIn',
      ],
      status,
      githubUrl: dayNumber < currentDay && status !== 'missed' ? `https://github.com/shravyams/abtalks-day${dayNumber}` : '',
      linkedInUrl: dayNumber < currentDay && status !== 'missed' ? `https://linkedin.com/posts/shravyams_abtalks-day${dayNumber}` : '',
    };
  });
};
