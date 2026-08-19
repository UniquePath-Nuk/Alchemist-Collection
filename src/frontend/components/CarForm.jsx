import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../backend/lib/firebaseClient";

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
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (editingCar) {
      setForm({ ...emptyForm, ...editingCar });
      setPreviewUrl(editingCar.image || "");
    } else {
      setForm(emptyForm);
      setPreviewUrl("");
    }
    setImageFile(null);
    setImageError("");
  }, [editingCar]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError("Image must be smaller than 10 MB.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (!form.image && !imageFile) {
      setImageError("Please choose an image from your device.");
      return;
    }

    setUploading(true);
    setImageError("");

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `cars/${Date.now()}-${safeName}`;
        const imageRef = ref(storage, filePath);

        await uploadBytes(imageRef, imageFile, {
          contentType: imageFile.type,
        });

        imageUrl = await getDownloadURL(imageRef);
      }

      await onSubmit({ ...form, image: imageUrl });
      setForm(emptyForm);
      setImageFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Error uploading/saving car image:", error);
      setImageError("Could not upload the image. Please try again.");
    } finally {
      setUploading(false);
    }
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
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Chiron Super Sport" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Make</label>
            <input name="make" value={form.make} onChange={handleChange} placeholder="e.g. Bugatti" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Engine</label>
            <input name="engine" value={form.engine} onChange={handleChange} placeholder="e.g. W16" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text focus:border-accent focus:outline-none">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Power (hp)</label>
            <input name="power" value={form.power} onChange={handleChange} placeholder="e.g. 1,578" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">0–60 mph (s)</label>
            <input name="zeroToSixty" value={form.zeroToSixty} onChange={handleChange} placeholder="e.g. 2.3" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Top Speed (mph)</label>
            <input name="topSpeed" type="number" value={form.topSpeed} onChange={handleChange} placeholder="e.g. 304" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Price</label>
            <input name="price" value={form.price} onChange={handleChange} placeholder="e.g. $3,900,000" required className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dim">Car Image</label>
          <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-border-light bg-surface-2 px-4 py-6 text-center transition-colors hover:border-accent">
            <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
            <div>
              <div className="text-sm font-semibold text-text">Choose from Gallery</div>
              <div className="mt-1 text-xs text-text-faint">JPG, PNG, WEBP · Max 10 MB</div>
            </div>
          </label>

          {previewUrl && (
            <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface-2">
              <img src={previewUrl} alt="Selected car preview" className="h-48 w-full object-cover sm:h-64" />
              {imageFile && <div className="px-3 py-2 text-xs text-text-faint">{imageFile.name}</div>}
            </div>
          )}

          {imageError && <p className="mt-2 text-xs font-medium text-down">{imageError}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dim">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="A short write-up about this car..." className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={uploading} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
            {uploading ? "Uploading..." : editingCar ? "Update Listing" : "Publish Listing"}
          </button>
          {editingCar && (
            <button type="button" onClick={onCancel} disabled={uploading} className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold text-text-dim transition-colors hover:text-text disabled:opacity-50">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}