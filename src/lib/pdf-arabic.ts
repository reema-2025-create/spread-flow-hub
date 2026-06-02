import jsPDF from "jspdf";
// @ts-ignore - no types
import { ArabicShaper } from "arabic-persian-reshaper";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/amiri@5.0.18/files/amiri-arabic-400-normal.ttf";
const FONT_NAME = "Amiri";
const FONT_FILE = "Amiri-Regular.ttf";

let fontBase64: string | null = null;

async function fetchFontBase64(): Promise<string> {
  if (fontBase64) return fontBase64;
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error("تعذّر تحميل الخط العربي");
  const buf = await res.arrayBuffer();
  // Convert ArrayBuffer -> base64 (chunked to avoid call stack limits)
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
  const b64 = await fetchFontBase64();
  doc.addFileToVFS(FONT_FILE, b64);
  doc.addFont(FONT_FILE, FONT_NAME, "normal");
  doc.setFont(FONT_NAME, "normal");
  doc.setR2L(true);
  return FONT_NAME;
}
