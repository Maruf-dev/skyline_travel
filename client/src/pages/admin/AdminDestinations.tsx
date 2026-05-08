import { useEffect, useState } from "react";
import { useAdmin } from "../../context/admin";

interface Dest {
  id: string;
  city: string;
  country: string;
  tag: string;
  price: number;
  img: string;
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const empty = { city: "", country: "", img: "", img_large: "", price: 0, tag: "", description: "", highlights: "" };

export default function AdminDestinations() {
  const { token } = useAdmin();
  const [items, setItems] = useState<Dest[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const load = () =>
    fetch(`${API}/api/destinations`)
      .then((r) => r.json())
      .then((d: Dest[]) => setItems(d));

  useEffect(() => { void load(); }, []);

  const handleSave = async () => {
    setLoading(true);
    setMsg(null);
    const body = { ...form, price: Number(form.price), highlights: form.highlights.split(",").map((s) => s.trim()).filter(Boolean) };
    const url = editing ? `${API}/api/destinations/${editing}` : `${API}/api/destinations`;
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    setLoading(false);
    if (res.ok) {
      setMsg(editing ? "Updated!" : "Created!");
      setForm(empty);
      setEditing(null);
      void load();
    } else {
      setMsg("Error saving");
    }
  };

  const handleEdit = (d: Dest & { description?: string; highlights?: string[]; img_large?: string }) => {
    setEditing(d.id);
    setForm({ city: d.city, country: d.country, img: d.img, img_large: d.img_large ?? "", price: d.price, tag: d.tag, description: d.description ?? "", highlights: (d.highlights ?? []).join(", ") });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    await fetch(`${API}/api/destinations/${id}`, { method: "DELETE", headers });
    void load();
  };

  return (
    <div>
      <h2 className="admin-section-title">Destinations</h2>

      <div className="admin-form-card">
        <h3 className="admin-form-card__title">{editing ? "Edit Destination" : "Add Destination"}</h3>
        <div className="admin-form-grid">
          {(["city", "country", "tag", "img", "img_large", "description"] as const).map((f) => (
            <div key={f} className="admin-field">
              <label className="admin-field__label">{f}</label>
              <input className="admin-field__input" value={(form as Record<string, string | number>)[f] as string} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))} />
            </div>
          ))}
          <div className="admin-field">
            <label className="admin-field__label">price (USD)</label>
            <input className="admin-field__input" type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} />
          </div>
          <div className="admin-field admin-field--full">
            <label className="admin-field__label">highlights (comma-separated)</label>
            <input className="admin-field__input" value={form.highlights} onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value }))} />
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
            <tr><th>City</th><th>Country</th><th>Tag</th><th>Price</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <td>{d.city}</td>
                <td>{d.country}</td>
                <td><span className="admin-badge">{d.tag}</span></td>
                <td>${d.price}</td>
                <td className="admin-table__actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => handleEdit(d as Dest & { description?: string; highlights?: string[]; img_large?: string })}>Edit</button>
                  <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(d.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
