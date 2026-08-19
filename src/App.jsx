import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth } from "./backend/lib/firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Navbar from "./frontend/components/Navbar";
import Sidebar from "./frontend/components/Sidebar";
import Footer from "./frontend/components/Footer";

import HomePage from "./frontend/pages/HomePage";
import CarDetailPage from "./frontend/pages/CarDetailPage";
import AboutPage from "./frontend/pages/AboutPage";
import ContactPage from "./frontend/pages/ContactPage";

import LoginPage from "./frontend/pages/LoginPage";
import RegisterPage from "./frontend/pages/RegisterPage";
import ForgotPasswordPage from "./frontend/pages/ForgotPasswordPage";

import AdminPortalPage from "./frontend/pages/AdminPortalPage";
import CarsManager from "./frontend/pages/CarsManager";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setCheckingSession(false);
      setIsSidebarOpen(!!currentUser);
    });

    const failSafe = setTimeout(() => {
      setCheckingSession((stillChecking) => {
        if (stillChecking) {
          console.warn("Firebase auth check timed out after 5s — showing public site.");
        }
        return false;
      });
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(failSafe);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.hash]);

  async function handleLogout() {
    try {
      await signOut(auth);
      setIsSidebarOpen(false);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="animate-pulse font-medium text-text-dim">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-bg text-text">
      <Navbar
        user={user}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 pt-25 relative">
        {user && isAdminRoute && (
          <Sidebar user={user} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        <main className={`min-w-0 flex-1 overflow-x-hidden transition-all duration-300 ${user && isAdminRoute && isSidebarOpen ? "md:pl-64" : "md:pl-0"}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/admin" replace />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/admin" replace />} />
            <Route path="/forgot-password" element={!user ? <ForgotPasswordPage /> : <Navigate to="/admin" replace />} />

            <Route path="/admin" element={user ? <AdminPortalPage user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/admin/cars" element={user ? <CarsManager user={user} /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>

      <div className={`transition-all duration-300 ${user && isAdminRoute && isSidebarOpen ? "md:pl-64" : "md:pl-0"}`}>
        <Footer />
      </div>
    </div>
  );
}