import * as pdfjsLib from "../lib/pdf.min.mjs";

// ruta del worker de pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("lib/pdf.worker.min.mjs");

/**
 * extrae texto de un archivo PDF
 * @param {File} file
 * @returns {Promise<{fileName: string, text: string, pageCount: number}>}
 */
export async function extract_text_from_pdf(file) {
  const array_buffer = await file.arrayBuffer();
  const pdf_doc = await pdfjsLib.getDocument({ data: array_buffer }).promise;
  const page_count = pdf_doc.numPages;
  const text_parts = [];

  for (let page_num = 1; page_num <= page_count; page_num++) {
    const page = await pdf_doc.getPage(page_num);
    const content = await page.getTextContent();
    const page_text = content.items.map((item) => item.str).join(" ");
    text_parts.push(`--- Página ${page_num} ---\n${page_text}`);
  }

  return {
    fileName: file.name,
    text: text_parts.join("\n\n"),
    pageCount: page_count,
  };
}

/**
 * extrae texto de varios PDFs
 * @param {File[]} files
 * @param {function} on_progress
 * @returns {Promise<Array<{fileName: string, text: string, pageCount: number}>>}
 */
export async function extract_text_from_pdfs(files, on_progress) {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    if (on_progress) {
      on_progress(i + 1, files.length, files[i].name);
    }
    const result = await extract_text_from_pdf(files[i]);
    results.push(result);
  }

  return results;
}

export function format_all_text(extractions) {
  const lines = [
    "=== Texto completo extraído de PDFs ===",
    `Fecha: ${new Date().toLocaleString("es-ES")}`,
    `Documentos: ${extractions.length}`,
    "",
  ];

  for (const doc of extractions) {
    lines.push(`\n${"=".repeat(50)}`);
    lines.push(`ARCHIVO: ${doc.fileName}`);
    lines.push(`Páginas: ${doc.pageCount}`);
    lines.push("=".repeat(50));
    lines.push("");
    lines.push(doc.text);
    lines.push("");
  }

  return lines.join("\n");
}
