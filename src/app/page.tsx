'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Post,
  Course,
  LiveEvent,
  LeaderboardEntry,
} from '../lib/types';
import { awardPoints } from '../lib/levelEngine';
import {
  INITIAL_EVENTS,
  INITIAL_LEADERBOARD,
  getStoredUser,
  saveStoredUser,
  getStoredPosts,
  saveStoredPosts,
  getStoredCourses,
  saveStoredCourses,
} from '../lib/store';
import { Navbar } from '../components/Navbar';
import { CommunityFeed } from '../components/CommunityFeed';
import { ClassroomView } from '../components/ClassroomView';
import { CalendarView } from '../components/CalendarView';
import { LeaderboardView } from '../components/LeaderboardView';
import { MembershipModal } from '../components/MembershipModal';
import { LevelUpModal } from '../components/LevelUpModal';
import { Flame } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'community' | 'classroom' | 'calendar' | 'leaderboard'>('community');
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [events] = useState<LiveEvent[]>(INITIAL_EVENTS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  // Modals
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{
    isOpen: boolean;
    newLevel: number;
    newTitle: string;
    perk?: string;
  }>({
    isOpen: false,
    newLevel: 1,
    newTitle: '',
  });

  // Client-side initialization from localStorage
  useEffect(() => {
    const loadedUser = getStoredUser();
    const loadedPosts = getStoredPosts();
    const loadedCourses = getStoredCourses();

    setUser(loadedUser);
    setPosts(loadedPosts);
    setCourses(loadedCourses);
  }, []);

  // Sync leaderboard when user changes
  useEffect(() => {
    if (!user) return;
    setLeaderboard((prev) => {
      const updated = prev.map((entry) => {
        if (entry.user.id === user.id) {
          return {
            ...entry,
            user,
            pointsEarned: user.points,
          };
        }
        return entry;
      });
      // Sort descending by points
      return updated.sort((a, b) => b.pointsEarned - a.pointsEarned).map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));
    });
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0c10] text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <Flame className="h-10 w-10 text-orange-500 animate-bounce" />
          <p className="text-sm font-semibold tracking-wide">Campfire OS 부팅 중...</p>
        </div>
      </div>
    );
  }

  // Point award engine with automatic level calculation
  const addPoints = (amount: number) => {
    const { updatedUser, isLevelUp, newPerk } = awardPoints(user, amount);

    setUser(updatedUser);
    saveStoredUser(updatedUser);

    // Level up event trigger!
    if (isLevelUp) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#eab308', '#ec4899', '#3b82f6'],
      });
      setLevelUpData({
        isOpen: true,
        newLevel: updatedUser.level,
        newTitle: updatedUser.levelTitle,
        perk: newPerk,
      });
    }
  };

  // Community Feed Handlers
  const handleAddPost = (newPostData: { title: string; content: string; category: Post['category'] }) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: user,
      category: newPostData.category,
      title: newPostData.title,
      content: newPostData.content,
      isPinned: false,
      likeCount: 0,
      commentCount: 0,
      likedByMe: false,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveStoredPosts(updatedPosts);

    // +10 points reward
    addPoints(10);
  };

  const handleToggleLike = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const nextLiked = !post.likedByMe;
        return {
          ...post,
          likedByMe: nextLiked,
          likeCount: nextLiked ? post.likeCount + 1 : Math.max(0, post.likeCount - 1),
        };
      }
      return post;
    });

    setPosts(updated);
    saveStoredPosts(updated);

    // +2 points reward on like
    addPoints(2);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      postId,
      author: user,
      content: commentText,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      likedByMe: false,
    };

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          commentCount: post.commentCount + 1,
          comments: [...(post.comments || []), newComment],
        };
      }
      return post;
    });

    setPosts(updated);
    saveStoredPosts(updated);

    // +5 points reward
    addPoints(5);
  };

  // Classroom Lesson Complete Handler
  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    const updated = courses.map((course) => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, isCompleted: true };
            }
            return lesson;
          }),
        }));

        const totalLessons = updatedModules.flatMap((m) => m.lessons).length;
        const completedLessons = updatedModules
          .flatMap((m) => m.lessons)
          .filter((l) => l.isCompleted).length;
        const progressPercent = Math.round((completedLessons / totalLessons) * 100);

        return {
          ...course,
          modules: updatedModules,
          progressPercent,
        };
      }
      return course;
    });

    setCourses(updated);
    saveStoredCourses(updated);

    // +20 points reward!
    addPoints(20);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenNewPost={() => {
          setActiveTab('community');
          // Smooth scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMembership={() => setIsMembershipOpen(true)}
      />

      {/* Community Banner / Hero Header */}
      <div className="border-b border-white/5 bg-gradient-to-b from-[#13161f] to-[#0a0c10] py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Membership Active
              </span>
              <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                · 매주 화요일 20:00 실시간 줌 Q&A
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              1인 지식 창업 & AI 자동화 마스터마인드
              <span className="text-sm font-semibold px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                #Campfire 1기
              </span>
            </h1>
            <p className="text-sm text-zinc-400">
              네이버 카페와 카카오톡 단톡방의 한계를 넘는 올인원 게이미피케이션 지식 비즈니스 OS
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 self-stretch md:self-auto bg-[#171a23] p-2 sm:p-3 rounded-2xl border border-white/10">
            <div className="px-3 border-r border-white/10 text-center">
              <p className="text-[11px] text-zinc-400 font-medium">총 멤버</p>
              <p className="text-base font-bold text-white">1,428명</p>
            </div>
            <div className="px-3 border-r border-white/10 text-center">
              <p className="text-[11px] text-zinc-400 font-medium">활동 지수</p>
              <p className="text-base font-bold text-emerald-400">92%</p>
            </div>
            <div className="px-3 text-center">
              <p className="text-[11px] text-zinc-400 font-medium">내 레벨</p>
              <p className="text-base font-bold text-orange-400">Lv.{user.level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'community' && (
          <CommunityFeed
            posts={posts}
            currentUser={user}
            onAddPost={handleAddPost}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onGoToLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'classroom' && (
          <ClassroomView
            courses={courses}
            currentUser={user}
            onCompleteLesson={handleCompleteLesson}
            onGoToCommunity={() => setActiveTab('community')}
          />
        )}

        {activeTab === 'calendar' && <CalendarView events={events} />}

        {activeTab === 'leaderboard' && (
          <LeaderboardView entries={leaderboard} currentUser={user} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#08090d] py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-zinc-300">Campfire OS</span>
            <span>· All-in-One Knowledge Community & Membership OS</span>
          </div>
          <p className="text-zinc-500">
            토스페이먼츠 정기결제 API · 카카오 알림톡 자동화 · PostgreSQL / Supabase 연동 지원
          </p>
        </div>
      </footer>

      {/* Membership Subscription Modal */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        currentStatus={user.membershipStatus}
      />

      {/* Level Up Celebration Modal */}
      <LevelUpModal
        isOpen={levelUpData.isOpen}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        newLevel={levelUpData.newLevel}
        newTitle={levelUpData.newTitle}
        perk={levelUpData.perk}
        onGoToClassroom={() => {
          setLevelUpData((prev) => ({ ...prev, isOpen: false }));
          setActiveTab('classroom');
        }}
      />
    </div>
  );
}
