import express, { Request, Response } from "express";
import notesRoutes from "./routes/notesRoutes";
import cors from "cors";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter";
import path from "path";

dotenv.config();
const app = express();
const PORT: string = process.env.PORT!;

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
//app.use(rateLimiter); //go to upstash website + env variables
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(Number(PORT), () => {
    console.log("Server started!");
  });
});
