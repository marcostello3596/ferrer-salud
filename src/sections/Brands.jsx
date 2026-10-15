import { BRAND_STRIP } from '../data/brands.js';
import { SITE } from '../data/site.js';

export default function Brands() {
  return (
    <section id="marcas" className="scroll-mt-24 bg-white py-14 md:py-20" aria-labelledby="brands-title">
      <div className="mx-auto max-w-page px-gutter">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h2 id="brands-title" className="text-[15px] font-medium text-ink">
            Algunas de las <span className="tabular">{SITE.brandsCount}</span> marcas con las que trabajamos
          </h2>
          <p className="label-tech text-muted">Odontología · Laboratorio · Medicina · Podología · Ortopedia</p>
        </div>
        <ul className="brand-strip mt-8">
          {BRAND_STRIP.map((b) => (
            <li key={b.name} className="brand-cell" data-reveal>
              <span
                role="img"
                aria-label={b.name}
                className="brand-logo"
                style={{ WebkitMaskImage: `url(${b.logo})`, maskImage: `url(${b.logo})`, aspectRatio: `${b.ratio}` }}
              />
            </li>
          ))}
          <li className="brand-cell !p-0">
            <a href="#catalogo" className="brand-more">
              <span className="tabular font-display text-[30px] leading-none">+{SITE.brandsCount - BRAND_STRIP.length}</span>
              <span className="label-tech text-muted">marcas más</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
