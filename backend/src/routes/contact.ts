import { Router } from "express";
import { supabase } from "../lib/supabase";
import { z } from "zod";

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(2000),
});

// POST /api/contact — public
router.post("/", async (req, res) => {
  const parse = ContactSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { error } = await supabase.from("contacts").insert(parse.data);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json({ message: "Message received" });
});

// GET /api/contact — admin only (import requireAdmin separately if needed)
export default router;
