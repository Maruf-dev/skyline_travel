import { useEffect, useState } from "react";
import { useAdmin } from "../../context/admin";

interface Deal {
  id: string;
  from_city: string;
  to_city: string;
  date: string;
  price: string;
  save: string;
  airline: string;
  img: string;
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const empty = { from_city: "", to_city: "", date: "", price: "", save: "", airline: "", img: "" };

export default function AdminDeals() {
  const { token } = useAdmin();
  const [items, setItems] = useState<Deal[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const load = () => fetch(`${API}/api/deals`).then((r) => r.json()).then((d: Deal[]) => setItems(d));
  useEffect(() => { void load(); }, []);

  const handleSave = async () => {
    setLoading(true);
    setMsg(null);
    const url = editing ? `${API}/api/deals/${editing}` : `${API}/api/deals`;
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) { setMsg(editing ? "Updated!" : "Created!"); setForm(empty); setEditing(null); void load(); }
    else setMsg("Error saving");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deal?")) return;
    await fetch(`${API}/api/deals/${id}`, { method: "DELETE", headers });
    void load();
  };

  const fields = ["from_city", "to_city", "date", "price", "save", "airline", "img"] as const;

  return (
    <div>
      <h2 className="admin-section-title">Deals</h2>

      <div className="admin-form-card">
        <h3 className="admin-form-card__title">{editing ? "Edit Deal" : "Add Deal"}</h3>
        <div className="admin-form-grid">
          {fields.map((f) => (
            <div key={f} className="admin-field">
              <label className="admin-field__label">{f.replace("_", " ")}</label>
              <input className="admin-field__input" value={form[f]} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))} />
            </div>
          ))}
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
            <tr><th>Route</th><th>Airline</th><th>Price</th><th>Save</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <td>{d.from_city} → {d.to_city}</td>
                <td>{d.airline}</td>
                <td>{d.price}</td>
                <td><span className="admin-badge admin-badge--green">-{d.save}</span></td>
                <td className="admin-table__actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => { setEditing(d.id); setForm({ from_city: d.from_city, to_city: d.to_city, date: d.date, price: d.price, save: d.save, airline: d.airline, img: d.img }); }}>Edit</button>
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
