import { Link } from "react-router-dom";

export function StatCard({ title, value, color = "text-accent", isText = false }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-medium text-text-faint">{title}</p>
      <p className={`mt-2 font-bold ${isText ? "text-xl" : "text-3xl"} num ${color}`}>{value}</p>
    </div>
  );
}

export function RecentCarsTable({ cars, loading }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-6 py-4">
        <h2 className="text-base font-semibold text-text">Recent Listings</h2>
        <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-faint">
          Live Data
        </span>
      </div>

      {loading ? (
        <p className="animate-pulse p-6 text-sm text-text-faint">Loading listings...</p>
      ) : cars.length === 0 ? (
        <div className="space-y-2 p-6 text-center">
          <p className="text-sm text-text-faint">No cars listed yet.</p>
          <Link to="/admin/cars" className="text-xs font-semibold text-accent hover:underline">
            Add your first listing →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-2 text-text-faint">
              <tr>
                <th className="px-6 py-3 font-semibold">Model</th>
                <th className="px-6 py-3 font-semibold">Listed By</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cars.map((car) => (
                <tr key={car.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-6 py-4 font-medium text-text">{car.name}</td>
                  <td className="px-6 py-4 text-text-faint">{car.authorEmail}</td>
                  <td className="px-6 py-4 text-text-faint">
                    {car.createdAt?.toDate ? car.createdAt.toDate().toLocaleDateString() : "Just now"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to="/admin/cars" className="rounded-md bg-accent-dim px-3 py-1 text-xs font-semibold text-accent hover:bg-accent-dim/70">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
