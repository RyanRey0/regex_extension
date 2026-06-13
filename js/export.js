/**
 * descarga contenido como archivo txt
 * @param {string} content
 * @param {string} file_name
 */
export function download_txt(content, file_name) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file_name.endsWith(".txt") ? file_name : `${file_name}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function build_export_name(prefix) {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  return `${prefix}_${stamp}.txt`;
}
