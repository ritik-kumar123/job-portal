import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://job-portal-1-mjju.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Static files
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
