#!/bin/bash
# Ejecutar test 02 con encoding UTF-8 correcto
cd "$(dirname "$0")"

echo "=========================================="
echo "Ejecutando Caso 02: Registrar Sanción"
echo "=========================================="
echo ""

# Usar Git Bash o bash nativo
export LANG=es_ES.UTF-8
export LC_ALL=es_ES.UTF-8

npm run test:02

echo ""
echo "=========================================="
echo "Test completado"
echo "Verifica los resultados en:"
echo "  - test-results/ (capturas y errores)"
echo "  - playwright-report/ (reporte detallado)"
echo "=========================================="
