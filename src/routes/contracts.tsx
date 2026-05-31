import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/contracts")({
  head: () => ({ meta: [{ title: "العقود — سيند" }] }),
  component: ContractsPage,
});

const STATUS = ["نشط", "مكتمل", "متوقف", "متأخر"];
const badge: Record<string, string> = {
  "نشط": "bg-success/15 text-green-700",
  "مكتمل": "bg-primary/15 text-primary",
  "متوقف": "bg-muted text-muted-foreground",
  "متأخر": "bg-destructive/15 text-destructive",
};

const columns: Col[] = [
  { key: "number", label: "رقم العقد", required: true },
  { key: "name", label: "اسم العقد", required: true },
  { key: "tender", label: "مرتبط بمناقصة", placeholder: "اختياري — رقم/اسم المناقصة" },
  { key: "startDate", label: "تاريخ البداية", type: "date" },
  { key: "endDate", label: "تاريخ النهاية", type: "date" },
  { key: "status", label: "الحالة", type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "value", label: "قيمة العقد" },
  { key: "notes", label: "ملاحظات", type: "textarea" },
  { key: "files", label: "ملفات العقد (PDF)", type: "files" },
];

function ContractsPage() {
  return (
    <DataTable
      storageKey="send.contracts"
      title="جدول العقود"
      columns={columns}
      filterKey="status"
      rowClassName={(r) => (r.status === "متأخر" ? "bg-destructive/5 hover:bg-destructive/10" : "")}
      seed={[
        { id: "c1", number: "C-2025-01", name: "عقد توريد مواد بناء", tender: "T-2025-001", startDate: "2025-06-20", endDate: "2025-12-20", status: "نشط", value: "1,200,000 ر.س", notes: "", files: [] },
      ]}
    />
  );
}
