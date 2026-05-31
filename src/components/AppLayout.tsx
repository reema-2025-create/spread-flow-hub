import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard, FileText, FileSignature, Truck, FolderOpen,
  Users, ClipboardList, BarChart3,
} from "lucide-react";

const nav = [
  { to: "/", label: "الرئيسية", icon: LayoutDashboard },
  { to: "/tenders", label: "المناقصات", icon: FileText },
  { to: "/contracts", label: "العقود", icon: FileSignature },
  { to: "/suppliers", label: "الموردين", icon: Truck },
  { to: "/documents", label: "الوثائق", icon: FolderOpen },
  { to: "/field-teams", label: "الفرق الميدانية", icon: Users },
  { to: "/projects", label: "المشاريع", icon: ClipboardList },
  { to: "/reports", label: "التقارير", icon: BarChart3 },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-l border-sidebar-border">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <img src={logo} alt="SEND" className="h-12 w-12 rounded-md bg-white p-1 object-contain" />
          <div>
            <div className="font-bold text-base leading-tight">سيند</div>
            <div className="text-xs opacity-70">للخدمات والتوريدات</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-3 text-[11px] opacity-60 border-t border-sidebar-border">
          © {new Date().getFullYear()} SEND
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center gap-3 bg-sidebar text-sidebar-foreground px-4 py-3">
          <img src={logo} alt="SEND" className="h-9 w-9 rounded bg-white p-0.5" />
          <span className="font-bold">سيند</span>
        </header>
        <nav className="md:hidden flex overflow-x-auto bg-sidebar/95 text-sidebar-foreground text-xs px-2 py-2 gap-1">
          {nav.map(({ to, label }) => (
            <Link key={to} to={to} className="px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-sidebar-accent">
              {label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
