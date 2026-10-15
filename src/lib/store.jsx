import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { productById, unitPrice } from '../data/products.js';

const KEY = 'ferrer-pedido-v1';
const Ctx = createContext(null);

const lineKey = (id, variant) => (variant ? `${id}::${variant}` : id);

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.items;
    case 'add': {
      const key = lineKey(action.id, action.variant);
      const found = state.find((l) => l.key === key);
      if (found) return state.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + action.qty) } : l));
      return [...state, { key, id: action.id, variant: action.variant || null, qty: action.qty }];
    }
    case 'set':
      return state.map((l) => (l.key === action.key ? { ...l, qty: Math.max(1, Math.min(99, action.qty)) } : l));
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    case 'restore': {
      const next = state.slice();
      next.splice(Math.min(action.index, next.length), 0, action.line);
      return next;
    }
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [bump, setBump] = useState(0);
  const [query, setQuery] = useState('');
  const hydrated = useRef(false);
  const toastTimer = useRef(null);

  // El pedido se recuerda solo en este navegador (comodidad del visitante).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw).filter((l) => productById[l.id]);
        if (saved.length) dispatch({ type: 'hydrate', items: saved });
      }
    } catch (e) {
      /* almacenamiento no disponible */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      /* almacenamiento no disponible */
    }
  }, [items]);

  const showToast = useCallback((t) => {
    clearTimeout(toastTimer.current);
    setToast({ ...t, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), t.duration || 4200);
  }, []);

  const add = useCallback(
    (product, qty = 1, variant = null) => {
      dispatch({ type: 'add', id: product.id, qty, variant });
      setBump((b) => b + 1);
      showToast({ kind: 'added', productId: product.id, qty, variant });
    },
    [showToast]
  );

  const remove = useCallback(
    (key) => {
      const index = items.findIndex((l) => l.key === key);
      const line = items[index];
      dispatch({ type: 'remove', key });
      if (line) showToast({ kind: 'removed', line, index, productId: line.id, duration: 5200 });
    },
    [items, showToast]
  );

  const value = useMemo(() => {
    const lines = items
      .map((l) => ({ ...l, product: productById[l.id] }))
      .filter((l) => l.product);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + unitPrice(l.product) * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      add,
      remove,
      setQty: (key, qty) => dispatch({ type: 'set', key, qty }),
      restore: (line, index) => dispatch({ type: 'restore', line, index }),
      clear: () => dispatch({ type: 'clear' }),
      cartOpen,
      openCart: () => {
        setToast(null);
        setCartOpen(true);
      },
      closeCart: () => setCartOpen(false),
      toast,
      dismissToast: () => setToast(null),
      showToast,
      bump,
      query,
      setQuery,
    };
  }, [items, cartOpen, toast, bump, query, add, remove, showToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
