import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy" });
});

app.use("/auth", authRoutes);

app.use("/tasks", authMiddleware, taskRoutes);

app.use(errorHandler);

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
