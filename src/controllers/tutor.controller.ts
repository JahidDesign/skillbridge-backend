import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

export const createTutorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const { bio, hourlyRate } = req.body

  const profile = await prisma.tutorProfile.create({
    data: {
      userId: req.user!.id,
      bio,
      hourlyRate
    }
  })

  res.status(201).json(profile)
}
