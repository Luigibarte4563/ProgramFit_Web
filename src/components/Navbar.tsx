import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  title?: string;
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({
  title = "Career Assessment",
  userName,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent page scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-slate-100 text-slate-900 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-base font-medium transition ${
      isActive
        ? "bg-slate-100 font-semibold text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>

          {/* Desktop */}
          <div className="ml-auto hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>

              <NavLink to="/results" className={linkClass}>
                Results
              </NavLink>
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              {userName && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                    {userInitial}
                  </div>

                  <span className="text-sm text-slate-600">
                    Welcome,{" "}
                    <strong className="text-slate-900">{userName}</strong>
                  </span>
                </div>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute left-0 top-full z-50 w-full border-t border-slate-200 bg-white shadow-xl md:hidden">
            <div className="space-y-2 px-4 py-4">
              <NavLink
                to="/"
                end
                className={mobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/results"
                className={mobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Results
              </NavLink>
            </div>

            {(userName || onLogout) && (
              <div className="border-t border-slate-200 px-4 py-4">
                {userName && (
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                      {userInitial}
                    </div>

                    <span className="font-medium text-slate-800">
                      {userName}
                    </span>
                  </div>
                )}

                {onLogout && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="w-full rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
