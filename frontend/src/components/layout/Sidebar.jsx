import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  Layers,
  History,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import AILogo from "./AILogo";

const NAV = [
  { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { to: "/resumes", icon: FileText, label: "Resumes" },
  { to: "/insights", icon: BarChart3, label: "Insights" },
  { to: "/versions", icon: Layers, label: "Versions" },
  { to: "/history", icon: History, label: "History" },
];

const ROW_BASE =
  "relative flex items-center h-11 w-11 rounded-2xl overflow-hidden " +
  "group-hover/sidebar:w-[200px] " +
  "transition-[width,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const LABEL_BASE =
  "text-sm font-medium whitespace-nowrap pr-4 " +
  "opacity-0 -translate-x-1 " +
  "transition-[opacity,transform] duration-200 ease-out " +
  "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-100";

function NavItem({ to, icon: Icon, label, open }) {
  return (
    <NavLink to={to} title={label} className="block">
      {({ isActive }) => (
        <div
          className={cn(
            ROW_BASE,
            open && "w-full",
            isActive
              ? "bg-[var(--ink)] text-[var(--bg)] shadow-card"
              : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
          )}
        >
          <span className="h-11 w-11 flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={2} />
          </span>
          <span className={cn(LABEL_BASE, open && "opacity-100 translate-x-0")}>
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}

function ActionRow({ icon: Icon, label, onClick, to, open }) {
  const inner = (isActive) => (
    <div
      className={cn(
        ROW_BASE,
        open && "w-full",
        isActive
          ? "bg-[var(--ink)] text-[var(--bg)] shadow-card"
          : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
      )}
    >
      <span className="h-11 w-11 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <span className={cn(LABEL_BASE, open && "opacity-100 translate-x-0")}>
        {label}
      </span>
    </div>
  );

  if (to) {
    return (
      <NavLink to={to} title={label} className="block">
        {({ isActive }) => inner(isActive)}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} title={label} className="block">
      {inner(false)}
    </button>
  );
}

export function Sidebar({ open = false, onClose }) {
  const { user, logout } = useAuth();
  const displayName = user?.name || "Account";
  const displayEmail = user?.email || "";

  return (
    <aside
      className={cn(
        "group/sidebar shrink-0 h-[calc(100vh-32px)] sticky top-4 ml-4",
        "flex-col items-center justify-between py-5 rounded-3xl",
        "bg-[var(--surface)] border border-[var(--border)] shadow-card overflow-hidden",
        "w-[88px] hover:w-[248px]",
        "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "fixed inset-y-4 left-3 z-50 flex w-[min(320px,calc(100vw-24px))] ml-0 md:sticky md:inset-auto md:z-auto md:ml-4 md:w-[88px]"
          : "hidden md:flex",
      )}
    >
      <div className="flex flex-col items-center gap-6 w-full">
        <div
          className={cn(
            "flex items-center h-14 w-full px-4 group-hover/sidebar:w-[200px]",
            "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <div className="h-12 w-12 ml-1 flex items-center justify-center shrink-0">
            <AILogo />
          </div>
          <span
            className={cn(
              "ml-2 font-display text-base font-semibold text-[var(--ink)] whitespace-nowrap",
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1",
              "transition-[opacity,transform] duration-200 ease-out",
              "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-100",
            )}
          >
            Roaster
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)] md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex w-full flex-col items-stretch gap-1.5 px-4 md:w-auto md:items-center md:px-0">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} open={open} />
          ))}
        </nav>
      </div>

      <div className="flex w-full flex-col items-stretch gap-2 px-4 md:items-center md:px-0">
        <ActionRow
          icon={Settings}
          label="Settings"
          to="/settings"
          open={open}
        />
        <ActionRow icon={LogOut} label="Log out" onClick={logout} open={open} />

        <div
          className={cn(
            "flex items-center h-12 mt-1 w-10 group-hover/sidebar:w-[200px] overflow-hidden",
            open && "w-full",
            "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <div className="h-10 w-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] font-semibold flex items-center justify-center text-sm ring-2 ring-[var(--surface)] shrink-0">
            {user?.name?.[0]?.toUpperCase() || "R"}
          </div>
          <div
            className={cn(
              "ml-3 min-w-0 flex-1",
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1",
              "transition-[opacity,transform] duration-200 ease-out",
              "group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:delay-100",
            )}
          >
            <div className="text-sm font-semibold text-[var(--ink)] truncate">
              {displayName}
            </div>
            {displayEmail && (
              <div className="text-[11px] text-[var(--ink-muted)] truncate">
                {displayEmail}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
