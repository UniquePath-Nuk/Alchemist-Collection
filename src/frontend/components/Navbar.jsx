import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout, isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-4 text-[11px] text-text-dim sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent"></span>
            </span>
            <span>Live inventory · 12 markets tracked</span>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <span>USD</span>
            <span className="text-text-faint">|</span>
            <Link to="/contact" className="transition-colors hover:text-text">Support</Link>
          </div>
        </div>
      </div>

      <nav className="border-b border-border bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link
              to={user ? "/admin" : "/"}
              className="font-display text-xl font-bold tracking-tight text-text"
            >
              Alchem<span className="text-accent">ist</span>
            </Link>

            {!isAdminRoute && (
              <ul className="hidden items-center gap-7 lg:flex">
                <li><Link to="/#markets" className="text-sm font-medium text-text-dim transition-colors hover:text-text">Markets</Link></li>
                <li><Link to="/#spotlight" className="text-sm font-medium text-text-dim transition-colors hover:text-text">Spotlight</Link></li>
                <li><Link to="/about" className="text-sm font-medium text-text-dim transition-colors hover:text-text">About</Link></li>
                <li><Link to="/contact" className="text-sm font-medium text-text-dim transition-colors hover:text-text">Contact</Link></li>
              </ul>
            )}

            {user && isAdminRoute && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-lg p-2 text-text-dim transition-colors hover:bg-surface focus:outline-none"
                aria-label="Toggle Sidebar"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isSidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/register" className="hidden rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-dim transition-colors hover:border-text-faint hover:text-text sm:block">
                  Register
                </Link>
                <Link to="/login" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent/90">
                  Login
                </Link>
              </>
            ) : (
              <>
                {isAdminRoute ? (
                  <Link
                    to="/"
                    className="rounded-lg border border-border-light px-3 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-text-faint hover:text-text sm:px-4 sm:text-sm"
                    aria-label="Back to user interface"
                  >
                    <span className="sm:hidden">Site</span>
                    <span className="hidden sm:inline">View Site</span>
                  </Link>
                ) : (
                  <Link
                    to="/admin"
                    className="rounded-lg border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent-dim"
                  >
                    Dashboard
                  </Link>
                )}
                <span className="hidden text-sm font-medium text-text-dim lg:inline">{user.email}</span>
                <button
                  onClick={onLogout}
                  className="rounded-lg bg-down px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-down/90"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile hamburger — always after Login/Site/Logout */}
            {!isAdminRoute && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-2 text-text-dim transition-colors hover:bg-surface hover:text-text lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {!isAdminRoute && isMobileMenuOpen && (
          <div className="border-t border-border bg-bg px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/#markets" className="rounded-lg px-3 py-3 text-sm font-medium text-text-dim hover:bg-surface hover:text-text">Markets</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/#spotlight" className="rounded-lg px-3 py-3 text-sm font-medium text-text-dim hover:bg-surface hover:text-text">Spotlight</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="rounded-lg px-3 py-3 text-sm font-medium text-text-dim hover:bg-surface hover:text-text">About</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="rounded-lg px-3 py-3 text-sm font-medium text-text-dim hover:bg-surface hover:text-text">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}