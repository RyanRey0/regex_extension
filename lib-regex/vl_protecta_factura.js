/**
 * Librería: VL Protecta – Factura
 * Categoría: VL
 * Tipo: Factura
 */
export const library = {
  key: "vl_protecta_factura",
  label: "VL Protecta – Factura",
  description: "Factura Vida Ley emitida por Protecta Seguros",
  category: "VL",
  provider: "Protecta",
  document_type: "Factura",

  patterns: [
    {
      id: "aseguradora",
      label: "Aseguradora",
      variable: "aseguradora",
      regex: /(PROTECTA\s*(?:SEGUROS|COMPA[NÑ][IÍ]A\s*DE\s*SEGUROS)?)/gi,
      result: "Identificador de Protecta en el documento",
    },
    {
      id: "numero_factura",
      label: "N° Factura",
      variable: "numero_factura",
      regex: /(?:factura|n[°º#\.]?\s*fact|f\.?\s*n[°º]?)\s*[:\-]?\s*([A-Z0-9\-]+)/gi,
      result: "Número de factura VL Protecta",
    },
    {
      id: "fecha_emision",
      label: "Fecha de emisión",
      variable: "fecha_emision",
      regex: /(?:fecha(?:\s*de\s*emisi[oó]n)?)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
      result: "Fecha de emisión de la factura",
    },
    {
      id: "ruc_emisor",
      label: "RUC Emisor",
      variable: "ruc_emisor",
      regex: /(?:ruc\s*(?:del\s*)?(?:emisor|protecta)|emisor)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC de Protecta Seguros",
    },
    {
      id: "ruc_cliente",
      label: "RUC Cliente",
      variable: "ruc_cliente",
      regex: /(?:ruc\s*(?:del\s*)?(?:cliente|contratante)|r\.u\.c\.?\s*cliente)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del cliente empleador",
    },
    {
      id: "razon_social",
      label: "Razón Social",
      variable: "razon_social",
      regex: /(?:raz[oó]n\s*social|cliente|contratante)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Razón social del contratante",
    },
    {
      id: "periodo",
      label: "Periodo",
      variable: "periodo",
      regex: /(?:periodo|vigencia|mes)\s*[:\-]?\s*((?:0?[1-9]|1[0-2])\s*[-\/]\s*(?:19|20)?\d{2})/gi,
      result: "Periodo facturado",
    },
    {
      id: "numero_trabajadores",
      label: "N° Trabajadores",
      variable: "numero_trabajadores",
      regex: /(?:n[°º#\.]?\s*(?:de\s*)?trabajadores|asegurados)\s*[:\-]?\s*(\d+)/gi,
      result: "Trabajadores cubiertos en el periodo",
    },
    {
      id: "remuneracion",
      label: "Remuneración Total",
      variable: "remuneracion",
      regex: /(?:remuneraci[oó]n(?:\s*total)?|planilla|base\s*imponible)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Base imponible VL",
    },
    {
      id: "tasa_vl",
      label: "Tasa Vida Ley",
      variable: "tasa_vl",
      regex: /(?:tasa(?:\s*(?:de\s*)?(?:vida\s*ley|vl))?)\s*[:\-]?\s*([\d,\.]+\s*%)/gi,
      result: "Tasa aplicada al producto VL",
    },
    {
      id: "prima_neta",
      label: "Prima Neta",
      variable: "prima_neta",
      regex: /(?:prima\s*neta|valor\s*venta|sub\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima neta facturada",
    },
    {
      id: "igv",
      label: "IGV",
      variable: "igv",
      regex: /(?:igv|i\.g\.v\.?(?:\s*18\s*%)?)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "IGV desglosado en factura",
    },
    {
      id: "importe_total",
      label: "Importe Total",
      variable: "importe_total",
      regex: /(?:importe\s*total|total\s*a\s*pagar)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Importe total de la factura VL",
    },
    {
      id: "numero_poliza",
      label: "N° Póliza VL",
      variable: "numero_poliza",
      regex: /(?:p[oó]liza(?:\s*(?:vl|vida\s*ley))?|certificado)\s*[:\-]?\s*([A-Z0-9\-\/]+)/gi,
      result: "Número de póliza Vida Ley Protecta",
    },
    {
      id: "moneda",
      label: "Moneda",
      variable: "moneda",
      regex: /(?:moneda)\s*[:\-]?\s*(SOLES|D[oó]lares?|USD|PEN|S\/\.)/gi,
      result: "Moneda de la factura",
    },
  ],
};
