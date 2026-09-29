export type Role = 'STUDENT' | 'MENTOR' | 'CREATOR_ADMIN';

export type MembershipStatus = 'FREE' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: Role;
  points: number;
  level: number;
  levelTitle: string;
  nextLevelPoints: number;
  membershipStatus: MembershipStatus;
  joinedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: User;
  category: '🔥 전체글' | '📢 공식 공지' | '💡 질문 & 답변' | '🚀 챌린지 인증' | '🏆 성과 공유';
  title: string;
  content: string;
  isPinned: boolean;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  comments?: Comment[];
  createdAt: string;
}

export interface LessonResource {
  name: string;
  url: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  content?: string;
  resources?: LessonResource[];
  isCompleted: boolean;
  order: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  minLevel: number; // e.g. Level 3 required to unlock!
  isLocked: boolean;
  progressPercent: number;
  modules: CourseModule[];
}

export interface LiveEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  zoomLink: string;
  speaker: string;
  tag: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  pointsEarned: number;
}
