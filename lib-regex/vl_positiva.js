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
      id: "aseguradora",
      label: "Aseguradora",
      variable: "aseguradora",
      regex: /(POSITIVA\s*(?:SEGUROS|COMPA[NÑ][IÍ]A\s*DE\s*SEGUROS)?)/gi,
      result: "Identificador de Positiva en el documento",
    },
    {
      id: "tipo_seguro",
      label: "Tipo de Seguro",
      variable: "tipo_seguro",
      regex: /(VIDA\s*LEY|V\.?\s*L\.?|SEGURO\s*DE\s*VIDA\s*LEY)/gi,
      result: "Indicador de producto Vida Ley",
    },
    {
      id: "numero_documento",
      label: "N° Documento",
      variable: "numero_documento",
      regex: /(?:proforma|factura|n[°º#\.]?\s*(?:doc|documento))\s*[:\-]?\s*([A-Z0-9\-]+)/gi,
      result: "Número de proforma o factura VL",
    },
    {
      id: "fecha_emision",
      label: "Fecha de emisión",
      variable: "fecha_emision",
      regex: /(?:fecha(?:\s*de\s*emisi[oó]n)?)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
      result: "Fecha de emisión",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      regex: /(?:ruc|r\.u\.c\.?)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del contratante",
    },
    {
      id: "razon_social",
      label: "Razón Social",
      variable: "razon_social",
      regex: /(?:raz[oó]n\s*social|contratante|empleador)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Razón social del empleador",
    },
    {
      id: "periodo",
      label: "Periodo",
      variable: "periodo",
      regex: /(?:periodo|vigencia|mes\s*de\s*cobertura)\s*[:\-]?\s*((?:0?[1-9]|1[0-2])\s*[-\/]\s*(?:19|20)?\d{2})/gi,
      result: "Periodo mensual de cobertura VL",
    },
    {
      id: "numero_trabajadores",
      label: "N° Trabajadores",
      variable: "numero_trabajadores",
      regex: /(?:n[°º#\.]?\s*(?:de\s*)?trabajadores|nro\.?\s*asegurados|asegurados)\s*[:\-]?\s*(\d+)/gi,
      result: "Cantidad de trabajadores cubiertos",
    },
    {
      id: "remuneracion",
      label: "Remuneración / Planilla",
      variable: "remuneracion",
      regex: /(?:remuneraci[oó]n(?:\s*total)?|planilla|total\s*remuneraciones)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Total de remuneraciones asegurables",
    },
    {
      id: "tasa_vl",
      label: "Tasa VL",
      variable: "tasa_vl",
      regex: /(?:tasa(?:\s*(?:de\s*)?vida\s*ley)?|tasa\s*vl)\s*[:\-]?\s*([\d,\.]+\s*%)/gi,
      result: "Porcentaje de tasa Vida Ley",
    },
    {
      id: "prima_neta",
      label: "Prima Neta",
      variable: "prima_neta",
      regex: /(?:prima\s*neta|subtotal)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima neta VL",
    },
    {
      id: "igv",
      label: "IGV",
      variable: "igv",
      regex: /(?:igv|i\.g\.v\.?)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "IGV del seguro VL",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      regex: /(?:prima\s*total|total\s*a\s*pagar|importe\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima total VL con impuestos",
    },
    {
      id: "numero_poliza",
      label: "N° Póliza VL",
      variable: "numero_poliza",
      regex: /(?:p[oó]liza\s*(?:vl|vida\s*ley)?|certificado)\s*[:\-]?\s*([A-Z0-9\-\/]+)/gi,
      result: "Número de póliza Vida Ley",
    },
    {
      id: "capital_asegurado",
      label: "Capital Asegurado",
      variable: "capital_asegurado",
      regex: /(?:capital\s*asegurado|suma\s*asegurada)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Monto de capital o suma asegurada por trabajador",
    },
  ],
};
