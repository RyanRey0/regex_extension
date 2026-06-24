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

  // Recorrer cada patron de la libreria
  for (const pattern of library.patterns) {
    const matches = [];
    const normalized_matches = []; // para evitar duplicados normalizados
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    // Buscar todas las coincidencias
    while ((match = regex.exec(text)) !== null) {
      let value = "";
      // Recorrer los grupos de captura para encontrar el primero definido
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          value = match[i].trim();
          break;
        }
      }
      if (!value && match[0] !== undefined) {
        value = match[0].trim();
      }
      if (value) {
        // Normalizar espacios internos del valor
        let clean_value = value.replace(/\s+/g, " ");
        if (clean_value === "VidaLeyDigital") {
          clean_value = "Vida Ley Digital";
        }
        // Normalizar texto para la comparacion (quitar tildes y a minúsculas)
        const norm = clean_value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Si parece un numero decimal con comas, quitar comas
        const normalized_value = /^\d{1,3}(?:,\d{3})*\.\d{2}$/.test(norm) ? norm.replace(/,/g, "") : norm;
        
        // Permitir duplicados si es prima_total (para evitar simplificación incorrecta)
        const is_deduplicable = pattern.variable !== "prima_total";
        if (!is_deduplicable || !normalized_matches.includes(normalized_value)) {
          normalized_matches.push(normalized_value);
          matches.push(clean_value);
        }
      }
    }

    // Agregar resultado siempre para mantener la estructura limpia
    results.push({
      pattern_id: pattern.id,
      label: pattern.label,
      variable: pattern.variable,
      matches,
    });
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

  // Listar coincidencias por grupo
  for (const group of results) {
    lines.push(`--- ${group.label} (${group.variable}) ---`);
    for (const match of group.matches) {
      lines.push(`  • ${match}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function format_regex_results_yml(results, library_key) {
  const library = get_library(library_key);
  const lines = [
    `libreria: "${library.label}"`,
    `coincidencias:`,
  ];

  for (const group of results) {
    if (group.matches.length === 0) {
      lines.push(`  ${group.variable}: []`);
    } else {
      lines.push(`  ${group.variable}:`);
      for (const match of group.matches) {
        const escaped = match.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        lines.push(`    - "${escaped}"`);
      }
    }
  }

  return lines.join("\n");
}

export function format_preview_yml(results) {
  const lines = [];
  for (const group of results) {
    if (group.matches.length === 0) {
      lines.push(`  ${group.variable}: []`);
    } else {
      lines.push(`  ${group.variable}:`);
      for (const match of group.matches) {
        const escaped = match.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        lines.push(`    - "${escaped}"`);
      }
    }
  }
  return lines.join("\n");
}
