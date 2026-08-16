import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error loading car:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="animate-pulse font-medium text-text-faint">Loading spec sheet...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-border bg-surface p-8 py-12 text-center">
        <p className="text-lg font-semibold text-text">Listing Not Found</p>
        <p className="text-sm text-text-faint">This car may have been sold or removed from inventory.</p>
        <Link to="/#markets" className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent/90">
          ← Back to Markets
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto my-6 max-w-5xl space-y-8 overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-10">
      <Link to="/#markets" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
        ← Back to All Markets
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border">
        <img src={car.image} alt={car.name} className="h-full max-h-[420px] w-full object-cover" />
      </div>

      <div className="space-y-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text md:text-5xl">{car.name}</h1>
          <span className="rounded-md bg-up-dim px-3 py-1 text-sm font-semibold text-up">{car.category}</span>
        </div>
        <p className="text-sm text-text-faint">{car.make} · {car.engine}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
          <div className="num text-xl font-bold text-text">{car.power}<span className="ml-0.5 text-xs text-accent">hp</span></div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Max Power</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
          <div className="num text-xl font-bold text-text">{car.zeroToSixty}<span className="ml-0.5 text-xs text-accent">s</span></div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">0–60 mph</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
          <div className="num text-xl font-bold text-text">{car.topSpeed}<span className="ml-0.5 text-xs text-accent">mph</span></div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Top Speed</div>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 px-4 py-4">
          <div className="num text-xl font-bold text-text">{car.price}</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-text-faint">Price</div>
        </div>
      </div>

      {car.description && (
        <p className="max-w-3xl text-[15px] leading-relaxed text-text-dim">{car.description}</p>
      )}

      <div className="text-xs text-text-faint">
        Listed by {car.authorEmail}
        {car.createdAt?.toDate ? ` on ${car.createdAt.toDate().toLocaleDateString()}` : ""}
      </div>
    </article>
  );
}
