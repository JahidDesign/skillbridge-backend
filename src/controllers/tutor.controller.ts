import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

/**
 * CREATE – Tutor creates profile
 * POST /api/tutor/profile
 */
export const createTutorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bio, hourlyRate } = req.body

    if (!bio || !hourlyRate) {
      return res.status(400).json({ message: "Bio and hourly rate are required" })
    }

    // Prevent duplicate profile
    const existingProfile = await prisma.tutorProfile.findUnique({
      where: { userId: req.user!.id }
    })

    if (existingProfile) {
      return res.status(400).json({ message: "Tutor profile already exists" })
    }

    const profile = await prisma.tutorProfile.create({
      data: {
        userId: req.user!.id,
        bio,
        hourlyRate
      }
    })

    res.status(201).json(profile)
  } catch (error) {
    console.error("Create tutor profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/**
 * READ – Get tutor own profile
 * GET /api/tutor/profile
 */
export const getTutorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId: req.user!.id }
    })

    if (!profile) {
      return res.status(404).json({ message: "Tutor profile not found" })
    }

    res.json(profile)
  } catch (error) {
    console.error("Get tutor profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/**
 * UPDATE – Update tutor profile
 * PUT /api/tutor/profile
 */
export const updateTutorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bio, hourlyRate } = req.body

    const profile = await prisma.tutorProfile.update({
      where: { userId: req.user!.id },
      data: {
        bio,
        hourlyRate
      }
    })

    res.json({
      message: "Tutor profile updated successfully",
      profile
    })
  } catch (error) {
    console.error("Update tutor profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/**
 * DELETE – Delete tutor profile
 * DELETE /api/tutor/profile
 */
export const deleteTutorProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await prisma.tutorProfile.delete({
      where: { userId: req.user!.id }
    })

    res.json({ message: "Tutor profile deleted successfully" })
  } catch (error) {
    console.error("Delete tutor profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
