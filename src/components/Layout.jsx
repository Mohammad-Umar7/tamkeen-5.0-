import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, CircleUserRound } from "lucide-react";
import { useApp } from "../state/AppState";
import Toasts from "./Toasts";

export function BridgeMark({ size = 34 }) {
  return (
    <div
      className="shrink-0 rounded-[9px] bg-navy grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#66EECF"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M3 16c2.5-7 15.5-7 18 0" />
        <line x1="3" y1="19" x2="21" y2="19" />
        <line x1="8" y1="13.2" x2="8" y2="19" />
        <line x1="16" y1="13.2" x2="16" y2="19" />
      </svg>
    </div>
  );
}

const NAV = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/health", label: "Curriculum Health" },
  { to: "/queue", label: "Approval Queue" },
  { to: "/reports", label: "Reports" },
  { to: "/admin", label: "Admin" },
];

function TopNav() {
  const { state } = useApp();
  const navigate = useNavigate();
  const isProfessor = state.role === "professor";

  const filteredNav = NAV.filter(item => {
    if (item.to === "/queue") {
      return isProfessor;
    }
    return true;
  });

  return (
    <header className="bg-surface border-b border-line sticky top-0 z-30">
      <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center gap-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Curriculum Bridge home"
        >
          <BridgeMark />
          <span className="font-display font-extrabold text-[19px] text-navy">
            Curriculum Bridge
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {filteredNav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `text-[14px] transition-colors ${
                  isActive
                    ? "text-navy font-bold underline underline-offset-[10px] decoration-2 decoration-navy"
                    : "text-body font-medium hover:text-navy"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:ml-2 ml-auto">
          <button
            aria-label="Notifications"
            className="text-navy hover:text-navy-deep cursor-pointer"
          >
            <Bell size={19} />
          </button>
          {isProfessor ? (
            <span className="h-9 w-9 rounded-full bg-navy text-white grid place-items-center text-[12px] font-bold">
              JD
            </span>
          ) : (
            <span className="h-9 w-9 rounded-full bg-mint grid place-items-center text-navy">
              <CircleUserRound size={20} />
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const links = ["Institutional Policy", "Privacy Support", "Academic Standards", "Contact Us"];
  return (
    <footer className="bg-[#E9EBF1] border-t border-line mt-16">
      <div className="mx-auto max-w-[1280px] px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display font-bold text-[15px] text-navy">Curriculum Bridge</p>
          <p className="text-[12.5px] text-muted mt-1">
            © 2024 Curriculum Bridge. UAE Youth Hackathon Partner.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[13px] text-body hover:text-navy"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export function RoleToggle() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const isProfessor = state.role === "professor";

  const setRole = (role) => {
    dispatch({ type: "role/set", role });
    navigate(role === "professor" ? "/queue" : "/dashboard");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-surface border border-line rounded-full shadow-[0_4px_16px_rgba(20,46,77,0.14)] p-1.5 flex items-center">
      <button
        onClick={() => setRole("professor")}
        className={`h-9 px-5 rounded-full text-[13.5px] font-semibold transition-colors cursor-pointer ${
          isProfessor ? "bg-navy text-white" : "text-navy hover:bg-panel"
        }`}
      >
        Professor
      </button>
      <button
        onClick={() => setRole("student")}
        className={`h-9 px-5 rounded-full text-[13.5px] font-semibold transition-colors cursor-pointer ${
          !isProfessor ? "bg-navy text-white" : "text-navy hover:bg-panel"
        }`}
      >
        Student
      </button>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RoleToggle />
      <Toasts />
    </div>
  );
}
