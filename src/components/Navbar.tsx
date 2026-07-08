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
  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-4">
        {userName && (
          <span className="text-sm">
            Welcome, <strong>{userName}</strong>
          </span>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
