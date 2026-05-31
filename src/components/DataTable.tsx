import { useMemo, useState, useEffect } from "react";
import { useLocalTable, fileToData, type Row } from "@/hooks/useLocalTable";
import {
  Plus, Search, Pencil, Trash2, Download, X, Filter as FilterIcon,
} from "lucide-react";

export type ColType =
  | "text" | "textarea" | "date" | "select" | "number" | "progress" | "files" | "file";

export interface Col<T = any> {
  key: string;
  label: string;
  type?: ColType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  width?: string;
  /** For select: map value -> tailwind classes for the badge */
  badgeMap?: Record<string, string>;
  render?: (value: any, row: T) => React.ReactNode;
  hideInTable?: boolean;
}

interface Props<T extends Row> {
  storageKey: string;
  title: string;
  columns: Col<T>[];
  seed?: T[];
  /** key of select column used in toolbar filter */
  filterKey?: string;
  /** Returns extra row classNames (e.g. highlight late) */
  rowClassName?: (row: T) => string;
  /** Renders below the toolbar */
  extraToolbar?: React.ReactNode;
}

export function DataTable<T extends Row>({
  storageKey, title, columns, seed = [], filterKey, rowClassName, extraToolbar,
}: Props<T>) {
  const { rows, add, update, remove, ready } = useLocalTable<T>(storageKey, seed);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);

  const filterCol = filterKey ? columns.find((c) => c.key === filterKey) : undefined;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter && filterKey && (r as any)[filterKey] !== filter) return false;
      if (!q) return true;
      return columns.some((c) => {
        const v = (r as any)[c.key];
        if (v == null) return false;
        if (typeof v === "string" || typeof v === "number") return String(v).toLowerCase().includes(q);
        return false;
      });
    });
  }, [rows, search, filter, filterKey, columns]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {ready ? `إجمالي السجلات: ${rows.length}` : "..."}
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> إضافة صف جديد
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center bg-card border rounded-lg p-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث سريع..."
            className="w-full rounded-md border border-input bg-background pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {filterCol && (
          <div className="flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">كل {filterCol.label}</option>
              {filterCol.options?.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        )}
        {extraToolbar}
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                {columns.filter((c) => !c.hideInTable).map((c) => (
                  <th key={c.key} className="text-right font-semibold px-4 py-3 whitespace-nowrap" style={{ width: c.width }}>
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-24">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={columns.length + 1} className="text-center text-muted-foreground py-10">لا توجد بيانات</td></tr>
              )}
              {filtered.map((r) => (
                <tr key={r.id} className={`border-t hover:bg-muted/30 ${rowClassName?.(r) ?? ""}`}>
                  {columns.filter((c) => !c.hideInTable).map((c) => (
                    <td key={c.key} className="px-4 py-3 align-top">
                      <CellView col={c} value={(r as any)[c.key]} row={r} />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setEditing(r)} className="p-1.5 rounded hover:bg-accent text-primary" aria-label="تعديل">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm("هل تريد حذف هذا السجل؟")) remove(r.id); }}
                        className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
                        aria-label="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(creating || editing) && (
        <RowDialog
          columns={columns}
          title={editing ? "تعديل السجل" : "إضافة سجل جديد"}
          initial={editing ?? undefined}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSave={(data) => {
            if (editing) update(editing.id, data as Partial<T>);
            else add(data as any);
            setCreating(false); setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function CellView({ col, value, row }: { col: Col; value: any; row: any }) {
  if (col.render) return <>{col.render(value, row)}</>;
  if (value == null || value === "") return <span className="text-muted-foreground">—</span>;
  if (col.type === "select" && col.badgeMap) {
    const cls = col.badgeMap[value] ?? "bg-muted text-foreground";
    return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{value}</span>;
  }
  if (col.type === "progress") {
    const v = Math.max(0, Math.min(100, Number(value) || 0));
    return (
      <div className="flex items-center gap-2 min-w-[140px]">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${v}%` }} />
        </div>
        <span className="text-xs font-semibold tabular-nums w-10 text-left">{v}%</span>
      </div>
    );
  }
  if (col.type === "files") {
    const files: any[] = Array.isArray(value) ? value : [];
    if (!files.length) return <span className="text-muted-foreground">—</span>;
    return (
      <div className="flex flex-col gap-1">
        {files.map((f, i) => (
          <a key={i} href={f.data} download={f.name} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <Download className="h-3 w-3" /> {f.name}
          </a>
        ))}
      </div>
    );
  }
  if (col.type === "file") {
    const f = value;
    return (
      <a href={f.data} download={f.name} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
        <Download className="h-3 w-3" /> {f.name}
      </a>
    );
  }
  if (col.type === "textarea") {
    return <span className="block max-w-[280px] text-muted-foreground whitespace-pre-wrap">{value}</span>;
  }
  return <span>{String(value)}</span>;
}

function RowDialog({
  columns, title, initial, onSave, onClose,
}: {
  columns: Col[];
  title: string;
  initial?: any;
  onSave: (data: any) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<any>(() => {
    const o: any = {};
    columns.forEach((c) => { o[c.key] = initial?.[c.key] ?? (c.type === "files" ? [] : ""); });
    return o;
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-card">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {columns.map((c) => (
            <div key={c.key} className={c.type === "textarea" || c.type === "files" || c.type === "file" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-1.5">
                {c.label} {c.required && <span className="text-destructive">*</span>}
              </label>
              <FieldInput col={c} value={form[c.key]} onChange={(v) => set(c.key, v)} />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border hover:bg-muted">إلغاء</button>
            <button type="submit" className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldInput({ col, value, onChange }: { col: Col; value: any; onChange: (v: any) => void }) {
  const base = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  if (col.type === "textarea")
    return <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} className={base} placeholder={col.placeholder} required={col.required} />;
  if (col.type === "select")
    return (
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} required={col.required}>
        <option value="">— اختر —</option>
        {col.options?.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  if (col.type === "date")
    return <input type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} required={col.required} />;
  if (col.type === "number" || col.type === "progress")
    return <input type="number" min={col.type === "progress" ? 0 : undefined} max={col.type === "progress" ? 100 : undefined} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} className={base} required={col.required} />;
  if (col.type === "files")
    return (
      <div className="space-y-2">
        <input
          type="file"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            const datas = await Promise.all(files.map(fileToData));
            onChange([...(Array.isArray(value) ? value : []), ...datas]);
            e.target.value = "";
          }}
          className="text-sm"
        />
        {Array.isArray(value) && value.length > 0 && (
          <ul className="text-xs space-y-1">
            {value.map((f: any, i: number) => (
              <li key={i} className="flex items-center justify-between bg-muted rounded px-2 py-1">
                <span>{f.name}</span>
                <button type="button" onClick={() => onChange(value.filter((_: any, j: number) => j !== i))} className="text-destructive">حذف</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  if (col.type === "file")
    return (
      <div className="space-y-2">
        <input
          type="file"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) onChange(await fileToData(f));
            e.target.value = "";
          }}
          className="text-sm"
        />
        {value?.name && (
          <div className="text-xs flex items-center justify-between bg-muted rounded px-2 py-1">
            <span>{value.name}</span>
            <button type="button" onClick={() => onChange("")} className="text-destructive">حذف</button>
          </div>
        )}
      </div>
    );
  return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} placeholder={col.placeholder} required={col.required} />;
}
