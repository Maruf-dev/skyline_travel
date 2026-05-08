import { Router } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase";
import { z } from "zod";

const router = Router();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const parse = LoginSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid email or password format" });
    return;
  }

  const { email, password } = parse.data;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // Allow if email is in ADMIN_EMAILS whitelist OR has role=admin in metadata
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  const role = data.user.user_metadata?.role ?? data.user.app_metadata?.role;
  const isAdmin = role === "admin" || adminEmails.includes(email);
  if (!isAdmin) {
    res.status(403).json({ error: "Not an admin" });
    return;
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "8h" });
  res.json({ token, email });
});

export default router;
