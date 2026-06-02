import jsPDF from "jspdf";
// @ts-ignore - no types
import { ArabicShaper } from "arabic-persian-reshaper";
// Bundled with the app — Vite emits this as a hashed asset URL.
import amiriFontUrl from "@/assets/fonts/Amiri-Regular.ttf?url";

const FONT_NAME = "Amiri";
const FONT_FILE = "Amiri-Regular.ttf";

let fontBase64: string | null = null;

async function loadFontBase64(): Promise<string> {
  if (fontBase64) return fontBase64;
  const res = await fetch(amiriFontUrl);
  if (!res.ok) throw new Error("تعذّر تحميل الخط العربي المضمَّن");
  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  fontBase64 = btoa(binary);
  return fontBase64;
}

/**
 * Reshapes a string so disconnected Arabic letters render correctly in jsPDF.
 * Non-Arabic input passes through unchanged.
 */
export function shapeArabic(input: unknown): string {
  if (input == null) return "";
  const s = String(input);
  if (!/[\u0600-\u06FF]/.test(s)) return s;
  try {
    return ArabicShaper.convertArabic(s);
  } catch {
    return s;
  }
}

/**
 * Registers the Amiri Arabic font on a jsPDF instance and sets RTL mode.
 * Must be awaited before drawing Arabic text or running autoTable.
 */
export async function prepareArabicPDF(doc: jsPDF): Promise<string> {
  const b64 = await loadFontBase64();
  doc.addFileToVFS(FONT_FILE, b64);
  doc.addFont(FONT_FILE, FONT_NAME, "normal");
  // Register the same TTF for "bold"/"italic" so autoTable's header styles don't fall back.
  doc.addFont(FONT_FILE, FONT_NAME, "bold");
  doc.addFont(FONT_FILE, FONT_NAME, "italic");
  doc.addFont(FONT_FILE, FONT_NAME, "bolditalic");
  doc.setFont(FONT_NAME, "normal");
  doc.setR2L(true);
  return FONT_NAME;
}
