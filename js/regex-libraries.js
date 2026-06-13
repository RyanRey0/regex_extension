import { library as sctr_sanitas_protecta_crecer_proforma } from "../lib-regex/sctr_sanitas_protecta_crecer_proforma.js";
import { library as sctr_sanitas_protecta_crecer_factura } from "../lib-regex/sctr_sanitas_protecta_crecer_factura.js";
import { library as sctr_positiva } from "../lib-regex/sctr_positiva.js";
import { library as vl_positiva } from "../lib-regex/vl_positiva.js";
import { library as vl_protecta_factura } from "../lib-regex/vl_protecta_factura.js";
import { library as vl_crecer_factura } from "../lib-regex/vl_crecer_factura.js";

// registro central de librerías
export const regex_libraries = {
  [sctr_sanitas_protecta_crecer_proforma.key]: sctr_sanitas_protecta_crecer_proforma,
  [sctr_sanitas_protecta_crecer_factura.key]: sctr_sanitas_protecta_crecer_factura,
  [sctr_positiva.key]: sctr_positiva,
  [vl_positiva.key]: vl_positiva,
  [vl_protecta_factura.key]: vl_protecta_factura,
  [vl_crecer_factura.key]: vl_crecer_factura,
};

export function get_library_keys() {
  return Object.keys(regex_libraries);
}

export function get_library(key) {
  const first_key = Object.keys(regex_libraries)[0];
  return regex_libraries[key] || regex_libraries[first_key];
}

export function apply_regex_library(text, library_key) {
  const library = get_library(library_key);
  const results = [];

  for (const pattern of library.patterns) {
    const matches = [];
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      const value = match[1] !== undefined ? match[1].trim() : match[0].trim();
      if (value && !matches.includes(value)) {
        matches.push(value);
      }
    }

    if (matches.length > 0) {
      results.push({
        pattern_id: pattern.id,
        label: pattern.label,
        variable: pattern.variable,
        matches,
      });
    }
  }

  return results;
}

export function format_regex_results(results, library_key) {
  const library = get_library(library_key);
  const lines = [
    `=== Extracción Regex: ${library.label} ===`,
    `Categoría: ${library.category} | ${library.provider} | ${library.document_type}`,
    `Fecha: ${new Date().toLocaleString("es-ES")}`,
    "",
  ];

  if (results.length === 0) {
    lines.push("No se encontraron coincidencias con los patrones seleccionados.");
    return lines.join("\n");
  }

  for (const group of results) {
    lines.push(`--- ${group.label} (${group.variable}) ---`);
    for (const match of group.matches) {
      lines.push(`  • ${match}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
