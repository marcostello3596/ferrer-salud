import { normalize } from './format.js';
import { PRODUCTS } from '../data/products.js';
import { BRANDS } from '../data/brands.js';
import { specialtyBySlug } from '../data/categories.js';

// Sinónimos frecuentes en mostrador → término del catálogo.
const SYNONYMS = {
  fonendoscopio: 'estetoscopio',
  presion: 'tensiometro',
  resinas: 'resina',
  composites: 'composite',
  lampara: 'lampara',
  guante: 'guantes',
  gasas: 'gasa',
  unas: 'unas',
  yesos: 'yeso',
  rodilla: 'rodillera',
};

// Plural → singular simple (gasas → gasa, alicates → alicate). Conserva palabras cortas.
const stem = (t) => {
  if (SYNONYMS[t]) return SYNONYMS[t];
  if (t.length > 4 && t.endsWith('es') && !t.endsWith('ces')) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith('s')) return t.slice(0, -1);
  return t;
};

const fields = (p) => {
  const sp = specialtyBySlug[p.specialty];
  return {
    name: normalize(`${p.title} ${p.name}`),
    brand: normalize(BRANDS[p.brand]?.name || ''),
    meta: normalize([p.family, sp?.name, p.presentation, p.id, ...(p.keywords || [])].join(' ')),
  };
};

const INDEX = PRODUCTS.map((p) => ({ p, f: fields(p) }));

// Devuelve productos que contienen todos los términos, ordenados por pertinencia.
export function searchProducts(query) {
  const q = normalize(query);
  if (!q) return PRODUCTS.slice();
  const terms = q.split(' ').filter(Boolean).map(stem);
  const scored = [];
  for (const { p, f } of INDEX) {
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const inName = f.name.includes(t);
      const inBrand = f.brand.includes(t);
      const inMeta = f.meta.includes(t);
      if (!inName && !inBrand && !inMeta) {
        ok = false;
        break;
      }
      if (inName) score += f.name.split(' ').some((w) => w.startsWith(t)) ? 6 : 4;
      if (inBrand) score += 3;
      if (inMeta) score += 1;
    }
    if (ok) scored.push({ p, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.p);
}

export const SEARCH_SUGGESTIONS = ['Guantes de nitrilo', 'Composite', 'Alginato', 'Tensiómetro', 'Fotocurado', 'Rodillera'];
