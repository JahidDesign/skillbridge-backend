import { Router } from "express"
import {
  getProfile,
  updateProfile,
  deleteProfile
} from "../controllers/student.controller"
import { protect } from "../middleware/auth.middleware"
import { allowRoles } from "../middleware/role.middleware"

const router = Router()

router.get(
  "/profile",
  protect,
  allowRoles("STUDENT"),
  getProfile
)

router.put(
  "/profile",
  protect,
  allowRoles("STUDENT"),
  updateProfile
)

router.delete(
  "/profile",
  protect,
  allowRoles("STUDENT"),
  deleteProfile
)

export default router
