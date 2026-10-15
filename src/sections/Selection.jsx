import { useMemo, useState } from 'react';
import { HOME_SELECTION, productById } from '../data/products.js';
import { SPECIALTIES } from '../data/categories.js';
import ProductCard from '../components/ProductCard.jsx';
import { SectionHead } from '../components/ui.jsx';
import { IconArrow } from '../components/Icons.jsx';

export default function Selection() {
  const [tab, setTab] = useState('all');
  const items = useMemo(() => HOME_SELECTION.map((id) => productById[id]), []);
  const shown = tab === 'all' ? items : items.filter((p) => p.specialty === tab);
  const tabs = [{ slug: 'all', short: 'Todo' }, ...SPECIALTIES.filter((s) => items.some((p) => p.specialty === s.slug))];
  return (
    <section id="seleccion" className="scroll-mt-24 border-t border-line bg-white py-16 md:py-24" aria-labelledby="sel-title">
      <div className="mx-auto max-w-page px-gutter">
        <SectionHead
          id="sel-title"
          eyebrow="Selección del catálogo"
          title={<>Lo que se pide <em>todos los días</em>.</>}
          action={
            <a href="#catalogo" className="link-arrow self-start md:self-auto">
              Ver catálogo completo <IconArrow size={18} />
            </a>
          }
        />
        <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Filtrar selección por especialidad">
          <div className="flex w-max gap-2">
            {tabs.map((t) => (
              <button
                key={t.slug}
                type="button"
                role="tab"
                aria-selected={tab === t.slug}
                className={`chip ${tab === t.slug ? 'is-on' : ''}`}
                onClick={() => setTab(t.slug)}
              >
                {t.short}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid mt-8" role="tabpanel">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
