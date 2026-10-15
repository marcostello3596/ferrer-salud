import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { useDialog, copyText } from '../lib/hooks.js';
import { money } from '../lib/format.js';
import { BRANDS } from '../data/brands.js';
import { SPECIALTIES } from '../data/categories.js';
import { SITE, whatsappLink } from '../data/site.js';
import { unitPrice } from '../data/products.js';
import { catalogHref, productHref } from '../lib/router.js';
import { Img, QtyStepper } from './ui.jsx';
import { IconArrow, IconArrowLeft, IconBag, IconChat, IconCheck, IconClose, IconCopy, IconTrash } from './Icons.jsx';

export function buildOrderMessage(lines, subtotal, form) {
  const rows = lines.map((l) => {
    const p = l.product;
    const v = l.variant ? ` · ${p.variants?.label || 'Variante'}: ${l.variant}` : '';
    return `• ${l.qty} × ${p.title} (${p.presentation}${v}) — Cód. ${p.id} — ${money(unitPrice(p) * l.qty)}`;
  });
  const out = [
    'Hola, Ferrer Salud. Quiero hacer este pedido:',
    '',
    ...rows,
    '',
    `Subtotal estimado: ${money(subtotal)} (IVA incluido)`,
  ];
  if (form.name?.trim()) out.push(`Nombre: ${form.name.trim()}`);
  if (form.org?.trim()) out.push(`Profesión o institución: ${form.org.trim()}`);
  out.push(`Entrega: ${form.delivery === 'retiro' ? `retiro en ${SITE.address}` : 'quiero consultar opciones de envío'}`);
  if (form.note?.trim()) out.push(`Comentario: ${form.note.trim()}`);
  out.push('', '¿Me confirman disponibilidad y forma de pago? Gracias.');
  return out.join('\n');
}

function Line({ line }) {
  const { setQty, remove, closeCart } = useStore();
  const p = line.product;
  return (
    <li className="cart-line flex gap-4 py-4">
      <a href={productHref(p)} onClick={closeCart} className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-2xl bg-mist p-2">
        <Img src={p.images[0].src} alt="" w={p.images[0].w} h={p.images[0].h} className="h-full w-full" imgClassName="h-full w-full object-contain" />
      </a>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="label-tech text-muted">{BRANDS[p.brand]?.name}</p>
            <a href={productHref(p)} onClick={closeCart} className="mt-1 block text-[15px] font-medium leading-snug text-ink hover:underline hover:underline-offset-4">
              {p.title}
            </a>
            <p className="mt-0.5 text-[13px] text-muted">
              {p.presentation}
              {line.variant && <> · {line.variant}</>}
            </p>
          </div>
          <button type="button" className="icon-btn -mr-2 -mt-1 h-10 w-10 text-ink/60 hover:text-alert" onClick={() => remove(line.key)} aria-label={`Quitar ${p.title} del pedido`}>
            <IconTrash size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <QtyStepper size="sm" value={line.qty} onChange={(q) => setQty(line.key, q)} label={`Cantidad de ${p.title}`} />
          <div className="text-right">
            <p className="tabular text-[15px] font-semibold text-ink">{money(unitPrice(p) * line.qty)}</p>
            {line.qty > 1 && <p className="tabular text-[12px] text-muted">{money(unitPrice(p))} c/u</p>}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, count, showToast } = useStore();
  const ref = useDialog(cartOpen, closeCart);
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({ name: '', org: '', delivery: 'retiro', note: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!cartOpen) {
      const t = setTimeout(() => setStep('cart'), 300);
      return () => clearTimeout(t);
    }
  }, [cartOpen]);
  useEffect(() => {
    if (!lines.length) setStep('cart');
  }, [lines.length]);

  const message = useMemo(() => buildOrderMessage(lines, subtotal, form), [lines, subtotal, form]);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className={`sheet-root ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <div className="sheet-backdrop" onClick={closeCart} />
      <aside ref={ref} role="dialog" aria-modal="true" aria-labelledby="cart-title" tabIndex={-1} className="sheet-right">
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
          <div className="flex items-center gap-2">
            {step === 'order' && (
              <button type="button" className="icon-btn -ml-2" onClick={() => setStep('cart')} aria-label="Volver al pedido">
                <IconArrowLeft size={20} />
              </button>
            )}
            <h2 id="cart-title" className="font-display text-[26px] leading-none text-ink">
              {step === 'cart' ? 'Tu pedido' : 'Preparar envío'}
            </h2>
            {step === 'cart' && count > 0 && <span className="tabular rounded-full bg-mist px-2 py-0.5 text-[13px] font-medium text-ink">{count}</span>}
          </div>
          <button type="button" onClick={closeCart} className="icon-btn -mr-2" aria-label="Cerrar pedido">
            <IconClose />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="empty-mark" aria-hidden="true">
              <IconBag size={34} />
            </div>
            <p className="mt-6 font-display text-[28px] leading-tight text-ink">Tu pedido está vacío</p>
            <p className="mt-2 max-w-xs text-[15px] text-muted">Agregá productos desde el catálogo. Después lo enviás por WhatsApp y un asesor confirma disponibilidad.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SPECIALTIES.map((s) => (
                <a key={s.slug} href={catalogHref(s.slug)} onClick={closeCart} className="chip">
                  {s.short}
                </a>
              ))}
            </div>
          </div>
        ) : step === 'cart' ? (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 md:px-7" aria-label="Productos en el pedido">
              {lines.map((l) => (
                <Line key={l.key} line={l} />
              ))}
            </ul>
            <footer className="border-t border-line bg-paper px-5 pb-5 pt-4 md:px-7">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] text-ink">Subtotal estimado</span>
                <span className="tabular text-[24px] font-semibold text-ink">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">IVA incluido. Disponibilidad, entrega y forma de pago se confirman con un asesor.</p>
              <button type="button" className="btn-primary mt-4 w-full" onClick={() => setStep('order')}>
                <span className="inline-flex items-center gap-2">
                  <IconChat size={19} /> Preparar pedido por WhatsApp
                </span>
              </button>
              <button type="button" className="mt-2 w-full py-2.5 text-[14px] font-medium text-ink underline-offset-4 hover:underline" onClick={closeCart}>
                Seguir explorando
              </button>
            </footer>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">
              <p className="text-[14px] leading-relaxed text-muted">Completá lo que quieras sumar. Vamos a abrir WhatsApp con el mensaje listo; el envío lo hacés vos desde tu teléfono o computadora.</p>
              <div className="mt-5 grid gap-4">
                <div>
                  <label htmlFor="o-name" className="field-label">Nombre y apellido <span className="text-muted">(opcional)</span></label>
                  <input id="o-name" className="field" value={form.name} onChange={upd('name')} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="o-org" className="field-label">Profesión o institución <span className="text-muted">(opcional)</span></label>
                  <input id="o-org" className="field" value={form.org} onChange={upd('org')} placeholder="Ej.: Consultorio odontológico" />
                </div>
                <fieldset>
                  <legend className="field-label">Entrega</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['retiro', 'Retiro en el local', SITE.address],
                      ['envio', 'Consultar envío', 'Lo coordinás con el asesor'],
                    ].map(([v, t, d]) => (
                      <label key={v} className={`choice ${form.delivery === v ? 'is-on' : ''}`}>
                        <input type="radio" name="o-delivery" id={`o-delivery-${v}`} value={v} checked={form.delivery === v} onChange={upd('delivery')} className="sr-only" />
                        <span className="text-[14px] font-medium text-ink">{t}</span>
                        <span className="text-[12px] text-muted">{d}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="o-note" className="field-label">Comentario <span className="text-muted">(opcional)</span></label>
                  <textarea id="o-note" className="field min-h-[76px] py-3" value={form.note} onChange={upd('note')} placeholder="Talles, colores, CUIT para factura…" />
                </div>
              </div>
              <div className="mt-6">
                <p className="label-tech mb-2 text-muted">Vista previa del mensaje</p>
                <pre className="order-preview">{message}</pre>
              </div>
            </div>
            <footer className="grid gap-2 border-t border-line bg-paper px-5 pb-5 pt-4 md:px-7">
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                <span className="inline-flex items-center gap-2">
                  <IconChat size={19} /> Abrir WhatsApp con el pedido <IconArrow size={18} />
                </span>
              </a>
              <button
                type="button"
                className="btn-ghost w-full"
                onClick={async () => {
                  const ok = await copyText(message);
                  setCopied(ok);
                  showToast({ kind: 'info', text: ok ? 'Mensaje copiado. Pegalo en WhatsApp o en un correo.' : 'No se pudo copiar. Seleccioná el texto de la vista previa.' });
                  setTimeout(() => setCopied(false), 1800);
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />} {copied ? 'Copiado' : 'Copiar mensaje'}
                </span>
              </button>
              <p className="text-center text-[12px] text-muted">Destino: WhatsApp {SITE.whatsappDisplay}</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
