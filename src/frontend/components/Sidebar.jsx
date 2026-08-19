import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ user, isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/admin" },
    { name: "Manage Cars", path: "/admin/cars" },
  ];

  const linkClass = "flex items-center px-4 py-3 text-sm font-medium text-text-dim rounded-lg hover:bg-surface hover:text-text transition-colors";
  const activeClass = "flex items-center px-4 py-3 text-sm font-semibold text-bg bg-accent rounded-lg shadow-sm transition-colors";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-[6.25rem] bottom-0 left-0 z-40 w-64 border-r border-border bg-surface p-4 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="px-4 text-[10px] font-semibold uppercase tracking-wider text-text-faint">
            Dealer Admin
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={location.pathname === item.path ? activeClass : linkClass}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 border-t border-border pt-4">
          <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full bg-accent-dim text-sm font-bold text-accent">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="max-w-[160px] truncate">
            <p className="truncate text-xs font-semibold text-text">{user?.email}</p>
            <p className="text-[10px] font-medium text-text-faint">Administrator</p>
          </div>
        </div>
      </aside>
    </>
  );
}
