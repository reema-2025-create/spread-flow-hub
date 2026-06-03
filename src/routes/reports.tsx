import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — SEND" }] }),
  component: ReportsPage,
});

const TYPES = [
  { value: "مناقصات", label: { ar: "مناقصات", en: "Tenders" } },
  { value: "مشاريع", label: { ar: "مشاريع", en: "Projects" } },
  { value: "عقود", label: { ar: "عقود", en: "Contracts" } },
  { value: "فرق", label: { ar: "فرق", en: "Teams" } },
];
const badge: Record<string, string> = {
  "مناقصات": "bg-info/15 text-info",
  "مشاريع": "bg-success/15 text-green-700",
  "عقود": "bg-primary/15 text-primary",
  "فرق": "bg-secondary text-secondary-foreground",
};

const columns: Col[] = [
  { key: "name", label: { ar: "اسم التقرير", en: "Report name" }, required: true },
  { key: "type", label: { ar: "نوع التقرير", en: "Report type" }, type: "select", options: TYPES, badgeMap: badge, required: true },
  { key: "createdAt", label: { ar: "تاريخ الإنشاء", en: "Created at" }, type: "date" },
  { key: "description", label: { ar: "وصف التقرير", en: "Description" }, type: "textarea" },
  { key: "file", label: { ar: "ملف التقرير (PDF/Excel)", en: "Report file (PDF/Excel)" }, type: "file" },
];

function ReportsPage() {
  return (
    <DataTable
      storageKey="send.reports"
      title={{ ar: "جدول التقارير", en: "Reports" }}
      columns={columns}
      filterKey="type"
    />
  );
}
