/**
 * Librería: VL Positiva
 * Categoría: VL
 * Tipo: Proforma / Factura
 */
export const library = {
  key: "vl_positiva",
  label: "VL Positiva",
  description: "Documentos Vida Ley (VL) de Positiva Seguros",
  category: "VL",
  provider: "Positiva",
  document_type: "Proforma / Factura",

  patterns: [
    {
      id: "proforma",
      label: "Proforma",
      variable: "proforma",
      // Expresión para buscar el número de proforma
      regex: /(?:proforma)(?:\s*(?:nro|de|n[°º#\.])\s*)?[:\-]?\s*(\d+)/gi,
      result: "Número de proforma de cobertura",
    },
    {
      id: "poliza",
      label: "Póliza",
      variable: "poliza",
      // Expresión para buscar número de póliza
      regex: /(?:p[oó]liza)(?:\s*(?:nro|n[°º#\.])\s*)?[:\-]?\s*(\d+)/gi,
      result: "Número de póliza Vida Ley",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      // Expresión para buscar rubro o producto Vida Ley
      regex: /(?:producto|ramo)\s*:\s*(Vida\s+Ley\s+Trabajadores)/gi,
      result: "Rubro o producto de seguro",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      // Expresión para fecha de inicio de vigencia de la póliza
      regex: /(?:producto)\s*:\s*[A-Za-z0-9\s]+?vigencia\s+desde\s*:\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      // Expresión para fecha de fin de vigencia de la póliza
      regex: /(?:producto)\s*:\s*[A-Za-z0-9\s]+?vigencia\s+desde\s*:\s*\d{2}\/\d{2}\/\d{4}\s+hasta\s*:\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      // Expresión para buscar el nombre del contratante o estimados
      regex: /(?:contratante\s*:\s*\d+\s*-\s*|estimados\s+)([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:enviamos|asegurado|ruc|direcci[oó]n|$))/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      // Expresión para buscar RUC del contratante
      regex: /(?:contratante\s*:\s*)(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      // Expresión para buscar el monto total de la prima
      regex: /(?:prima\s+total|prima\s+comercial\s+a\s+pagar\s+ser[aá]\s+de)\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima total comercial",
    },
  ],
};
