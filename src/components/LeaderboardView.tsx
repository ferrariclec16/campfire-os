'use client';

import React, { useState } from 'react';
import { LeaderboardEntry, User } from '../lib/types';
import { LEVELS } from '../lib/levelEngine';
import { Trophy, Medal, Award, CheckCircle2, Lock } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  currentUser: User;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  currentUser,
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'7days' | '30days' | 'all'>('30days');

  const top3 = entries.slice(0, 3);
  const remaining = entries.slice(3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-400" /> 명예의 전당 & 게이미피케이션 리더보드
          </h2>
          <p className="text-xs text-zinc-400">
            글 작성, 댓글 피드백, 챌린지 인증으로 포인트를 모아 레벨을 올리고 시크릿 혜택을 해금하세요.
          </p>
        </div>

        {/* Filter Period Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
          <button
            onClick={() => setFilterPeriod('7days')}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              filterPeriod === '7days' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            최근 7일
          </button>
          <button
            onClick={() => setFilterPeriod('30days')}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              filterPeriod === '30days' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            이번 달 (30일)
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              filterPeriod === 'all' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            역대 누적
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="order-2 md:order-1 rounded-3xl border border-white/10 bg-[#12141f]/80 p-6 text-center space-y-3 backdrop-blur-md">
            <div className="relative inline-block">
              <img
                src={top3[1].user.avatar}
                alt={top3[1].user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-zinc-400 mx-auto shadow-lg"
              />
              <span className="absolute -bottom-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-300 text-black font-black text-xs shadow-md">
                🥈
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{top3[1].user.name}</h4>
              <span className="text-[11px] text-zinc-400">Lv.{top3[1].user.level} {top3[1].user.levelTitle}</span>
            </div>
            <p className="text-lg font-black text-zinc-200">{top3[1].pointsEarned}p</p>
          </div>
        )}

        {/* 1st Place (Champion Podium) */}
        {top3[0] && (
          <div className="order-1 md:order-2 rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-[#1f1a14] to-[#12141f] p-8 text-center space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <div className="relative inline-block">
              <img
                src={top3[0].user.avatar}
                alt={top3[0].user.name}
                className="h-20 w-20 rounded-full object-cover border-4 border-amber-400 mx-auto shadow-2xl"
              />
              <span className="absolute -bottom-2 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-sm shadow-xl">
                👑
              </span>
            </div>
            <div>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300 border border-amber-500/30">
                이달의 챔피언
              </span>
              <h4 className="text-base font-black text-white mt-1">{top3[0].user.name}</h4>
              <span className="text-xs text-orange-400 font-semibold">Lv.{top3[0].user.level} {top3[0].user.levelTitle}</span>
            </div>
            <p className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {top3[0].pointsEarned}p
            </p>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="order-3 md:order-3 rounded-3xl border border-white/10 bg-[#12141f]/80 p-6 text-center space-y-3 backdrop-blur-md">
            <div className="relative inline-block">
              <img
                src={top3[2].user.avatar}
                alt={top3[2].user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-amber-700 mx-auto shadow-lg"
              />
              <span className="absolute -bottom-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white font-black text-xs shadow-md">
                🥉
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{top3[2].user.name}</h4>
              <span className="text-[11px] text-zinc-400">Lv.{top3[2].user.level} {top3[2].user.levelTitle}</span>
            </div>
            <p className="text-lg font-black text-zinc-200">{top3[2].pointsEarned}p</p>
          </div>
        )}
      </div>

      {/* Rankings Table (4th Place and below) */}
      <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-5 shadow-xl backdrop-blur-md space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Medal className="h-4 w-4 text-orange-400" />
          전체 멤버 랭킹
        </h3>

        <div className="space-y-2">
          {remaining.map((entry) => {
            const isMe = entry.user.id === currentUser.id;

            return (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                  isMe
                    ? 'border-orange-500 bg-orange-500/15'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-black w-6 text-center ${isMe ? 'text-orange-400' : 'text-zinc-500'}`}>
                    #{entry.rank}
                  </span>
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.name}
                    className="h-8 w-8 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {entry.user.name}
                      {isMe && (
                        <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-black text-orange-300">
                          나
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-zinc-400">Lv.{entry.user.level} {entry.user.levelTitle}</span>
                  </div>
                </div>

                <span className="text-xs font-black text-orange-400">{entry.pointsEarned}p</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Perks Progression Table (Skool Gamification Roadmap) */}
      <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-6 shadow-xl backdrop-blur-md space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="h-4 w-4 text-orange-400" />
            레벨별 자동 해금 혜택 로드맵
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            특정 활동 점수를 충족하면 숨겨진 강의와 특권이 즉시 열립니다.
          </p>
        </div>

        <div className="grid gap-3">
          {LEVELS.map((lvl) => {
            const isUnlocked = currentUser.points >= lvl.minPoints;

            return (
              <div
                key={lvl.level}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                    : 'border-white/5 bg-white/[0.01] opacity-70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                        : 'bg-white/10 text-zinc-500'
                    }`}
                  >
                    Lv.{lvl.level}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      {lvl.title}
                      <span className="text-[11px] font-normal text-zinc-400">
                        ({lvl.minPoints}점 이상)
                      </span>
                    </h4>
                    <p className="text-xs text-zinc-300 mt-0.5">{lvl.perk}</p>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      해금됨
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-bold text-zinc-500 border border-white/10">
                      <Lock className="h-3 w-3" />
                      잠김 ({lvl.minPoints - currentUser.points}p 남음)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
