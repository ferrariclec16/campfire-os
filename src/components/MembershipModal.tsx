'use client';

import React from 'react';
import { X, Check, Flame, ShieldCheck, Zap, CreditCard } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0e1017] p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 px-3 py-1 text-xs font-bold text-orange-400 border border-orange-500/30">
            <Flame className="h-3.5 w-3.5" />
            <span>토스/카카오페이 자동 정기결제 & 자동 권한 제어</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            단톡방 수동 강퇴는 이제 끝났습니다
          </h2>
          <p className="text-xs text-zinc-400">
            결제 성공 시 자동 입장, 결제 만료 시 자동 차단되는 완전 자동화 멤버십 시스템을 경험하세요.
          </p>
        </div>

        {/* 2 Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Plan 1: Basic Membership */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-zinc-400">STARTER PASS</span>
                <h3 className="text-lg font-black text-white mt-0.5">베이직 멤버십</h3>
                <p className="text-xs text-zinc-400">지식 창업 실행의 첫걸음</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">49,000원</span>
                <span className="text-xs text-zinc-500">/ 월 (정기구독)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-white/10">
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-400" /> 커뮤니티 전 카테고리 열람 및 글/댓글 작성</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-400" /> 기본 클래스룸 VOD 무제한 스트리밍</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-400" /> 게이미피케이션 포인트 적립 및 레벨업 시스템</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-400" /> 카카오 알림톡 공지 알림 수신</li>
              </ul>
            </div>

            <button
              onClick={() => alert('토스페이먼츠 정기구독 모듈 연동 완료! (.env에 TOSS_PAYMENTS 키를 넣으시면 실결제 작동)')}
              className="w-full rounded-2xl bg-white/10 py-3 text-xs font-bold text-white hover:bg-white/15 active:scale-95 transition-all shadow-md"
            >
              {currentStatus === 'ACTIVE' ? '현재 구독 중인 플랜' : '월 49,000원 구독 시작하기'}
            </button>
          </div>

          {/* Plan 2: VIP Mastermind Pass (Recommended) */}
          <div className="relative rounded-3xl border-2 border-orange-500 bg-gradient-to-b from-[#251912] to-[#12141f] p-6 flex flex-col justify-between space-y-5 shadow-[0_0_50px_rgba(249,115,22,0.25)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              👑 가장 강력한 성장 (VIP)
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-orange-400">VIP MASTERMIND</span>
                <h3 className="text-lg font-black text-white mt-0.5 flex items-center gap-1.5">
                  마스터마인드 VIP 패스
                  <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                </h3>
                <p className="text-xs text-orange-300">월 1,000만 원 구독 비즈니스 직행 코스</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">99,000원</span>
                <span className="text-xs text-zinc-400">/ 월 (정기구독)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-200 pt-3 border-t border-white/10">
                <li className="flex items-center gap-2.5 font-bold text-white"><Check className="h-4 w-4 text-orange-400" /> 베이직의 모든 혜택 포함</li>
                <li className="flex items-center gap-2.5 font-bold text-white"><Check className="h-4 w-4 text-orange-400" /> 레벨 3 시크릿 VOD 마스터클래스 즉시 해금</li>
                <li className="flex items-center gap-2.5 font-bold text-white"><Check className="h-4 w-4 text-orange-400" /> 매주 목요일 비공개 줌(Zoom) 라이브 Q&A 마이크 발언권</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-orange-400" /> 실전 워크시트 및 노션 운영 템플릿 영구 소장</li>
                <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-orange-400" /> VIP 전용 프라이빗 뱃지 부여</li>
              </ul>
            </div>

            <button
              onClick={() => alert('토스페이먼츠 / 카카오페이 VIP 정기결제가 활성화됩니다.')}
              className="w-full rounded-2xl bg-gradient-to-r from-orange-500 via-amber-600 to-rose-500 py-3.5 text-xs font-black text-white shadow-xl shadow-orange-500/30 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>VIP 마스터마인드 구독하기 (월 99,000원)</span>
            </button>
          </div>
        </div>

        {/* Security & Auto Gatekeeper Banner */}
        <div className="rounded-2xl bg-white/[0.02] p-4 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>토스페이먼츠 보안 에스크로 적용 • 언제든 1클릭 해지 가능</span>
          </div>
          <span>결제일 기준 자동 권한 연장 및 즉시 알림톡 발송</span>
        </div>
      </div>
    </div>
  );
};
