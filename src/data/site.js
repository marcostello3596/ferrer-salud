// Datos del negocio. Todo lo que figura acá está verificado en ferrersalud.org
// o fue provisto por el cliente. Relevamiento: 15/10/2026.

export const SITE = {
  name: 'Ferrer Salud',
  legalName: 'Ferrer Salud Sociedad Anónima',
  address: 'San Lorenzo 260',
  city: 'Ciudad de Mendoza, Argentina',
  mapsUrl: 'https://goo.gl/maps/x6JzvnyWn6wDDtxd7', // enlace usado por el sitio actual
  whatsappDisplay: '+54 9 261 768 0531',
  whatsappNumber: '5492617680531',
  email: 'ventas@ferrersalud.com',
  phones: '0261 429-7755 / 3759 / 5225 / 1989',
  hours: [
    ['Lunes a viernes', '9 a 17 h'],
    ['Sábados', '9 a 13 h'],
  ],
  brandsCount: 355, // "Trabajamos con 355 marcas" — sitio actual
  familiesCount: 141, // familias de producto listadas en el catálogo actual
  pricesNote: 'Los precios incluyen IVA.', // aviso del sitio actual
  imagesNote: 'Las imágenes son ilustrativas.', // aviso del sitio actual
  snapshotDate: '15/10/2026',
};

// URL pública de la maqueta. Se usa para armar los enlaces compartibles de cada ficha.
// Se completa después de la primera publicación.
export const SHARE_BASE = 'https://claude.ai/artifact/T6RhG2MZSXPiek12HBnukm';

export const whatsappLink = (text = '') =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
