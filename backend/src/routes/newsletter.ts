import { Router } from "express";
import { supabase } from "../lib/supabase";
import { z } from "zod";

const router = Router();

const SubscribeSchema = z.object({
  email: z.string().email(),
});

// POST /api/newsletter — public
router.post("/", async (req, res) => {
  const parse = SubscribeSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: "Invalid email" }); return; }

  // upsert so duplicate emails don't error
  const { error } = await supabase
    .from("newsletter")
    .upsert({ email: parse.data.email }, { onConflict: "email" });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json({ message: "Subscribed" });
});

export default router;
