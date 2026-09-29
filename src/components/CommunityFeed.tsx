'use client';

import React, { useState } from 'react';
import { Post, User } from '../lib/types';
import { Heart, MessageSquare, Pin, Send, PlusCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommunityFeedProps {
  posts: Post[];
  currentUser: User;
  onAddPost: (post: { title: string; content: string; category: Post['category'] }) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onGoToLeaderboard: () => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  currentUser,
  onAddPost,
  onToggleLike,
  onAddComment,
  onGoToLeaderboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('🔥 전체글');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<Post['category']>('💡 질문 & 답변');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const categories = ['🔥 전체글', '📢 공식 공지', '💡 질문 & 답변', '🚀 챌린지 인증', '🏆 성과 공유'];

  const filteredPosts = posts.filter(
    (p) => selectedCategory === '🔥 전체글' || p.category === selectedCategory
  );

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddPost({
      title: newTitle,
      content: newContent,
      category: newCategory,
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch {
      // fallback
    }

    setNewTitle('');
    setNewContent('');
    setIsComposerOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Main Content: Filter & Post List (8 Cols) */}
      <div className="lg:col-span-8 space-y-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Post Prompt Bar */}
        <div
          onClick={() => setIsComposerOpen(true)}
          className="rounded-2xl border border-white/10 bg-[#12141f] p-4 flex items-center justify-between cursor-pointer hover:border-orange-500/40 hover:bg-[#151825] transition-all shadow-lg"
        >
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
            <span className="text-xs text-zinc-400">
              {currentUser.name}님, 오늘 어떤 실행과 인사이트를 공유하시겠어요? (+10p)
            </span>
          </div>

          <button className="flex items-center gap-1.5 rounded-xl bg-orange-500/20 px-3 py-1.5 text-xs font-bold text-orange-400 border border-orange-500/30">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>글쓰기</span>
          </button>
        </div>

        {/* Composer Modal */}
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0e1017] p-6 shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  새 커뮤니티 글 작성 (완료 시 +10점 적립)
                </h3>
                <button
                  onClick={() => setIsComposerOpen(false)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  닫기 ✕
                </button>
              </div>

              <form onSubmit={handleSubmitPost} className="space-y-4">
                {/* Category Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">카테고리</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Post['category'])}
                    className="w-full rounded-xl bg-black/50 p-2.5 text-xs text-white border border-white/10 focus:outline-none focus:border-orange-500"
                  >
                    <option value="💡 질문 & 답변">💡 질문 & 답변</option>
                    <option value="🚀 챌린지 인증">🚀 챌린지 인증</option>
                    <option value="🏆 성과 공유">🏆 성과 공유</option>
                    <option value="📢 공식 공지">📢 공식 공지 (운영자 전용)</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">제목</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="제목을 입력하세요 (예: 1일차 과제 인증합니다!)"
                    className="w-full rounded-xl bg-black/50 p-2.5 text-xs text-white border border-white/10 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">본문 내용</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={6}
                    placeholder="자유롭게 경험, 고민, 혹은 성과를 적어주세요. 멤버들이 따뜻하게 피드백해 드립니다."
                    className="w-full rounded-xl bg-black/50 p-3 text-xs text-white border border-white/10 focus:outline-none focus:border-orange-500 leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/30 hover:opacity-90 active:scale-95"
                  >
                    게시하기 (+10p)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Post Feed List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isCommentsExpanded = expandedComments[post.id] ?? false;

            return (
              <article
                key={post.id}
                className={`rounded-2xl border bg-[#12141f]/90 p-5 shadow-xl transition-all space-y-3.5 backdrop-blur-md ${
                  post.isPinned ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/[0.04] to-[#12141f]' : 'border-white/10'
                }`}
              >
                {/* Post Top Header: Author + Level Badge + Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{post.author.name}</span>
                        <span className="rounded-md bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-black text-orange-300 border border-orange-500/30">
                          Lv.{post.author.level} {post.author.levelTitle.split(' ')[0]}
                        </span>
                        {post.author.role === 'CREATOR_ADMIN' && (
                          <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-black text-rose-300 border border-rose-500/30">
                            운영자
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.isPinned && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                        <Pin className="h-3 w-3" /> 고정 공지
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-zinc-400 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Title & Content */}
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Actions: Like & Comment Toggle */}
                <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-xs text-zinc-400">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${
                      post.likedByMe
                        ? 'text-rose-400 bg-rose-500/10 font-bold'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.likedByMe ? 'fill-rose-400' : ''}`} />
                    <span>{post.likeCount}</span>
                  </button>

                  <button
                    onClick={() =>
                      setExpandedComments((prev) => ({ ...prev, [post.id]: !isCommentsExpanded }))
                    }
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>댓글 {post.comments ? post.comments.length : post.commentCount}</span>
                  </button>
                </div>

                {/* Comments Section (Expanded) */}
                {isCommentsExpanded && (
                  <div className="pt-3 border-t border-white/5 space-y-3">
                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-2.5">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="rounded-xl bg-white/[0.02] p-3 border border-white/5 space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={comment.author.avatar}
                                  alt={comment.author.name}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                                <span className="font-bold text-white">{comment.author.name}</span>
                                <span className="text-[9px] text-orange-400 font-semibold">
                                  Lv.{comment.author.level}
                                </span>
                              </div>
                              <span className="text-[9px] text-zinc-500">
                                {new Date(comment.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed pl-6.5">
                              {comment.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        placeholder="따뜻한 댓글을 남겨주세요 (+5p)..."
                        className="flex-1 rounded-xl bg-black/40 px-3.5 py-2 text-xs text-white border border-white/10 focus:outline-none focus:border-orange-500"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="rounded-xl bg-orange-600 px-3 py-2 text-xs font-bold text-white hover:bg-orange-500 active:scale-95 transition-all shadow-sm"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Community Widgets (4 Cols) */}
      <div className="lg:col-span-4 space-y-5">
        {/* Widget 1: Creator Bio & Community Mission */}
        <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-5 shadow-xl backdrop-blur-md space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/25">
              🔥
            </div>
            <div>
              <h4 className="text-sm font-black text-white">캠프파이어 프라이빗 클럽</h4>
              <p className="text-[11px] text-zinc-400">지식 창업 & 유료 멤버십 구축 공동체</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            단순히 혼자 고민하지 마세요. 실전 커리큘럼을 완주하고 서로 과제를 인증하며 월 1,000만 원 구독 비즈니스를 함께 만듭니다.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="rounded-xl bg-white/5 p-2 border border-white/5">
              <span className="text-[10px] text-zinc-400">정예 멤버</span>
              <p className="text-sm font-black text-orange-400">1,248명</p>
            </div>
            <div className="rounded-xl bg-white/5 p-2 border border-white/5">
              <span className="text-[10px] text-zinc-400">과제 달성률</span>
              <p className="text-sm font-black text-emerald-400">84.2%</p>
            </div>
          </div>
        </div>

        {/* Widget 2: Weekly Leaderboard Mini Ranking */}
        <div className="rounded-2xl border border-white/10 bg-[#12141f]/90 p-5 shadow-xl backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>🏆 주간 활동 랭킹 TOP 3</span>
            </h4>
            <button
              onClick={onGoToLeaderboard}
              className="text-[10px] text-orange-400 hover:underline"
            >
              전체 보기 ➔
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-400">🥇 1위</span>
                <span className="font-bold text-white">최고성장</span>
              </div>
              <span className="font-black text-orange-300">840p</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-400">🥈 2위</span>
                <span className="font-medium text-white">이수익</span>
              </div>
              <span className="font-bold text-zinc-300">420p</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-400">🥉 3위</span>
                <span className="font-medium text-white">김성장</span>
              </div>
              <span className="font-bold text-zinc-300">180p</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Gamification Perks Banner */}
        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-5 text-white space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
            <CheckCircle2 className="h-4 w-4" />
            <span>레벨 3 달성 시 시크릿 VOD 해금!</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            커뮤니티에 글과 댓글을 남겨 활동 점수 150점을 채우면 비공개 마스터클래스가 자동으로 열립니다.
          </p>
        </div>
      </div>
    </div>
  );
};
