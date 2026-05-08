import { Router } from "express";
import { supabase } from "../lib/supabase";
import { requireAdmin } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const DealSchema = z.object({
  from_city: z.string().min(1),
  to_city: z.string().min(1),
  date: z.string().min(1),
  price: z.string().min(1),
  save: z.string().min(1),
  airline: z.string().min(1),
  img: z.string().url(),
});

// GET /api/deals — public
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// POST /api/deals — admin only
router.post("/", requireAdmin, async (req, res) => {
  const parse = DealSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase.from("deals").insert(parse.data).select().single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json(data);
});

// PUT /api/deals/:id — admin only
router.put("/:id", requireAdmin, async (req, res) => {
  const parse = DealSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase
    .from("deals")
    .update(parse.data)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// DELETE /api/deals/:id — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  const { error } = await supabase.from("deals").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(204).send();
});

export default router;
