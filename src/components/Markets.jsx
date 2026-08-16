import { useState } from "react";
import { Link } from "react-router-dom";

const filterPills = ["All", "Hypercar", "GT", "Track", "Hybrid"];

export default function Markets({ cars, loading }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleCars =
    activeFilter === "All" ? cars : cars.filter((car) => car.category === activeFilter);

  return (
    <section id="markets" className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Live Markets</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">The Collection</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-faint">
          <span className="num">{cars.length} models</span>
          <span>·</span>
          <span>From our Firestore inventory</span>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {filterPills.map((pill) => (
          <button
            key={pill}
            onClick={() => setActiveFilter(pill)}
            className={
              activeFilter === pill
                ? "rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-bg"
                : "rounded-full border border-border-light px-4 py-1.5 text-xs font-medium text-text-dim transition-colors hover:border-text-faint hover:text-text"
            }
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
                <th className="px-5 py-3.5 font-semibold">Model</th>
                <th className="px-5 py-3.5 text-right font-semibold">Power</th>
                <th className="px-5 py-3.5 text-right font-semibold">0–60 mph</th>
                <th className="px-5 py-3.5 text-right font-semibold">Top Speed</th>
                <th className="px-5 py-3.5 text-right font-semibold">Price</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-text-faint animate-pulse">Loading inventory...</td></tr>
              ) : visibleCars.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-text-faint">No models in this category yet.</td></tr>
              ) : (
                visibleCars.map((car) => (
                  <tr key={car.id} className="group transition-colors hover:bg-surface-2">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={car.image} alt={car.name} className="h-9 w-9 shrink-0 rounded-lg bg-surface-2 object-cover" />
                        <div><div className="text-sm font-semibold text-text">{car.name}</div><div className="text-xs text-text-faint">{car.make} · {car.engine}</div></div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right num text-sm font-medium text-text">{car.power} <span className="text-text-faint">hp</span></td>
                    <td className="px-5 py-4 text-right num text-sm font-medium text-text">{car.zeroToSixty} <span className="text-text-faint">s</span></td>
                    <td className="px-5 py-4 text-right"><span className="num inline-flex items-center gap-1 rounded-md bg-up-dim px-2 py-1 text-sm font-semibold text-up">▲ {car.topSpeed} mph</span></td>
                    <td className="px-5 py-4 text-right num text-sm font-semibold text-text">{car.price}</td>
                    <td className="px-5 py-4 text-right"><Link to={`/car/${car.id}`} className="rounded-md border border-border-light px-3 py-1.5 text-xs font-semibold text-text-dim opacity-0 transition-all group-hover:opacity-100 hover:border-accent hover:text-accent">Details</Link></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {loading ? (
            <div className="px-5 py-10 text-center text-sm text-text-faint animate-pulse">Loading inventory...</div>
          ) : visibleCars.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-text-faint">No models in this category yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {visibleCars.map((car) => (
                <article key={car.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={car.image} alt={car.name} className="h-12 w-12 shrink-0 rounded-xl bg-surface-2 object-cover" />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-text">{car.name}</h3>
                      <p className="truncate text-xs text-text-faint">{car.make} · {car.engine}</p>
                    </div>
                    <span className="num shrink-0 rounded-md bg-up-dim px-2 py-1 text-xs font-semibold text-up">▲ {car.topSpeed} mph</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2"><span className="block text-text-faint">Power</span><span className="num font-semibold text-text">{car.power} hp</span></div>
                    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2"><span className="block text-text-faint">0–60 mph</span><span className="num font-semibold text-text">{car.zeroToSixty}s</span></div>
                    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2"><span className="block text-text-faint">Price</span><span className="num font-semibold text-text">{car.price}</span></div>
                    <div className="flex items-end justify-end rounded-lg border border-border bg-surface-2 px-3 py-2"><Link to={`/car/${car.id}`} className="font-semibold text-accent">View details →</Link></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}