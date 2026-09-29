'use client';

import React from 'react';
import { User } from '../lib/types';
import { Flame, BookOpen, Calendar, Trophy, CreditCard, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'community' | 'classroom' | 'calendar' | 'leaderboard';
  setActiveTab: (tab: 'community' | 'classroom' | 'calendar' | 'leaderboard') => void;
  user: User;
  onOpenNewPost: () => void;
  onOpenMembership: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenNewPost,
  onOpenMembership,
}) => {
  const pointsToNext = Math.max(0, user.nextLevelPoints - user.points);
  const progressPercent = Math.min(100, Math.round((user.points / user.nextLevelPoints) * 100));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0e1017]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('community')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-500 shadow-lg shadow-orange-500/25">
              <Flame className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">Campfire</span>
                <span className="rounded-md bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-orange-400 border border-orange-500/30">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">
                All-in-One Creator Knowledge Community
              </p>
            </div>
          </div>

          {/* 4 Core Skool Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'community'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              커뮤니티 피드
            </button>
            <button
              onClick={() => setActiveTab('classroom')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'classroom'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              클래스룸 (VOD)
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              라이브 캘린더
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              리더보드
            </button>
          </nav>
        </div>

        {/* User Stats & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Gamified Level & Points Widget */}
          <div
            onClick={() => setActiveTab('leaderboard')}
            className="hidden lg:flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-1.5 border border-white/10 cursor-pointer hover:border-orange-500/40 transition-colors"
            title="클릭하여 내 레벨 보상 및 랭킹 확인"
          >
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-black text-white">
                {user.level}
              </span>
              <span className="text-xs font-bold text-orange-300">{user.levelTitle}</span>
            </div>

            <div className="w-20 space-y-0.5">
              <div className="flex justify-between text-[9px] text-zinc-400 font-semibold">
                <span>{user.points}p</span>
                <span>다음 {pointsToNext}p</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Membership Subscription Button */}
          <button
            onClick={onOpenMembership}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-3 py-1.5 text-xs font-bold text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 transition-all"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">멤버십 구독 관리</span>
            <span className="sm:hidden">구독</span>
          </button>

          {/* New Post Button */}
          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-600 to-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:opacity-90 active:scale-95 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">새 글 작성 (+10p)</span>
            <span className="sm:hidden">글쓰기</span>
          </button>

          {/* User Avatar */}
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover border border-white/20"
          />
        </div>
      </div>
    </header>
  );
};
