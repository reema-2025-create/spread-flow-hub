import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — SEND" }] }),
  component: SuppliersPage,
});

const ACTIVITIES = [
  { value: "مواد بناء", label: { ar: "مواد بناء", en: "Building materials" } },
  { value: "كهرباء", label: { ar: "كهرباء", en: "Electrical" } },
  { value: "ميكانيكا", label: { ar: "ميكانيكا", en: "Mechanical" } },
  { value: "خدمات نظافة", label: { ar: "خدمات نظافة", en: "Cleaning services" } },
  { value: "أمن وحراسة", label: { ar: "أمن وحراسة", en: "Security & guarding" } },
  { value: "تقنية معلومات", label: { ar: "تقنية معلومات", en: "Information technology" } },
  { value: "نقل ولوجستيات", label: { ar: "نقل ولوجستيات", en: "Transport & logistics" } },
  { value: "أخرى", label: { ar: "أخرى", en: "Other" } },
];

const columns: Col[] = [
  { key: "name", label: { ar: "اسم المورد", en: "Supplier name" }, required: true },
  { key: "activity", label: { ar: "النشاط", en: "Activity" }, type: "select", options: ACTIVITIES, required: true },
  { key: "phone", label: { ar: "رقم الهاتف", en: "Phone" } },
  { key: "email", label: { ar: "البريد الإلكتروني", en: "Email" } },
  { key: "city", label: { ar: "المدينة", en: "City" } },
  { key: "notes", label: { ar: "ملاحظات", en: "Notes" }, type: "textarea" },
  { key: "files", label: { ar: "مرفقات (سجل تجاري / ملفات)", en: "Attachments (license / files)" }, type: "files" },
];

function SuppliersPage() {
  return (
    <DataTable
      storageKey="send.suppliers"
      title={{ ar: "جدول الموردين", en: "Suppliers" }}
      columns={columns}
      filterKey="activity"
      seed={[
        { id: "s1", name: "شركة الأفق للتوريدات", activity: "مواد بناء", phone: "0501234567", email: "info@afaq.sa", city: "الرياض", notes: "", files: [] },
      ]}
    />
  );
}
