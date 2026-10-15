import { useEffect, useRef, useState } from 'react';
import { SPECIALTIES } from '../data/categories.js';
import { SITE, whatsappLink } from '../data/site.js';
import { catalogHref } from '../lib/router.js';
import { useStore } from '../lib/store.jsx';
import { useDialog, useScrolled } from '../lib/hooks.js';
import SearchBox from './SearchBox.jsx';
import { Logo } from './ui.jsx';
import { IconArrow, IconBag, IconChat, IconChevron, IconClock, IconClose, IconMail, IconMenu, IconPin, IconSearch } from './Icons.jsx';

function CartButton({ className = '' }) {
  const { count, openCart, bump } = useStore();
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (!bump) return;
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 520);
    return () => clearTimeout(t);
  }, [bump]);
  return (
    <button
      type="button"
      onClick={openCart}
      className={`cart-btn ${anim ? 'is-bump' : ''} ${className}`}
      aria-label={`Abrir pedido, ${count} ${count === 1 ? 'unidad' : 'unidades'}`}
    >
      <IconBag size={21} />
      <span className="hidden text-[14px] font-medium lg:inline">Pedido</span>
      <span className={`cart-count tabular ${count ? 'is-on' : ''}`} aria-hidden="true">
        {count}
      </span>
    </button>
  );
}

function MegaMenu({ open, onClose, id }) {
  return (
    <div id={id} className={`mega ${open ? 'is-open' : ''}`} hidden={!open} onMouseLeave={onClose}>
      <div className="mx-auto grid max-w-page grid-cols-5 gap-px bg-line px-0">
        {SPECIALTIES.map((s) => (
          <a key={s.slug} href={catalogHref(s.slug)} onClick={onClose} className="mega-col group bg-white p-6">
            <span className="label-tech text-muted">{s.code}</span>
            <span className="mt-3 block font-display text-[26px] leading-none text-ink">{s.name}</span>
            <span className="mt-4 block space-y-1.5 text-[13px] text-muted">
              {s.families.slice(0, 4).map((f) => (
                <span key={f} className="block">
                  {f}
                </span>
              ))}
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
              Ver productos <IconArrow size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileNav({ open, onClose }) {
  const ref = useDialog(open, onClose);
  return (
    <div className={`sheet-root ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet-backdrop" onClick={onClose} />
      <nav ref={ref} role="dialog" aria-modal="true" aria-label="Menú" tabIndex={-1} className="sheet-left">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo className="w-[112px]" />
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Cerrar menú">
            <IconClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-6">
          <p className="label-tech mb-3 text-muted">Especialidades</p>
          <ul className="divide-y divide-line border-y border-line">
            {SPECIALTIES.map((s) => (
              <li key={s.slug}>
                <a href={catalogHref(s.slug)} onClick={onClose} className="flex min-h-[56px] items-center justify-between gap-4 py-3">
                  <span className="flex items-baseline gap-3">
                    <span className="label-tech w-8 text-muted">{s.code}</span>
                    <span className="font-display text-[24px] leading-none text-ink">{s.name}</span>
                  </span>
                  <IconArrow size={18} className="text-ink/50" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-1 text-[16px] font-medium text-ink">
            <li><a className="block py-2.5" href="#catalogo" onClick={onClose}>Todo el catálogo</a></li>
            <li><a className="block py-2.5" href="#ofertas" onClick={onClose}>Ofertas de octubre</a></li>
            <li><a className="block py-2.5" href="#asesoramiento" onClick={onClose}>Asesoramiento</a></li>
          </ul>
          <div className="mt-8 rounded-card bg-mist p-5 text-[14px] text-ink">
            <a href={whatsappLink('Hola, quiero hacer una consulta.')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium">
              <IconChat size={20} /> {SITE.whatsappDisplay}
            </a>
            <p className="mt-3 flex items-center gap-3 text-ink/80"><IconMail size={20} /> <span className="select-all">{SITE.email}</span></p>
            <p className="mt-3 flex items-center gap-3 text-ink/80"><IconPin size={20} /> {SITE.address}, Mendoza</p>
            <p className="mt-3 flex items-start gap-3 text-ink/80"><IconClock size={20} /> <span>Lun a vie 9 a 17 h<br />Sáb 9 a 13 h</span></p>
          </div>
        </div>
      </nav>
    </div>
  );
}

function SearchSheet({ open, onClose }) {
  const ref = useDialog(open, onClose);
  return (
    <div className={`sheet-root ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Buscar" tabIndex={-1} className="sheet-top">
        <div className="flex items-start gap-2 px-4 pb-2 pt-4">
          <div className="min-w-0 flex-1">{open && <SearchBox variant="sheet" autoFocus onDone={onClose} inputId="q-sheet" />}</div>
          <button type="button" onClick={onClose} className="h-12 px-2 text-[15px] font-medium text-ink">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header({ route }) {
  const scrolled = useScrolled(4);
  const [mega, setMega] = useState(false);
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState(false);
  const megaBtn = useRef(null);

  useEffect(() => {
    setMega(false);
    setNav(false);
    setSearch(false);
  }, [route]);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e) => e.key === 'Escape' && (setMega(false), megaBtn.current?.focus());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega]);

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mx-auto flex h-full max-w-page items-center gap-3 px-gutter lg:gap-6">
          <button type="button" className="icon-btn -ml-2 lg:hidden" onClick={() => setNav(true)} aria-label="Abrir menú">
            <IconMenu size={22} />
          </button>
          <a href="#inicio" className="shrink-0" aria-label="Ferrer Salud, inicio">
            <Logo className="w-[104px] lg:w-[132px]" />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            <button
              ref={megaBtn}
              type="button"
              className={`nav-link ${mega ? 'is-active' : ''}`}
              aria-expanded={mega}
              aria-controls="mega-especialidades"
              onClick={() => setMega((m) => !m)}
              onMouseEnter={() => setMega(true)}
            >
              Especialidades <IconChevron size={16} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
            </button>
            <a href="#catalogo" className={`nav-link ${route.name === 'catalog' ? 'is-current' : ''}`} onMouseEnter={() => setMega(false)}>
              Catálogo
            </a>
            <a href="#ofertas" className="nav-link" onMouseEnter={() => setMega(false)}>
              Ofertas
            </a>
          </nav>
          <div className="hidden min-w-0 flex-1 justify-center md:flex" onMouseEnter={() => setMega(false)}>
            <div className="w-full max-w-[520px]">
              <SearchBox variant="header" inputId="q-header" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <a
              href={whatsappLink('Hola, quiero hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[14px] font-medium text-ink hover:bg-mist xl:inline-flex"
            >
              <IconChat size={20} />
              <span className="tabular">261 768 0531</span>
            </a>
            <button type="button" className="icon-btn md:hidden" onClick={() => setSearch(true)} aria-label="Buscar productos">
              <IconSearch size={21} />
            </button>
            <CartButton />
          </div>
        </div>
        <MegaMenu open={mega} onClose={() => setMega(false)} id="mega-especialidades" />
      </header>
      <MobileNav open={nav} onClose={() => setNav(false)} />
      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </>
  );
}
