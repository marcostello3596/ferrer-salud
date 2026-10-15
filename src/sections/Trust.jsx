import { SITE, whatsappLink } from '../data/site.js';

// Solo información comprobada del negocio.
export default function Trust() {
  const items = [
    {
      code: '355',
      title: 'marcas en catálogo',
      text: 'Marcas internacionales y nacionales, del composite al bastón.',
    },
    {
      code: '141',
      title: 'familias de producto',
      text: 'Odontología, laboratorio dental, medicina, podología y ortopedia en un solo lugar.',
    },
    {
      code: '1:1',
      title: 'atención personalizada',
      text: 'Consultas por WhatsApp, por teléfono o en el mostrador del local.',
      href: whatsappLink('Hola, quiero hacer una consulta.'),
    },
    {
      code: 'MZA',
      title: 'San Lorenzo 260',
      text: 'Ciudad de Mendoza. Lunes a viernes de 9 a 17 h y sábados de 9 a 13 h.',
      href: SITE.mapsUrl,
    },
  ];
  return (
    <section className="trust border-y border-line bg-paper" aria-label="Por qué Ferrer Salud">
      <ul className="mx-auto grid max-w-page grid-cols-1 px-gutter sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => {
          const Tag = it.href ? 'a' : 'div';
          return (
            <li key={it.title} className="trust__item" data-reveal>
              <Tag {...(it.href ? { href: it.href, target: '_blank', rel: 'noopener noreferrer' } : {})} className="block h-full py-8 md:py-10">
                <span className="trust__code tabular">{it.code}</span>
                <span className="mt-3 block text-[17px] font-semibold text-ink">{it.title}</span>
                <span className="mt-2 block max-w-[28ch] text-[14px] leading-relaxed text-muted">{it.text}</span>
              </Tag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
