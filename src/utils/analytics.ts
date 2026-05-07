declare global {
  interface Window {
    plausible?: ((event: string, options?: { u?: string; props?: Record<string, string> }) => void) & {
      q?: unknown[];
    };
  }
}

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

export function initAnalytics(): void {
  if (!import.meta.env.PROD || !DOMAIN) return;

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = DOMAIN;
  script.dataset.api = "/pa/api/event";
  script.src = "https://plausible.io/js/script.manual.pageview-props.js";
  document.head.appendChild(script);

  window.plausible =
    window.plausible ??
    Object.assign((...args: unknown[]) => { (window.plausible!.q = window.plausible!.q ?? []).push(args); });
}

export function trackPageView(url: string): void {
  if (!import.meta.env.PROD || !DOMAIN || typeof window.plausible !== "function") return;
  window.plausible("pageview", { u: url });
}

export function trackEvent(name: string, props?: Record<string, string>): void {
  if (!import.meta.env.PROD || !DOMAIN || typeof window.plausible !== "function") return;
  window.plausible(name, props ? { props } : undefined);
}
