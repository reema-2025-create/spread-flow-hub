import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
export type Localized = string | { ar: string; en: string };
export type SelectOption = string | { value: string; label: Localized };

const STORAGE_KEY = "send.lang";

const dict = {
  ar: {
    // brand
    "brand.name": "سيند",
    "brand.tagline": "للخدمات والتوريدات",
    // nav
    "nav.home": "الرئيسية",
    "nav.tenders": "المناقصات",
    "nav.contracts": "العقود",
    "nav.suppliers": "الموردين",
    "nav.documents": "الوثائق",
    "nav.fieldTeams": "الفرق الميدانية",
    "nav.projects": "المشاريع",
    "nav.reports": "التقارير",
    // language switch
    "lang.switch": "English",
    "lang.label": "اللغة",
    // dashboard
    "dash.welcome": "مرحبًا بك في نظام سيند",
    "dash.intro": "نظام داخلي متكامل لإدارة المناقصات، العقود، الموردين، والمشاريع — مبني على جداول تفاعلية بسيطة وسهلة الاستخدام.",
    "dash.tenders.desc": "إدارة المناقصات وتتبع حالتها",
    "dash.contracts.desc": "العقود النشطة والمنتهية",
    "dash.suppliers.desc": "قاعدة بيانات الموردين",
    "dash.documents.desc": "أرشيف الملفات والمراسلات",
    "dash.fieldTeams.desc": "متابعة الفرق في المواقع",
    "dash.projects.desc": "تتبع تنفيذ المشاريع",
    "dash.reports.desc": "التقارير والمستندات المجمعة",
    // page titles
    "page.tenders.title": "جدول المناقصات",
    "page.contracts.title": "جدول العقود",
    "page.suppliers.title": "جدول الموردين",
    "page.documents.title": "جدول الوثائق",
    "page.fieldTeams.title": "جدول الفرق الميدانية",
    "page.projects.title": "جدول المشاريع",
    "page.reports.title": "جدول التقارير",
    // table UI
    "tbl.total": "إجمالي السجلات",
    "tbl.exportExcel": "تصدير إلى Excel",
    "tbl.exportPDF": "تصدير إلى PDF",
    "tbl.import": "استيراد",
    "tbl.importHint": "استيراد من Excel/CSV",
    "tbl.add": "إضافة صف جديد",
    "tbl.search": "بحث سريع...",
    "tbl.all": "كل",
    "tbl.actions": "إجراءات",
    "tbl.empty": "لا توجد بيانات",
    "tbl.edit": "تعديل",
    "tbl.delete": "حذف",
    "tbl.confirmDelete": "هل تريد حذف هذا السجل؟",
    "tbl.importEmpty": "الملف فارغ",
    "tbl.importError": "تعذّر قراءة الملف. تأكد أنه Excel/CSV صالح.",
    "tbl.importPrompt": "سيتم استيراد {n} صف.\nاضغط \"موافق\" للإضافة إلى الموجود، أو \"إلغاء\" لاستبدال كل البيانات.",
    "tbl.fontError": "تعذّر تحميل الخط العربي. سيتم استخدام الخط الافتراضي.",
    // dialog
    "dlg.editTitle": "تعديل السجل",
    "dlg.newTitle": "إضافة سجل جديد",
    "dlg.cancel": "إلغاء",
    "dlg.save": "حفظ",
    "dlg.choose": "— اختر —",
    "dlg.removeFile": "حذف",
    // 404 / error
    "err.notFound": "الصفحة غير موجودة",
    "err.backHome": "العودة للرئيسية",
    "err.title": "حدث خطأ",
    "err.retry": "إعادة المحاولة",
  },
  en: {
    "brand.name": "SEND",
    "brand.tagline": "Services & Supplies",
    "nav.home": "Home",
    "nav.tenders": "Tenders",
    "nav.contracts": "Contracts",
    "nav.suppliers": "Suppliers",
    "nav.documents": "Documents",
    "nav.fieldTeams": "Field Teams",
    "nav.projects": "Projects",
    "nav.reports": "Reports",
    "lang.switch": "العربية",
    "lang.label": "Language",
    "dash.welcome": "Welcome to SEND",
    "dash.intro": "An internal platform to manage tenders, contracts, suppliers and projects — built on simple, interactive tables.",
    "dash.tenders.desc": "Manage tenders and track status",
    "dash.contracts.desc": "Active and completed contracts",
    "dash.suppliers.desc": "Supplier database",
    "dash.documents.desc": "Files and correspondence archive",
    "dash.fieldTeams.desc": "Track teams on site",
    "dash.projects.desc": "Project execution tracking",
    "dash.reports.desc": "Reports and aggregated documents",
    "page.tenders.title": "Tenders",
    "page.contracts.title": "Contracts",
    "page.suppliers.title": "Suppliers",
    "page.documents.title": "Documents",
    "page.fieldTeams.title": "Field Teams",
    "page.projects.title": "Projects",
    "page.reports.title": "Reports",
    "tbl.total": "Total records",
    "tbl.exportExcel": "Export to Excel",
    "tbl.exportPDF": "Export to PDF",
    "tbl.import": "Import",
    "tbl.importHint": "Import from Excel/CSV",
    "tbl.add": "Add new row",
    "tbl.search": "Quick search...",
    "tbl.all": "All",
    "tbl.actions": "Actions",
    "tbl.empty": "No data",
    "tbl.edit": "Edit",
    "tbl.delete": "Delete",
    "tbl.confirmDelete": "Delete this record?",
    "tbl.importEmpty": "File is empty",
    "tbl.importError": "Could not read the file. Make sure it is a valid Excel/CSV.",
    "tbl.importPrompt": "{n} rows will be imported.\nClick OK to append, or Cancel to replace all data.",
    "tbl.fontError": "Could not load the Arabic font. Default font will be used.",
    "dlg.editTitle": "Edit record",
    "dlg.newTitle": "Add new record",
    "dlg.cancel": "Cancel",
    "dlg.save": "Save",
    "dlg.choose": "— Choose —",
    "dlg.removeFile": "Remove",
    "err.notFound": "Page not found",
    "err.backHome": "Back to home",
    "err.title": "Something went wrong",
    "err.retry": "Try again",
  },
} as const;

export type TKey = keyof typeof dict["ar"];

interface I18nCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
  tx: (value: Localized | undefined | null) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo<I18nCtx>(() => {
    const t: I18nCtx["t"] = (key, vars) => {
      let s: string = (dict[lang] as Record<string, string>)[key] ?? (dict.ar as Record<string, string>)[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
      return s;
    };
    const tx: I18nCtx["tx"] = (value) => {
      if (value == null) return "";
      if (typeof value === "string") return value;
      return value[lang] ?? value.ar ?? "";
    };
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "ar" ? "en" : "ar")),
      t,
      tx,
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
}

/** Resolve a select option (string or {value,label}) to its stored value. */
export function optionValue(o: SelectOption): string {
  return typeof o === "string" ? o : o.value;
}
