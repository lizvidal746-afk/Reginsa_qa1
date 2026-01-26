const fs = require('fs');
const path = require('path');

const reportJsonPath = path.join(__dirname, 'registros-administrados.json');
const reportHtmlPath = path.join(__dirname, 'reporte-administrados.html');

function generarReporte() {
  let registros = [];

  if (fs.existsSync(reportJsonPath)) {
    const contenido = fs.readFileSync(reportJsonPath, 'utf-8');
    registros = JSON.parse(contenido);
  }

  const filasTablа = registros
    .map(
      (reg, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${reg.ruc}</td>
      <td>${reg.razonSocial}</td>
      <td>${reg.nombreComercial}</td>
      <td>${reg.estado}</td>
      <td>${new Date(reg.timestamp).toLocaleString('es-PE')}</td>
      <td>
        <span class="estado-${reg.estado_registro}">${reg.estado_registro.toUpperCase()}</span>
      </td>
      <td>
        ${
          fs.existsSync(reg.screenshot)
            ? `<a href="${reg.screenshot}" target="_blank" class="btn-screenshot">Antes</a>`
            : '<span class="no-disponible">N/A</span>'
        }
        ${
          reg.screenshot_despues && fs.existsSync(reg.screenshot_despues)
            ? `<a href="${reg.screenshot_despues}" target="_blank" class="btn-screenshot btn-screenshot-despues">Después</a>`
            : ''
        }
      </td>
    </tr>
  `
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Administrados - SUNEDU</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.1em;
      opacity: 0.9;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f8f9fa;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .stat {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10px;
    }
    
    .stat-label {
      color: #666;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .content {
      padding: 30px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    thead {
      background: #667eea;
      color: white;
      font-weight: bold;
    }
    
    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    tbody tr:hover {
      background: #f5f5f5;
      transition: background 0.3s ease;
    }
    
    tbody tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    .estado-exitoso {
      background: #d4edda;
      color: #155724;
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.85em;
    }
    
    .estado-fallido {
      background: #f8d7da;
      color: #721c24;
      padding: 5px 10px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.85em;
    }
    
    .btn-screenshot {
      background: #667eea;
      color: white;
      padding: 8px 15px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 0.85em;
      transition: background 0.3s ease;
      display: inline-block;
      margin-right: 5px;
    }
    
    .btn-screenshot:hover {
      background: #764ba2;
    }
    
    .btn-screenshot-despues {
      background: #28a745;
    }
    
    .btn-screenshot-despues:hover {
      background: #218838;
    }
    
    .no-disponible {
      color: #999;
      font-style: italic;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 0.9em;
      border-top: 2px solid #e0e0e0;
    }
    
    .empty-state {
      text-align: center;
      padding: 50px 20px;
      color: #999;
    }
    
    .empty-state h2 {
      margin-bottom: 10px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Reporte de Administrados</h1>
      <p>SUNEDU - Sistema de Registro de Administrados</p>
    </div>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-number">${registros.length}</div>
        <div class="stat-label">Total Registrados</div>
      </div>
      <div class="stat">
        <div class="stat-number">${registros.filter(r => r.estado_registro === 'exitoso').length}</div>
        <div class="stat-label">Exitosos</div>
      </div>
      <div class="stat">
        <div class="stat-number">${registros.filter(r => r.estado_registro === 'fallido').length}</div>
        <div class="stat-label">Fallidos</div>
      </div>
      <div class="stat">
        <div class="stat-number">${registros.length > 0 ? ((registros.filter(r => r.estado_registro === 'exitoso').length / registros.length) * 100).toFixed(1) : 0}%</div>
        <div class="stat-label">Tasa Éxito</div>
      </div>
    </div>
    
    <div class="content">
      ${
        registros.length > 0
          ? `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>RUC</th>
              <th>Razón Social</th>
              <th>Nombre Comercial</th>
              <th>Estado</th>
              <th>Fecha/Hora</th>
              <th>Estado Registro</th>
              <th>Screenshots</th>
            </tr>
          </thead>
          <tbody>
            ${filasTablа}
          </tbody>
        </table>
      `
          : `
        <div class="empty-state">
          <h2>📭 Sin registros aún</h2>
          <p>Ejecuta los tests para comenzar a registrar administrados.</p>
        </div>
      `
      }
    </div>
    
    <div class="footer">
      <p>📅 Generado: ${new Date().toLocaleString('es-PE')}</p>
      <p>Reporte Auto-actualizable - Refresca la página para ver cambios</p>
    </div>
  </div>
</body>
</html>
  `;

  fs.writeFileSync(reportHtmlPath, html);
  console.log(`✅ Reporte HTML generado: ${reportHtmlPath}`);
}

// Generar reporte cada vez que se ejecute
generarReporte();

// Opcionalmente, regenerar cada 5 segundos si está en modo watch
if (process.argv.includes('--watch')) {
  setInterval(generarReporte, 5000);
  console.log('👀 Modo watch activado - reporte se actualiza cada 5 segundos');
}
