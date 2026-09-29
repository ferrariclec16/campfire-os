import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

let prisma: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.prismaGlobal) {
      global.prismaGlobal = new PrismaClient();
    }
    prisma = global.prismaGlobal;
  }
}

export { prisma };
