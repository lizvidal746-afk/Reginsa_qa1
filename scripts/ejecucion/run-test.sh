#!/bin/bash
# Runner genérico de casos
# Uso:
#   ./run-test.sh 01 [workers] [repeat]
cd "$(dirname "$0")"

CASE="${1:-01}"
WORKERS="$2"
REPEAT="$3"

echo "=========================================="
echo "Ejecutando Caso ${CASE}"
echo "=========================================="
echo ""

export LANG=es_ES.UTF-8
export LC_ALL=es_ES.UTF-8

EXTRA=()
if [ -n "$WORKERS" ]; then EXTRA+=("--workers=$WORKERS"); fi
if [ -n "$REPEAT" ]; then EXTRA+=("--repeat-each=$REPEAT"); fi

if [ ${#EXTRA[@]} -eq 0 ]; then
	npm run "test:${CASE}"
else
	npm run "test:${CASE}" -- "${EXTRA[@]}"
fi

echo ""
echo "=========================================="
echo "Test completado"
echo "Verifica los resultados en:"
echo "  - test-results/ (capturas y errores)"
echo "  - playwright-report/ (reporte detallado)"
echo "=========================================="

