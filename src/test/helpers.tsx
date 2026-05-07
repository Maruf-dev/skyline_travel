import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, LangProvider } from "../context/index";
import { ToastProvider } from "../components/Toast";

export function AllProviders({
  children,
  initialEntries = ["/"],
}: {
  children: ReactNode;
  initialEntries?: string[];
}) {
  return (
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          <LangProvider>
            <ToastProvider>{children}</ToastProvider>
          </LangProvider>
        </ThemeProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}
