/**
 * Librería: SCTR Sanitas Protecta | Crecer – Factura
 * Categoría: SCTR
 * Tipo: Factura
 */
export const library = {
  key: "sctr_sanitas_protecta_crecer_factura",
  label: "SCTR Sanitas Protecta | Crecer – Factura",
  description: "Factura SCTR emitida por Sanitas / Protecta / Crecer",
  category: "SCTR",
  provider: "Sanitas Protecta | Crecer",
  document_type: "Factura",

  patterns: [
    {
      id: "proforma",
      label: "Proforma",
      variable: "proforma",
      // Expresión para buscar código de proforma
      regex: /((?:AC|CS|PF)-\s*SCTR-\s*\d+)/gi,
      result: "Código proforma (AC|CS|PF)-SCTR-####",
    },
    {
      id: "factura",
      label: "Factura",
      variable: "factura",
      // Expresión para buscar el número de factura
      regex: /(?:factura|nro\.?\s*fact|f\.?\s*n[°º]?|electr[oó]nica)\s*[:\-]?\s*([A-Z0-9]+-\s*\d+)/gi,
      result: "Número de factura electrónica",
    },
    {
      id: "contrato",
      label: "Contrato",
      variable: "contrato",
      // Expresión para buscar contrato o póliza
      regex: /(?:contrato|p[oó]liza)\s*:\s*(\d+)/gi,
      result: "Número de contrato o póliza",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      // Expresión para buscar rubro de pension o salud
      regex: /(SCTR\s+(?:Pensi[oó]n|Salud))/gi,
      result: "Rubro SCTR Pensión o Salud",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      // Expresión para fecha de inicio de vigencia
      regex: /(?:vigencia)\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      // Expresión para fecha de fin de vigencia
      regex: /(?:vigencia)\s*[:\-]?\s*\d{2}\/\d{2}\/\d{4}\s*(?:-|al|hasta)\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      // Expresión para buscar el nombre del cliente
      regex: /(?:se[ñn]or\(es\)?:?|cliente\s*:)\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      // Expresión para buscar RUC del cliente tras su nombre o direccion
      regex: /(?:direcci[oó]n|cliente|se[ñn]or\(es\)?)(?:[\s\S]{1,150}?)RUC\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      // Expresión para buscar importe total de factura
      regex: /(?:importe\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Monto total de la factura",
    },
  ],
};
