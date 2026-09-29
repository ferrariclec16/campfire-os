'use client';

import React, { useState } from 'react';
import { LiveEvent } from '../lib/types';
import { Calendar as CalendarIcon, Video, Bell, Check, Clock, User } from 'lucide-react';

interface CalendarViewProps {
  events: LiveEvent[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const handleToggleReminder = (eventId: string) => {
    setReminders((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          📅 실시간 라이브 & 챌린지 캘린더
        </h2>
        <p className="text-xs text-zinc-400">
          매주 진행되는 프라이빗 줌(Zoom) 라이브 Q&A 및 과제 마감 일정을 확인하세요.
        </p>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {events.map((ev) => {
          const isReminded = reminders[ev.id] ?? false;

          return (
            <div
              key={ev.id}
              className="rounded-3xl border border-white/10 bg-[#12141f]/90 p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-orange-500/40 transition-all"
            >
              {/* Left Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-orange-500/20 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-orange-400 border border-orange-500/30">
                    {ev.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                    {ev.date} • {ev.time}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-white">{ev.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">{ev.description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <User className="h-3.5 w-3.5 text-orange-400" />
                  <span>진행: <strong className="text-white">{ev.speaker}</strong></span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap md:flex-col items-stretch gap-2 flex-shrink-0">
                <a
                  href={ev.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:opacity-90 active:scale-95 transition-all text-center"
                >
                  <Video className="h-4 w-4" />
                  <span>라이브 줌 입장</span>
                </a>

                <button
                  onClick={() => handleToggleReminder(ev.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                    isReminded
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  {isReminded ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>카카오 알림톡 예약됨</span>
                    </>
                  ) : (
                    <>
                      <Bell className="h-3.5 w-3.5" />
                      <span>알림톡 알림 받기</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert('구글 캘린더에 일정이 추가되었습니다.')}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>구글 캘린더 추가</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
