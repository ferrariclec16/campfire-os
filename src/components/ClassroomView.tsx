'use client';

import React, { useState } from 'react';
import { Course, Lesson, User } from '../lib/types';
import { PlayCircle, CheckCircle2, Lock, ArrowLeft, Download, FileText, Check, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClassroomViewProps {
  courses: Course[];
  currentUser: User;
  onCompleteLesson: (courseId: string, lessonId: string) => void;
  onGoToCommunity: () => void;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  courses,
  currentUser,
  onCompleteLesson,
  onGoToCommunity,
}) => {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.id === activeCourseId);

  // If in player mode, find active lesson
  const allLessons = selectedCourse
    ? selectedCourse.modules.flatMap((m) => m.lessons)
    : [];

  const activeLesson: Lesson | undefined = allLessons.find(
    (l) => l.id === activeLessonId
  ) || allLessons[0];

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
  };

  const handleCompleteCurrentLesson = () => {
    if (!selectedCourse || !activeLesson) return;
    onCompleteLesson(selectedCourse.id, activeLesson.id);

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } catch {
      // fallback
    }
  };

  // If no course selected, show Course Catalog Grid
  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            📚 클래스룸 (Classroom)
          </h2>
          <p className="text-xs text-zinc-400">
            실전 강의 VOD와 워크시트를 학습하고 진도율을 완성하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const isLevelLocked = currentUser.level < course.minLevel;

            return (
              <div
                key={course.id}
                className={`group relative rounded-3xl border bg-[#12141f]/90 overflow-hidden shadow-xl transition-all backdrop-blur-md flex flex-col justify-between ${
                  isLevelLocked
                    ? 'border-white/10 opacity-80'
                    : 'border-white/10 hover:border-orange-500/50 hover:shadow-orange-500/10'
                }`}
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      isLevelLocked ? 'grayscale filter' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141f] via-transparent to-transparent" />

                  {/* Level Lock Badge Overlay */}
                  {isLevelLocked ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 p-6 text-center space-y-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h4 className="text-sm font-black text-white">
                        레벨 {course.minLevel} 달성 시 자동 해금
                      </h4>
                      <p className="text-[11px] text-zinc-400 max-w-xs">
                        현재 {currentUser.name}님은 레벨 {currentUser.level} ({currentUser.points}p)입니다. 커뮤니티에서 활동하고 포인트를 모아 해금하세요!
                      </p>
                      <button
                        onClick={onGoToCommunity}
                        className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-500 transition-all shadow-md mt-2"
                      >
                        커뮤니티 활동하고 포인트 모으기 ➔
                      </button>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        수강 가능
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Details Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-white group-hover:text-orange-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Progress Bar & CTA Button */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">학습 진도율</span>
                      <span className="font-bold text-orange-400">{course.progressPercent}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>

                    {!isLevelLocked && (
                      <button
                        onClick={() => {
                          setActiveCourseId(course.id);
                          if (course.modules[0]?.lessons[0]) {
                            setActiveLessonId(course.modules[0].lessons[0].id);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:opacity-95 active:scale-95 transition-all"
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>강의실 입장하기</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Course Player Mode
  return (
    <div className="space-y-5">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveCourseId(null)}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>전체 클래스룸 목록으로 돌아가기</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">강의 진도율:</span>
          <span className="font-bold text-orange-400">{selectedCourse.progressPercent}%</span>
        </div>
      </div>

      {/* Main Player Grid: Video (8 cols) + Lesson Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video & Lesson Content (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Responsive Video Container */}
          <div className="relative aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {activeLesson?.videoUrl ? (
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                <PlayCircle className="h-12 w-12 text-zinc-600" />
                <p className="text-xs text-zinc-400">등록된 영상이 없습니다.</p>
              </div>
            )}
          </div>

          {/* Lesson Header & Complete Action Button */}
          <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  {selectedCourse.title}
                </span>
                <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                  {activeLesson?.title}
                </h2>
                <span className="text-xs text-zinc-500">재생 시간: {activeLesson?.duration}</span>
              </div>

              {/* Mark Complete Button */}
              <button
                onClick={handleCompleteCurrentLesson}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 ${
                  activeLesson?.isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-orange-500/25 hover:opacity-90'
                }`}
              >
                {activeLesson?.isCompleted ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>학습 완료됨 (+20p)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>학습 완료하고 +20p 받기</span>
                  </>
                )}
              </button>
            </div>

            {/* Lesson Notes & Action Items */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs leading-relaxed text-zinc-300">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-orange-400" />
                핵심 실행 가이드
              </h4>
              <p className="whitespace-pre-line bg-black/30 p-4 rounded-xl border border-white/5">
                {activeLesson?.content || '이번 강의의 핵심 요약 내용입니다.'}
              </p>
            </div>

            {/* Downloadable Worksheet Resource */}
            <div className="flex items-center justify-between rounded-xl bg-orange-500/10 p-3.5 border border-orange-500/20 text-xs text-orange-300">
              <div className="flex items-center gap-2.5">
                <Download className="h-4 w-4 text-orange-400" />
                <div>
                  <span className="font-bold text-white block">실전 워크시트 및 템플릿 파일</span>
                  <span className="text-[10px] text-zinc-400">PDF / Notion 복사 링크 포함</span>
                </div>
              </div>
              <button
                onClick={() => alert('워크시트 템플릿 다운로드 링크가 열립니다.')}
                className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-500 transition-all shadow-sm"
              >
                다운로드
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Module & Lesson Curriculum Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-5 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-white/10 pb-3">
              <span>커리큘럼 목차</span>
              <span className="text-[11px] text-zinc-400 font-normal">총 {allLessons.length}개 강의</span>
            </h3>

            <div className="space-y-4">
              {selectedCourse.modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-orange-400" />
                    {module.title}
                  </h4>

                  <div className="space-y-1.5 pl-3">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.id === activeLesson?.id;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all border ${
                            isCurrent
                              ? 'border-orange-500 bg-orange-500/15 text-white font-bold'
                              : 'border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={lesson.isCompleted ? 'text-emerald-400' : 'text-zinc-600'}>
                              {lesson.isCompleted ? '✓' : '○'}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 flex-shrink-0">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
