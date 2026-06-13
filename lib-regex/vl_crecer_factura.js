/**
 * Librería: VL Crecer – Factura
 * Categoría: VL
 * Tipo: Factura
 */
export const library = {
  key: "vl_crecer_factura",
  label: "VL Crecer – Factura",
  description: "Factura Vida Ley emitida por Crecer Seguros",
  category: "VL",
  provider: "Crecer",
  document_type: "Factura",

  patterns: [
    {
      id: "aseguradora",
      label: "Aseguradora",
      variable: "aseguradora",
      regex: /(CRECER\s*(?:SEGUROS|SEGUROS\s*Y\s*REASEGUROS)?)/gi,
      result: "Identificador de Crecer Seguros en el documento",
    },
    {
      id: "numero_factura",
      label: "N° Factura",
      variable: "numero_factura",
      regex: /(?:factura|n[°º#\.]?\s*fact|f\.?\s*n[°º]?)\s*[:\-]?\s*([A-Z0-9\-]+)/gi,
      result: "Número de factura VL Crecer",
    },
    {
      id: "fecha_emision",
      label: "Fecha de emisión",
      variable: "fecha_emision",
      regex: /(?:fecha(?:\s*de\s*emisi[oó]n)?)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
      result: "Fecha de emisión",
    },
    {
      id: "ruc_emisor",
      label: "RUC Emisor",
      variable: "ruc_emisor",
      regex: /(?:ruc\s*(?:del\s*)?(?:emisor|crecer)|emisor)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC de Crecer Seguros",
    },
    {
      id: "ruc_cliente",
      label: "RUC Cliente",
      variable: "ruc_cliente",
      regex: /(?:ruc\s*(?:del\s*)?(?:cliente|contratante)|r\.u\.c\.?\s*cliente)\s*[:\-]?\s*(\d{11})/gi,
      result: "RUC del empleador contratante",
    },
    {
      id: "razon_social",
      label: "Razón Social",
      variable: "razon_social",
      regex: /(?:raz[oó]n\s*social|cliente|contratante|empleador)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:ruc|direcci[oó]n|periodo|$))/gi,
      result: "Razón social del contratante",
    },
    {
      id: "direccion",
      label: "Dirección",
      variable: "direccion",
      regex: /(?:direcci[oó]n|domicilio\s*fiscal)\s*[:\-]?\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,#\-]+?)(?=\s*(?:distrito|provincia|periodo|$))/gi,
      result: "Dirección fiscal del cliente",
    },
    {
      id: "periodo",
      label: "Periodo",
      variable: "periodo",
      regex: /(?:periodo|vigencia|mes\s*de\s*cobertura)\s*[:\-]?\s*((?:0?[1-9]|1[0-2])\s*[-\/]\s*(?:19|20)?\d{2})/gi,
      result: "Periodo mensual facturado",
    },
    {
      id: "numero_trabajadores",
      label: "N° Trabajadores",
      variable: "numero_trabajadores",
      regex: /(?:n[°º#\.]?\s*(?:de\s*)?trabajadores|nro\.?\s*asegurados)\s*[:\-]?\s*(\d+)/gi,
      result: "Cantidad de asegurados VL",
    },
    {
      id: "remuneracion",
      label: "Remuneración Total",
      variable: "remuneracion",
      regex: /(?:remuneraci[oó]n(?:\s*total)?|planilla|total\s*remuneraciones)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Total remuneraciones del periodo",
    },
    {
      id: "tasa_vl",
      label: "Tasa Vida Ley",
      variable: "tasa_vl",
      regex: /(?:tasa(?:\s*(?:de\s*)?(?:vida\s*ley|vl))?)\s*[:\-]?\s*([\d,\.]+\s*%)/gi,
      result: "Tasa VL Crecer aplicada",
    },
    {
      id: "prima_neta",
      label: "Prima Neta",
      variable: "prima_neta",
      regex: /(?:prima\s*neta|valor\s*venta|subtotal)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Prima neta antes de IGV",
    },
    {
      id: "igv",
      label: "IGV",
      variable: "igv",
      regex: /(?:igv|i\.g\.v\.?(?:\s*18\s*%)?)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "IGV del documento",
    },
    {
      id: "importe_total",
      label: "Importe Total",
      variable: "importe_total",
      regex: /(?:importe\s*total|total\s*a\s*pagar|prima\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Importe total facturado",
    },
    {
      id: "numero_poliza",
      label: "N° Póliza VL",
      variable: "numero_poliza",
      regex: /(?:p[oó]liza(?:\s*(?:vl|vida\s*ley))?|certificado)\s*[:\-]?\s*([A-Z0-9\-\/]+)/gi,
      result: "Número de póliza Vida Ley",
    },
    {
      id: "capital_asegurado",
      label: "Capital Asegurado",
      variable: "capital_asegurado",
      regex: /(?:capital\s*asegurado|suma\s*asegurada)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Capital asegurado por trabajador",
    },
  ],
};
