import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "الوثائق — سيند" }] }),
  component: DocumentsPage,
});

const TYPES = ["عقد", "مناقصة", "مراسلات", "ضمانات", "أخرى"];
const badge: Record<string, string> = {
  "عقد": "bg-primary/15 text-primary",
  "مناقصة": "bg-info/15 text-info",
  "مراسلات": "bg-accent text-primary",
  "ضمانات": "bg-secondary text-secondary-foreground",
  "أخرى": "bg-muted text-muted-foreground",
};

const columns: Col[] = [
  { key: "name", label: "اسم الوثيقة", required: true },
  { key: "type", label: "النوع", type: "select", options: TYPES, badgeMap: badge, required: true },
  { key: "relatedTo", label: "مرتبط بـ", placeholder: "مناقصة / عقد / مورد" },
  { key: "uploadDate", label: "تاريخ الرفع", type: "date" },
  { key: "files", label: "الملفات", type: "files" },
  { key: "notes", label: "ملاحظات", type: "textarea" },
];

function DocumentsPage() {
  return (
    <DataTable
      storageKey="send.documents"
      title="جدول الوثائق"
      columns={columns}
      filterKey="type"
    />
  );
}
