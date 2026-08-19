export default function Hero({ featured, cars = [] }) {
  const speeds = cars.map((c) => Number(c.zeroToSixty)).filter((n) => !isNaN(n) && n > 0);
  const bestZeroToSixty = speeds.length ? Math.min(...speeds).toFixed(1) : null;

  return (
    <section className="w-full border-b border-border">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="w-full flex flex-col lg:flex-row lg:gap-12 gap-10">

          <div className="w-full lg:w-1/2 min-w-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-light bg-surface px-3 py-1.5 text-[11px] font-medium text-text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Season 2026 listing now open
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl break-words">
              The supercar market, <span className="text-accent">priced live.</span>
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-text-dim">
              Track power, acceleration, and price across the world's fastest production cars — laid out the way you'd track an asset, because that's exactly what these are.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#markets" className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent/90">
                View all markets
              </a>
              <a href="#spotlight" className="rounded-lg border border-border-light px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-text-faint">
                Today's spotlight
              </a>
            </div>

            {cars.length > 0 ? (
              <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface">
                <div className="px-3 py-4 min-w-0">
                  <div className="num text-xl font-bold text-text">{cars.length}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Models Listed</div>
                </div>
                <div className="px-3 py-4 min-w-0">
                  <div className="num text-xl font-bold text-text">
                    {bestZeroToSixty ?? "—"}<span className="ml-0.5 text-xs text-accent">s</span>
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Quickest 0–60</div>
                </div>
                <div className="px-3 py-4 min-w-0">
                  <div className="num text-xl font-bold text-text">
                    {featured ? featured.topSpeed : "—"}<span className="ml-0.5 text-xs text-accent">mph</span>
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Top Speed</div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-border bg-surface px-5 py-4 text-xs text-text-faint">
                Add your first listing in the admin dashboard to see live stats here.
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 min-w-0">
            {featured ? (
              <div className="w-full rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={featured.image} alt={featured.name} className="h-11 w-11 shrink-0 rounded-lg bg-surface-2 object-cover" />
                    <div className="min-w-0">
                      <div className="font-display text-base font-bold text-text truncate">{featured.name}</div>
                      <div className="text-xs text-text-faint truncate">{featured.make} · {featured.engine}</div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-up-dim px-2.5 py-1 text-xs font-semibold text-up">Top Speed</span>
                </div>

                <div className="my-5">
                  <div className="num text-3xl font-bold text-text break-words">{featured.price}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm">
                    <span className="num font-semibold text-up">▲ {featured.topSpeed} mph</span>
                    <span className="text-text-faint">fastest listed</span>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-border bg-surface-2 p-4">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="text-text-faint">Power</span>
                    <span className="num font-semibold text-text">{featured.power} hp</span>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="text-text-faint">0–60 mph</span>
                    <span className="num font-semibold text-text">{featured.zeroToSixty}s</span>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="text-text-faint">Category</span>
                    <span className="font-semibold text-text truncate">{featured.category}</span>
                  </div>
                </div>

                <a href={`/car/${featured.id}`} className="mt-5 block rounded-lg border border-border-light py-2.5 text-center text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent">
                  View full spec sheet
                </a>
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-faint">
                No listings yet — check back soon.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}