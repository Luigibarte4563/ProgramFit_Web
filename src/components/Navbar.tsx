import { useState } from "react";
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

  // Desktop Capsule Active Style
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-slate-100 text-slate-900 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  // Mobile Stacked Active Style
  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all ${
      isActive
        ? "bg-slate-100 text-slate-900 font-semibold"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight text-slate-950">
              {title}
            </h1>
          </div>

          {/* Right Group: Combined Nav Links & User Controls */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {/* Desktop Center/Right Navigation Links */}
            <div className="flex items-center gap-2">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/results" className={linkClass}>
                Results
              </NavLink>
            </div>

            {/* Desktop User Profile & Actions */}
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              {userName && (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-sm text-white shadow-sm">
                    {userInitial}
                  </div>
                  <span className="text-sm text-slate-600">
                    Welcome,{" "}
                    <strong className="font-semibold text-slate-900">
                      {userName}
                    </strong>
                  </span>
                </div>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // X Icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
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
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          className="md:hidden border-t border-slate-200 bg-slate-50/50"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
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

          {/* Mobile User Section */}
          {(userName || onLogout) && (
            <div className="border-t border-slate-200 pb-3 pt-4 px-4 flex flex-col gap-3">
              {userName && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white shadow-sm">
                    {userInitial}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {userName}
                    </div>
                  </div>
                </div>
              )}
              {onLogout && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-red-600 shadow-sm hover:bg-red-50"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
