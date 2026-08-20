import { useState, useEffect } from "react";

const categories = ["Hypercar", "GT", "Track", "Hybrid"];

const emptyForm = {
  name: "",
  make: "",
  engine: "",
  category: "Hypercar",
  image: "",
  power: "",
  zeroToSixty: "",
  topSpeed: "",
  price: "",
  description: "",
};

export default function CarForm({ editingCar, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingCar) {
      setForm({ ...emptyForm, ...editingCar });
    } else {
      setForm(emptyForm);
    }
  }, [editingCar]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim()) return;
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-lg font-semibold text-text">
        {editingCar ? "Edit Listing" : "Add New Listing"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Model Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Chiron Super Sport"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Make</label>
            <input
              name="make"
              value={form.make}
              onChange={handleChange}
              placeholder="e.g. Bugatti"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Engine</label>
            <input
              name="engine"
              value={form.engine}
              onChange={handleChange}
              placeholder="e.g. W16"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text focus:border-accent focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Power (hp)</label>
            <input
              name="power"
              value={form.power}
              onChange={handleChange}
              placeholder="e.g. 1,578"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">0–60 mph (s)</label>
            <input
              name="zeroToSixty"
              value={form.zeroToSixty}
              onChange={handleChange}
              placeholder="e.g. 2.3"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Top Speed (mph)</label>
            <input
              name="topSpeed"
              type="number"
              value={form.topSpeed}
              onChange={handleChange}
              placeholder="e.g. 304"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. $3,900,000"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dim">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            required
            className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dim">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="A short write-up about this car..."
            className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent/90"
          >
            {editingCar ? "Update Listing" : "Publish Listing"}
          </button>
          {editingCar && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold text-text-dim transition-colors hover:text-text"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}