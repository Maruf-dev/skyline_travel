import { Router } from "express";
import { supabase } from "../lib/supabase";
import { requireAdmin } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const BlogSchema = z.object({
  cat: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  read: z.string().min(1),
  img: z.string().url(),
  img_large: z.string().url().optional(),
  excerpt: z.string().min(1),
  body: z.string().min(1),
});

// GET /api/blogs — public
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// GET /api/blogs/:id — public
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) { res.status(404).json({ error: "Not found" }); return; }
  res.json(data);
});

// POST /api/blogs — admin only
router.post("/", requireAdmin, async (req, res) => {
  const parse = BlogSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase.from("blogs").insert(parse.data).select().single();
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(201).json(data);
});

// PUT /api/blogs/:id — admin only
router.put("/:id", requireAdmin, async (req, res) => {
  const parse = BlogSchema.partial().safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { data, error } = await supabase
    .from("blogs")
    .update(parse.data)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// DELETE /api/blogs/:id — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  const { error } = await supabase.from("blogs").delete().eq("id", req.params.id);
  if (error) { res.status(500).json({ error: error.message }); return; }
  res.status(204).send();
});

export default router;
