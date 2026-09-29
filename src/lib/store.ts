import { User, Post, Course, LiveEvent, LeaderboardEntry } from './types';
import { getLevelInfo } from './levelEngine';

const STORAGE_KEY_USER = 'campfire_user_v1';
const STORAGE_KEY_POSTS = 'campfire_posts_v1';
const STORAGE_KEY_COURSES = 'campfire_courses_v1';

export const INITIAL_USER: User = {
  id: 'user-me',
  name: '배병욱',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  role: 'STUDENT',
  points: 120,
  level: 2,
  levelTitle: '장작 (Kindling)',
  nextLevelPoints: 150,
  membershipStatus: 'ACTIVE',
  joinedAt: '2026-09-01',
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'author-admin',
      name: '캠프파이어 마스터',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      role: 'CREATOR_ADMIN',
      points: 2500,
      level: 5,
      levelTitle: '불사조 (Phoenix)',
      nextLevelPoints: 9999,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-01-01',
    },
    category: '📢 공식 공지',
    title: '📢 [필독] 캠프파이어 멤버십 규칙 및 레벨업 보상 시스템 안내',
    content: `캠프파이어 멤버 여러분 환영합니다! 🔥

우리는 단순한 강의 사이트가 아닙니다. 함께 글을 쓰고, 인증하고, 피드백을 주고받으며 성장하는 "지식 창업 실행 공동체"입니다.

💡 포인트 획득 규칙:
• 커뮤니티 글 작성: +10점
• 다른 멤버 글에 댓글 작성: +5점
• 내 글/댓글이 좋아요 받을 때: +2점
• 클래스룸 강의 완강 시: +20점

레벨 3(150점)을 달성하시면 비공개 시크릿 마스터클래스 VOD가 자동으로 해금됩니다!`,
    isPinned: true,
    likeCount: 48,
    commentCount: 16,
    likedByMe: true,
    createdAt: '2026-09-28T10:00:00Z',
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        author: {
          id: 'user-2',
          name: '김성장',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          role: 'STUDENT',
          points: 180,
          level: 3,
          levelTitle: '모닥불 (Campfire)',
          nextLevelPoints: 400,
          membershipStatus: 'ACTIVE',
          joinedAt: '2026-09-10',
        },
        content: '열심히 활동해서 꼭 레벨 3 시크릿 코스 해금하겠습니다! 화이팅!',
        createdAt: '2026-09-28T11:20:00Z',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      id: 'user-3',
      name: '이수익',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'STUDENT',
      points: 420,
      level: 4,
      levelTitle: '화염 (Blaze)',
      nextLevelPoints: 1000,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-08-15',
    },
    category: '🏆 성과 공유',
    title: '🏆 [수익인증] 캠프파이어 강의 듣고 3주 만에 첫 유료 멤버 15명 모았습니다!',
    content: `네이버 카페와 단톡방 쓸 때는 매달 엑셀로 입금자 대조하고 수동 강퇴하느라 죽을 뻔했는데...
캠프파이어로 이전하고 토스 정기결제 연동하니까 삶의 질이 10배 올라갔습니다.

현재 월 49,000원 멤버십으로 15명 모집해서 월 73만 원의 순수 MRR이 생겼습니다.
동기부여 주신 모든 분들 감사합니다!`,
    isPinned: false,
    likeCount: 62,
    commentCount: 24,
    likedByMe: false,
    createdAt: '2026-09-29T08:30:00Z',
  },
  {
    id: 'post-3',
    author: {
      id: 'user-4',
      name: '박도전',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'STUDENT',
      points: 85,
      level: 2,
      levelTitle: '장작 (Kindling)',
      nextLevelPoints: 150,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-09-20',
    },
    category: '🚀 챌린지 인증',
    title: '🚀 3일차 챌린지: 나만의 지식 커뮤니티 슬로건과 커리큘럼 초안 완성!',
    content: `[나의 지식 커뮤니티 기획안]
• 타깃: 퇴근 후 1인 창업을 준비하는 직장인 개발자
• 슬로건: "코딩만 하지 말고 첫 유료 고객 1명을 만드는 실전 클럽"
• 1주차 미션: 랜딩페이지 1장 만들고 사전 예약 받기

피드백 편하게 남겨주시면 감사하겠습니다!`,
    isPinned: false,
    likeCount: 19,
    commentCount: 7,
    likedByMe: true,
    createdAt: '2026-09-29T13:10:00Z',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: '0원에서 시작하는 지식 창업 & 커뮤니티 설계 마스터클래스',
    description: '나만의 전문성을 월 정기구독(MRR) 비즈니스로 전환하는 4단계 실전 로드맵',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    minLevel: 1,
    isLocked: false,
    progressPercent: 50,
    modules: [
      {
        id: 'mod-1',
        courseId: 'course-1',
        title: '모듈 1: 돈이 되는 커뮤니티 주제 발굴',
        order: 1,
        lessons: [
          {
            id: 'les-1',
            moduleId: 'mod-1',
            title: '1강: 왜 강의 VOD만 팔면 90% 실패하는가? (커뮤니티의 시대)',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '14:20',
            content: '단순 강의의 완강률은 5%에 불과합니다. 회원이 서로 소통하고 인증하는 게이미피케이션 커뮤니티를 구축해야 구독이 유지됩니다.',
            isCompleted: true,
            order: 1,
          },
          {
            id: 'les-2',
            moduleId: 'mod-1',
            title: '2강: 타깃 고객의 "진짜 결핍"을 찾는 3가지 질문 프레임워크',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '18:45',
            content: '고객이 돈을 지불하는 것은 정보가 아니라 "시간 단축"과 "결과 보장"입니다.',
            isCompleted: true,
            order: 2,
          },
        ],
      },
      {
        id: 'mod-2',
        courseId: 'course-1',
        title: '모듈 2: 토스 정기결제 & 자동 권한 제어 세팅',
        order: 2,
        lessons: [
          {
            id: 'les-3',
            moduleId: 'mod-2',
            title: '3강: 단톡방 수동 강퇴 끝내기: 결제 만료 시 자동 차단 아키텍처',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '21:10',
            content: '토스페이먼츠 웹훅을 연동하여 결제 성공 시 자동 입장, 미납 시 3일 후 자동 권한 박탈 플로우를 구성합니다.',
            isCompleted: false,
            order: 1,
          },
          {
            id: 'les-4',
            moduleId: 'mod-2',
            title: '4강: 카카오톡 알림톡으로 접속률 3배 끌어올리기',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '16:05',
            content: '새 강의가 올라왔을 때와 챌린지 인증 독려 알림톡 템플릿 실무.',
            isCompleted: false,
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'course-2',
    title: '🔥 [레벨 3 시크릿 코스] 월 1천만 원 구독형 멤버십 스케일업 시스템',
    description: '커뮤니티 활동 점수 150점(레벨 3)을 달성한 열정 멤버에게만 무료로 자동 해금되는 비공개 특강',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    minLevel: 3,
    isLocked: true, // User is Level 2, so this is locked!
    progressPercent: 0,
    modules: [
      {
        id: 'mod-secret-1',
        courseId: 'course-2',
        title: '시크릿 모듈: 멤버 100명 ➔ 500명 돌파 복리 전략',
        order: 1,
        lessons: [
          {
            id: 'les-sec-1',
            moduleId: 'mod-secret-1',
            title: '비공개 강의: 유료 회원 이탈률(Churn)을 3% 미만으로 묶어두는 4대 심리 장치',
            videoUrl: '',
            duration: '35:00',
            content: '레벨 3을 달성하시면 시크릿 영상이 즉시 열립니다.',
            isCompleted: false,
            order: 1,
          },
        ],
      },
    ],
  },
];

export const INITIAL_EVENTS: LiveEvent[] = [
  {
    id: 'ev-1',
    title: '🎙 [실시간 라이브] 9월 첫 주 유료 멤버 모집 클리닉 & 1:1 Q&A',
    description: '파운더와 함께 줌(Zoom)으로 직접 화면을 공유하며 내 커뮤니티 랜딩페이지와 가격 정책을 피드백 받습니다.',
    date: '2026-10-02 (목)',
    time: '오후 09:00 ~ 10:30',
    zoomLink: 'https://zoom.us/j/campfire-live-sample',
    speaker: '캠프파이어 마스터',
    tag: '온라인 줌 라이브',
  },
  {
    id: 'ev-2',
    title: '🚀 10월 30일 챌린지 킥오프 데이',
    description: '한 달간 매일 1개의 챌린지 인증을 남기고 레벨 4로 도약하는 성장 챌린지 킥오프 모임입니다.',
    date: '2026-10-05 (월)',
    time: '오후 08:00',
    zoomLink: 'https://zoom.us/j/campfire-kickoff',
    speaker: '커뮤니티 팀',
    tag: '챌린지 킥오프',
  },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: 'lead-1',
      name: '최고성장',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'STUDENT',
      points: 840,
      level: 4,
      levelTitle: '화염 (Blaze)',
      nextLevelPoints: 1000,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-08-01',
    },
    pointsEarned: 840,
  },
  {
    rank: 2,
    user: {
      id: 'lead-2',
      name: '이수익',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'STUDENT',
      points: 420,
      level: 4,
      levelTitle: '화염 (Blaze)',
      nextLevelPoints: 1000,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-08-15',
    },
    pointsEarned: 420,
  },
  {
    rank: 3,
    user: {
      id: 'lead-3',
      name: '김성장',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'STUDENT',
      points: 180,
      level: 3,
      levelTitle: '모닥불 (Campfire)',
      nextLevelPoints: 400,
      membershipStatus: 'ACTIVE',
      joinedAt: '2026-09-10',
    },
    pointsEarned: 180,
  },
  {
    rank: 4,
    user: INITIAL_USER,
    pointsEarned: 120,
  },
];

export function getStoredUser(): User {
  if (typeof window === 'undefined') return INITIAL_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    const parsed = JSON.parse(raw);
    const info = getLevelInfo(parsed.points || 0);
    return { ...parsed, level: info.level, levelTitle: info.title, nextLevelPoints: info.nextPoints };
  } catch {
    return INITIAL_USER;
  }
}

export function saveStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

export function getStoredPosts(): Post[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_POSTS;
  }
}

export function saveStoredPosts(posts: Post[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
}

export function getStoredCourses(): Course[] {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COURSES;
  }
}

export function saveStoredCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
}
