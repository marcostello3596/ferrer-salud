import { OFFERS } from '../data/products.js';
import { BRANDS } from '../data/brands.js';
import { specialtyBySlug } from '../data/categories.js';
import { money } from '../lib/format.js';
import { productHref } from '../lib/router.js';
import { AddButton, Availability, Img } from '../components/ui.jsx';
import { IconArrow } from '../components/Icons.jsx';

export default function Offers() {
  return (
    <section id="ofertas" className="offers scroll-mt-24 bg-ink py-16 text-white md:py-24" aria-labelledby="of-title">
      <div className="mx-auto max-w-page px-gutter">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="label-tech mb-4 text-white/60">Ofertas · Octubre 2026</p>
            <h2 id="of-title" className="display-2 text-white">
              Ofertas del <em>mes</em>.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">Cada producto con su precio de oferta y el precio de lista al lado, para comparar de un vistazo.</p>
          </div>
          <a href="#catalogo-ofertas" className="link-arrow link-arrow--light self-start md:self-auto">
            Ver ofertas en el catálogo <IconArrow size={18} />
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-3">
          {OFFERS.map((p, i) => {
            const save = p.price - p.offer.price;
            return (
              <article key={p.id} className="offer-card" data-reveal style={{ '--i': i }}>
                <a href={productHref(p)} className="offer-card__stage" aria-label={p.title}>
                  <span className="tag-offer">−{Math.round((save / p.price) * 100)}%</span>
                  <Img src={p.images[0].src} alt={p.images[0].alt} w={p.images[0].w} h={p.images[0].h} className="h-full w-full" imgClassName="h-full w-full object-contain" />
                </a>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="label-tech text-muted">
                    {specialtyBySlug[p.specialty].code} · {BRANDS[p.brand]?.name}
                  </p>
                  <h3 className="mt-2 text-[18px] font-medium leading-snug text-ink">
                    <a href={productHref(p)} className="card-link">{p.title}</a>
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">{p.presentation}</p>
                  {p.offer.gift && <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-lime-soft px-3 py-1 text-[13px] font-medium text-ink">{p.offer.gift}</p>}
                  <div className="mt-auto pt-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="tabular text-[13px] text-muted">
                          Lista <span className="line-through">{money(p.price)}</span>
                        </p>
                        <p className="tabular text-[30px] font-semibold leading-none text-ink">{money(p.offer.price)}</p>
                        <p className="tabular mt-1.5 text-[13px] font-medium text-[#3F7D2C]">Ahorrás {money(save)}</p>
                      </div>
                      <Availability value={p.availability} compact />
                    </div>
                    <AddButton product={p} full className="mt-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
