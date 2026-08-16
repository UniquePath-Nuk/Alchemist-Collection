export default function Spotlight({ car, loading = false }) {
  if (!car) {
    return (
      <section id="spotlight" className="scroll-mt-28 border-y border-border bg-surface">
        <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Spotlight</p>
          <div className="mt-6 rounded-2xl border border-border bg-surface-2 px-5 py-10 text-center text-sm text-text-faint">
            {loading ? "Loading today's spotlight..." : "No spotlight listing available yet."}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="spotlight" className="scroll-mt-28 border-y border-border bg-surface">
      <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Spotlight</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">{car.name}</h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img src={car.image} alt={car.name} className="h-full w-full object-cover" style={{ maxHeight: 460 }} />
          </div>

          <div>
            <p className="text-[15px] leading-relaxed text-text-dim">
              {car.description || `The ${car.name} from ${car.make} — ${car.engine}, built for those who don't compromise.`}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
                <div className="num text-lg font-bold text-text">{car.power}<span className="ml-0.5 text-xs text-accent">hp</span></div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Max Power</div>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
                <div className="num text-lg font-bold text-text">{car.zeroToSixty}<span className="ml-0.5 text-xs text-accent">s</span></div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">0–60 mph</div>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
                <div className="num text-lg font-bold text-text">{car.topSpeed}<span className="ml-0.5 text-xs text-accent">mph</span></div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Top Speed</div>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
                <div className="num text-lg font-bold text-text">{car.price}</div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Price</div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a href={`/car/${car.id}`} className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent/90">
                View full details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}