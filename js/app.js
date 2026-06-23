import {
  regex_libraries,
  apply_regex_library,
  format_regex_results,
  format_regex_results_yml,
} from "./regex-libraries.js";
import {
  extract_text_from_pdfs,
  format_all_text,
} from "./pdf-handler.js";
import { download_file, build_export_name } from "./export.js";

const drop_zone = document.getElementById("drop-zone");
const file_input = document.getElementById("file-input");
const file_list = document.getElementById("file-list");
const library_select = document.getElementById("library-select");
const library_desc = document.getElementById("library-desc");
const btn_extract = document.getElementById("btn-extract");
const btn_clear = document.getElementById("btn-clear");
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
  load_saved_state(); // restaurar datos al iniciar
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
      show_preview();
    }
    save_state_to_storage(); // guardar cambios en seleccion
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
      (f) => (f.name || f.fileName) === file.name && f.size === file.size
    );
    if (!exists) {
      selected_files.push(file);
    }
  }
  render_file_list();
  update_ui_state();
  set_status(`${selected_files.length} archivo(s) listo(s)`);
  save_state_to_storage(); // guardar lista de archivos actualizada
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

    const display_name = file.name || file.fileName;
    const size_kb = file.size ? (file.size / 1024).toFixed(1) : "?.?";
    row.innerHTML = `
      <span class="truncate flex-1 mr-2" title="${display_name}">${display_name}</span>
      <span class="text-gray-400 mr-3">${size_kb} KB</span>
    `;

    const btn_remove = document.createElement("button");
    btn_remove.className =
      "text-red-500 hover:text-red-700 font-bold text-lg leading-none";
    btn_remove.textContent = "×";
    btn_remove.title = "Quitar archivo";
    btn_remove.addEventListener("click", () => {
      const removed_name = selected_files[i].name || selected_files[i].fileName;
      selected_files.splice(i, 1);
      
      // Quitar solo los datos de ese archivo de la extraccion
      extracted_data = extracted_data.filter((d) => d.fileName !== removed_name);
      
      if (extracted_data.length > 0) {
        run_regex_extraction();
        show_preview();
        set_status(`Listo: ${extracted_data.length} PDF(s), ${total_pages()} página(s)`);
      } else {
        regex_results = [];
        preview_area.textContent = "";
        set_status(selected_files.length > 0 ? `${selected_files.length} archivo(s) listo(s)` : "Selecciona PDFs");
      }
      
      render_file_list();
      update_ui_state();
      save_state_to_storage(); // guardar estado tras borrar archivo
    });

    row.appendChild(btn_remove);
    file_list.appendChild(row);
  }
}

function setup_buttons() {
  btn_extract.addEventListener("click", handle_extract);
  btn_export_all.addEventListener("click", handle_export_all);
  btn_export_regex.addEventListener("click", handle_export_regex);
  btn_clear.addEventListener("click", handle_clear); // conectar boton de limpiar
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
    save_state_to_storage(); // guardar estado final tras extraer
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

  preview_lines.push("--- Coincidencias Regex (YML) ---");
  preview_lines.push(format_regex_results_yml(regex_results, library_key));

  preview_area.textContent = preview_lines.join("\n");
}

function handle_export_all() {
  if (extracted_data.length === 0) return;
  const content = format_all_text(extracted_data);
  download_file(content, build_export_name("texto_completo", ".txt"));
  set_status("Texto completo exportado");
}

function handle_export_regex() {
  if (extracted_data.length === 0) return;
  const library_key = library_select.value;
  const lib = regex_libraries[library_key];
  const content = format_regex_results_yml(regex_results, library_key);
  download_file(
    content,
    build_export_name(`regex_${lib.label.toLowerCase().replace(/\s+/g, "_")}`, ".yml"),
    "application/x-yaml;charset=utf-8"
  );
  set_status("Datos regex exportados en YML");
}

function total_pages() {
  return extracted_data.reduce((sum, d) => sum + d.pageCount, 0);
}

function update_ui_state() {
  const has_files = selected_files.length > 0;
  const has_data = extracted_data.length > 0;

  btn_extract.disabled = !has_files;
  btn_clear.disabled = !has_files; // habilitar limpiar si hay archivos listados
  btn_export_all.disabled = !has_data;
  btn_export_regex.disabled = !has_data;
}

function set_status(message, is_error = false) {
  status_bar.textContent = message;
  status_bar.className = is_error
    ? "text-xs text-ink italic font-medium"
    : "text-xs text-muted italic";
}

// guardar estado en almacenamiento local de Chrome
function save_state_to_storage() {
  const serialized_files = selected_files.map((f) => ({
    name: f.name || f.fileName,
    size: f.size || 0,
  }));

  chrome.storage.local.set({
    selected_files: serialized_files,
    extracted_data,
    regex_results,
    library_key: library_select.value,
    status_message: status_bar.textContent,
    is_error: status_bar.classList.contains("font-medium"),
  });
}

// restaurar estado guardado al abrir popup
function load_saved_state() {
  chrome.storage.local.get(
    ["selected_files", "extracted_data", "regex_results", "library_key", "status_message", "is_error"],
    (result) => {
      if (result.selected_files) {
        selected_files = result.selected_files;
      }
      if (result.extracted_data) {
        extracted_data = result.extracted_data;
      }
      if (result.regex_results) {
        regex_results = result.regex_results;
      }
      if (result.library_key) {
        library_select.value = result.library_key;
        const lib = regex_libraries[library_select.value];
        if (lib) {
          library_desc.textContent = lib.description;
        }
      }

      // actualizar UI con datos cargados
      if (selected_files.length > 0) {
        render_file_list();
      }
      if (result.status_message) {
        set_status(result.status_message, result.is_error || false);
      }
      if (extracted_data.length > 0) {
        show_preview();
      }
      update_ui_state();
    }
  );
}

// limpiar todo el estado y almacenamiento
function handle_clear() {
  selected_files = [];
  extracted_data = [];
  regex_results = [];

  render_file_list();
  preview_area.textContent = "";
  set_status("Selecciona PDFs");
  update_ui_state();

  chrome.storage.local.clear();
}
