import { useEffect, useState } from "react";
import { useAdmin } from "../../context/admin";

interface Stats {
  destinations: number;
  blogs: number;
  deals: number;
  contacts: number;
  newsletter: number;
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function AdminDashboard() {
  const { token } = useAdmin();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d: Stats) => setStats(d))
      .catch(() => null);
  }, [token]);

  const cards = stats
    ? [
        { label: "Destinations", value: stats.destinations, icon: "🗺️" },
        { label: "Blog Posts", value: stats.blogs, icon: "📝" },
        { label: "Deals", value: stats.deals, icon: "✈️" },
        { label: "Contact Messages", value: stats.contacts, icon: "📬" },
        { label: "Newsletter Subscribers", value: stats.newsletter, icon: "📧" },
      ]
    : [];

  return (
    <div>
      <h2 className="admin-section-title">Dashboard</h2>
      {!stats && <p className="admin-loading">Loading stats…</p>}
      <div className="admin-stats-grid">
        {cards.map((c) => (
          <div key={c.label} className="admin-stat-card">
            <span className="admin-stat-card__icon">{c.icon}</span>
            <div>
              <p className="admin-stat-card__num">{c.value}</p>
              <p className="admin-stat-card__label">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
