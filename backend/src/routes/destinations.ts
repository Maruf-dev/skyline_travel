import { Router } from "express";
import { supabase } from "../lib/supabase";
import { requireAdmin } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const DestSchema = z.object({
  city: z.string().min(1),
  country: z.string().min(1),
  img: z.string().url(),
  img_large: z.string().url().optional(),
  price: z.number().positive(),
  tag: z.string().min(1),
  description: z.string().min(1),
  highlights: z.array(z.string()).min(1),
});

// GET /api/destinations — public
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// GET /api/destinations/:id — public
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) { res.status(404).json({ error: "Not found" }); return; }
  res.json(data);
});

// POST /api/destinations — admin only
router.post("/", requireAdmin, async (req, res) => {
  const parse = DestSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase.from("destinations").insert(parse.data).select().single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json(data);
});

// PUT /api/destinations/:id — admin only
router.put("/:id", requireAdmin, async (req, res) => {
  const parse = DestSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase
    .from("destinations")
    .update(parse.data)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// DELETE /api/destinations/:id — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  const { error } = await supabase.from("destinations").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(204).send();
});

export default router;
