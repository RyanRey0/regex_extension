import {
  regex_libraries,
  apply_regex_library,
  format_regex_results,
} from "./regex-libraries.js";
import {
  extract_text_from_pdfs,
  format_all_text,
} from "./pdf-handler.js";
import { download_txt, build_export_name } from "./export.js";

const drop_zone = document.getElementById("drop-zone");
const file_input = document.getElementById("file-input");
const file_list = document.getElementById("file-list");
const library_select = document.getElementById("library-select");
const library_desc = document.getElementById("library-desc");
const btn_extract = document.getElementById("btn-extract");
const btn_export_all = document.getElementById("btn-export-all");
const btn_export_regex = document.getElementById("btn-export-regex");
const status_bar = document.getElementById("status-bar");
const preview_area = document.getElementById("preview-area");

let selected_files = [];
let extracted_data = [];
let regex_results = [];

init();

function init() {
  populate_library_select();
  setup_drop_zone();
  setup_buttons();
  update_ui_state();
}

function populate_library_select() {
  for (const [key, lib] of Object.entries(regex_libraries)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = lib.label;
    library_select.appendChild(option);
  }

  library_select.addEventListener("change", () => {
    const lib = regex_libraries[library_select.value];
    library_desc.textContent = lib.description;
    if (extracted_data.length > 0) {
      run_regex_extraction();
    }
  });

  library_desc.textContent = regex_libraries[library_select.value].description;
}

function setup_drop_zone() {
  drop_zone.addEventListener("click", () => file_input.click());

  file_input.addEventListener("change", (e) => {
    add_files(Array.from(e.target.files));
    file_input.value = "";
  });

  drop_zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop_zone.classList.add("border-primary");
  });

  drop_zone.addEventListener("dragleave", () => {
    drop_zone.classList.remove("border-primary");
  });

  drop_zone.addEventListener("drop", (e) => {
    e.preventDefault();
    drop_zone.classList.remove("border-primary");
    const pdf_files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    add_files(pdf_files);
  });
}

function add_files(files) {
  for (const file of files) {
    const exists = selected_files.some(
      (f) => f.name === file.name && f.size === file.size
    );
    if (!exists) {
      selected_files.push(file);
    }
  }
  render_file_list();
  update_ui_state();
  set_status(`${selected_files.length} archivo(s) listo(s)`);
}

function render_file_list() {
  file_list.innerHTML = "";

  if (selected_files.length === 0) {
    file_list.innerHTML =
      '<p class="text-xs text-muted italic">Sin archivos</p>';
    return;
  }

  for (let i = 0; i < selected_files.length; i++) {
    const file = selected_files[i];
    const row = document.createElement("div");
    row.className =
      "flex items-center justify-between bg-surface border border-muted rounded px-2 py-1 text-xs";

    const size_kb = (file.size / 1024).toFixed(1);
    row.innerHTML = `
      <span class="truncate flex-1 mr-2" title="${file.name}">${file.name}</span>
      <span class="text-gray-400 mr-3">${size_kb} KB</span>
    `;

    const btn_remove = document.createElement("button");
    btn_remove.className =
      "text-red-500 hover:text-red-700 font-bold text-lg leading-none";
    btn_remove.textContent = "×";
    btn_remove.title = "Quitar archivo";
    btn_remove.addEventListener("click", () => {
      selected_files.splice(i, 1);
      extracted_data = [];
      regex_results = [];
      render_file_list();
      update_ui_state();
      preview_area.textContent = "";
    });

    row.appendChild(btn_remove);
    file_list.appendChild(row);
  }
}

function setup_buttons() {
  btn_extract.addEventListener("click", handle_extract);
  btn_export_all.addEventListener("click", handle_export_all);
  btn_export_regex.addEventListener("click", handle_export_regex);
}

async function handle_extract() {
  if (selected_files.length === 0) return;

  btn_extract.disabled = true;
  btn_extract.textContent = "Extrayendo...";
  set_status("Procesando PDFs...");

  try {
    extracted_data = await extract_text_from_pdfs(
      selected_files,
      (current, total, name) => {
        set_status(`Leyendo ${current}/${total}: ${name}`);
      }
    );

    run_regex_extraction();
    show_preview();
    set_status(
      `Listo: ${extracted_data.length} PDF(s), ${total_pages()} página(s)`
    );
  } catch (err) {
    set_status(`Error: ${err.message}`, true);
    console.error(err);
  } finally {
    btn_extract.disabled = false;
    btn_extract.textContent = "Extraer texto";
    update_ui_state();
  }
}

function run_regex_extraction() {
  const library_key = library_select.value;
  const combined_text = extracted_data
    .map((d) => `=== ${d.fileName} ===\n${d.text}`)
    .join("\n\n");

  regex_results = apply_regex_library(combined_text, library_key);
}

function show_preview() {
  const library_key = library_select.value;
  const preview_lines = [];

  for (const doc of extracted_data) {
    preview_lines.push(`📄 ${doc.fileName} (${doc.pageCount} pág.)`);
    preview_lines.push(doc.text.slice(0, 300) + (doc.text.length > 300 ? "..." : ""));
    preview_lines.push("");
  }

  preview_lines.push("--- Coincidencias Regex ---");
  preview_lines.push(format_regex_results(regex_results, library_key));

  preview_area.textContent = preview_lines.join("\n");
}

function handle_export_all() {
  if (extracted_data.length === 0) return;
  const content = format_all_text(extracted_data);
  download_txt(content, build_export_name("texto_completo"));
  set_status("Texto completo exportado");
}

function handle_export_regex() {
  if (extracted_data.length === 0) return;
  const library_key = library_select.value;
  const lib = regex_libraries[library_key];
  const content = format_regex_results(regex_results, library_key);
  download_txt(content, build_export_name(`regex_${lib.label.toLowerCase().replace(/\s+/g, "_")}`));
  set_status("Datos regex exportados");
}

function total_pages() {
  return extracted_data.reduce((sum, d) => sum + d.pageCount, 0);
}

function update_ui_state() {
  const has_files = selected_files.length > 0;
  const has_data = extracted_data.length > 0;

  btn_extract.disabled = !has_files;
  btn_export_all.disabled = !has_data;
  btn_export_regex.disabled = !has_data;
}

function set_status(message, is_error = false) {
  status_bar.textContent = message;
  status_bar.className = is_error
    ? "text-xs text-ink italic font-medium"
    : "text-xs text-muted italic";
}
