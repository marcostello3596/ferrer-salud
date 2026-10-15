import { useEffect, useRef, useState } from 'react';
import { money } from '../lib/format.js';
import { IconCheck, IconMinus, IconPlus } from './Icons.jsx';
import { useStore } from '../lib/store.jsx';

// Imagen con estado de carga: superficie con brillo suave hasta que la foto está lista.
export function Img({ src, alt, w, h, className = '', imgClassName = '', priority = false, sizes, style }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && ref.current.complete && ref.current.naturalWidth) setLoaded(true);
  }, [src]);
  return (
    <span className={`img-frame ${loaded ? 'is-loaded' : ''} ${className}`} style={style}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        className={imgClassName}
      />
    </span>
  );
}

export function Logo({ className = '', onDark = false }) {
  return (
    <img
      src="assets/ui/ferrer-logo.png"
      width="303"
      height="82"
      alt="Ferrer Salud"
      className={`block h-auto ${onDark ? 'ring-1 ring-white/10' : ''} ${className}`}
    />
  );
}

export function Price({ product, size = 'md', className = '' }) {
  const offer = product.offer;
  const sizes = {
    sm: 'text-[15px]',
    md: 'text-[17px] md:text-[18px]',
    lg: 'text-[30px] md:text-[38px]',
  };
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 tabular ${className}`}>
      <span className={`font-semibold text-ink ${sizes[size]}`}>{money(offer ? offer.price : product.price)}</span>
      {offer && (
        <span className={`text-muted line-through decoration-1 ${size === 'lg' ? 'text-[17px]' : 'text-[13px]'}`}>
          <span className="sr-only">Precio anterior: </span>
          {money(product.price)}
        </span>
      )}
    </span>
  );
}

export function Availability({ value, compact = false }) {
  const map = {
    in_stock: { label: 'En stock', dot: 'bg-[#4F9D3A]' },
    low: { label: 'Últimas unidades', dot: 'bg-[#D08A1E]' },
  };
  const m = map[value] || map.in_stock;
  return (
    <span className={`inline-flex items-center gap-1.5 ${compact ? 'text-[12px]' : 'text-[13px]'} text-ink/80`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} aria-hidden="true" />
      {m.label}
    </span>
  );
}

export function Code({ children, className = '' }) {
  return <span className={`label-tech ${className}`}>{children}</span>;
}

export function SampleBadge({ children = 'Texto de muestra' }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-ink/30 px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted">
      {children}
    </span>
  );
}

export function QtyStepper({ value, onChange, min = 1, max = 99, size = 'md', label = 'Cantidad' }) {
  const h = size === 'sm' ? 'h-9' : 'h-12';
  const w = size === 'sm' ? 'w-9' : 'w-12';
  return (
    <div className={`inline-flex items-center rounded-full border border-ink/15 bg-white ${h}`} role="group" aria-label={label}>
      <button
        type="button"
        className={`${w} ${h} grid place-items-center rounded-full text-ink transition hover:bg-mist disabled:opacity-30`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Restar una unidad"
      >
        <IconMinus size={16} />
      </button>
      <input
        className={`tabular w-9 bg-transparent text-center text-[15px] font-semibold text-ink outline-none ${size === 'sm' ? 'w-7 text-[14px]' : ''}`}
        inputMode="numeric"
        aria-label={label}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
          if (!Number.isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
        }}
      />
      <button
        type="button"
        className={`${w} ${h} grid place-items-center rounded-full text-ink transition hover:bg-mist disabled:opacity-30`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Sumar una unidad"
      >
        <IconPlus size={16} />
      </button>
    </div>
  );
}

// Botón de agregar con confirmación: pasa a "Agregado" con un check durante 1,6 s.
export function AddButton({ product, qty = 1, variant = null, variantRequired = false, onMissingVariant, variantLabel, doneLabel = 'Agregado al pedido', full = false, compact = false, className = '' }) {
  const { add } = useStore();
  const [done, setDone] = useState(false);
  const t = useRef(null);
  useEffect(() => () => clearTimeout(t.current), []);
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantRequired && !variant) {
      onMissingVariant && onMissingVariant();
      return;
    }
    add(product, qty, variant);
    setDone(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setDone(false), 1600);
  };
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`add-compact ${done ? 'is-done' : ''} ${className}`}
        aria-label={done ? `${product.title} agregado al pedido` : `Agregar ${product.title} al pedido`}
      >
        <span className="add-compact__icon" aria-hidden="true">
          {done ? <IconCheck size={18} /> : <IconPlus size={18} />}
        </span>
        <span className="add-compact__text">{done ? 'Agregado' : 'Agregar'}</span>
      </button>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`btn-primary ${full ? 'w-full' : ''} ${done ? 'is-done' : ''} ${className}`}>
      <span className="relative inline-flex items-center gap-2">
        {done ? <IconCheck size={18} /> : <IconPlus size={18} />}
        {done ? doneLabel : variantLabel || 'Agregar al pedido'}
      </span>
    </button>
  );
}

export function SectionHead({ eyebrow, title, children, action, id, className = '' }) {
  return (
    <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="label-tech mb-4 text-muted">{eyebrow}</p>}
        <h2 id={id} className="display-2 text-ink">
          {title}
        </h2>
        {children && <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}
