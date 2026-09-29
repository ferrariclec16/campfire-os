import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_COURSES } from '@/lib/store';

export async function GET() {
  try {
    if (prisma) {
      const courses = await prisma.course.findMany({
        include: {
          modules: {
            include: { lessons: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      });
      return NextResponse.json({ success: true, data: courses, source: 'database' });
    }

    return NextResponse.json({ success: true, data: INITIAL_COURSES, source: 'fallback_mock' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return NextResponse.json({ success: true, data: INITIAL_COURSES, error: message });
  }
}
