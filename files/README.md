# Archivos de Prueba - Carpeta de Almacenamiento

## 📁 Propósito

Esta carpeta (`./files/`) almacena todos los archivos necesarios para las pruebas automatizadas:
- **PDFs**: Documentos de sanción, resoluciones, etc.
- **Imágenes**: Capturas requeridas por los formularios
- **Archivos adjuntos**: Cualquier documento que deba cargarse durante los tests

## 📄 Archivos Actuales

### GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf
- **Propósito**: Documento de sanción general para pruebas
- **Uso**: Adjunto en formulario de "Registrar Sanción" (Caso 02)
- **Ubicación**: `./files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf`
- **Formato**: PDF (12 KB aprox)

## 🔧 Cómo Usar en Tests

```typescript
// En 02-registrar-sancion.spec.ts o utilidades
const pdfPath = './files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';

// Para cargar archivo en input type="file"
await page.locator('input[type="file"]').setInputFiles(pdfPath);
```

## 📝 Convención de Nombres

Los archivos deben seguir esta estructura:
- `TIPO_DOCUMENTO N° NUMERO-AÑO-INSTITUCION-CODIGO.pdf`
- Ejemplo: `GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf`

## ⚠️ Notas Importantes

- ✅ Los PDFs NO deben estar en `/node_modules`
- ✅ Los PDFs NO deben estar en carpeta `test-files` (solo pruebas futuras)
- ✅ Usar rutas relativas desde raíz del proyecto
- ✅ Incluir en `.gitignore` si contienen datos sensibles

## 🗂️ Estructura Esperada

```
./files/
├── README.md (este archivo)
├── GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf
└── [otros archivos de prueba]
```

## 📋 Referencia Rápida

| Tipo Archivo | Ruta | Caso |
|---|---|---|
| PDF Sanción General | `./files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf` | Caso 02 |
| Otros documentos | `./files/[nombre].[ext]` | Por definir |

