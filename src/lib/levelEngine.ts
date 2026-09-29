import { User } from './types';

export interface LevelInfo {
  level: number;
  title: string;
  minPoints: number;
  nextPoints: number;
  perk: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: '불씨 (Ember)', minPoints: 0, nextPoints: 50, perk: '모든 기본 강의 및 커뮤니티 열람 권한' },
  { level: 2, title: '장작 (Kindling)', minPoints: 50, nextPoints: 150, perk: '커뮤니티 전용 커스텀 뱃지 및 프로필 강조' },
  { level: 3, title: '모닥불 (Campfire)', minPoints: 150, nextPoints: 400, perk: '🔥 [시크릿 코스] 월 1천만 원 자동화 마스터클래스 자동 해금' },
  { level: 4, title: '화염 (Blaze)', minPoints: 400, nextPoints: 1000, perk: '🎙 월간 비공개 라이브 Q&A 마이크 발언권 및 질문 우선권' },
  { level: 5, title: '불사조 (Phoenix)', minPoints: 1000, nextPoints: 9999, perk: '👑 크리에이터 파운더와 1:1 비즈니스 오딧 코칭권 (30분)' },
];

export function getLevelInfo(points: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function awardPoints(user: User, amount: number): { updatedUser: User; isLevelUp: boolean; newPerk?: string } {
  const newPoints = user.points + amount;
  const currentLevelInfo = getLevelInfo(user.points);
  const newLevelInfo = getLevelInfo(newPoints);

  const isLevelUp = newLevelInfo.level > currentLevelInfo.level;

  const updatedUser: User = {
    ...user,
    points: newPoints,
    level: newLevelInfo.level,
    levelTitle: newLevelInfo.title,
    nextLevelPoints: newLevelInfo.nextPoints,
  };

  return {
    updatedUser,
    isLevelUp,
    newPerk: isLevelUp ? newLevelInfo.perk : undefined,
  };
}
