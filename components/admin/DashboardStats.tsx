type DashboardStatsProps = {
  stats: Array<{
    label: string;
    value: number;
  }>;
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-[1.35rem] border border-aurelia-sand/45 bg-white/80 p-6 shadow-soft"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aurelia-charcoal/60">
            {stat.label}
          </p>
          <p className="mt-4 font-display text-5xl text-aurelia-ink">
            {stat.value}
          </p>
        </article>
      ))}
    </section>
  );
}
