const fs = require("fs");
const path = require("path");

const pdf_root = path.join(__dirname, "..", "node_modules", "pdfjs-dist");
const lib_dir = path.join(__dirname, "..", "lib");

if (!fs.existsSync(lib_dir)) {
  fs.mkdirSync(lib_dir, { recursive: true });
}

const files_to_copy = [
  ["build/pdf.min.mjs", "pdf.min.mjs"],
  ["build/pdf.worker.min.mjs", "pdf.worker.min.mjs"],
];

for (const [source_rel, dest_name] of files_to_copy) {
  const source_path = path.join(pdf_root, source_rel);
  const dest_path = path.join(lib_dir, dest_name);
  fs.copyFileSync(source_path, dest_path);
  console.log(`Copiado: ${dest_name}`);
}
