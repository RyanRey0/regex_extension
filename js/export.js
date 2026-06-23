/**
 * descarga contenido como un archivo
 * @param {string} contenido
 * @param {string} nombre_archivo
 * @param {string} tipo_mime
 */
export function download_file(contenido, nombre_archivo, tipo_mime = "text/plain;charset=utf-8") {
  // Crear un blob de datos
  const el_blob = new Blob([contenido], { type: tipo_mime });
  const la_url = URL.createObjectURL(el_blob);
  
  // Elemento temporal de enlace para descarga
  const el_enlace = document.createElement("a");
  el_enlace.href = la_url;
  el_enlace.download = nombre_archivo;
  document.body.appendChild(el_enlace);
  el_enlace.click();
  
  // Limpieza del DOM y memoria
  document.body.removeChild(el_enlace);
  URL.revokeObjectURL(la_url);
}

/**
 * construye el nombre de archivo con marca de tiempo
 * @param {string} prefijo
 * @param {string} extension
 */
export function build_export_name(prefijo, extension = ".txt") {
  const la_fecha = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  return `${prefijo}_${la_fecha}${extension}`;
}
