import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — SEND" }] }),
  component: DocumentsPage,
});

const TYPES = [
  { value: "عقد", label: { ar: "عقد", en: "Contract" } },
  { value: "مناقصة", label: { ar: "مناقصة", en: "Tender" } },
  { value: "مراسلات", label: { ar: "مراسلات", en: "Correspondence" } },
  { value: "ضمانات", label: { ar: "ضمانات", en: "Guarantees" } },
  { value: "أخرى", label: { ar: "أخرى", en: "Other" } },
];
const badge: Record<string, string> = {
  "عقد": "bg-primary/15 text-primary",
  "مناقصة": "bg-info/15 text-info",
  "مراسلات": "bg-accent text-primary",
  "ضمانات": "bg-secondary text-secondary-foreground",
  "أخرى": "bg-muted text-muted-foreground",
};

const columns: Col[] = [
  { key: "name", label: { ar: "اسم الوثيقة", en: "Document name" }, required: true },
  { key: "type", label: { ar: "النوع", en: "Type" }, type: "select", options: TYPES, badgeMap: badge, required: true },
  { key: "relatedTo", label: { ar: "مرتبط بـ", en: "Related to" }, placeholder: { ar: "مناقصة / عقد / مورد", en: "Tender / contract / supplier" } },
  { key: "uploadDate", label: { ar: "تاريخ الرفع", en: "Upload date" }, type: "date" },
  { key: "files", label: { ar: "الملفات", en: "Files" }, type: "files" },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
];

function DocumentsPage() {
  return (
    <DataTable
      storageKey="send.documents"
      title={{ ar: "جدول الوثائق", en: "Documents" }}
      columns={columns}
      filterKey="type"
    />
  );
}
