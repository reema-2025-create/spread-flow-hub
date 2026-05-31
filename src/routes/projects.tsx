import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "المشاريع — سيند" }] }),
  component: ProjectsPage,
});

const STATUS = ["مخطط", "قيد التنفيذ", "متأخر", "مكتمل"];
const badge: Record<string, string> = {
  "مخطط": "bg-info/15 text-info",
  "قيد التنفيذ": "bg-success/15 text-green-700",
  "متأخر": "bg-destructive/15 text-destructive",
  "مكتمل": "bg-primary/15 text-primary",
};

const columns: Col[] = [
  { key: "name", label: "اسم المشروع", required: true },
  { key: "contract", label: "مرتبط بعقد", placeholder: "رقم العقد" },
  { key: "startDate", label: "تاريخ البداية", type: "date" },
  { key: "progress", label: "نسبة الإنجاز", type: "progress" },
  { key: "phase", label: "المرحلة الحالية" },
  { key: "status", label: "الحالة", type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "notes", label: "ملاحظات", type: "textarea" },
];

function ProjectsPage() {
  return (
    <DataTable
      storageKey="send.projects"
      title="جدول المشاريع"
      columns={columns}
      filterKey="status"
      rowClassName={(r) => (r.status === "متأخر" ? "bg-destructive/5 hover:bg-destructive/10" : "")}
      seed={[
        { id: "p1", name: "توسعة المستودع المركزي", contract: "C-2025-01", startDate: "2025-06-25", progress: 40, phase: "المرحلة الثانية", status: "قيد التنفيذ", notes: "" },
      ]}
    />
  );
}
