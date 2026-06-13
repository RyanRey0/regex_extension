/**
 * Librería: SCTR Sanitas Protecta | Crecer – Proforma
 * Categoría: SCTR
 * Tipo: Proforma
 *
 * Patrones adaptados desde macro VBA (Rx / ExtraerPdfYGenerarCadenaSCTR).
 * VB \R* → JS \s*  |  IgnoreCase + Multiline → flags im
 */
export const library = {
  key: "sctr_sanitas_protecta_crecer_proforma",
  label: "SCTR Sanitas Protecta | Crecer – Proforma",
  description: "Proforma SCTR Sanitas / Protecta / Crecer",
  category: "SCTR",
  provider: "Sanitas Protecta | Crecer",
  document_type: "Proforma",

  patterns: [
    {
      id: "proforma",
      label: "Proforma",
      variable: "proforma",
      regex: /((?:AC|CS|PF)-SCTR-\d+)/gi,
      result: "Código proforma (AC|CS|PF)-SCTR-####",
    },
    {
      id: "contrato",
      label: "Contrato",
      variable: "contrato",
      regex: /Contrato:\s*(\d+)/gi,
      result: "Número de contrato",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      regex: /Rubro:\s*(SCTR\s+(?:Pensi[oó]n|Salud))/gi,
      result: "Rubro SCTR Pensión o Salud",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      regex: /Desde\s+(\d{2}\/\d{2}\/\d{4})\s+hasta\s+\d{2}\/\d{2}\/\d{4}/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      regex: /Desde\s+\d{2}\/\d{2}\/\d{4}\s+hasta\s+(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      regex: /Contratante:\s*(.+?)(?=\s*DNI\/RUC)/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      regex: /DNI\/RUC:\s*(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      regex: /TOTAL\s*([\d,]+\.\d{2})/gi,
      result: "Monto total de la proforma",
    },
    {
      id: "codigo_pago",
      label: "Código de Pago",
      variable: "codigo_pago",
      regex: /CODIGO DE PAGO:\s*(\d+)/gi,
      result: "Código numérico de pago",
    },
    {
      id: "vencimiento",
      label: "Vencimiento",
      variable: "vencimiento",
      regex: /Vencimiento:\s*(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha de vencimiento (dd/mm/yyyy)",
    },
  ],
};
