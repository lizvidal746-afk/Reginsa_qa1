#!/bin/bash
# Validar sintaxis del archivo TypeScript

cd "D:\SUNEDU\SELENIUM\playwrigth"

echo "Validando 04-reconsiderar-con-sanciones.spec.ts..."
npx tsc --noEmit --esModuleInterop --skipLibCheck tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts 2>&1 | head -20

echo ""
echo "Si hay errores arriba, las prÃ³ximas lÃ­neas los mostrarÃ¡n:"
npx tsc --version


