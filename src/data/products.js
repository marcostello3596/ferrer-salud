// Catálogo de la maqueta: 12 productos.
//
// Procedencia de cada dato (campo `provenance`):
//  - 'catalogo'  → tomado de ferrersalud.org el 15/10/2026 (nombre, marca, presentación,
//                  código, familia, precio con IVA, fotos y textos descriptivos).
//  - 'banner'    → precio de oferta tomado del listado "Ofertas Octubre 2026" del sitio.
//  - 'derivado'  → calculado a partir de datos reales (p. ej. disponibilidad según stock
//                  relevado: 7 unidades o menos = "Últimas unidades").
//  - 'muestra'   → contenido redactado para la maqueta. Debe reemplazarse o validarse.
//
// Precios: valores de referencia, redondeados al peso. Se reemplazan por la lista vigente.
// Especificaciones: solo datos que el propio catálogo publica; sin certificaciones ni
// indicaciones médicas.

const img = (file, w, h, alt, kind = 'cutout') => ({ src: `assets/p/${file}.webp`, w, h, alt, kind });

export const PRODUCTS = [
  {
    id: '25720',
    slug: 'tph-spectrum-composite-microhibrido',
    name: 'TPH Spectrum',
    title: 'Composite microhíbrido TPH Spectrum',
    brand: 'dentsply-sirona',
    specialty: 'odontologia',
    family: 'Composites & resinas',
    presentation: 'Jeringa 4 g',
    price: 17200,
    offer: { price: 14900, label: 'Oferta de octubre', provenance: 'banner' },
    availability: 'in_stock',
    images: [
      img('25720_5661', 578, 504, 'Jeringa de composite TPH Spectrum'),
      img('25720_7938', 400, 592, 'Jeringa TPH Spectrum junto a su envase'),
      img('25720_3653', 266, 636, 'Envase individual de TPH Spectrum'),
    ],
    description: 'Resina compuesta microhíbrida universal, con fluorescencia natural.',
    specs: [
      ['Tipo', 'Microhíbrido universal'],
      ['Presentación', 'Jeringa de 4 g'],
    ],
    keywords: ['resina', 'composite', 'restauracion', 'microhibrido', 'dentsply'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'TPH SPECTRUM COMPOSITE MICROHIBRIDO DENTSPLY',
  },
  {
    id: '24326',
    slug: 'spectra-smart-composite-nanohibrido',
    name: 'Spectra Smart',
    title: 'Composite nanohíbrido Spectra Smart',
    brand: 'dentsply-sirona',
    specialty: 'odontologia',
    family: 'Composites & resinas',
    presentation: 'Jeringa 4 g',
    price: 23400,
    offer: { price: 19900, label: 'Oferta de octubre', provenance: 'banner' },
    availability: 'in_stock',
    images: [
      img('24326_5799', 560, 330, 'Jeringa de composite Spectra Smart'),
      img('24326_7939', 521, 586, 'Envase y jeringa de Spectra Smart'),
    ],
    description:
      'Material restaurador nanohíbrido universal. Textura suave que no se pega a la espátula y amplia gama de colores de cuerpo, opacos y translúcidos.',
    specs: [
      ['Tipo', 'Nanohíbrido universal'],
      ['Presentación', 'Jeringa de 4 g'],
      ['Gama del fabricante', '15 colores: 3 opacos (A2O, A3O, DW), 10 de cuerpo (A1, A2, A3, A3.5, A4, B1, B2, C2, BW, XL) y 2 esmaltes (YE, CE)'],
    ],
    keywords: ['resina', 'composite', 'restauracion', 'nanohibrido', 'dentsply'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'SPECTRA SMART x4 Gr NANOHIBRIDO UNIVERSAL',
  },
  {
    id: '26798',
    slug: 'lampara-fotocurado-woodpecker-led-d',
    name: 'Lámpara LED D',
    title: 'Lámpara de fotocurado Woodpecker LED D',
    brand: 'woodpecker',
    specialty: 'odontologia',
    family: 'Lámparas de fotocurado',
    presentation: 'Unidad',
    price: 125000,
    availability: 'low',
    images: [
      img('26798_7706', 575, 516, 'Lámpara de fotocurado Woodpecker LED D, vista lateral'),
      img('26798_7705', 576, 480, 'Lámpara LED D apoyada en su base'),
      img('26798_7707', 574, 508, 'Perfil de la lámpara LED D'),
      img('26798_7708', 576, 538, 'Lámpara LED D con su caja y accesorios'),
    ],
    description:
      'Lámpara liviana y de fácil manejo, con batería recargable que se reemplaza con facilidad. Se puede usar sin cable o conectada a la red.',
    specs: [
      ['Intensidad', '1700 mW/cm²'],
      ['Longitud de onda', '385–515 nm'],
      ['Autonomía', 'Unas 400 exposiciones de 10 s por carga'],
      ['Alimentación', 'Batería recargable o conexión a la red'],
      ['Fibra óptica', 'Esterilizable en autoclave hasta 135 °C'],
    ],
    keywords: ['lampara', 'fotocurado', 'led', 'luz', 'polimerizar'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'LAMPARA WOODPECKER LED D 1700mW/cm2',
  },
  {
    id: '25598',
    slug: 'alginato-cavex-color-change-fast-set',
    name: 'Cavex Color Change',
    title: 'Alginato Cavex Color Change Fast Set',
    brand: 'cavex',
    specialty: 'odontologia',
    family: 'Alginatos',
    presentation: 'Bolsa 500 g',
    price: 26500,
    availability: 'in_stock',
    images: [img('25598_6282', 392, 623, 'Bolsa de alginato Cavex Color Change Fast Set')],
    description:
      'Alginato de fraguado rápido con sistema de cambio de color. Muy elástico y resistente a la rotura.',
    specs: [
      ['Fraguado', 'Rápido (Fast Set)'],
      ['Indicador', 'Cambio de color por fases'],
      ['Reproducción de detalle', '25 µm'],
      ['Estabilidad dimensional', 'Al menos 9 días'],
      ['Presentación', 'Bolsa de 500 g'],
    ],
    keywords: ['alginato', 'impresion', 'cromatico', 'cubeta'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'ALGINATO CAVEX COLOR CHANGE FAST SET',
  },
  {
    id: '21028',
    slug: 'yeso-whip-mix-prima-rock-tipo-v',
    name: 'Prima-Rock tipo V',
    title: 'Yeso Whip Mix Prima-Rock tipo V',
    brand: 'whip-mix',
    specialty: 'laboratorio-dental',
    family: 'Yesos',
    presentation: 'Bolsa 1 kg',
    price: 13100,
    availability: 'in_stock',
    images: [img('21028_4656', 629, 530, 'Bolsa de yeso Prima-Rock junto a un modelo de arcada')],
    description:
      'Yeso para troqueles con la mayor resistencia a la compresión de la línea Whip Mix. Muy buena resistencia a la abrasión y a la manipulación. Color amarillo.',
    specs: [
      ['Tipo', 'V — extraduro'],
      ['Proporción', '20 ml de agua cada 100 g'],
      ['Tiempo de trabajo', '6 a 8 minutos'],
      ['Fraguado', '12 minutos'],
      ['Expansión', '0,13 %'],
    ],
    keywords: ['yeso', 'troquel', 'modelo', 'extraduro', 'laboratorio'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'YESO WHIP MIX PRIMA ROCK TIPO:V',
  },
  {
    id: '24975',
    slug: 'termoformadora-jintai',
    name: 'Termoformadora',
    title: 'Termoformadora Jintai',
    brand: 'jintai',
    specialty: 'laboratorio-dental',
    family: 'Termoformadoras',
    presentation: 'Unidad',
    price: 342600,
    offer: {
      price: 320000,
      label: 'Oferta de octubre',
      gift: 'De regalo: 2 paquetes de placas .080',
      provenance: 'banner',
    },
    availability: 'low',
    images: [
      img('24975_1668', 509, 580, 'Termoformadora Jintai, vista frontal'),
      img('24975_1667', 461, 607, 'Termoformadora Jintai con cable de alimentación'),
      img('24975_3876', 600, 600, 'Cámara de la termoformadora con esferas Easy-Ball', 'photo'),
    ],
    description:
      'Diseño compacto con bomba de vacío de alto rendimiento y accionamiento automático del vacío. Dos modos de trabajo: estándar y con esferas Easy-Ball, que facilitan cortar la placa a la altura deseada.',
    specs: [
      ['Bomba de vacío', '1000 W'],
      ['Dimensiones', '25 × 21 × 30 cm'],
      ['Peso', '6 kg'],
      ['Modos', 'Estándar y Easy-Ball'],
    ],
    keywords: ['termoformadora', 'placas', 'vacio', 'laboratorio', 'equipo'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'TERMOFORMADORA JINTAI',
  },
  {
    id: '26260',
    slug: 'guantes-examen-nitrilo-trux',
    name: 'Guantes de nitrilo',
    title: 'Guantes de examen de nitrilo Trux',
    brand: 'trux',
    specialty: 'medicina',
    family: 'Guantes',
    presentation: 'Caja x100',
    price: 9800,
    availability: 'in_stock',
    images: [
      img('26260_5557', 625, 398, 'Caja de guantes de nitrilo Trux por 100 unidades'),
      img('26260_5565', 577, 564, 'Guante de examen de nitrilo color azul'),
    ],
    description:
      'Guantes de examen descartables de nitrilo, en caja de 100 unidades. Consultá los talles disponibles al confirmar el pedido.',
    specs: [
      ['Material', 'Nitrilo'],
      ['Contenido', '100 unidades'],
    ],
    keywords: ['guante', 'guantes', 'nitrilo', 'examen', 'descartable', 'proteccion'],
    provenance: { core: 'catalogo', description: 'muestra', availability: 'derivado' },
    catalogName: 'GUANTES EXAMEN NITRILO TRUX',
  },
  {
    id: '17368',
    slug: 'gasa-esteril-printex-10x10',
    name: 'Gasa estéril 10 × 10',
    title: 'Gasa estéril Printex 10 × 10 cm',
    brand: 'printex',
    specialty: 'medicina',
    family: 'Gasas',
    presentation: 'Caja, 10 sobres × 16',
    price: 4600,
    availability: 'in_stock',
    images: [img('17368_6236', 553, 618, 'Caja de gasa estéril Printex de 10 por 10 centímetros')],
    description: 'Gasa hidrófila esterilizada con vapor, presentada en sobres individuales.',
    specs: [
      ['Medida', '10 × 10 cm'],
      ['Contenido', '160 trozos en 10 sobres'],
    ],
    keywords: ['gasa', 'gasas', 'esteril', 'curacion', 'hidrofila', 'aposito'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'GASA PRINTEX 10x10 160 Trozos Esteriles 10 sobres',
  },
  {
    id: '26327',
    slug: 'tensiometro-omron-hem-7142',
    name: 'Tensiómetro HEM-7142',
    title: 'Tensiómetro digital de brazo Omron HEM-7142',
    brand: 'omron',
    specialty: 'medicina',
    family: 'Tensiómetros & estetoscopios',
    presentation: 'Unidad',
    price: 104900,
    availability: 'in_stock',
    images: [
      img('26327_5731', 576, 465, 'Tensiómetro digital Omron HEM-7142 con su brazalete'),
      img('26327_5729', 604, 516, 'Tensiómetro Omron junto a su caja'),
      img('26327_5730', 465, 566, 'Caja del tensiómetro Omron HEM-7142'),
    ],
    description:
      'Tensiómetro digital automático de brazo. Indica latidos irregulares, avisa cuando el movimiento afecta la medición y guía la colocación del brazalete.',
    specs: [
      ['Medición', 'Automática, de brazo'],
      ['Memoria', '14 mediciones'],
      ['Brazalete', 'Universal, 22 a 42 cm'],
      ['Estuche', 'No incluido'],
    ],
    keywords: ['tensiometro', 'presion', 'arterial', 'digital', 'brazo', 'omron'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'TENSIOMETRO OMRON HEM-7142 BRAZO',
  },
  {
    id: '23459',
    slug: 'estetoscopio-littmann-classic-iii',
    name: 'Littmann Classic III',
    title: 'Estetoscopio 3M Littmann Classic III',
    brand: '3m',
    specialty: 'medicina',
    family: 'Tensiómetros & estetoscopios',
    presentation: 'Unidad',
    price: 392000,
    availability: 'in_stock',
    // Colores con foto en el catálogo actual. Disponibilidad por color: a confirmar.
    variants: {
      label: 'Color',
      note: 'Disponibilidad por color a confirmar con un asesor.',
      options: [
        { value: 'Azul marino', swatch: '#21346B', image: 0 },
        { value: 'Limón', swatch: '#DDE070', image: 1 },
        { value: 'Gris', swatch: '#797C7F', image: 2 },
        { value: 'Negro', swatch: '#262726', image: 3 },
        { value: 'Rosa', swatch: '#E98EA0', image: 4 },
        { value: 'Borgoña', swatch: '#86322A', image: 5 },
        { value: 'Azul cielo', swatch: '#718CB6', image: 6 },
        { value: 'Esmeralda', swatch: '#019984', image: 7 },
        { value: 'Turquesa', swatch: '#01C7E6', image: 8 },
      ],
    },
    images: [
      img('23459_659', 316, 617, 'Estetoscopio Littmann Classic III color azul marino'),
      img('23459_661', 296, 580, 'Estetoscopio Littmann Classic III color limón'),
      img('23459_2846', 317, 622, 'Estetoscopio Littmann Classic III color gris'),
      img('23459_655', 395, 546, 'Estetoscopio Littmann Classic III color negro'),
      img('23459_656', 320, 626, 'Estetoscopio Littmann Classic III color rosa'),
      img('23459_657', 316, 617, 'Estetoscopio Littmann Classic III color borgoña'),
      img('23459_658', 320, 627, 'Estetoscopio Littmann Classic III color azul cielo'),
      img('23459_662', 296, 580, 'Estetoscopio Littmann Classic III color esmeralda'),
      img('23459_663', 297, 580, 'Estetoscopio Littmann Classic III color turquesa'),
    ],
    description:
      'Estetoscopio de alta sensibilidad acústica para valoraciones generales. Membranas de doble frecuencia del lado adulto y del pediátrico; el lado pediátrico se convierte en campana tradicional al reemplazar la membrana por un aro antifrío.',
    specs: [
      ['Longitud', '69 cm'],
      ['Peso', '150 g'],
      ['Membranas', 'Doble frecuencia, adulto y pediátrica'],
    ],
    keywords: ['estetoscopio', 'fonendoscopio', 'littmann', 'auscultacion', '3m'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado', variants: 'catalogo' },
    catalogName: 'ESTET.LITTMANN CLASSIC III CLASICO',
  },
  {
    id: '18897',
    slug: 'alicate-unas-encarnadas-germania-1603',
    name: 'Alicate uñas encarnadas',
    title: 'Alicate para uñas encarnadas Germania 1603',
    brand: 'germania',
    specialty: 'podologia',
    family: 'Alicates',
    presentation: 'Unidad',
    price: 23200,
    availability: 'in_stock',
    images: [img('18897_7170', 610, 248, 'Alicate Germania para uñas encarnadas, modelo chico')],
    description:
      'Alicate de punta fina para el corte de uñas encarnadas. Modelo chico, referencia 1603.',
    specs: [
      ['Modelo', 'Chico, ref. 1603'],
      ['Uso', 'Uñas encarnadas'],
    ],
    keywords: ['alicate', 'uñas', 'unas', 'encarnadas', 'podologia', 'instrumental', 'corta'],
    provenance: { core: 'catalogo', description: 'muestra', availability: 'derivado' },
    catalogName: 'ALICATE CORTA UÑAS GERMANIA ENCARNADAS CHIC1603',
  },
  {
    id: '17656',
    slug: 'rodillera-sosten-rotuliano-body-care-bc1103',
    name: 'Rodillera BC1103',
    title: 'Rodillera con sostén rotuliano Body Care BC1103',
    brand: 'bodycare',
    specialty: 'ortopedia',
    family: 'Línea Body Care',
    presentation: 'Unidad',
    price: 32700,
    availability: 'in_stock',
    images: [
      img('17656_4381', 334, 521, 'Rodillera Body Care BC1103 color azul, vista lateral'),
      img('17656_4380', 317, 516, 'Rodillera Body Care BC1103, vista frontal'),
    ],
    description:
      'Soporte de rodilla con centrado rotuliano. Sujeción superior e inferior con cinta de velcro.',
    specs: [
      ['Ajuste', 'Velcro superior e inferior'],
      ['Línea', 'Body Care'],
    ],
    keywords: ['rodillera', 'rodilla', 'ortesis', 'soporte', 'rotula', 'ortopedia'],
    provenance: { core: 'catalogo', description: 'catalogo', availability: 'derivado' },
    catalogName: 'BC1103 RODILLERA SOSTEN ROTULIANO AJUSTE VELCRO',
  },
];

export const productBySlug = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

// Selección de la portada (8) y ofertas (con precio de oferta del banner).
export const HOME_SELECTION = ['26798', '26260', '25598', '26327', '21028', '23459', '18897', '17656'];
export const OFFERS = PRODUCTS.filter((p) => p.offer);

export const unitPrice = (p) => (p.offer ? p.offer.price : p.price);
