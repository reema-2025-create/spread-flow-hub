import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — SEND" }] }),
  component: ProjectsPage,
});

const STATUS = [
  { value: "مخطط", label: { ar: "مخطط", en: "Planned" } },
  { value: "قيد التنفيذ", label: { ar: "قيد التنفيذ", en: "In progress" } },
  { value: "متأخر", label: { ar: "متأخر", en: "Delayed" } },
  { value: "مكتمل", label: { ar: "مكتمل", en: "Completed" } },
];
const badge: Record<string, string> = {
  "مخطط": "bg-info/15 text-info",
  "قيد التنفيذ": "bg-success/15 text-green-700",
  "متأخر": "bg-destructive/15 text-destructive",
  "مكتمل": "bg-primary/15 text-primary",
};

const columns: Col[] = [
  { key: "name", label: { ar: "اسم المشروع", en: "Project name" }, required: true },
  { key: "contract", label: { ar: "مرتبط بعقد", en: "Linked contract" }, placeholder: { ar: "رقم العقد", en: "Contract no." } },
  { key: "startDate", label: { ar: "تاريخ البداية", en: "Start date" }, type: "date" },
  { key: "progress", label: { ar: "نسبة الإنجاز", en: "Progress" }, type: "progress" },
  { key: "phase", label: { ar: "المرحلة الحالية", en: "Current phase" } },
  { key: "status", label: { ar: "الحالة", en: "Status" }, type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
];

function ProjectsPage() {
  return (
    <DataTable
      storageKey="send.projects"
      title={{ ar: "جدول المشاريع", en: "Projects" }}
      columns={columns}
      filterKey="status"
      rowClassName={(r) => (r.status === "متأخر" ? "bg-destructive/5 hover:bg-destructive/10" : "")}
      seed={[
        { id: "p1", name: "توسعة المستودع المركزي", contract: "C-2025-01", startDate: "2025-06-25", progress: 40, phase: "المرحلة الثانية", status: "قيد التنفيذ", notes: "" },
      ]}
    />
  );
}
