import { SPECIALTIES } from '../data/categories.js';
import { catalogHref } from '../lib/router.js';
import { SectionHead } from '../components/ui.jsx';
import { IconArrow } from '../components/Icons.jsx';

// Composición editorial: Odontología como pieza mayor, el resto en escalas controladas.
const LAYOUT = {
  odontologia: 'tile--xl',
  medicina: 'tile--md tile--ink',
  'laboratorio-dental': 'tile--md',
  podologia: 'tile--sm',
  ortopedia: 'tile--wide',
};

export default function Specialties() {
  return (
    <section id="especialidades" className="scroll-mt-24 py-16 md:py-24" aria-labelledby="esp-title">
      <div className="mx-auto max-w-page px-gutter">
        <SectionHead
          id="esp-title"
          eyebrow="Especialidades"
          title={<>Cinco áreas, un mismo <em>mostrador</em>.</>}
          action={
            <a href="#catalogo" className="link-arrow self-start md:self-auto">
              Ver todo el catálogo <IconArrow size={18} />
            </a>
          }
        >
          Elegí tu especialidad para ver productos, marcas y familias de insumos.
        </SectionHead>

        <div className="tiles mt-10 md:mt-14">
          {SPECIALTIES.map((s) => {
            return (
              <a key={s.slug} href={catalogHref(s.slug)} className={`tile ${LAYOUT[s.slug]}`} data-reveal>
                <span className="tile__top">
                  <span className="tile__code label-tech">{s.code}</span>
                </span>
                <span className="tile__media" aria-hidden="true">
                  {s.slug === 'odontologia' && <span className="tile__disc" />}
                  {s.images.map((src, i) => (
                    <img key={src} src={src} alt="" loading="lazy" decoding="async" className={`tile__img tile__img--${s.slug}-${i}`} />
                  ))}
                </span>
                <span className="tile__body">
                  <span className="tile__name">{s.name}</span>
                  <span className="tile__lead">{s.lead}</span>
                  <span className="tile__families">{s.families.slice(0, s.slug === 'odontologia' ? 6 : 3).join(' · ')}</span>
                  <span className="tile__go">
                    Explorar <IconArrow size={18} />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
