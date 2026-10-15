import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { searchProducts, SEARCH_SUGGESTIONS } from '../lib/search.js';
import { useStore } from '../lib/store.jsx';
import { go, productHref } from '../lib/router.js';
import { BRANDS } from '../data/brands.js';
import { IconArrow, IconChat, IconClose, IconSearch } from './Icons.jsx';
import { Img, Price } from './ui.jsx';
import { whatsappLink } from '../data/site.js';

export default function SearchBox({ variant = 'header', autoFocus = false, onDone, inputId }) {
  const { query, setQuery } = useStore();
  const [value, setValue] = useState(variant === 'sheet' ? query : '');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef(null);
  const input = useRef(null);
  const listId = useId();
  const autoId = useId();
  const id = inputId || `q-${autoId.replace(/:/g, '')}`;

  const results = useMemo(() => (value.trim() ? searchProducts(value) : []), [value]);
  const shown = results.slice(0, variant === 'sheet' ? 8 : 5);

  useEffect(() => {
    if (variant !== 'header') return;
    const onKey = (e) => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant]);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  useEffect(() => setActive(-1), [value]);

  const submit = (q = value) => {
    setQuery(q.trim());
    setOpen(false);
    input.current?.blur();
    go('catalogo');
    onDone && onDone();
  };

  const pick = (p) => {
    setOpen(false);
    setValue('');
    window.location.hash = productHref(p);
    onDone && onDone();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(shown.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(-1, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active >= 0 && shown[active]) pick(shown[active]);
      else submit();
    } else if (e.key === 'Escape') {
      if (open) {
        e.stopPropagation();
        setOpen(false);
      }
    }
  };

  const showPanel = open && (variant === 'sheet' || value.trim().length > 0 || variant === 'header');
  const isSheet = variant === 'sheet';

  const panel = (
    <div
      id={listId}
      role="listbox"
      aria-label="Sugerencias de búsqueda"
      className={isSheet ? 'mt-4' : 'search-panel'}
    >
      {!value.trim() && (
        <div className="p-4">
          <p className="label-tech mb-3 text-muted">Búsquedas frecuentes</p>
          <div className="flex flex-wrap gap-2">
            {SEARCH_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setValue(s);
                  input.current?.focus();
                  setOpen(true);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      {value.trim() && shown.length > 0 && (
        <ul className="py-2">
          {shown.map((p, i) => (
            <li key={p.id} role="option" aria-selected={i === active} id={`${listId}-${i}`}>
              <a
                href={productHref(p)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  pick(p);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-2.5 transition ${i === active ? 'bg-mist' : ''}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist p-1.5">
                  <Img src={p.images[0].src} alt="" w={p.images[0].w} h={p.images[0].h} imgClassName="h-full w-full object-contain" className="h-full w-full" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-ink">{p.title}</span>
                  <span className="block text-[12px] text-muted">
                    {BRANDS[p.brand]?.name} · {p.presentation}
                  </span>
                </span>
                <Price product={p} size="sm" className="shrink-0 justify-end" />
              </a>
            </li>
          ))}
        </ul>
      )}
      {value.trim() && (
        <div className="border-t border-line p-2">
          {results.length > 0 ? (
            <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => submit()} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-ink hover:bg-mist">
              Ver {results.length === 1 ? 'el resultado' : `los ${results.length} resultados`} para «{value.trim()}»
              <IconArrow size={18} />
            </button>
          ) : (
            <div className="px-3 py-3">
              <p className="text-[14px] text-ink">
                No hay productos de la maqueta para «{value.trim()}».
              </p>
              <a
                href={whatsappLink(`Hola, estoy buscando: ${value.trim()}. ¿Lo tienen?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-[14px] font-medium text-brand underline-offset-4 hover:underline"
              >
                <IconChat size={18} /> Preguntar por WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div ref={wrap} className="relative w-full min-w-0">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={`search-field search-field--${variant}`}
      >
        <label htmlFor={id} className="sr-only">
          Buscar productos
        </label>
        <IconSearch size={variant === 'hero' ? 22 : 19} className="shrink-0 text-ink/60" />
        <input
          ref={input}
          id={id}
          type="search"
          autoComplete="off"
          enterKeyHint="search"
          placeholder={variant === 'header' ? 'Buscar insumos, equipos o marcas' : variant === 'hero' ? 'Buscar productos o marcas' : 'Guantes, alginato, tensiómetro…'}
          value={value}
          autoFocus={autoFocus}
          data-autofocus={autoFocus ? '' : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        />
        {value && (
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/60 hover:bg-mist hover:text-ink"
            onClick={() => {
              setValue('');
              input.current?.focus();
            }}
            aria-label="Borrar búsqueda"
          >
            <IconClose size={16} />
          </button>
        )}
        {variant === 'header' && !value && (
          <kbd className="hidden rounded-md border border-ink/15 px-1.5 py-0.5 text-[11px] font-medium text-muted xl:inline">/</kbd>
        )}
        {variant === 'hero' && (
          <button type="submit" className="btn-ink h-11 shrink-0 px-5 text-[14px]">
            Buscar
          </button>
        )}
      </form>
      {showPanel && (isSheet || variant === 'header' || value.trim()) && panel}
    </div>
  );
}
