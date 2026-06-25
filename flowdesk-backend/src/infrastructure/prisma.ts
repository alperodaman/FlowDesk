// import { PrismaPg } from "@prisma/adapter-pg";

// import { PrismaClient } from "../generated/prisma/client.js";
// import { env } from "../config/env.js";

// const adapter = new PrismaPg({
//     connectionString: env.DATABASE_URL
// });

// export const prisma = new PrismaClient({
//     adapter
// });

import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}