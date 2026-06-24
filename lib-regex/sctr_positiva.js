/**
 * Librería: SCTR Positiva
 * Categoría: SCTR
 * Tipo: Proforma / Factura
 */
export const library = {
  key: "sctr_positiva",
  label: "SCTR Positiva",
  description: "Documentos SCTR de la aseguradora Positiva Seguros",
  category: "SCTR",
  provider: "Positiva",
  document_type: "Proforma / Factura",

  patterns: [
    {
      id: "proforma",
      label: "Proforma",
      variable: "proforma",
      // Expresión para buscar número de proforma
      regex: /(?:Número de Proforma)\s*:\s*(\d+)/gi,
      result: "Número de proforma de cobertura",
    },
    {
      id: "poliza",
      label: "Póliza",
      variable: "poliza",
      // Expresión para buscar número de póliza o contrato
      regex: /(?:p[oó]liza|contrato)(?:\s*n(?:o|ro|°|\.))?\s*:\s*(\d+)/gi,
      result: "Número de póliza o contrato SCTR",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      // Expresión para buscar ramo o rubro (Pensión o Salud)
      regex: /(SCTR\s+(?:Pensi[oó]n|Salud))/gi,
      result: "Rubro SCTR Pensión o Salud",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      // Expresión para fecha de inicio de vigencia
      regex: /(?:vigencia\s+desde)\s*:\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      // Expresión para fecha de fin de vigencia
      regex: /(?:vigencia\s+desde)\s*:\s*\d{2}\/\d{2}\/\d{4}\s+hasta\s*:\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      // Expresión para buscar el contratante
      regex: /(?:contratante)\s*:\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:direcci[oó]n|asegurado|ruc|$))/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      // Expresión para buscar RUC del cliente tras proforma o contratante
      regex: /n[uú]mero\s+de\s+proforma\s*[:：]?\s*\d+(?:[\s\S]{0,250}?)R\.?\s*U\.?\s*C\.?\s*[:：]?\s*[:：]?\s*(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      // Expresión para buscar el monto total facturado
      regex: /(?:prima\s+(?:comercial\s*\+\s*igv|total)|total\s*:)\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Monto total de prima con impuestos",
    },
  ],
};
