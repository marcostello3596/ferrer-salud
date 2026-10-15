// Especialidades de la portada. La agrupación por especialidad es una propuesta de
// navegación; los nombres de familia son los que usa hoy el catálogo de ferrersalud.org.

export const SPECIALTIES = [
  {
    slug: 'odontologia',
    code: 'ODO',
    name: 'Odontología',
    short: 'Odontología',
    lead: 'Restauración, impresión, fotocurado e instrumental para el consultorio.',
    families: ['Composites & resinas', 'Alginatos', 'Lámparas de fotocurado', 'Endodoncia', 'Turbinas & micromotores', 'Fresas'],
    images: ['assets/p/25598_6282.webp', 'assets/p/25720_5661.webp'],
  },
  {
    slug: 'laboratorio-dental',
    code: 'LAB',
    name: 'Laboratorio dental',
    short: 'Laboratorio',
    lead: 'Yesos, acrílicos y equipos para el trabajo de taller.',
    families: ['Yesos', 'Acrílicos', 'Termoformadoras', 'Revestimientos', 'Ceras'],
    images: ['assets/p/24975_1668.webp'],
  },
  {
    slug: 'medicina',
    code: 'MED',
    name: 'Medicina',
    short: 'Medicina',
    lead: 'Descartables, diagnóstico y protección para la práctica diaria.',
    families: ['Guantes', 'Gasas', 'Tensiómetros & estetoscopios', 'Jeringas & agujas', 'Barbijos & tapabocas'],
    images: ['assets/p/23459_661.webp'],
  },
  {
    slug: 'podologia',
    code: 'POD',
    name: 'Podología',
    short: 'Podología',
    lead: 'Alicates, instrumental y línea de protección para el pie.',
    families: ['Alicates', 'Instrumental', 'Línea Masterpie', 'Plantillas'],
    images: ['assets/p/18897_7170.webp'],
  },
  {
    slug: 'ortopedia',
    code: 'ORT',
    name: 'Ortopedia',
    short: 'Ortopedia',
    lead: 'Rodilleras, bastones y ayudas para la movilidad.',
    families: ['Línea Body Care', 'Bastones', 'Sillas de ruedas', 'Medias', 'Camillas & camas'],
    images: ['assets/p/17656_4381.webp'],
  },
];

export const specialtyBySlug = Object.fromEntries(SPECIALTIES.map((s) => [s.slug, s]));
