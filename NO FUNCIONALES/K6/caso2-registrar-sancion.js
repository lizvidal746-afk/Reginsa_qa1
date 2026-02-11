import http from 'k6/http';
import { check } from 'k6';
import administrados from './administrados.json';

export let options = {
  vus: 50, // usuarios virtuales
  duration: '3m',
};

export default function () {
  // Selecciona administrado aleatorio
  const admin = administrados[Math.floor(Math.random() * administrados.length)];
  // Simula registrar sanción
  const payload = JSON.stringify({
    razonSocial: admin.razonSocial,
    ruc: admin.ruc,
    nombreComercial: admin.nombreComercial,
    // ...otros campos requeridos para sanción
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://api.tuservidor.com/registrar-sancion', payload, { headers });
  check(res, { 'status is 200': (r) => r.status === 200 });
}
