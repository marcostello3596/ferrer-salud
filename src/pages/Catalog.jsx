import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS, unitPrice } from '../data/products.js';
import { BRANDS } from '../data/brands.js';
import { SPECIALTIES, specialtyBySlug } from '../data/categories.js';
import { whatsappLink } from '../data/site.js';
import { searchProducts, SEARCH_SUGGESTIONS } from '../lib/search.js';
import { useStore } from '../lib/store.jsx';
import { useDialog } from '../lib/hooks.js';
import { plural } from '../lib/format.js';
import { catalogHref } from '../lib/router.js';
import ProductCard from '../components/ProductCard.jsx';
import { IconChat, IconClose, IconSearch, IconSliders } from '../components/Icons.jsx';

const AVAIL = [
  ['in_stock', 'En stock'],
  ['low', 'Últimas unidades'],
];
const SORTS = [
  ['relevance', 'Más pertinentes'],
  ['price-asc', 'Precio: menor a mayor'],
  ['price-desc', 'Precio: mayor a menor'],
];

const emptyFilters = (route) => ({
  specialties: route.specialty ? [route.specialty] : [],
  brands: [],
  avail: [],
  offers: !!route.offers,
});

function applyFilters(list, f, skip) {
  return list.filter(
    (p) =>
      (skip === 'specialties' || !f.specialties.length || f.specialties.includes(p.specialty)) &&
      (skip === 'brands' || !f.brands.length || f.brands.includes(p.brand)) &&
      (skip === 'avail' || !f.avail.length || f.avail.includes(p.availability)) &&
      (skip === 'offers' || !f.offers || !!p.offer)
  );
}

function Check({ checked, onChange, label, count, id }) {
  return (
    <label htmlFor={id} className={`check ${count === 0 && !checked ? 'is-dim' : ''}`}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="check__box" aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <span className="tabular text-[12px] text-muted">{count}</span>
    </label>
  );
}

function FilterPanel({ base, filters, setFilters, idPrefix }) {
  const toggle = (key, val) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));
  const facet = (skip, pred) => applyFilters(base, filters, skip).filter(pred).length;
  const brands = Object.keys(BRANDS).filter((b) => base.some((p) => p.brand === b) || filters.brands.includes(b));
  return (
    <div className="grid gap-8">
      <fieldset>
        <legend className="filter-title">Especialidad</legend>
        <div className="grid gap-0.5">
          {SPECIALTIES.map((s) => (
            <Check
              key={s.slug}
              id={`${idPrefix}-sp-${s.slug}`}
              label={s.name}
              checked={filters.specialties.includes(s.slug)}
              onChange={() => toggle('specialties', s.slug)}
              count={facet('specialties', (p) => p.specialty === s.slug)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="filter-title">Marca</legend>
        <div className="grid gap-0.5">
          {brands
            .sort((a, b) => BRANDS[a].name.localeCompare(BRANDS[b].name))
            .map((b) => (
              <Check
                key={b}
                id={`${idPrefix}-br-${b}`}
                label={BRANDS[b].name}
                checked={filters.brands.includes(b)}
                onChange={() => toggle('brands', b)}
                count={facet('brands', (p) => p.brand === b)}
              />
            ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="filter-title">Disponibilidad</legend>
        <div className="grid gap-0.5">
          {AVAIL.map(([v, l]) => (
            <Check key={v} id={`${idPrefix}-av-${v}`} label={l} checked={filters.avail.includes(v)} onChange={() => toggle('avail', v)} count={facet('avail', (p) => p.availability === v)} />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="filter-title">Precio</legend>
        <Check id={`${idPrefix}-offers`} label="Solo ofertas" checked={filters.offers} onChange={() => setFilters((f) => ({ ...f, offers: !f.offers }))} count={facet('offers', (p) => !!p.offer)} />
      </fieldset>
    </div>
  );
}

function FilterSheet({ open, onClose, children, resultCount, onClear }) {
  const ref = useDialog(open, onClose);
  return (
    <div className={`sheet-root ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="filters-title" tabIndex={-1} className="sheet-bottom">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-ink/15" aria-hidden="true" />
        <div className="flex items-center justify-between px-5 pb-2 pt-3">
          <h2 id="filters-title" className="font-display text-[26px] text-ink">Filtros</h2>
          <button type="button" className="icon-btn -mr-2" onClick={onClose} aria-label="Cerrar filtros">
            <IconClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2">{children}</div>
        <div className="grid grid-cols-[auto_1fr] gap-2 border-t border-line bg-paper px-5 pb-5 pt-3">
          <button type="button" className="btn-ghost px-5" onClick={onClear}>Limpiar</button>
          <button type="button" className="btn-primary" onClick={onClose}>
            {resultCount ? `Ver ${plural(resultCount, 'producto', 'productos')}` : 'Sin resultados'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Catalog({ route }) {
  const { query, setQuery } = useStore();
  const [filters, setFilters] = useState(() => emptyFilters(route));
  const [sort, setSort] = useState('relevance');
  const [sheet, setSheet] = useState(false);
  const [local, setLocal] = useState(query);

  useEffect(() => {
    setFilters(emptyFilters(route));
  }, [route.specialty, route.offers]);
  useEffect(() => setLocal(query), [query]);

  const base = useMemo(() => (query ? searchProducts(query) : PRODUCTS), [query]);
  const results = useMemo(() => {
    const list = applyFilters(base, filters);
    if (sort === 'price-asc') return list.slice().sort((a, b) => unitPrice(a) - unitPrice(b));
    if (sort === 'price-desc') return list.slice().sort((a, b) => unitPrice(b) - unitPrice(a));
    return list;
  }, [base, filters, sort]);

  const activeCount = filters.specialties.length + filters.brands.length + filters.avail.length + (filters.offers ? 1 : 0);
  const single = filters.specialties.length === 1 ? specialtyBySlug[filters.specialties[0]] : null;
  const title = query ? (
    <>Resultados para <em>«{query}»</em></>
  ) : filters.offers && !filters.specialties.length ? (
    'Ofertas'
  ) : single ? (
    single.name
  ) : (
    'Catálogo'
  );
  const clearAll = () => setFilters({ specialties: [], brands: [], avail: [], offers: false });
  const chips = [
    ...filters.specialties.map((s) => ['specialties', s, specialtyBySlug[s].name]),
    ...filters.brands.map((b) => ['brands', b, BRANDS[b].name]),
    ...filters.avail.map((a) => ['avail', a, AVAIL.find((x) => x[0] === a)[1]]),
    ...(filters.offers ? [['offers', true, 'Solo ofertas']] : []),
  ];
  const removeChip = (k, v) => setFilters((f) => (k === 'offers' ? { ...f, offers: false } : { ...f, [k]: f[k].filter((x) => x !== v) }));

  return (
    <div className="catalog pb-24">
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-page px-gutter pb-8 pt-8 md:pb-10 md:pt-12">
          <nav aria-label="Ruta de navegación" className="text-[13px] text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><a href="#inicio" className="hover:text-ink">Inicio</a></li>
              <li aria-hidden="true">/</li>
              <li>{single || query ? <a href="#catalogo" onClick={() => setQuery('')} className="hover:text-ink">Catálogo</a> : <span aria-current="page">Catálogo</span>}</li>
              {single && !query && (<><li aria-hidden="true">/</li><li aria-current="page" className="text-ink">{single.name}</li></>)}
            </ol>
          </nav>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              {single && !query && <p className="label-tech mb-3 text-muted">{single.code} · {single.lead}</p>}
              <h1 className="display-1 text-ink" tabIndex={-1} id="page-title">{title}</h1>
              <p className="mt-3 text-[15px] text-muted" aria-live="polite">
                {plural(results.length, 'producto', 'productos')} {query || activeCount ? (results.length === 1 ? 'encontrado' : 'encontrados') : 'en la maqueta'} · Precios con IVA incluido
              </p>
            </div>
            <form
              role="search"
              className="search-field search-field--catalog w-full md:w-[380px]"
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(local.trim());
              }}
            >
              <label htmlFor="q-catalog" className="sr-only">Buscar en el catálogo</label>
              <IconSearch size={19} className="shrink-0 text-ink/60" />
              <input id="q-catalog" type="search" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Buscar en el catálogo" enterKeyHint="search" />
              {(local || query) && (
                <button type="button" className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-mist" onClick={() => { setLocal(''); setQuery(''); }} aria-label="Borrar búsqueda">
                  <IconClose size={16} />
                </button>
              )}
            </form>
          </div>
          <div className="-mx-4 mt-7 overflow-x-auto px-4 md:mx-0 md:px-0">
            <ul className="flex w-max gap-2" aria-label="Especialidades">
              <li><a href="#catalogo" className={`chip ${!filters.specialties.length && !filters.offers ? 'is-on' : ''}`} onClick={() => setFilters(emptyFilters({}))}>Todo</a></li>
              {SPECIALTIES.map((s) => (
                <li key={s.slug}>
                  <a href={catalogHref(s.slug)} className={`chip ${single?.slug === s.slug ? 'is-on' : ''}`}>{s.name}</a>
                </li>
              ))}
              <li><a href="#catalogo-ofertas" className={`chip ${filters.offers && !filters.specialties.length ? 'is-on' : ''}`}>Ofertas</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-page px-gutter">
        <div className="sticky top-[calc(var(--header-h)+env(safe-area-inset-top,0px))] z-20 -mx-4 flex items-center gap-2 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
          <button type="button" className="btn-ghost h-11 px-4" onClick={() => setSheet(true)}>
            <span className="inline-flex items-center gap-2">
              <IconSliders size={18} /> Filtros{activeCount ? <span className="tabular rounded-full bg-ink px-1.5 text-[12px] text-white">{activeCount}</span> : null}
            </span>
          </button>
          <label htmlFor="sort-m" className="sr-only">Ordenar</label>
          <select id="sort-m" className="select ml-auto h-11" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
          </select>
        </div>

        <div className="grid gap-10 pt-8 lg:grid-cols-[240px_1fr] lg:pt-10">
          <aside className="hidden lg:block" aria-label="Filtros">
            <div className="sticky top-[calc(var(--header-h)+24px)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[15px] font-semibold text-ink">Filtros</p>
                {activeCount > 0 && <button type="button" className="text-[13px] font-medium text-brand hover:underline" onClick={clearAll}>Limpiar</button>}
              </div>
              <FilterPanel base={base} filters={filters} setFilters={setFilters} idPrefix="d" />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 hidden items-center justify-between gap-4 lg:flex">
              <div className="flex flex-wrap gap-2">
                {chips.map(([k, v, l]) => (
                  <button key={`${k}-${v}`} type="button" className="chip is-on" onClick={() => removeChip(k, v)} aria-label={`Quitar filtro ${l}`}>
                    {l} <IconClose size={14} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort-d" className="text-[13px] text-muted">Ordenar por</label>
                <select id="sort-d" className="select h-10" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORTS.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                </select>
              </div>
            </div>
            {chips.length > 0 && (
              <div className="-mx-4 mb-5 overflow-x-auto px-4 lg:hidden">
                <div className="flex w-max gap-2">
                  {chips.map(([k, v, l]) => (
                    <button key={`${k}-${v}`} type="button" className="chip is-on" onClick={() => removeChip(k, v)} aria-label={`Quitar filtro ${l}`}>
                      {l} <IconClose size={14} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.length ? (
              <div key={`${query}|${sort}|${JSON.stringify(filters)}`} className="product-grid product-grid--catalog is-entering">
                {results.map((p, i) => (
                  <div key={p.id} style={{ '--i': i }} className="enter-item">
                    <ProductCard product={p} headingLevel={2} priority={i < 4} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-mark" aria-hidden="true">
                  <IconSearch size={34} />
                </div>
                <h2 className="mt-6 font-display text-[30px] leading-tight text-ink">
                  {query ? <>No encontramos «{query}»</> : 'Ningún producto coincide con estos filtros'}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  Esta maqueta incluye 12 productos de muestra. En el sitio final, la búsqueda recorre todo el catálogo. Probá con otro término o consultanos.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {SEARCH_SUGGESTIONS.slice(0, 4).map((s) => (
                    <button key={s} type="button" className="chip" onClick={() => { clearAll(); setQuery(s); }}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {(activeCount > 0 || query) && (
                    <button type="button" className="btn-outline" onClick={() => { clearAll(); setQuery(''); }}>
                      Ver todo el catálogo
                    </button>
                  )}
                  <a href={whatsappLink(query ? `Hola, estoy buscando: ${query}. ¿Lo tienen?` : 'Hola, necesito ayuda para encontrar un producto.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <span className="inline-flex items-center gap-2"><IconChat size={19} /> Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterSheet open={sheet} onClose={() => setSheet(false)} resultCount={results.length} onClear={clearAll}>
        <FilterPanel base={base} filters={filters} setFilters={setFilters} idPrefix="m" />
      </FilterSheet>
    </div>
  );
}
