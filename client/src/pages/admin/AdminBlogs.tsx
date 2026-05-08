import { useEffect, useState } from "react";
import { useAdmin } from "../../context/admin";

interface Blog {
  id: string;
  cat: string;
  title: string;
  date: string;
  read: string;
  img: string;
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const empty = { cat: "", title: "", date: "", read: "", img: "", img_large: "", excerpt: "", body: "" };

export default function AdminBlogs() {
  const { token } = useAdmin();
  const [items, setItems] = useState<Blog[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const load = () =>
    fetch(`${API}/api/blogs`)
      .then((r) => r.json())
      .then((d: Blog[]) => setItems(d));

  useEffect(() => { void load(); }, []);

  const handleSave = async () => {
    setLoading(true);
    setMsg(null);
    const url = editing ? `${API}/api/blogs/${editing}` : `${API}/api/blogs`;
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { setMsg(editing ? "Updated!" : "Created!"); setForm(empty); setEditing(null); void load(); }
    else setMsg("Error saving");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`${API}/api/blogs/${id}`, { method: "DELETE", headers });
    void load();
  };

  return (
    <div>
      <h2 className="admin-section-title">Blog Posts</h2>

      <div className="admin-form-card">
        <h3 className="admin-form-card__title">{editing ? "Edit Post" : "Add Post"}</h3>
        <div className="admin-form-grid">
          {(["cat", "title", "date", "read", "img", "img_large", "excerpt"] as const).map((f) => (
            <div key={f} className="admin-field">
              <label className="admin-field__label">{f}</label>
              <input className="admin-field__input" value={form[f]} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))} />
            </div>
          ))}
          <div className="admin-field admin-field--full">
            <label className="admin-field__label">body (HTML or markdown)</label>
            <textarea className="admin-field__input admin-field__textarea" rows={6} value={form.body} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))} />
          </div>
        </div>
        {msg && <p className="admin-msg">{msg}</p>}
        <div className="admin-form-actions">
          <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving…" : editing ? "Update" : "Create"}
          </button>
          {editing && <button className="admin-btn admin-btn--ghost" onClick={() => { setEditing(null); setForm(empty); }}>Cancel</button>}
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td><span className="admin-badge">{b.cat}</span></td>
                <td>{b.date}</td>
                <td className="admin-table__actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => { setEditing(b.id); setForm({ ...empty, ...b }); }}>Edit</button>
                  <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
