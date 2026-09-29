import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Campfire OS | 한국형 Skool 지식 창업 & 유료 멤버십 커뮤니티 플랫폼',
  description:
    '네이버 카페 + 카톡 오픈채팅방 + VOD 강의 + 정기결제 관리를 하나로 끝내는 한국형 Skool 커뮤니티 OS. 게이미피케이션 레벨 시스템과 자동 강퇴 방지 멤버십.',
  keywords: [
    'Campfire OS',
    'Skool 한국',
    '지식 창업 커뮤니티',
    '유료 멤버십',
    '온라인 강의 플랫폼',
    '크리에이터 비즈니스',
    '게이미피케이션 커뮤니티',
  ],
  authors: [{ name: 'Campfire OS Team' }],
  openGraph: {
    title: 'Campfire OS - 한국형 Skool 올인원 크리에이터 커뮤니티',
    description: '강의 VOD + 폐쇄형 게이미피케이션 커뮤니티 + 토스 정기결제 자동화',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#0a0c10] text-zinc-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
