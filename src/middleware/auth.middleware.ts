import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

/**
 * Shape of JWT payload
 */
interface JwtPayload {
  id: string
  role: string
}

/**
 * Extend Express Request to include user
 */
export interface AuthRequest extends Request {
  user?: JwtPayload
}

/**
 * JWT authentication middleware
 */
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  // Check header format: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
