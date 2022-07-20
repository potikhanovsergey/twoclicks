import { enhancePrisma } from "blitz"
import { PrismaClient } from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from "@prisma/client"
const db = new EnhancedPrisma()

// // Prisma middleware (docs: https://www.prisma.io/docs/concepts/components/prisma-client/middleware)
// db.$use(async (params, next) => {
//   if (params.model === "LikedBlock" && params.action == "delete") {
//     console.log("Dislike block", params)
//   }
//   if (params.model === "LikedBlock" && params.action == "create") {
//     console.log("Create block", params)
//   }
//   return next(params)
// })

export default db
