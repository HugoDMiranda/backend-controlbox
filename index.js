import express from "express";
import reviewsRoutes from "./routes/reviews.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

const origin = ["https://animereviews.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: origin,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/reviews", reviewsRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log("Connected");
});
