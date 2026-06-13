# Architecture

Estructura del proyecto **PDF Regex Extractor** — extensión Chrome MV3.

## Árbol de carpetas

```
regex_extension/
├── manifest.json          # Configuración MV3 de la extensión
├── popup.html             # Interfaz principal del popup
├── package.json           # Dependencias y scripts de build
├── tailwind.config.js     # Tokens de color y contenido Tailwind
│
├── docs/                  # Documentación del proyecto
│   ├── Architecture.md    # Este archivo
│   ├── Design-System.md   # Colores, tipografía y convenciones UI
│   └── Rules.md           # Reglas para crear regex y librerías JS
│
├── lib-regex/             # Librerías regex por tipo de documento
│   ├── sctr_sanitas_protecta_crecer_proforma.js
│   ├── sctr_sanitas_protecta_crecer_factura.js
│   ├── sctr_positiva.js
│   ├── vl_positiva.js
│   ├── vl_protecta_factura.js
│   └── vl_crecer_factura.js
│
├── js/
│   ├── app.js             # Orquestador: UI, eventos, flujo principal
│   ├── regex-libraries.js # Registro central + funciones de extracción
│   ├── pdf-handler.js     # Lectura de PDFs con PDF.js
│   └── export.js          # Descarga de archivos .txt
│
├── lib/                   # PDF.js (generado por npm run build:pdf)
│   ├── pdf.min.mjs
│   └── pdf.worker.min.mjs
│
├── css/
│   └── styles.css         # Tailwind compilado (generado)
│
├── src/
│   └── input.css          # Entrada Tailwind + variables CSS del design system
│
└── scripts/
    └── copy-pdfjs.js      # Copia PDF.js desde node_modules a lib/
```

## Archivos importantes

| Archivo | Resumen |
|---------|---------|
| `manifest.json` | Define popup, CSP y recursos accesibles del worker PDF.js. |
| `popup.html` | Layout **Header → Contenido → Footer** con zona drag-drop, select de librería y botones de exportación. |
| `js/app.js` | Conecta la UI con extracción PDF, regex y exportación. |
| `js/regex-libraries.js` | Importa todas las librerías de `lib-regex/` y expone `apply_regex_library`. |
| `js/pdf-handler.js` | Extrae texto página a página usando PDF.js. |
| `lib-regex/*.js` | Una librería por documento; cada archivo exporta `library` con sus patrones. |
| `docs/Rules.md` | Contrato obligatorio para crear nuevas librerías regex. |
| `docs/Design-System.md` | Paleta, jerarquía visual y convenciones de layout. |

## Flujo de datos

```
PDF(s) → pdf-handler.js → texto plano
                              ↓
                    regex-libraries.js
                    (lib-regex seleccionada)
                              ↓
              coincidencias agrupadas por campo
                              ↓
                    export.js → archivo .txt
```

## Build

```bash
npm install          # Instala deps + compila CSS y copia PDF.js
npm run build:css    # Regenera css/styles.css
npm run build:pdf    # Regenera lib/pdf.min.mjs
```
