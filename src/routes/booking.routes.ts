import { Router } from "express"
import { protect } from "../middleware/auth.middleware"
import { createBooking } from "../controllers/booking.controller"

const router = Router()

router.post("/", protect, createBooking)

export default router
