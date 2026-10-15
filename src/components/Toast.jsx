import { useStore } from '../lib/store.jsx';
import { productById } from '../data/products.js';
import { IconCheck, IconClose, IconInfo } from './Icons.jsx';
import { Img } from './ui.jsx';

export default function Toast() {
  const { toast, dismissToast, openCart, restore, cartOpen } = useStore();
  const p = toast?.productId ? productById[toast.productId] : null;
  return (
    <div className={`toast-region ${cartOpen ? 'is-top' : ''}`} aria-live="polite" aria-atomic="true">
      {toast && (
        <div key={toast.id} className="toast" role="status">
          {toast.kind === 'added' && p && (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 p-1">
                <Img src={p.images[0].src} alt="" w={p.images[0].w} h={p.images[0].h} className="h-full w-full" imgClassName="h-full w-full object-contain" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-lime">
                  <IconCheck size={14} /> Agregado al pedido
                </span>
                <span className="block truncate text-[14px] text-white">
                  {toast.qty > 1 ? `${toast.qty} × ` : ''}
                  {p.title}
                  {toast.variant ? ` · ${toast.variant}` : ''}
                </span>
              </span>
              <button type="button" className="toast-action" onClick={() => { dismissToast(); openCart(); }}>
                Ver pedido
              </button>
            </>
          )}
          {toast.kind === 'removed' && p && (
            <>
              <span className="min-w-0 flex-1 text-[14px] text-white">
                Quitaste <strong className="font-medium">{p.title}</strong>
              </span>
              <button type="button" className="toast-action" onClick={() => { restore(toast.line, toast.index); dismissToast(); }}>
                Deshacer
              </button>
            </>
          )}
          {toast.kind === 'info' && (
            <span className="flex min-w-0 flex-1 items-center gap-2 text-[14px] text-white">
              <IconInfo size={18} className="shrink-0 text-lime" /> {toast.text}
            </span>
          )}
          <button type="button" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" onClick={dismissToast} aria-label="Cerrar aviso">
            <IconClose size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
