import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_POSTS } from '@/lib/store';

export async function GET() {
  try {
    if (prisma) {
      const posts = await prisma.post.findMany({
        include: {
          author: true,
          comments: {
            include: { author: true },
          },
        },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      });
      return NextResponse.json({ success: true, data: posts, source: 'database' });
    }

    return NextResponse.json({ success: true, data: INITIAL_POSTS, source: 'fallback_mock' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return NextResponse.json({ success: true, data: INITIAL_POSTS, error: message });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (prisma && body.authorId) {
      const created = await prisma.post.create({
        data: {
          authorId: body.authorId,
          category: body.category || '자유토론',
          title: body.title,
          content: body.content,
        },
      });

      // Award 10 points
      await prisma.user.update({
        where: { id: body.authorId },
        data: { points: { increment: 10 } },
      });

      return NextResponse.json({ success: true, data: created, source: 'database' });
    }

    return NextResponse.json({ success: true, data: body, source: 'client_store' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Post creation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
