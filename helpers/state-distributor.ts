export type EstadoCodigo = 2 | 3 | 4;

export function getEstadoByRepeatIndex(repeatIndex: number): EstadoCodigo {
  if (repeatIndex <= 5) return 2; // Licenciada
  if (repeatIndex <= 7) return 4; // Ley de Creación
  return 3; // Licencia Denegada
}

export function getEstadoLabel(estado: EstadoCodigo): string {
  switch (estado) {
    case 2:
      return 'Licenciada';
    case 4:
      return 'Ley de Creación';
    case 3:
    default:
      return 'Licencia denegada';
  }
}
