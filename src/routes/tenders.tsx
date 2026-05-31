import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/tenders")({
  head: () => ({ meta: [{ title: "المناقصات — سيند" }] }),
  component: TendersPage,
});

const STATUS = ["جديدة", "تحت الدراسة", "قيد المراجعة", "تم التقديم", "فائزة", "خاسرة", "ملغية"];
const badge: Record<string, string> = {
  "جديدة": "bg-info/15 text-info",
  "تحت الدراسة": "bg-warning/20 text-yellow-800",
  "قيد المراجعة": "bg-accent text-primary",
  "تم التقديم": "bg-primary/15 text-primary",
  "فائزة": "bg-success/15 text-green-700",
  "خاسرة": "bg-destructive/15 text-destructive",
  "ملغية": "bg-muted text-muted-foreground",
};

const columns: Col[] = [
  { key: "number", label: "رقم المناقصة", required: true },
  { key: "name", label: "اسم المناقصة", required: true },
  { key: "owner", label: "الجهة المالكة" },
  { key: "openDate", label: "تاريخ الفتح", type: "date" },
  { key: "closeDate", label: "تاريخ الإغلاق", type: "date" },
  { key: "status", label: "الحالة", type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "notes", label: "ملاحظات", type: "textarea" },
  { key: "files", label: "مرفقات", type: "files" },
];

function TendersPage() {
  return (
    <DataTable
      storageKey="send.tenders"
      title="جدول المناقصات"
      columns={columns}
      filterKey="status"
      seed={[
        { id: "t1", number: "T-2025-001", name: "توريد مواد بناء", owner: "وزارة الإسكان", openDate: "2025-05-01", closeDate: "2025-06-15", status: "تحت الدراسة", notes: "", files: [] },
        { id: "t2", number: "T-2025-002", name: "خدمات صيانة", owner: "أمانة الرياض", openDate: "2025-04-10", closeDate: "2025-05-20", status: "فائزة", notes: "تم الترسية", files: [] },
      ]}
    />
  );
}
