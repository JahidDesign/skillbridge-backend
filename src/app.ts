import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes"
import studentRoutes from "./routes/student.routes"
import tutorRoutes from "./routes/tutor.routes"
import bookingRoutes from "./routes/booking.routes"
import reviewRoutes from "./routes/review.routes"
import adminRoutes from "./routes/admin.routes"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/tutor", tutorRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/admin", adminRoutes)

export default app
