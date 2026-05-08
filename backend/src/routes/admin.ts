import { Router } from "express";
import { supabase } from "../lib/supabase";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// GET /api/admin/stats — admin dashboard summary
router.get("/stats", requireAdmin, async (_req, res) => {
  const [destinations, blogs, deals, contacts, newsletter] = await Promise.all([
    supabase.from("destinations").select("id", { count: "exact", head: true }),
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("deals").select("id", { count: "exact", head: true }),
    supabase.from("contacts").select("id", { count: "exact", head: true }),
    supabase.from("newsletter").select("id", { count: "exact", head: true }),
  ]);

  res.json({
    destinations: destinations.count ?? 0,
    blogs: blogs.count ?? 0,
    deals: deals.count ?? 0,
    contacts: contacts.count ?? 0,
    newsletter: newsletter.count ?? 0,
  });
});

// GET /api/admin/contacts — view all contact submissions
router.get("/contacts", requireAdmin, async (_req, res) => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

// GET /api/admin/newsletter — view all subscribers
router.get("/newsletter", requireAdmin, async (_req, res) => {
  const { data, error } = await supabase
    .from("newsletter")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { res.status(500).json({ error: error.message }); return; }
  res.json(data);
});

export default router;
