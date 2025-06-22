import express, { json } from "express";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config();
const app = express();
app.use(express.json());
//app.use(rateLimiter); //go to upstash website + env variables
app.use("/api/notes", notesRoutes);

const PORT: string = process.env.PORT!;

connectDB().then(() => {
  app.listen(Number(PORT), () => {
    console.log("Server started!");
  });
});
