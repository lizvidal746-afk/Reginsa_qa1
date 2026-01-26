#!/bin/bash
# Script para generar y visualizar reportes de Playwright y Allure

echo "================================"
echo "📊 GENERANDO REPORTES"
echo "================================"

# 1. Ejecutar test
echo ""
echo "1️⃣ Ejecutando test..."
npm run test:02

echo ""
echo "2️⃣ Reportes generados:"
echo "   ✓ playwright-report/ (HTML)"
echo "   ✓ allure-results/ (JSON)"

echo ""
echo "================================"
echo "📈 ABRIENDO REPORTES"
echo "================================"

# 2. Abrir Playwright Report
echo ""
echo "3️⃣ Abriendo Playwright Report..."
npx playwright show-report &

# 3. Verificar si allure-commandline está instalado
if command -v allure &> /dev/null; then
    echo ""
    echo "4️⃣ Abriendo Allure Report..."
    allure serve allure-results &
else
    echo ""
    echo "⚠️  Allure CLI no está instalado."
    echo "   Instalar con: npm install -g allure-commandline"
fi

echo ""
echo "✅ Reportes abiertos. Presiona Ctrl+C para salir."
wait
