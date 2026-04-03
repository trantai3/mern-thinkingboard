import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoute.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
  origin: "http://localhost:5173", // allow requests from this origin
}));
app.use(express.json()); // this middleware will parse json bodies: req.body
app.use(rateLimiter); // apply rate limiter to all routes
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} and req url is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
