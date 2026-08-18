import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../lib/firebaseClient";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { StatCard, RecentCarsTable } from "../components/DashboardComponents";

export default function AdminPortalPage({ user }) {
  const [stats, setStats] = useState({
    totalCars: 0,
    myCars: 0,
    avgTopSpeed: "N/A",
    lastListed: "N/A",
  });
  const [recentCars, setRecentCars] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);

  async function fetchMessages() {
    setMessagesLoading(true);
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setMessages(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  }

  async function markMessageRead(id) {
    try {
      await updateDoc(doc(db, "messages", id), { status: "read" });
      setMessages((current) => current.map((message) => message.id === id ? { ...message, status: "read" } : message));
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }

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
        const avgSpeed = speeds.length ? Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length) : "N/A";
        let lastDate = "No listings yet";
        if (data.length > 0 && data[0].createdAt?.toDate) lastDate = data[0].createdAt.toDate().toLocaleDateString();

        setStats({ totalCars: total, myCars: mine, avgTopSpeed: avgSpeed === "N/A" ? "N/A" : `${avgSpeed} mph`, lastListed: lastDate });
        setRecentCars(data.slice(0, 5));
      } catch (error) {
        console.error("Error loading admin stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    fetchMessages();
  }, [user]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text">Overview</h1>
        <Link to="/admin/cars" className="self-start rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-bg transition-colors hover:bg-accent/90 sm:self-auto">Manage Inventory</Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Listings" value={loading ? "..." : stats.totalCars} />
        <StatCard title="Listed by You" value={loading ? "..." : stats.myCars} color="text-up" />
        <StatCard title="Avg Top Speed" value={loading ? "..." : stats.avgTopSpeed} color="text-text" isText />
        <StatCard title="Last Listed" value={loading ? "..." : stats.lastListed} color="text-text-dim" isText />
      </div>

      <RecentCarsTable cars={recentCars} loading={loading} />

      <section className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Inbox</p>
            <h2 className="mt-1 font-display text-xl font-bold text-text">Contact Messages</h2>
          </div>
          <span className="rounded-full border border-border-light px-2.5 py-1 text-xs font-semibold text-text-dim">
            {messages.filter((message) => message.status !== "read").length} new
          </span>
        </div>

        {messagesLoading ? (
          <div className="p-6 text-sm text-text-faint">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-6 text-sm text-text-faint">No contact messages yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {messages.map((message) => {
              const date = message.createdAt?.toDate ? message.createdAt.toDate().toLocaleString() : "Just now";
              const unread = message.status !== "read";
              return (
                <article key={message.id} className={`p-5 ${unread ? "bg-surface-2/50" : ""}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text">{message.name}</h3>
                        {unread && <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-bg">New</span>}
                      </div>
                      <a href={`mailto:${message.email}`} className="mt-1 block text-xs text-accent hover:underline">{message.email}</a>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-text-dim">{message.message}</p>
                      <p className="mt-3 text-[10px] text-text-faint">{date}</p>
                    </div>
                    {unread && (
                      <button onClick={() => markMessageRead(message.id)} className="self-start rounded-lg border border-border-light px-3 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-accent hover:text-accent">
                        Mark as read
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}