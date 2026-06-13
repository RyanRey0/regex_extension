# PDF Regex Extractor

Extensión de Chrome para extraer texto de PDFs y aplicar patrones regex por categoría de documento.

## Instalación

1. Instalar dependencias y compilar assets:

```bash
npm install
```

2. Abrir Chrome → `chrome://extensions/`
3. Activar **Modo de desarrollador**
4. Clic en **Cargar descomprimida**
5. Seleccionar la carpeta `regex_extension`

## Uso

1. Clic en el icono de la extensión (Chrome muestra un icono genérico por defecto)
2. Arrastra o selecciona uno o varios PDFs
3. Elige la **librería Regex** según el tipo de documento
4. Clic en **Extraer texto**
5. Exporta:
   - **Exportar todo** → archivo `.txt` con todo el texto
   - **Exportar regex** → archivo `.txt` solo con coincidencias regex

## Librerías Regex incluidas

| Categoría       | Uso                                      |
|-----------------|------------------------------------------|
| Genérico        | Emails, teléfonos, fechas, montos        |
| Facturas        | Número, RFC, subtotal, IVA, total        |
| Contratos       | Partes, vigencia, montos, cláusulas      |
| Currículum / CV | Nombre, LinkedIn, experiencia, skills    |
| Identificación  | Documento, nombre, nacimiento            |

## Desarrollo

Recompilar CSS tras cambios en HTML/JS:

```bash
npm run build:css
```

Recompilar PDF.js tras actualizar dependencia:

```bash
npm run build:pdf
```

## Estructura

```
regex_extension/
├── manifest.json
├── popup.html
├── css/styles.css      ← Tailwind compilado
├── js/
│   ├── app.js
│   ├── pdf-handler.js
│   ├── regex-libraries.js
│   └── export.js
├── lib/                ← PDF.js (generado)
└── src/input.css       ← fuente Tailwind
```
