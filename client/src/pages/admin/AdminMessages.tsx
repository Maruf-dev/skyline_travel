import { useEffect, useState } from "react";
import { useAdmin } from "../../context/admin";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function AdminMessages() {
  const { token } = useAdmin();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [tab, setTab] = useState<"contacts" | "newsletter">("contacts");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/admin/contacts`, { headers }).then((r) => r.json()),
      fetch(`${API}/api/admin/newsletter`, { headers }).then((r) => r.json()),
    ]).then(([c, n]: [Contact[], Subscriber[]]) => {
      setContacts(c);
      setSubscribers(n);
    });
  }, [token]);

  return (
    <div>
      <h2 className="admin-section-title">Messages & Subscribers</h2>

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === "contacts" ? "admin-tab--active" : ""}`} onClick={() => setTab("contacts")}>
          Contact Messages ({contacts.length})
        </button>
        <button className={`admin-tab ${tab === "newsletter" ? "admin-tab--active" : ""}`} onClick={() => setTab("newsletter")}>
          Newsletter ({subscribers.length})
        </button>
      </div>

      {tab === "contacts" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th></tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject}</td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "newsletter" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Email</th><th>Subscribed</th></tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id}>
                  <td>{s.email}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
