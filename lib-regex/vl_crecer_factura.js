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
      id: "factura",
      label: "Factura",
      variable: "factura",
      regex: /(?:FACTURA\s+ELECTR[OÓ]NICA\s+)?([A-Z]\d{3}\s*-\s*\d+)/gi,
      result: "Número de factura electrónica",
    },
    {
      id: "poliza",
      label: "Póliza",
      variable: "poliza",
      regex: /N[uú]mero\s+de\s+p[oó]liza\s*:\s*(\d+)/gi,
      result: "Número de póliza Vida Ley",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      regex: /Producto\s*:\s*(Vida\s*Ley\s*(?:Digital|Trabajadores)?|VidaLeyDigital)/gi,
      result: "Rubro o producto de seguro Vida Ley",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      regex: /vigencia\s+de\s+cobertura\s*:\s*del\s+(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      regex: /vigencia\s+de\s+cobertura\s*:\s*del\s+\d{2}\/\d{2}\/\d{4}\s+al\s+(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      regex: /SE[ÑN]OR\s*\(ES\)\s*:\s*([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)(?=\s*(?:FECHA|RUC|DIRECCI[OÓ]N|$))/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      regex: /RUC\s*:\s*(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      regex: /IMPORTE\s+TOTAL\s*(?:\(S\/\))?\s*([\d,]+\.\d{2})/gi,
      result: "Importe total facturado",
    },
  ],
};
