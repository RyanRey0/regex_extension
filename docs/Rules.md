# Rules

Reglas para crear **Regular Expressions** y archivos de librería en `lib-regex/`.

---

## 1. Reglas para Regular Expressions

### 1.1 Principios generales

1. **Un patrón = un dato.** Cada campo del documento debe tener su propio regex independiente, sin mezclar la captura de diferentes valores.
2. **Captura explícita.** Usar siempre un grupo de captura `(...)` para el valor objetivo; evitar depender solo de `match[0]`, salvo casos excepcionales debidamente documentados.
3. **Anclaje contextual y delimitadores estructurales.** Prefijar el patrón con la etiqueta específica del PDF (`RUC`, `Prima Total`, `N° Proforma`, etc.) y, cuando sea útil, considerar también el texto anterior y/o posterior como delimitadores adicionales (ejemplo: entre dos etiquetas). Incluir saltos de línea (`\n`) y otros caracteres estructurales cuando ayude a precisar la extracción.
4. **Flags estándar:** `gi` para campos de texto donde es relevante distinguir mayúsculas/minúsculas; `g` para valores numéricos puros.
5. **Sin ambigüedad.** Preferir `\s*[:\-]?\s*` entre etiqueta y valor, y considerar los posibles saltos de línea, espacios adicionales u otros separadores causados por PDF.js.
6. **Normalizar espacios y saltos.** PDF.js puede concatenar palabras con espacios o partir en saltos de línea; usar `\s+` o patrones que absorban tanto espacios como saltos (`\s+`, `(?:[\s\n]+)`) donde corresponda.
7. **Estructuras alrededor del valor.** Si es útil, delimitar el área de búsqueda del valor combinando patrones que indiquen qué hay antes y después del dato (delimitadores claros para evitar capturas amplias o ambiguas).
8. **Numeración flexible.** Para patrones numéricos de registros, números relacionales u otros, adaptar la cantidad de dígitos según cada caso y sample del documento; por ejemplo, usar `\d{6,12}` si se observan longitudes variables realistas, en vez de fijar el número mínimo de dígitos.
9. **Duplicados.** El motor deduplica por valor; evitar repetir la captura del mismo dato dentro del mismo patrón o múltiples veces para el mismo campo.

### 1.2 Tipos de dato y patrones base

| Tipo | Variable sugerida | Patrón base |
|------|-------------------|-------------|
| RUC Perú | `ruc` | `(\d{11})` tras etiqueta RUC |
| Razón social | `razon_social` | texto hasta salto o etiqueta siguiente |
| Fecha | `fecha_*` | `(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})` |
| Monto PEN | `monto_*` | `(?:S\/\.?\s*)?([\d,]+\.\d{2})` |
| Entero | `num_*` | `(\d+)` |
| Periodo | `periodo` | `(0?[1-9]\|1[0-2])\s*[-\/]\s*(19\|20)?\d{2}` |
| N° documento | `numero_documento` | `([A-Z0-9\-]+)` tras etiqueta |

### 1.3 Orden de prueba

1. Identificar etiqueta exacta en el PDF de muestra.
2. Construir regex mínimo con una captura.
3. Probar contra texto extraído real (no contra HTML).
4. Ajustar `\s*` si PDF.js separa caracteres.
5. Documentar en `label` el nombre legible del campo.

### 1.4 Prohibido

- Lookbehind excesivamente complejo sin necesidad.
- Patrones que capturen párrafos enteros.
- Regex genéricos compartidos entre librerías sin contextualizar.

---

## 2. Reglas para archivos JS de librería

### 2.1 Ubicación y nombre

```
lib-regex/{categoria}_{aseguradora}_{tipo}.js
```

| Librería | Archivo |
|----------|---------|
| SCTR Sanitas Protecta \| Crecer – Proforma | `sctr_sanitas_protecta_crecer_proforma.js` |
| SCTR Sanitas Protecta \| Crecer – Factura | `sctr_sanitas_protecta_crecer_factura.js` |
| SCTR Positiva | `sctr_positiva.js` |
| VL Positiva | `vl_positiva.js` |
| VL Protecta – Factura | `vl_protecta_factura.js` |
| VL Crecer – Factura | `vl_crecer_factura.js` |

### 2.2 Estructura obligatoria del archivo

```javascript
/**
 * Librería: {label completo}
 * Categoría: SCTR | VL
 * Tipo: Proforma | Factura
 */
export const library = {
  key: "snake_case_unico",
  label: "Nombre visible en el select",
  description: "Descripción breve del documento",
  category: "SCTR",
  provider: "Nombre aseguradora",
  document_type: "Proforma",

  patterns: [
    {
      id: "snake_case_campo",
      label: "Nombre legible del dato",
      variable: "nombre_variable_resultado",
      regex: /etiqueta\s*[:\-]?\s*(valor_capturado)/gi,
      result: "Descripción de qué devuelve el grupo 1",
    },
  ],
};
```

### 2.3 Campos del objeto `library`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `key` | string | sí | Identificador único; coincide con nombre de archivo sin `.js` |
| `label` | string | sí | Texto en el `<select>` |
| `description` | string | sí | Subtítulo bajo el select |
| `category` | string | sí | `SCTR` o `VL` |
| `provider` | string | sí | Aseguradora(s) |
| `document_type` | string | sí | `Proforma` o `Factura` |
| `patterns` | array | sí | Lista de patrones regex |

### 2.4 Campos de cada `pattern`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | string | sí | Identificador interno del patrón |
| `label` | string | sí | Encabezado en exportación `.txt` |
| `variable` | string | sí | Nombre semántico del dato extraído |
| `regex` | RegExp | sí | Expresión regular con grupo de captura |
| `result` | string | sí | Documentación del valor capturado |

### 2.5 Registro en el proyecto

Tras crear el archivo, importarlo en `js/regex-libraries.js`:

```javascript
import { library as sctr_positiva } from "../lib-regex/sctr_positiva.js";

export const regex_libraries = {
  [sctr_positiva.key]: sctr_positiva,
  // ...
};
```

### 2.6 Resultado de extracción

El motor produce:

```javascript
[
  {
    pattern_id: "ruc",
    label: "RUC",
    matches: ["20123456789"],
  },
]
```

Exportación `.txt`:

```
=== SCTR Positiva ===
Nombre del Archivo: ...

RUC
  • 20123456789
```

---

## 3. Checklist nueva librería

- [ ] Archivo en `lib-regex/` con nombre snake_case
- [ ] `key` único y coherente con el filename
- [ ] Todos los `patterns` tienen `id`, `label`, `variable`, `regex`, `result`
- [ ] Cada regex tiene al menos un grupo de captura `(...)`
- [ ] Import y registro en `js/regex-libraries.js`
- [ ] Probado con PDF real de la categoría
