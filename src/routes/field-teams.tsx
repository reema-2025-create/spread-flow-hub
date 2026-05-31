import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/field-teams")({
  head: () => ({ meta: [{ title: "الفرق الميدانية — سيند" }] }),
  component: FieldTeamsPage,
});

const STATUS = ["نشط", "متوقف", "مكتمل"];
const badge: Record<string, string> = {
  "نشط": "bg-success/15 text-green-700",
  "متوقف": "bg-warning/20 text-yellow-800",
  "مكتمل": "bg-primary/15 text-primary",
};

const columns: Col[] = [
  { key: "team", label: "اسم الفريق", required: true },
  { key: "project", label: "اسم المشروع" },
  { key: "location", label: "الموقع" },
  { key: "task", label: "المهمة الحالية" },
  { key: "progress", label: "نسبة الإنجاز", type: "progress" },
  { key: "status", label: "الحالة", type: "select", options: STATUS, badgeMap: badge, required: true },
  { key: "photos", label: "صور من الموقع", type: "files" },
  { key: "notes", label: "ملاحظات", type: "textarea" },
];

function FieldTeamsPage() {
  return (
    <DataTable
      storageKey="send.fieldTeams"
      title="جدول الفرق الميدانية"
      columns={columns}
      filterKey="status"
      seed={[
        { id: "f1", team: "فريق ألفا", project: "مشروع توسعة المستودع", location: "الرياض - حي السلي", task: "تركيب الرفوف", progress: 65, status: "نشط", photos: [], notes: "" },
      ]}
    />
  );
}
