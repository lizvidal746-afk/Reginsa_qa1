#!/bin/bash
# Script para ejecutar Test 02 Refactorizado
echo ""
echo "=========================================="
echo "  EJECUTANDO CASO 02 (REFACTORIZADO)"
echo "  REGISTRAR SANCIÓN"
echo "=========================================="
echo ""

cd "$(dirname "$0")"
npm run test:caso-02 -- --headed

echo ""
echo "=========================================="
echo "  TEST COMPLETADO"
echo "=========================================="
