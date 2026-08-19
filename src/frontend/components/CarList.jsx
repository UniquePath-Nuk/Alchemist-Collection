export default function CarList({ cars, loading, onCreateNew, onEdit, onDelete }) {
  return (
    <div className="space-y-4 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-text">Inventory</h2>
          <span className="text-xs text-text-faint">{cars.length} total listings</span>
        </div>
        <button
          onClick={onCreateNew}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent/90"
        >
          + Add New Listing
        </button>
      </div>

      {loading ? (
        <p className="animate-pulse p-6 text-sm text-text-faint">Loading listings...</p>
      ) : cars.length === 0 ? (
        <p className="p-6 text-sm text-text-faint">No cars listed yet. Click above to add your first one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-2 text-text-faint">
              <tr>
                <th className="px-6 py-3 font-semibold">Model</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Price</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cars.map((car) => (
                <tr key={car.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={car.image} alt={car.name} className="h-9 w-9 shrink-0 rounded-lg bg-surface-2 object-cover" />
                      <div>
                        <div className="font-medium text-text">{car.name}</div>
                        <div className="text-xs text-text-faint">{car.make}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-dim">{car.category}</td>
                  <td className="px-6 py-4 num text-text">{car.price}</td>
                  <td className="space-x-2 px-6 py-4 text-right">
                    <button
                      onClick={() => onEdit(car)}
                      className="rounded-md bg-accent-dim px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent-dim/70"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(car.id)}
                      className="rounded-md bg-down-dim px-3 py-1 text-xs font-semibold text-down transition-colors hover:bg-down-dim/70"
                    >
                      Delete
                    </button>
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
