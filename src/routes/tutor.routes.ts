import { Router } from "express"
import {
  createTutorProfile,
  getTutorProfile,
  updateTutorProfile
} from "../controllers/tutor.controller"
import { protect } from "../middleware/auth.middleware"
import { allowRoles } from "../middleware/role.middleware"

const router = Router()

/**
 * Tutor creates profile
 * POST /api/tutor/profile
 */
router.post(
  "/profile",
  protect,
  allowRoles("TUTOR"),
  createTutorProfile
)

/**
 * Tutor gets own profile
 * GET /api/tutor/profile
 */
router.get(
  "/profile",
  protect,
  allowRoles("TUTOR"),
  getTutorProfile
)

/**
 * Tutor updates profile
 * PUT /api/tutor/profile
 */
router.put(
  "/profile",
  protect,
  allowRoles("TUTOR"),
  updateTutorProfile
)

export default router
