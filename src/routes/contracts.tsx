import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/contracts")({
  head: () => ({ meta: [{ title: "Contracts — SEND" }] }),
  component: ContractsPage,
});

const STATUS = [
  { value: "نشط", label: { ar: "نشط", en: "Active" } },
  { value: "مكتمل", label: { ar: "مكتمل", en: "Completed" } },
  { value: "متوقف", label: { ar: "متوقف", en: "On hold" } },
  { value: "متأخر", label: { ar: "متأخر", en: "Overdue" } },
];
const badge: Record<string, string> = {
  "نشط": "bg-success/15 text-green-700",
  "مكتمل": "bg-primary/15 text-primary",
  "متوقف": "bg-muted text-muted-foreground",
  "متأخر": "bg-destructive/15 text-destructive",
};

const columns: Col[] = [
  { key: "number", label: { ar: "رقم العقد", en: "Contract No." }, required: true },
  { key: "name", label: { ar: "اسم العقد", en: "Contract name" }, required: true },
  { key: "tender", label: { ar: "مرتبط بمناقصة", en: "Linked tender" }, placeholder: { ar: "اختياري — رقم/اسم المناقصة", en: "Optional — tender no./name" } },
  { key: "startDate", label: { ar: "تاريخ البداية", en: "Start date" }, type: "date" },
  { key: "endDate", label: { ar: "تاريخ النهاية", en: "End date" }, type: "date" },
  { key: "status", label: { ar: "الحالة", en: "Status" }, type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "value", label: { ar: "قيمة العقد", en: "Contract value" } },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
  { key: "files", label: { ar: "ملفات العقد (PDF)", en: "Contract files (PDF)" }, type: "files" },
];

function ContractsPage() {
  return (
    <DataTable
      storageKey="send.contracts"
      title={{ ar: "جدول العقود", en: "Contracts" }}
      columns={columns}
      filterKey="status"
      rowClassName={(r) => (r.status === "متأخر" ? "bg-destructive/5 hover:bg-destructive/10" : "")}
      seed={[
        { id: "c1", number: "C-2025-01", name: "عقد توريد مواد بناء", tender: "T-2025-001", startDate: "2025-06-20", endDate: "2025-12-20", status: "نشط", value: "1,200,000 ر.س", notes: "", files: [] },
      ]}
    />
  );
}
