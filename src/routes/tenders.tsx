import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/tenders")({
  head: () => ({ meta: [{ title: "Tenders — SEND" }] }),
  component: TendersPage,
});

const STATUS = [
  { value: "جديدة", label: { ar: "جديدة", en: "New" } },
  { value: "تحت الدراسة", label: { ar: "تحت الدراسة", en: "Under review" } },
  { value: "قيد المراجعة", label: { ar: "قيد المراجعة", en: "In approval" } },
  { value: "تم التقديم", label: { ar: "تم التقديم", en: "Submitted" } },
  { value: "فائزة", label: { ar: "فائزة", en: "Won" } },
  { value: "خاسرة", label: { ar: "خاسرة", en: "Lost" } },
  { value: "ملغية", label: { ar: "ملغية", en: "Cancelled" } },
];
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
  { key: "number", label: { ar: "رقم المناقصة", en: "Tender No." }, required: true },
  { key: "name", label: { ar: "اسم المناقصة", en: "Tender name" }, required: true },
  { key: "owner", label: { ar: "الجهة المالكة", en: "Owner entity" } },
  { key: "openDate", label: { ar: "تاريخ الفتح", en: "Open date" }, type: "date" },
  { key: "closeDate", label: { ar: "تاريخ الإغلاق", en: "Close date" }, type: "date" },
  { key: "status", label: { ar: "الحالة", en: "Status" }, type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
  { key: "files", label: { ar: "مرفقات", en: "Attachments" }, type: "files" },
];

function TendersPage() {
  return (
    <DataTable
      storageKey="send.tenders"
      title={{ ar: "جدول المناقصات", en: "Tenders" }}
      columns={columns}
      filterKey="status"
      seed={[
        { id: "t1", number: "T-2025-001", name: "توريد مواد بناء", owner: "وزارة الإسكان", openDate: "2025-05-01", closeDate: "2025-06-15", status: "تحت الدراسة", notes: "", files: [] },
        { id: "t2", number: "T-2025-002", name: "خدمات صيانة", owner: "أمانة الرياض", openDate: "2025-04-10", closeDate: "2025-05-20", status: "فائزة", notes: "تم الترسية", files: [] },
      ]}
    />
  );
}
