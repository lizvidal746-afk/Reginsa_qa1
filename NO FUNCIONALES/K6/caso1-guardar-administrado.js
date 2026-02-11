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

  // 1. Listar entidades (GET)
  const lista = http.get('https://reginsaapiqa.sunedu.gob.pe/api/Entidad/Listar');
  check(lista, { 'listar status 200': (r) => r.status === 200 });

  // 2. Crear administrado (POST)
  const payload = JSON.stringify({
    ruc: admin.ruc,
    razonSocial: admin.razonSocial,
    nombreComercial: admin.nombreComercial,
    idEstado: 1
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://reginsaapiqa.sunedu.gob.pe/api/Entidad/Crear', payload, { headers });
  check(res, { 'crear status 200': (r) => r.status === 200 });
}
