import { Request, Response } from "express";
import rateLimit from "../config/upstash";

const rateLimiter = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key"); //should be per userId
    if (!success) {
      res.status(429).json();
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
export default rateLimiter;
