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
      id: "numero_factura",
      label: "N° Factura",
      variable: "numero_factura",
      regex: /(?:factura|n[°º#\.]\s*factura|nro\.?\s*fact|f\.?\s*n[°º]?)\s*[:\-]?\s*([A-Z0-9\-]+)/gi,
      result: "Número de factura electrónica o física",
    },
    {
      id: "fecha_emision",
      label: "Fecha de emisión",
      variable: "fecha_emision",
      regex: /(?:fecha(?:\s*de\s*emisi[oó]n)?|fecha\s*factura)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
      result: "Fecha de emisión de la factura",
    },
    {
      id: "ruc_emisor",
      label: "RUC Emisor",
      variable: "ruc_emisor",
      regex: /(?:ruc\s*(?:del\s*)?(?:emisor|aseguradora)|emisor\s*ruc)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC de la aseguradora emisora",
    },
    {
      id: "ruc_cliente",
      label: "RUC Cliente",
      variable: "ruc_cliente",
      regex: /(?:ruc\s*(?:del\s*)?(?:cliente|contratante|adquirente)|r\.u\.c\.?\s*cliente)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del cliente contratante",
    },
    {
      id: "razon_social",
      label: "Razón Social Cliente",
      variable: "razon_social",
      regex: /(?:raz[oó]n\s*social|cliente|se[nñ]or(?:es)?)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Razón social del cliente facturado",
    },
    {
      id: "periodo",
      label: "Periodo de cobertura",
      variable: "periodo",
      regex: /(?:periodo|mes\s*de\s*cobertura|vigencia)\s*[:\-]?\s*((?:0?[1-9]|1[0-2])\s*[-\/]\s*(?:19|20)?\d{2})/gi,
      result: "Periodo mensual facturado",
    },
    {
      id: "numero_trabajadores",
      label: "N° Trabajadores",
      variable: "numero_trabajadores",
      regex: /(?:n[°º#\.]?\s*(?:de\s*)?trabajadores|trabajadores)\s*[:\-]?\s*(\d+)/gi,
      result: "Cantidad de trabajadores del periodo",
    },
    {
      id: "remuneracion",
      label: "Remuneración / Planilla",
      variable: "remuneracion",
      regex: /(?:remuneraci[oó]n(?:\s*total)?|planilla|base\s*imponible)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Base imponible o planilla declarada",
    },
    {
      id: "prima_neta",
      label: "Prima Neta",
      variable: "prima_neta",
      regex: /(?:prima\s*neta|valor\s*venta|sub\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Valor de venta o prima neta",
    },
    {
      id: "igv",
      label: "IGV (18%)",
      variable: "igv",
      regex: /(?:igv|i\.g\.v\.?(?:\s*18\s*%)?)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Impuesto IGV desglosado",
    },
    {
      id: "importe_total",
      label: "Importe Total",
      variable: "importe_total",
      regex: /(?:importe\s*total|total\s*a\s*pagar|monto\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Importe total de la factura",
    },
    {
      id: "numero_poliza",
      label: "N° Póliza",
      variable: "numero_poliza",
      regex: /(?:p[oó]liza|certificado\s*sctr)\s*[:\-]?\s*([A-Z0-9\-\/]+)/gi,
      result: "Número de póliza SCTR asociada",
    },
    {
      id: "moneda",
      label: "Moneda",
      variable: "moneda",
      regex: /(?:moneda|tipo\s*de\s*moneda)\s*[:\-]?\s*(SOLES|D[oó]lares?|USD|PEN|S\/\.)/gi,
      result: "Tipo de moneda del documento",
    },
  ],
};
