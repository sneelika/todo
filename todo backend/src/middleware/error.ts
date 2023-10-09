import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (error.message) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};
