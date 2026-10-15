import { useEffect, useState } from 'react';
import { productBySlug } from '../data/products.js';
import { specialtyBySlug } from '../data/categories.js';

// Rutas por hash con tokens simples (el visor solo conserva letras, números, . _ ~ -):
//   #inicio · #catalogo · #catalogo-<especialidad> · #catalogo-ofertas · #p-<producto>
//   y anclas de portada: #especialidades #seleccion #ofertas #marcas #asesoramiento
export const SECTION_IDS = ['especialidades', 'seleccion', 'ofertas', 'marcas', 'asesoramiento', 'contacto'];

export function parseHash(hash) {
  const h = (hash || '').replace(/^#/, '');
  if (!h || h === 'inicio') return { name: 'home' };
  if (h.startsWith('p-')) {
    const slug = h.slice(2);
    return productBySlug[slug] ? { name: 'product', slug } : { name: 'notfound', token: h };
  }
  if (h === 'catalogo') return { name: 'catalog' };
  if (h === 'catalogo-ofertas') return { name: 'catalog', offers: true };
  if (h.startsWith('catalogo-')) {
    const slug = h.slice(9);
    return specialtyBySlug[slug] ? { name: 'catalog', specialty: slug } : { name: 'catalog' };
  }
  if (SECTION_IDS.includes(h)) return { name: 'home', section: h };
  return { name: 'notfound', token: h };
}

export const getHash = () => (typeof window === 'undefined' ? '' : window.location.hash);

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(getHash()));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(getHash()));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function go(token) {
  const next = token ? `#${token}` : '#inicio';
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = next;
  }
}

export const productHref = (p) => `#p-${p.slug}`;
export const catalogHref = (specialty) => (specialty ? `#catalogo-${specialty}` : '#catalogo');
