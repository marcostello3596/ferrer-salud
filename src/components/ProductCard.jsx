import { BRANDS } from '../data/brands.js';
import { specialtyBySlug } from '../data/categories.js';
import { productHref } from '../lib/router.js';
import { AddButton, Availability, Img, Price } from './ui.jsx';

export default function ProductCard({ product, priority = false, headingLevel = 3 }) {
  const brand = BRANDS[product.brand]?.name;
  const sp = specialtyBySlug[product.specialty];
  const img = product.images[0];
  const H = `h${headingLevel}`;
  const needsVariant = !!product.variants;
  return (
    <article className="product-card group relative flex flex-col">
      <a href={productHref(product)} className="card-stage" aria-label={`${product.title}, ${brand}`}>
        <span className="card-stage__code label-tech" aria-hidden="true">
          {sp.code}
          <span className="text-ink/35"> · {product.id}</span>
        </span>
        {product.offer && <span className="tag-offer">Oferta</span>}
        <span className="card-stage__shadow" aria-hidden="true" />
        <Img
          src={img.src}
          alt={img.alt}
          w={img.w}
          h={img.h}
          priority={priority}
          className="card-stage__img"
          imgClassName="h-full w-full object-contain"
        />
      </a>
      <div className="flex flex-1 flex-col pt-3.5">
        <p className="label-tech text-muted">{brand}</p>
        <H className="mt-1.5 text-[15px] font-medium leading-snug text-ink md:text-[16px]">
          <a href={productHref(product)} className="card-link line-clamp-2">
            {product.title}
          </a>
        </H>
        <p className="mt-1 text-[13px] text-muted">{product.presentation}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex min-w-0 flex-col gap-1">
            <Price product={product} />
            <Availability value={product.availability} compact />
          </div>
          {needsVariant ? (
            <a href={productHref(product)} className="add-compact add-compact--link" aria-label={`Elegir color de ${product.title}`}>
              <span className="add-compact__icon" aria-hidden="true">
                <span className="flex gap-[2px]">
                  {product.variants.options.slice(0, 3).map((o) => (
                    <span key={o.value} className="h-2 w-2 rounded-full ring-1 ring-white" style={{ background: o.swatch }} />
                  ))}
                </span>
              </span>
              <span className="add-compact__text">Elegir</span>
            </a>
          ) : (
            <AddButton product={product} compact />
          )}
        </div>
      </div>
    </article>
  );
}
