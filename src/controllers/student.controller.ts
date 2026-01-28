import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

/**
 * READ – Get logged-in student profile
 * GET /api/student/profile
 */
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/**
 * UPDATE – Update student profile
 * PUT /api/student/profile
 */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: "Name is required" })
    }

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name }
    })

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/**
 * DELETE – Delete student account
 * DELETE /api/student/profile
 */
export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.user!.id }
    })

    res.json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("Delete profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
