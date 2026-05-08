import type { BlogPost } from "../types";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Normalise a raw Supabase blog row to the client BlogPost shape
function normalise(row: Record<string, unknown>): BlogPost {
  const rawBody = (row.body as string) ?? "";
  const body = rawBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    id: row.id as string,
    cat: row.cat as string,
    title: row.title as string,
    date: row.date as string,
    read: row.read as string,
    img: row.img as string,
    imgLarge: (row.img_large as string | undefined) ?? undefined,
    excerpt: row.excerpt as string,
    body: body.length ? body : [rawBody],
  };
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${BASE}/api/blogs`);
  if (!res.ok) throw new Error(`Failed to load blogs (${res.status})`);
  const data = await res.json();
  return (data as Record<string, unknown>[]).map(normalise);
}

export async function fetchBlog(id: string): Promise<BlogPost> {
  const res = await fetch(`${BASE}/api/blogs/${id}`);
  if (res.status === 404) throw new Error("not_found");
  if (!res.ok) throw new Error(`Failed to load blog (${res.status})`);
  return normalise(await res.json());
}
