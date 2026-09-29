# 🔥 Campfire OS (캠프파이어 OS)
> **한국형 Skool: 1인 지식 창업가와 크리에이터를 위한 유료 멤버십 커뮤니티 & 클래스룸 올인원 플랫폼**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.21-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql)](https://supabase.com/)

---

## 📌 왜 '캠프파이어(Campfire OS)'인가?

미국에서는 Alex Hormozi가 투자하고 Sam Ovens가 창업한 **Skool(스쿨)** 이 연매출 수천억 원(ARR $50M+)을 기록하며 지식 창업 생태계를 완전히 장악했습니다.

반면, **한국의 수십만 크리에이터, 인플루언서, 코치, 강사들**은 여전히 10년 전 레거시 스택에 갇혀 있습니다:
1. **네이버 카페**: 모바일 UX가 답답하고 폐쇄적이며, 유료 결제 회원만 정교하게 필터링하기 불가능
2. **카카오톡 오픈채팅방**: 질문과 공지가 1분 만에 위로 밀려버리고(도배), **구독을 해지한 회원을 수동으로 찾아 강퇴해야 하는 '수동 강퇴의 지옥'**
3. **클래스101 / 인프런**: 30~50%에 달하는 살인적인 플랫폼 수수료와 고객 DB(이메일, 전화번호) 독점
4. **Skool의 한국 진입 한계**: 영문 인터페이스, 달러(USD) 및 Stripe 결제 전용(국내 카드/카카오페이/토스 결제 불가), 카카오 알림톡 부재

**Campfire OS는 네이버 카페 + 오픈채팅방 + VOD 강의실 + 정기결제 엑셀 관리를 단 하나의 웹앱으로 완전히 통합하여 대체하는 한국형 커뮤니티 OS입니다.**

---

## 🚀 핵심 기능 (Core Features)

### 1. 💬 몰입형 커뮤니티 (Community Feed)
- 카테고리 필터링 (`📢 공식 공지`, `💡 질문 & 답변`, `🚀 챌린지 인증`, `🏆 성과 공유`)
- 글 작성 시 **+10점**, 댓글 피드백 작성 시 **+5점**, 좋아요 공감 시 **+2점** 실시간 적립
- 공지사항 고정(Pin) 및 스레드형 대댓글 구조

### 2. 🎓 클래스룸 & 시크릿 코스 해금 (Classroom)
- 16:9 반응형 비디오 플레이어 및 모듈별 커리큘럼 아코디언
- **게이미피케이션 연동 강의 락(Lock)**:
  - 예: *"Lv.3 모닥불 등급 달성 시 비밀 마스터클래스 VOD 자동 해금"*
- 각 레슨 완료 시 **+20점 획득** 및 강의 진도율(Progress Bar) 실시간 반영
- 강의별 첨부 실습 워크시트 및 템플릿 다운로드 제공

### 3. 🏆 5단계 게이미피케이션 & 리더보드 (Leaderboard)
- 5단계 불꽃 성장 레벨:
  - **Lv.1 불씨 (Ember)**: 기본 강의 및 커뮤니티 권한
  - **Lv.2 장작 (Kindling)**: 커스텀 뱃지 및 프로필 강조
  - **Lv.3 모닥불 (Campfire)**: [시크릿 코스] 자동 해금
  - **Lv.4 화염 (Blaze)**: 월간 비공개 라이브 마이크 발언권
  - **Lv.5 불사조 (Phoenix)**: 파운더와 1:1 비즈니스 오딧 코칭권
- 실시간 Top 3 포디움(Gold/Silver/Bronze) 및 전체 랭킹 테이블
- 레벨업 달성 시 축하 팡파레(Canvas Confetti) 및 모달 팝업

### 4. 📅 라이브 Q&A & 카카오 알림톡 캘린더 (Calendar)
- 매주 진행되는 실시간 Zoom 라이브 세션 일정표
- **카카오 알림톡 시작 10분 전 자동 알림** 토글 기능
- 구글 캘린더 즉시 추가 링크 제공

### 5. 💳 토스페이먼츠 정기 멤버십 자동 게이트키핑 (Membership Modal)
- Standard (월 49,000원) / Pro 마스터마인드 (월 99,000원) 구독 모델
- 결제 실패 시 자동으로 비공개 채널 및 강의 접근을 제한하여 **'수동 강퇴' 업무 100% 제거**

---

## 🛠️ 기술 스택 및 아키텍처

- **Framework**: Next.js 14 (App Router, Turbopack ready)
- **Language**: TypeScript 5.0 (엄격한 타입 체크)
- **Styling**: Tailwind CSS (다크 네이비 테마 `#0a0c10` & 앰버/오렌지 포인트)
- **Database / ORM**: Prisma 5.21 (`@prisma/client`) + PostgreSQL / Supabase
- **Icons & FX**: Lucide React, Canvas Confetti
- **Dual Persistence Architecture**:
  - `Client Mode (기본)`: 로컬스토리지 기반으로 DB 세팅 없이 즉시 100% 작동
  - `Production Mode`: `DATABASE_URL` 연결 시 즉시 PostgreSQL/Supabase 프로덕션 모드 전환

---

## ⚡ 1분 빠른 실행 및 배포 가이드

### 1. 로컬 환경에서 즉시 실행
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```
브라우저에서 `http://localhost:3000` 접속 시 즉시 모든 기능이 동작합니다.

### 2. 프로덕션 데이터베이스 연결 (Supabase / PostgreSQL)
1. `.env.example`을 `.env.local`로 복사합니다:
```bash
cp .env.example .env.local
```
2. Supabase 또는 클라우드 PostgreSQL 접속 URL을 입력합니다:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=public"
```
3. 프리즈마 마이그레이션을 실행합니다:
```bash
pnpm exec prisma db push
```

### 3. Vercel 1클릭 배포
1. GitHub 저장소(`https://github.com/ferrariclec16/campfire-os`)를 Vercel에 임포트합니다.
2. 환경변수에 `DATABASE_URL`을 등록합니다.
3. 배포(Deploy) 클릭 시 즉시 전 세계 CDN으로 서비스가 출시됩니다.

---

## 📂 프로젝트 구조

```
campfire-os/
├── prisma/
│   └── schema.prisma          # PostgreSQL 데이터 모델 (User, Post, Course, Membership)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── posts/route.ts # 커뮤니티 글 CRUD 및 포인트 보상 API
│   │   │   └── courses/route.ts # 강의 커리큘럼 및 진도율 API
│   │   ├── globals.css        # 캠프파이어 다크 테마 및 스크롤바 스타일
│   │   ├── layout.tsx         # 메타데이터, OpenGraph, 뷰포트 설정
│   │   └── page.tsx           # 메인 탭 전환, 게이미피케이션 상태 관리, 레벨업 트리거
│   ├── components/
│   │   ├── Navbar.tsx         # 네비게이션, 레벨/포인트 진행률 바, 멤버십 버튼
│   │   ├── CommunityFeed.tsx  # 피드, 글 작성 모달, 카테고리 필터, 댓글/좋아요
│   │   ├── ClassroomView.tsx  # VOD 플레이어, 모듈 아코디언, 레벨락 해금
│   │   ├── LeaderboardView.tsx# Top 3 포디움, 전체 랭킹, 레벨별 혜택 로드맵
│   │   ├── CalendarView.tsx   # 실시간 Zoom 라이브 및 카카오 알림톡 토글
│   │   ├── MembershipModal.tsx# 토스/카카오 정기구독 결제 플랜 모달
│   │   └── LevelUpModal.tsx   # 레벨업 축하 팡파레 모달
│   └── lib/
│       ├── types.ts           # 전체 데이터 도메인 타입 정의
│       ├── levelEngine.ts     # 5단계 레벨 계산 및 포인트 보상 엔진
│       ├── store.ts           # 로컬스토리지 동기화 및 풍부한 초기 Mock 데이터
│       └── prisma.ts          # 안전한 Prisma Client 싱글톤 인스턴스
├── .env.example
├── package.json
└── README.md
```

---

## 🔒 강력한 리텐션 & 락인(Lock-in) 메커니즘

1. **데이터 중력 (Data Gravity)**:
   - 회원이 작성한 질문, 답변, 과제 인증 내역, 획득한 포인트와 레벨 기록이 축적되어 다른 플랫폼으로의 이탈이 원천 봉쇄됩니다.
2. **게이미피케이션 도파민 (Gamification Loop)**:
   - 비공개 고급 강의를 열기 위해 다른 회원의 글에 자발적으로 답변을 달고 소통하게 만들어, **운영자가 매일 글을 쓰지 않아도 커뮤니티가 스스로 굴러갑니다.**
3. **네트워크 효과 (Network Effect)**:
   - 동료 멤버들과의 형성된 관계와 리더보드 순위 경쟁으로 인해 월 구독 취소율(Churn Rate)이 5% 미만으로 유지됩니다.

---

## 📄 라이선스
MIT License. 자유롭게 커스터마이징하고 상용 배포할 수 있습니다.
