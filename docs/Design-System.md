# Design System

Guía visual de la extensión **PDF Regex Extractor**.

**Principio rector:** minimalismo corporativo. Solo lo funcional. Sin ornamentos, sin textos redundantes, sin espacio desperdiciado.

---

## Filosofía

| Principio | Aplicación |
|-----------|------------|
| Minimalista | Cada elemento debe justificar su presencia |
| Corporativo | Tipografía neutra, colores sobrios, layout ordenado |
| Compacto | Márgenes y paddings reducidos, sobre todo en header y footer |
| Funcional | Header y footer **no aportan interacción**; ocupan el mínimo espacio posible |

### Header y footer

El **header** solo identifica la herramienta. No lleva subtítulos, descripciones ni controles.

El **footer** solo muestra estado transitorio (progreso, errores). Texto en **cursiva**, tamaño mínimo.

> **Regla:** si header o footer crecen en altura, se está violando el design system.

---

## Paleta de colores

Solo cuatro colores. Sin excepciones.

| Token | Hex | Uso |
|-------|-----|-----|
| `ink` | `#353535` | Fondo de botones, header, títulos principales (texto blanco encima) |
| `primary` | `#3c6e71` | Títulos secundarios, labels de sección |
| `surface` | `#ffffff` | Fondo general de la interfaz, inputs, cards |
| `muted` | `#d9d9d9` | Texto sutil, hints, footer, bordes discretos |

```json
["#353535", "#3c6e71", "#ffffff", "#d9d9d9"]
```

### Variables CSS (`src/input.css`)

```css
--color-ink: #353535;
--color-primary: #3c6e71;
--color-surface: #ffffff;
--color-muted: #d9d9d9;
```

### Asignación por rol

| Rol | Fondo | Texto |
|-----|-------|-------|
| Header | `#353535` | `#ffffff` |
| Contenido | `#ffffff` | `#353535` |
| Título secundario (label) | — | `#3c6e71` |
| Texto sutil / footer | — | `#d9d9d9` |
| Botones | `#353535` | `#ffffff` |
| Bordes | — | `#d9d9d9` |

---

## Jerarquía tipográfica

| Nivel | Elemento | Tamaño | Peso | Color | Notas |
|-------|----------|--------|------|-------|-------|
| H1 | Título header | `text-sm` | semibold | `#ffffff` | Una sola línea |
| H2 | Labels de sección | `text-xs` | medium | `#3c6e71` | Títulos secundarios |
| Body | Texto general | `text-sm` | normal | `#353535` | Contenido |
| Subtle | Hints, footer | `text-xs` | normal | `#d9d9d9` | Footer en **cursiva** |
| Mono | Vista previa | `text-xs` | normal | `#353535` | Solo área de preview |

---

## Fuente

- **Interfaz:** `system-ui, -apple-system, Segoe UI, sans-serif`
- **Vista previa / export:** `ui-monospace, Consolas, monospace`

Sin fuentes decorativas. Sin iconos innecesarios en header/footer.

---

## Elementos UI

| Elemento | Estilo |
|----------|--------|
| Header | Fondo `#353535`, `px-4 py-2`, solo título, sin subtítulo |
| Contenido | Fondo `#ffffff`, `px-4 py-3`, `space-y-3` |
| Footer | Fondo `#ffffff`, borde superior `#d9d9d9`, `px-4 py-1.5`, cursiva, `#d9d9d9` |
| Drop-zone | Borde dashed `#d9d9d9`, fondo `#ffffff`, hover borde `#3c6e71` |
| Select / inputs | Fondo `#ffffff`, borde `#d9d9d9`, focus ring `#3c6e71` |
| Botones (todos) | Fondo `#353535`, texto `#ffffff`, `py-2`, `text-xs` |
| Cards de archivo | Fondo `#ffffff`, borde `#d9d9d9` |

---

## Layout

```
┌─────────────────────────┐
│ Regex Extractor         │  ← header mínimo (#353535, 1 línea)
├─────────────────────────┤
│  CONTENIDO              │  ← todo el valor funcional (#ffffff)
│  · documentos           │
│  · librería regex       │
│  · acciones             │
│  · vista previa         │
├─────────────────────────┤
│  estado en cursiva      │  ← footer mínimo (#d9d9d9, cursiva)
└─────────────────────────┘
```

**Regla:** Header → Contenido → Footer. Header y footer **no** contienen controles ni textos explicativos largos.

---

## Espaciado

| Zona | Padding | Gap |
|------|---------|-----|
| Header | `px-4 py-2` | — |
| Contenido | `px-4 py-3` | `space-y-3` |
| Footer | `px-4 py-1.5` | — |
| Botones | `py-2` | `gap-2` |

Evitar `py-4` o más en header/footer.

---

## Estados

| Estado | Tratamiento |
|--------|-------------|
| Disabled | `opacity-40`, `cursor-not-allowed` |
| Hover botón | `opacity-90` |
| Error (footer) | `#353535` cursiva (rompe color sutil solo en error) |
| Drag over | borde `#3c6e71` |

---

## Prohibido

- Subtítulos o descripciones en el header
- Footer con más de una línea de texto
- Colores fuera de la paleta de cuatro
- Emojis en header o footer
- Fondos grises en el área principal (siempre `#ffffff`)
