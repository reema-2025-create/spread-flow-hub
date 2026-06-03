import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/field-teams")({
  head: () => ({ meta: [{ title: "Field Teams — SEND" }] }),
  component: FieldTeamsPage,
});

const STATUS = [
  { value: "نشط", label: { ar: "نشط", en: "Active" } },
  { value: "متوقف", label: { ar: "متوقف", en: "Paused" } },
  { value: "مكتمل", label: { ar: "مكتمل", en: "Completed" } },
];
const badge: Record<string, string> = {
  "نشط": "bg-success/15 text-green-700",
  "متوقف": "bg-warning/20 text-yellow-800",
  "مكتمل": "bg-primary/15 text-primary",
};

const columns: Col[] = [
  { key: "team", label: { ar: "اسم الفريق", en: "Team name" }, required: true },
  { key: "project", label: { ar: "اسم المشروع", en: "Project" } },
  { key: "location", label: { ar: "الموقع", en: "Location" } },
  { key: "task", label: { ar: "المهمة الحالية", en: "Current task" } },
  { key: "progress", label: { ar: "نسبة الإنجاز", en: "Progress" }, type: "progress" },
  { key: "status", label: { ar: "الحالة", en: "Status" }, type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "photos", label: { ar: "صور من الموقع", en: "Site photos" }, type: "files" },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
];

function FieldTeamsPage() {
  return (
    <DataTable
      storageKey="send.fieldTeams"
      title={{ ar: "جدول الفرق الميدانية", en: "Field Teams" }}
      columns={columns}
      filterKey="status"
      seed={[
        { id: "f1", team: "فريق ألفا", project: "مشروع توسعة المستودع", location: "الرياض - حي السلي", task: "تركيب الرفوف", progress: 65, status: "نشط", photos: [], notes: "" },
      ]}
    />
  );
}
