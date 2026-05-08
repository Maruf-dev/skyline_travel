import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AdminRequest extends Request {
  admin?: { email: string };
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    req.admin = { email: payload.email };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
