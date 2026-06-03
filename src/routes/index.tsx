import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import {
  FileText, FileSignature, Truck, FolderOpen, Users, ClipboardList, BarChart3,
} from "lucide-react";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — سيند | SEND Dashboard" },
      { name: "description", content: "Main dashboard for the SEND services & supplies management system." },
    ],
  }),
  component: Dashboard,
});

const cards = [
  { to: "/tenders", labelKey: "nav.tenders", descKey: "dash.tenders.desc", icon: FileText },
  { to: "/contracts", labelKey: "nav.contracts", descKey: "dash.contracts.desc", icon: FileSignature },
  { to: "/suppliers", labelKey: "nav.suppliers", descKey: "dash.suppliers.desc", icon: Truck },
  { to: "/documents", labelKey: "nav.documents", descKey: "dash.documents.desc", icon: FolderOpen },
  { to: "/field-teams", labelKey: "nav.fieldTeams", descKey: "dash.fieldTeams.desc", icon: Users },
  { to: "/projects", labelKey: "nav.projects", descKey: "dash.projects.desc", icon: ClipboardList },
  { to: "/reports", labelKey: "nav.reports", descKey: "dash.reports.desc", icon: BarChart3 },
] as const satisfies ReadonlyArray<{ to: string; labelKey: TKey; descKey: TKey; icon: typeof FileText }>;

function Dashboard() {
  const { t, dir } = useI18n();
  const gradientDir = dir === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r";
  return (
    <div className="space-y-8">
      <div className={`${gradientDir} from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 flex items-center gap-6 shadow-lg`}>
        <img src={logo} alt="SEND" className="h-24 w-24 rounded-xl bg-white p-2 shadow-md" />
        <div>
          <h1 className="text-3xl font-extrabold">{t("dash.welcome")}</h1>
          <p className="mt-2 text-primary-foreground/85 max-w-xl">{t("dash.intro")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ to, labelKey, descKey, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group bg-card border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-accent text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">{t(labelKey)}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{t(descKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
