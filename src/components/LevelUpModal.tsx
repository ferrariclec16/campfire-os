'use client';

import React from 'react';
import { Award, Flame, X, ArrowRight } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  newTitle: string;
  perk?: string;
  onGoToClassroom: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  newLevel,
  newTitle,
  perk,
  onGoToClassroom,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border-2 border-orange-500 bg-gradient-to-b from-[#241710] to-[#0e1017] p-8 text-center shadow-[0_0_60px_rgba(249,115,22,0.4)] text-white space-y-5 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Animated Trophy / Flame */}
        <div className="relative inline-block mx-auto">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-2xl shadow-orange-500/50 mx-auto">
            <Flame className="h-10 w-10 animate-bounce" />
          </div>
          <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-600 font-black text-sm shadow-xl">
            Lv.{newLevel}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
            LEVEL UP! 축하합니다
          </span>
          <h2 className="text-2xl font-black text-white">
            [{newTitle}] 등급 달성!
          </h2>
          <p className="text-xs text-zinc-300">
            지속적인 커뮤니티 기여와 학습으로 새로운 레벨에 도달했습니다.
          </p>
        </div>

        {perk && (
          <div className="rounded-2xl bg-orange-500/10 p-4 border border-orange-500/20 text-left space-y-1">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1">
              <Award className="h-3 w-3" /> 새로 해금된 보상
            </span>
            <p className="text-xs font-bold text-white leading-relaxed">
              {perk}
            </p>
          </div>
        )}

        <div className="pt-2 space-y-2">
          {newLevel >= 3 && (
            <button
              onClick={() => {
                onClose();
                onGoToClassroom();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/30 hover:opacity-90 active:scale-95 transition-all"
            >
              <span>해금된 시크릿 코스 보러가기</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-white/10 py-2.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/15 transition-all"
          >
            멋져요, 계속 활동하기
          </button>
        </div>
      </div>
    </div>
  );
};
