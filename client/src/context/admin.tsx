import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AdminContextValue {
  token: string | null;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminCtx = createContext<AdminContextValue | null>(null);

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [adminEmail, setAdminEmail] = useState<string | null>(() => localStorage.getItem("admin_email"));

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { error?: string }).error ?? "Login failed");
    }

    const data = (await res.json()) as { token: string; email: string };
    setToken(data.token);
    setAdminEmail(data.email);
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_email", data.email);
  }, []);

  const logout = useCallback((): void => {
    setToken(null);
    setAdminEmail(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
  }, []);

  return (
    <AdminCtx.Provider value={{ token, adminEmail, login, logout }}>
      {children}
    </AdminCtx.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminCtx);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}
