import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  title?: string;
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({
  title = "ProgramFit",
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

  // Neo-brutalist custom link styling with hard borders and offsets for selected state
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-4 py-2 text-sm font-bold border-2 border-[#1D3557] transition-all duration-200 ${
      isActive
        ? "bg-[#2F8CE5] text-[#FFFFFF] shadow-[2px_2px_0px_0px_#1D3557]"
        : "bg-[#FFFFFF] text-[#0D1B2A] hover:bg-[#F7EBE1] hover:text-[#000000]"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-base font-bold border-2 border-[#1D3557] transition-all ${
      isActive
        ? "bg-[#2F8CE5] text-[#FFFFFF] shadow-[3px_3px_0px_0px_#1D3557]"
        : "bg-[#FFFFFF] text-[#0D1B2A] hover:bg-[#F7EBE1]"
    }`;

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <>
      <nav className="sticky top-0 z-50 border-b-2 border-[#C5C5C5] bg-[#FFFFFF] shadow-[0px_4px_0px_0px_#1D3557]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Branding / Dynamic Title */}
          <h1 className="text-2xl font-bold tracking-tight text-[#000000]">
            {title === "ProgramFit" ? (
              <>
                Program<span className="text-[#2F8CE5]">Fit</span>
              </>
            ) : (
              title
            )}
          </h1>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-3">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>

              <NavLink to="/results" className={linkClass}>
                Results
              </NavLink>
            </div>

            <div className="flex items-center gap-4 border-l-2 border-[#C5C5C5] pl-6">
              {userName && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F8CE5] text-sm font-extrabold text-[#FFFFFF] border-2 border-[#1D3557] shadow-[2px_2px_0px_0px_#1D3557] object-cover">
                    {userInitial}
                  </div>

                  <span className="text-sm font-medium text-[#0D1B2A]">
                    Welcome,{" "}
                    <strong className="font-bold text-[#000000]">
                      {userName}
                    </strong>
                  </span>
                </div>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="rounded-xl border-2 border-[#1D3557] bg-[#EA4335] px-4 py-2 text-sm font-bold text-[#FFFFFF] shadow-[2px_2px_0px_0px_#1D3557] hover:bg-red-700 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button Container */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-xl p-2 border-2 border-[#1D3557] bg-[#FFFFFF] text-[#0D1B2A] hover:bg-[#F7EBE1] shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#1D3557] md:hidden transition-all"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
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
                strokeWidth={2.5}
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

        {/* Mobile Dropdown Panel Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full z-50 w-full border-b-4 border-[#1D3557] border-t-2 border-[#C5C5C5] bg-[#FFFFFF] shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-3 px-4 py-5">
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
              <div className="border-t-2 border-[#F7EBE1] px-4 py-5 bg-[#F7EBE1]/30">
                {userName && (
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F8CE5] font-extrabold text-[#FFFFFF] border-2 border-[#1D3557] shadow-[2px_2px_0px_0px_#1D3557]">
                      {userInitial}
                    </div>
                    <span className="font-bold text-[#0D1B2A]">{userName}</span>
                  </div>
                )}

                {onLogout && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="w-full rounded-xl bg-[#EA4335] border-2 border-[#1D3557] px-4 py-3 font-bold text-[#FFFFFF] shadow-[4px_4px_0px_0px_#1D3557] hover:bg-red-700 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557] transition-all"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Backdrop Overlay matching standard project modal blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
