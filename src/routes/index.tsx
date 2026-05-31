import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import {
  FileText, FileSignature, Truck, FolderOpen, Users, ClipboardList, BarChart3,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم — سيند" },
      { name: "description", content: "لوحة التحكم الرئيسية لنظام إدارة شركة سيند للخدمات والتوريدات." },
    ],
  }),
  component: Dashboard,
});

const cards = [
  { to: "/tenders", label: "المناقصات", icon: FileText, desc: "إدارة المناقصات وتتبع حالتها" },
  { to: "/contracts", label: "العقود", icon: FileSignature, desc: "العقود النشطة والمنتهية" },
  { to: "/suppliers", label: "الموردين", icon: Truck, desc: "قاعدة بيانات الموردين" },
  { to: "/documents", label: "الوثائق", icon: FolderOpen, desc: "أرشيف الملفات والمراسلات" },
  { to: "/field-teams", label: "الفرق الميدانية", icon: Users, desc: "متابعة الفرق في المواقع" },
  { to: "/projects", label: "المشاريع", icon: ClipboardList, desc: "تتبع تنفيذ المشاريع" },
  { to: "/reports", label: "التقارير", icon: BarChart3, desc: "التقارير والمستندات المجمعة" },
] as const;

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-l from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 flex items-center gap-6 shadow-lg">
        <img src={logo} alt="SEND" className="h-24 w-24 rounded-xl bg-white p-2 shadow-md" />
        <div>
          <h1 className="text-3xl font-extrabold">مرحبًا بك في نظام سيند</h1>
          <p className="mt-2 text-primary-foreground/85 max-w-xl">
            نظام داخلي متكامل لإدارة المناقصات، العقود، الموردين، والمشاريع — مبني على جداول تفاعلية بسيطة وسهلة الاستخدام.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            className="group bg-card border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-accent text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">{label}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
