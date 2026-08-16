import { useState, useEffect } from "react";
import { db } from "../lib/firebaseClient";
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

  useEffect(() => {
    async function fetchCars() {
      try {
        const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCars(fetched);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const featured = cars.length
    ? [...cars].sort((a, b) => Number(b.topSpeed) - Number(a.topSpeed))[0]
    : null;
    
  const spotlightCar = cars.length ? cars[0] : null;

  return (
    <>
      <Hero featured={featured} cars={cars} />
      <Marquee />
      <Markets cars={cars} loading={loading} />
      <Spotlight car={spotlightCar} loading={loading} />
      <FeatureStrip />
      <Gallery />
    </>
  );
}