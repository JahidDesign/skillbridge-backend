import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

export const createBooking = async (
  req: AuthRequest,
  res: Response
) => {
  const { tutorId } = req.body

  const booking = await prisma.booking.create({
    data: {
      tutorId,
      studentId: req.user!.id
    }
  })

  res.status(201).json(booking)
}
