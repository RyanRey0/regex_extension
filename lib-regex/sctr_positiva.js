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
      id: "aseguradora",
      label: "Aseguradora",
      variable: "aseguradora",
      regex: /(POSITIVA\s*(?:SEGUROS|COMPA[NÑ][IÍ]A\s*DE\s*SEGUROS)?)/gi,
      result: "Nombre de la aseguradora en el documento",
    },
    {
      id: "numero_documento",
      label: "N° Documento",
      variable: "numero_documento",
      regex: /(?:proforma|factura|n[°º#\.]?\s*(?:doc|documento))\s*[:\-]?\s*([A-Z0-9\-]+)/gi,
      result: "Número de proforma o factura Positiva",
    },
    {
      id: "fecha_emision",
      label: "Fecha de emisión",
      variable: "fecha_emision",
      regex: /(?:fecha(?:\s*de\s*emisi[oó]n)?)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
      result: "Fecha de emisión del documento",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      regex: /(?:ruc|r\.u\.c\.?)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "razon_social",
      label: "Razón Social",
      variable: "razon_social",
      regex: /(?:raz[oó]n\s*social|contratante|cliente)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Razón social del contratante",
    },
    {
      id: "direccion",
      label: "Dirección",
      variable: "direccion",
      regex: /(?:direcci[oó]n|domicilio)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,#\-]+?)(?=\s*(?:distrito|provincia|periodo|$))/gi,
      result: "Dirección del contratante",
    },
    {
      id: "periodo",
      label: "Periodo",
      variable: "periodo",
      regex: /(?:periodo|vigencia|mes)\s*[:\-]?\s*((?:0?[1-9]|1[0-2])\s*[-\/]\s*(?:19|20)?\d{2})/gi,
      result: "Periodo de cobertura mensual",
    },
    {
      id: "numero_trabajadores",
      label: "N° Trabajadores",
      variable: "numero_trabajadores",
      regex: /(?:n[°º#\.]?\s*(?:de\s*)?trabajadores|total\s*trabajadores)\s*[:\-]?\s*(\d+)/gi,
      result: "Número de trabajadores asegurados",
    },
    {
      id: "remuneracion",
      label: "Remuneración Total",
      variable: "remuneracion",
      regex: /(?:remuneraci[oó]n(?:\s*total)?|total\s*remuneraciones|planilla)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Total de remuneraciones del periodo",
    },
    {
      id: "tasa_riesgo",
      label: "Tasa de Riesgo",
      variable: "tasa_riesgo",
      regex: /(?:tasa(?:\s*(?:de\s*)?riesgo)?|tasa\s*sctr)\s*[:\-]?\s*([\d,\.]+\s*%)/gi,
      result: "Porcentaje de tasa SCTR Positiva",
    },
    {
      id: "prima_neta",
      label: "Prima Neta",
      variable: "prima_neta",
      regex: /(?:prima\s*neta|valor\s*unitario|subtotal)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima neta del periodo",
    },
    {
      id: "igv",
      label: "IGV",
      variable: "igv",
      regex: /(?:igv|i\.g\.v\.?)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "IGV calculado",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      regex: /(?:prima\s*total|total\s*(?:a\s*pagar|general))\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima total con impuestos",
    },
    {
      id: "numero_poliza",
      label: "N° Póliza / Certificado",
      variable: "numero_poliza",
      regex: /(?:p[oó]liza|certificado|n[°º#\.]?\s*cert)\s*[:\-]?\s*([A-Z0-9\-\/]+)/gi,
      result: "Número de póliza o certificado SCTR",
    },
    {
      id: "ciiu",
      label: "CIIU",
      variable: "ciiu",
      regex: /(?:ciiu|c\.i\.i\.u\.?)\s*[:\-]?\s*(\d{4})/gi,
      result: "Código CIIU de actividad económica",
    },
  ],
};
