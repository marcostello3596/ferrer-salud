const ars = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// "$ 17.200" con espacio duro, como se lee en Argentina.
export const money = (n) => ars.format(Math.round(n)).replace(/\s/, ' ');

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Normaliza para buscar: minúsculas, sin tildes ni diéresis, sin signos.
export const normalize = (s = '') =>
  s
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
