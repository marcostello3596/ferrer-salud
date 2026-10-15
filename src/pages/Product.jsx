import { useEffect, useRef, useState } from 'react';
import { PRODUCTS, productBySlug, unitPrice } from '../data/products.js';
import { BRANDS } from '../data/brands.js';
import { specialtyBySlug } from '../data/categories.js';
import { SHARE_BASE, SITE, whatsappLink } from '../data/site.js';
import { money } from '../lib/format.js';
import { catalogHref, go } from '../lib/router.js';
import { useStore } from '../lib/store.jsx';
import { copyText } from '../lib/hooks.js';
import ProductCard from '../components/ProductCard.jsx';
import { AddButton, Availability, Img, Price, QtyStepper, SampleBadge } from '../components/ui.jsx';
import { IconArrow, IconChat, IconCheck, IconLink, IconPin } from '../components/Icons.jsx';

function Gallery({ product, index, setIndex }) {
  const track = useRef(null);
  const programmatic = useRef(false);
  const imgs = product.images;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slide = el.children[index];
    if (!slide) return;
    programmatic.current = true;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: 'smooth' });
    const t = setTimeout(() => (programmatic.current = false), 450);
    return () => clearTimeout(t);
  }, [index]);

  const onScroll = () => {
    if (programmatic.current) return;
    const el = track.current;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className="gallery">
      <div className="gallery__stage">
        {product.offer && <span className="tag-offer tag-offer--lg">Oferta</span>}
        <div ref={track} className="gallery__track" onScroll={onScroll} aria-roledescription="carrusel" aria-label={`Fotos de ${product.title}`}>
          {imgs.map((im, i) => (
            <figure key={im.src} className={`gallery__slide ${im.kind === 'photo' ? 'is-photo' : ''}`} aria-hidden={i !== index} aria-label={`Foto ${i + 1} de ${imgs.length}`}>
              <Img src={im.src} alt={im.alt} w={im.w} h={im.h} priority={i === 0} className="h-full w-full" imgClassName={im.kind === 'photo' ? 'h-full w-full object-cover' : 'h-full w-full object-contain'} />
            </figure>
          ))}
        </div>
        {imgs.length > 1 && (
          <div className="gallery__dots md:hidden" aria-hidden="true">
            {imgs.map((im, i) => (
              <span key={im.src} className={i === index ? 'is-on' : ''} />
            ))}
          </div>
        )}
        <span className="gallery__count label-tech tabular" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(imgs.length).padStart(2, '0')}
        </span>
      </div>
      {imgs.length > 1 && (
        <div className="mt-3 hidden gap-2 md:flex md:flex-wrap" role="group" aria-label="Elegir foto">
          {imgs.map((im, i) => (
            <button
              key={im.src}
              type="button"
              className={`gallery__thumb ${i === index ? 'is-on' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}: ${im.alt}`}
              aria-pressed={i === index}
            >
              <Img src={im.src} alt="" w={im.w} h={im.h} className="h-full w-full" imgClassName={im.kind === 'photo' ? 'h-full w-full object-cover' : 'h-full w-full object-contain'} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Product({ route }) {
  const product = productBySlug[route.slug];
  const { setQuery, showToast } = useStore();
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const [variant, setVariant] = useState(product.variants ? product.variants.options[0].value : null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQty(1);
    setIndex(0);
    setVariant(product.variants ? product.variants.options[0].value : null);
  }, [product]);

  const brand = BRANDS[product.brand];
  const sp = specialtyBySlug[product.specialty];
  const shareUrl = `${SHARE_BASE}#p-${product.slug}`;
  const related = [
    ...PRODUCTS.filter((p) => p.specialty === product.specialty && p.id !== product.id),
    ...PRODUCTS.filter((p) => p.specialty !== product.specialty && p.id !== product.id),
  ].slice(0, 4);
  const consult = `Hola, quiero consultar por: ${product.title} (${product.presentation}${variant ? ` · ${variant}` : ''}) — Cód. ${product.id}.\n${shareUrl}`;

  const pickVariant = (opt) => {
    setVariant(opt.value);
    if (typeof opt.image === 'number') setIndex(opt.image);
  };

  const copyLink = async () => {
    const ok = await copyText(shareUrl);
    setCopied(ok);
    showToast({ kind: 'info', text: ok ? 'Enlace de la ficha copiado.' : `No se pudo copiar. Enlace: ${shareUrl}` });
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="product-page pb-28 md:pb-24">
      <div className="mx-auto max-w-page px-gutter">
        <nav aria-label="Ruta de navegación" className="pt-6 text-[13px] text-muted md:pt-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><a href="#inicio" className="hover:text-ink">Inicio</a></li>
            <li aria-hidden="true">/</li>
            <li><a href={catalogHref(sp.slug)} className="hover:text-ink">{sp.name}</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink/70">{product.family}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Gallery product={product} index={index} setIndex={setIndex} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <p className="label-tech text-muted">
                {sp.code} · {product.family}
              </p>
              <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-[34px] font-normal leading-[1.04] tracking-[-0.01em] text-ink md:text-[46px]">
                {product.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-ink/80">
                <button type="button" className="font-medium text-brand underline-offset-4 hover:underline" onClick={() => { setQuery(brand.name.replace(' Littmann', '')); go('catalogo'); }}>
                  {brand.name}
                </button>
                <span className="h-3 w-px bg-ink/20" aria-hidden="true" />
                <span>{product.presentation}</span>
                <span className="h-3 w-px bg-ink/20" aria-hidden="true" />
                <span className="tabular">Cód. {product.id}</span>
              </div>

              <div className="mt-7 rounded-card border border-line bg-white p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    {product.offer && <p className="mb-1 text-[13px] font-medium text-[#3F7D2C]">{product.offer.label} · ahorrás {money(product.price - product.offer.price)}</p>}
                    <Price product={product} size="lg" />
                    <p className="mt-1 text-[13px] text-muted">Precio con IVA incluido</p>
                  </div>
                  <Availability value={product.availability} />
                </div>
                {product.offer?.gift && <p className="mt-4 rounded-xl bg-lime-soft px-3 py-2 text-[14px] font-medium text-ink">{product.offer.gift}</p>}

                {product.variants && (
                  <fieldset className="mt-6">
                    <legend className="flex w-full items-baseline justify-between text-[14px] text-ink">
                      <span>
                        {product.variants.label}: <strong className="font-semibold">{variant}</strong>
                      </span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {product.variants.options.map((o) => (
                        <label key={o.value} className={`swatch ${variant === o.value ? 'is-on' : ''}`} title={o.value}>
                          <input type="radio" name="variant" id={`v-${o.value}`} value={o.value} checked={variant === o.value} onChange={() => pickVariant(o)} className="sr-only" />
                          <span className="swatch__dot" style={{ background: o.swatch }} aria-hidden="true" />
                          <span className="sr-only">{o.value}</span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-3 text-[12.5px] text-muted">{product.variants.note}</p>
                  </fieldset>
                )}

                <div className="mt-6 flex gap-3">
                  <QtyStepper value={qty} onChange={setQty} />
                  <AddButton product={product} qty={qty} variant={variant} full className="flex-1" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href={whatsappLink(consult)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <span className="inline-flex items-center gap-2"><IconChat size={18} /> Consultar</span>
                  </a>
                  <button type="button" className="btn-ghost" onClick={copyLink}>
                    <span className="inline-flex items-center gap-2">{copied ? <IconCheck size={18} /> : <IconLink size={18} />} {copied ? 'Copiado' : 'Copiar enlace'}</span>
                  </button>
                </div>
              </div>

              <ul className="mt-5 grid gap-3 text-[14px] text-ink/80">
                <li className="flex gap-3"><IconPin size={19} className="mt-0.5 shrink-0 text-brand" /> Retiro en {SITE.address}, Ciudad de Mendoza.</li>
                <li className="flex gap-3"><IconChat size={19} className="mt-0.5 shrink-0 text-brand" /> Enviás el pedido por WhatsApp y un asesor confirma disponibilidad y forma de pago.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-7" aria-labelledby="desc-title">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="desc-title" className="font-display text-[28px] text-ink">Descripción</h2>
              {product.provenance.description === 'muestra' && <SampleBadge />}
            </div>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-ink/80">{product.description}</p>
            <p className="mt-4 text-[13px] text-muted">
              {product.provenance.description === 'muestra'
                ? 'Texto redactado para la maqueta. A reemplazar por la descripción validada por Ferrer Salud.'
                : 'Texto adaptado de la descripción publicada en el catálogo actual de Ferrer Salud.'}
            </p>
          </section>
          <section className="lg:col-span-5" aria-labelledby="spec-title">
            <h2 id="spec-title" className="font-display text-[28px] text-ink">Especificaciones</h2>
            <dl className="spec-table mt-4">
              <div><dt>Marca</dt><dd>{brand.name}</dd></div>
              <div><dt>Presentación</dt><dd>{product.presentation}</dd></div>
              <div><dt>Código</dt><dd className="tabular">{product.id}</dd></div>
              <div><dt>Familia</dt><dd>{product.family}</dd></div>
              <div><dt>Especialidad</dt><dd>{sp.name}</dd></div>
              {product.specs
                .filter(([k]) => k !== 'Presentación')
                .map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
            </dl>
          </section>
        </div>

        <section className="mt-16 md:mt-24" aria-labelledby="rel-title">
          <div className="flex items-end justify-between gap-4">
            <h2 id="rel-title" className="display-3 text-ink">También en {sp.name}</h2>
            <a href={catalogHref(sp.slug)} className="link-arrow hidden md:inline-flex">Ver especialidad <IconArrow size={18} /></a>
          </div>
          <div className="product-grid mt-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      <div className="buybar md:hidden" role="region" aria-label="Agregar al pedido">
        <div className="min-w-0">
          <p className="truncate text-[12px] text-muted">{product.name}{variant ? ` · ${variant}` : ''}</p>
          <p className="tabular text-[18px] font-semibold leading-tight text-ink">{money(unitPrice(product) * qty)}</p>
        </div>
        <AddButton product={product} qty={qty} variant={variant} variantLabel="Agregar" doneLabel="Agregado" className="buybar__btn" />
      </div>
    </div>
  );
}
