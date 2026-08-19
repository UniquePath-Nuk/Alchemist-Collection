import { useState, useEffect } from "react";
import { db } from "../../backend/lib/firebaseClient";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Markets from "../components/Markets";
import Spotlight from "../components/Spotlight";
import FeatureStrip from "../components/FeatureStrip";
import Gallery from "../components/Gallery";

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchCars(attempt = 1) {
    setLoading(true);
    setError(false);
    try {
      const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(fetched);
    } catch (err) {
      console.error(`Error fetching cars (attempt ${attempt}):`, err);
      if (attempt < 3) {
        setTimeout(() => fetchCars(attempt + 1), 800 * attempt);
        return;
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const featured = cars.length
    ? [...cars].sort((a, b) => Number(b.topSpeed) - Number(a.topSpeed))[0]
    : null;

  const spotlightCar = cars.length ? cars[0] : null;

  if (error) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <p className="text-text-dim">Couldn't load listings — check your connection.</p>
        <button
          onClick={() => fetchCars()}
          className="mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      <Hero featured={featured} cars={cars} />
      <Marquee />
      <Markets cars={cars} loading={loading} />
      <Spotlight car={spotlightCar} />
      <FeatureStrip />
      <Gallery />
    </>
  );
}