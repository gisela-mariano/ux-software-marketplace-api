import { PrismaClient, Role } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: await hash('123456', 10),
      role: Role.ADMIN
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })