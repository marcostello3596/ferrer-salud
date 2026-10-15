import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Aparición progresiva: el contenido es visible por defecto. Solo se "arma" la animación
// para elementos que todavía están por debajo del pliegue, y se dispara antes de entrar.
export function useReveal(key) {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll('[data-reveal]:not([data-reveal-done])'));
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in');
            e.target.setAttribute('data-reveal-done', '');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px 8% 0px', threshold: 0 }
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh * 1.05) {
        el.classList.add('reveal-armed');
        io.observe(el);
      } else {
        el.setAttribute('data-reveal-done', '');
      }
    });
    return () => io.disconnect();
  }, [key]);
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return scrolled;
}

// Gestión de foco para paneles modales: enfoca, atrapa Tab, cierra con Escape y devuelve el foco.
export function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const node = ref.current;
    const focusables = () =>
      Array.from(
        node?.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const t = setTimeout(() => {
      const auto = node?.querySelector('[data-autofocus]');
      (auto || focusables()[0] || node)?.focus({ preventScroll: true });
    }, 30);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (prev && prev.focus) prev.focus({ preventScroll: true });
    };
  }, [open, onClose]);
  return ref;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}
