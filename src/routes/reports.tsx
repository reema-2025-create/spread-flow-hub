import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "التقارير — سيند" }] }),
  component: ReportsPage,
});

const TYPES = ["مناقصات", "مشاريع", "عقود", "فرق"];
const badge: Record<string, string> = {
  "مناقصات": "bg-info/15 text-info",
  "مشاريع": "bg-success/15 text-green-700",
  "عقود": "bg-primary/15 text-primary",
  "فرق": "bg-secondary text-secondary-foreground",
};

const columns: Col[] = [
  { key: "name", label: "اسم التقرير", required: true },
  { key: "type", label: "نوع التقرير", type: "select", options: TYPES, badgeMap: badge, required: true },
  { key: "createdAt", label: "تاريخ الإنشاء", type: "date" },
  { key: "description", label: "وصف التقرير", type: "textarea" },
  { key: "file", label: "ملف التقرير (PDF/Excel)", type: "file" },
];

function ReportsPage() {
  return (
    <DataTable
      storageKey="send.reports"
      title="جدول التقارير"
      columns={columns}
      filterKey="type"
    />
  );
}
