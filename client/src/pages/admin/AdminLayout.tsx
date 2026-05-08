import { type ReactNode } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/admin";
import "../../styles/admin.css";

const NAV = [
  { to: "/admin",              label: "Dashboard",    icon: "📊", end: true },
  { to: "/admin/destinations", label: "Destinations", icon: "🗺️" },
  { to: "/admin/blogs",        label: "Blog Posts",   icon: "📝" },
  { to: "/admin/deals",        label: "Deals",        icon: "✈️" },
  { to: "/admin/messages",     label: "Messages",     icon: "📬" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { token, adminEmail, logout } = useAdmin();
  const navigate = useNavigate();

  if (!token) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>✈</span>
          <span>Skyline Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? "admin-nav-link--active" : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__email">{adminEmail}</p>
          <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
