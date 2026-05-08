import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";

const colorByRating: Record<string, string> = {
  good:                "color: #22c55e; font-weight: 700;",
  "needs-improvement": "color: #f59e0b; font-weight: 700;",
  poor:                "color: #ef4444; font-weight: 700;",
};

function report(metric: Metric): void {
  const style = colorByRating[metric.rating] ?? "color: inherit;";
  // eslint-disable-next-line no-console
  console.log(
    `%c[web-vitals] ${metric.name} %c${metric.value.toFixed(1)} (${metric.rating})`,
    "color: #38bdf8; font-weight: 700;",
    style
  );
}

export function startWebVitals(): void {
  onCLS(report);
  onINP(report);
  onFCP(report);
  onLCP(report);
  onTTFB(report);
}
