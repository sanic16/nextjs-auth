import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const globalPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalPrisma.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export default prisma

export {
    adapter
}