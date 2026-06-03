import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard, FileText, FileSignature, Truck, FolderOpen,
  Users, ClipboardList, BarChart3, Languages,
} from "lucide-react";
import { useI18n, type TKey } from "@/lib/i18n";

const nav = [
  { to: "/", labelKey: "nav.home", icon: LayoutDashboard },
  { to: "/tenders", labelKey: "nav.tenders", icon: FileText },
  { to: "/contracts", labelKey: "nav.contracts", icon: FileSignature },
  { to: "/suppliers", labelKey: "nav.suppliers", icon: Truck },
  { to: "/documents", labelKey: "nav.documents", icon: FolderOpen },
  { to: "/field-teams", labelKey: "nav.fieldTeams", icon: Users },
  { to: "/projects", labelKey: "nav.projects", icon: ClipboardList },
  { to: "/reports", labelKey: "nav.reports", icon: BarChart3 },
] as const satisfies ReadonlyArray<{ to: string; labelKey: TKey; icon: typeof LayoutDashboard }>;

function LangToggle({ className = "" }: { className?: string }) {
  const { toggle, t } = useI18n();
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-md border border-sidebar-border/40 px-2.5 py-1 text-xs hover:bg-sidebar-accent/70 transition ${className}`}
      title={t("lang.label")}
    >
      <Languages className="h-3.5 w-3.5" />
      {t("lang.switch")}
    </button>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, dir } = useI18n();
  const borderSide = dir === "rtl" ? "border-l" : "border-r";
  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground ${borderSide} border-sidebar-border`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <img src={logo} alt="SEND" className="h-12 w-12 rounded-md bg-white p-1 object-contain" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base leading-tight">{t("brand.name")}</div>
            <div className="text-xs opacity-70">{t("brand.tagline")}</div>
          </div>
          <LangToggle />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, labelKey, icon: Icon }) => {
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
                <span>{t(labelKey)}</span>
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
          <span className="font-bold flex-1">{t("brand.name")}</span>
          <LangToggle />
        </header>
        <nav className="md:hidden flex overflow-x-auto bg-sidebar/95 text-sidebar-foreground text-xs px-2 py-2 gap-1">
          {nav.map(({ to, labelKey }) => (
            <Link key={to} to={to} className="px-3 py-1.5 rounded-md whitespace-nowrap hover:bg-sidebar-accent">
              {t(labelKey)}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
