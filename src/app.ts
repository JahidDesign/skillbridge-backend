import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes"
import tutorRoutes from "./routes/tutor.routes"
import bookingRoutes from "./routes/booking.routes"
import adminRoutes from "./routes/admin.routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/tutor", tutorRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/admin", adminRoutes)

export default app
