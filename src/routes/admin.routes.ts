import { Router } from "express"
import { protect } from "../middleware/auth.middleware"
import { allowRoles } from "../middleware/role.middleware"
import { getAllUsers, banUser } from "../controllers/admin.controller"

const router = Router()

router.get("/users", protect, allowRoles("ADMIN"), getAllUsers)
router.patch("/users/:id", protect, allowRoles("ADMIN"), banUser)

export default router
