import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10)

  await prisma.user.upsert({
    where: { email: "admin@skillbridge.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@skillbridge.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  })

  console.log("✅ Admin seeded")
}

main()
