import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Col } from "@/components/DataTable";

export const Route = createFileRoute("/suppliers")({
  head: () => ({ meta: [{ title: "الموردين — سيند" }] }),
  component: SuppliersPage,
});

const ACTIVITIES = ["مواد بناء", "كهرباء", "ميكانيكا", "خدمات نظافة", "أمن وحراسة", "تقنية معلومات", "نقل ولوجستيات", "أخرى"];

const columns: Col[] = [
  { key: "name", label: "اسم المورد", required: true },
  { key: "activity", label: "النشاط", type: "select", options: ACTIVITIES, required: true },
  { key: "phone", label: "رقم الهاتف" },
  { key: "email", label: "البريد الإلكتروني" },
  { key: "city", label: "المدينة" },
  { key: "notes", label: "ملاحظات", type: "textarea" },
  { key: "files", label: "مرفقات (سجل تجاري / ملفات)", type: "files" },
];

function SuppliersPage() {
  return (
    <DataTable
      storageKey="send.suppliers"
      title="جدول الموردين"
      columns={columns}
      filterKey="activity"
      seed={[
        { id: "s1", name: "شركة الأفق للتوريدات", activity: "مواد بناء", phone: "0501234567", email: "info@afaq.sa", city: "الرياض", notes: "", files: [] },
      ]}
    />
  );
}
