import { Request, Response } from "express"
import prisma from "../lib/prisma"

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

export const banUser = async (req: Request, res: Response) => {
  const { id } = req.params

  await prisma.user.update({
    where: { id },
    data: { isBanned: true }
  })

  res.json({ message: "User banned successfully" })
}
