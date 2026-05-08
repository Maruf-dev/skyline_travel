import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth";
import destinationsRouter from "./routes/destinations";
import blogsRouter from "./routes/blogs";
import dealsRouter from "./routes/deals";
import contactRouter from "./routes/contact";
import newsletterRouter from "./routes/newsletter";
import adminRouter from "./routes/admin";

const app = express();
const PORT = process.env.PORT ?? 3001;
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRouter);
app.use("/api/destinations", destinationsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/deals", dealsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Skyline Travel API running on http://localhost:${PORT}`);
});
