import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../lib/firebaseClient";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { StatCard, RecentCarsTable } from "../components/DashboardComponents";

export default function AdminPortalPage({ user }) {
  const [stats, setStats] = useState({
    totalCars: 0,
    myCars: 0,
    avgTopSpeed: "N/A",
    lastListed: "N/A",
  });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const total = data.length;
        const mine = data.filter((c) => c.authorEmail === user?.email).length;

        const speeds = data.map((c) => Number(c.topSpeed)).filter((n) => !isNaN(n));
        const avgSpeed = speeds.length
          ? Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length)
          : "N/A";

        let lastDate = "No listings yet";
        if (data.length > 0 && data[0].createdAt?.toDate) {
          lastDate = data[0].createdAt.toDate().toLocaleDateString();
        }

        setStats({
          totalCars: total,
          myCars: mine,
          avgTopSpeed: avgSpeed === "N/A" ? "N/A" : `${avgSpeed} mph`,
          lastListed: lastDate,
        });
        setRecentCars(data.slice(0, 5));
      } catch (error) {
        console.error("Error loading admin stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text">Overview</h1>
        <Link
          to="/admin/cars"
          className="self-start rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-bg transition-colors hover:bg-accent/90 sm:self-auto"
        >
          Manage Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Listings" value={loading ? "..." : stats.totalCars} />
        <StatCard title="Listed by You" value={loading ? "..." : stats.myCars} color="text-up" />
        <StatCard title="Avg Top Speed" value={loading ? "..." : stats.avgTopSpeed} color="text-text" isText />
        <StatCard title="Last Listed" value={loading ? "..." : stats.lastListed} color="text-text-dim" isText />
      </div>

      <RecentCarsTable cars={recentCars} loading={loading} />
    </div>
  );
}
