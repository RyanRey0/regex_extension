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
      id: "factura",
      label: "Factura",
      variable: "factura",
      // Expresión para buscar el número de factura electrónica
      regex: /((?:F|B|E)\d{3}-\s*\d+)/gi,
      result: "Número de factura electrónica",
    },
    {
      id: "poliza",
      label: "Póliza",
      variable: "poliza",
      // Expresión para buscar número de póliza antes o después de la etiqueta
      regex: /(?:p[oó]liza\s*[:\-]\s*(\d+))|(\d+)\s*[:\-]\s*p[oó]liza/gi,
      result: "Número de póliza de seguro",
    },
    {
      id: "rubro",
      label: "Rubro",
      variable: "rubro",
      // Expresión para buscar rubro o producto que precede a la etiqueta de producto
      regex: /([A-Za-z0-9\s]+?)\s*Producto\s*:/gi,
      result: "Rubro o producto de seguro Vida Ley",
    },
    {
      id: "vigencia_inicio",
      label: "Vigencia Inicio",
      variable: "vigencia_inicio",
      // Expresión para fecha de inicio de vigencia
      regex: /(?:vigencia\s+del\s+)?(\d{2}\/\d{2}\/\d{4})\s+al\s+\d{2}\/\d{2}\/\d{4}/gi,
      result: "Fecha inicio de vigencia (dd/mm/yyyy)",
    },
    {
      id: "vigencia_fin",
      label: "Vigencia Fin",
      variable: "vigencia_fin",
      // Expresión para fecha de fin de vigencia
      regex: /del\s+\d{2}\/\d{2}\/\d{4}\s+al\s+(\d{2}\/\d{2}\/\d{4})/gi,
      result: "Fecha fin de vigencia (dd/mm/yyyy)",
    },
    {
      id: "contratante",
      label: "Contratante",
      variable: "contratante",
      // Expresión para buscar el contratante entre la etiqueta cliente y los dos puntos
      regex: /(?:cliente)\s+([A-ZÁÉÍÓÚÑ0-9\s\.\,&\-]+?)\s*:/gi,
      result: "Nombre o razón social del contratante",
    },
    {
      id: "ruc",
      label: "RUC",
      variable: "ruc",
      // Expresión para buscar RUC del contratante tras su nombre o direccion
      regex: /(?:direcci[oó]n|cliente|se[ñn]or\(es\)?)(?:[\s\S]{1,250}?)(\d{11})/gi,
      result: "RUC del contratante (11 dígitos)",
    },
    {
      id: "prima_total",
      label: "Prima Total",
      variable: "prima_total",
      // Expresión para buscar importe total de factura
      regex: /(?:importe\s*total)\s*[:\-]?\s*(?:S\/\.?\s*)?([\d,]+\.\d{2})/gi,
      result: "Importe total facturado",
    },
  ],
};
