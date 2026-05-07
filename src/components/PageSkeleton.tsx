export default function PageSkeleton() {
  return (
    <div className="page-skeleton" role="status" aria-live="polite" aria-label="Loading page">
      <div className="page-skeleton__hero" />
      <div className="page-skeleton__content">
        <div className="page-skeleton__bar page-skeleton__bar--lg" />
        <div className="page-skeleton__bar page-skeleton__bar--md" />
        <div className="page-skeleton__grid">
          <div className="page-skeleton__card" />
          <div className="page-skeleton__card" />
          <div className="page-skeleton__card" />
        </div>
      </div>
    </div>
  );
}
