import { PrismaClient, Role, BookingStatus } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Clean database (order matters)
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.tutorProfile.deleteMany()
  await prisma.user.deleteMany()

  // Create admin
  const adminPassword = await bcrypt.hash("Admin@123", 10)

  await prisma.user.upsert({
    where: { email: "admin@skillbridge.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@skillbridge.com",
      password: adminPassword,
      role: Role.ADMIN
    }
  })

  // Create student
  const studentPassword = await bcrypt.hash("Student@123", 10)

  const student = await prisma.user.create({
    data: {
      name: "John Student",
      email: "student@test.com",
      password: studentPassword,
      role: Role.STUDENT
    }
  })

  // Create tutor with profile
  const tutorPassword = await bcrypt.hash("Tutor@123", 10)

  const tutor = await prisma.user.create({
    data: {
      name: "Jane Tutor",
      email: "tutor@test.com",
      password: tutorPassword,
      role: Role.TUTOR,
      tutorProfile: {
        create: {
          bio: "Experienced Math Tutor",
          hourlyRate: 40
        }
      }
    },
    include: {
      tutorProfile: true
    }
  })

  // Tutor availability
  await prisma.availability.create({
    data: {
      tutorId: tutor.tutorProfile!.id,
      date: "2026-02-01",
      timeSlot: "10:00-11:00"
    }
  })

  // Booking
  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId: tutor.id,
      status: BookingStatus.COMPLETED
    }
  })

  // Review (booking-based, schema-safe)
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Great tutor!",
      bookingId: booking.id
    }
  })

  console.log("Database seeded successfully")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
