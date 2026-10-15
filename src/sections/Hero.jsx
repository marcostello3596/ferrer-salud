import { productById } from '../data/products.js';
import { specialtyBySlug } from '../data/categories.js';
import { SITE, whatsappLink } from '../data/site.js';
import { money } from '../lib/format.js';
import { productHref } from '../lib/router.js';
import { unitPrice } from '../data/products.js';
import SearchBox from '../components/SearchBox.jsx';
import { IconArrow, IconChat } from '../components/Icons.jsx';

// Bodegón: productos reales del catálogo, recortados. Coordenadas en % del escenario (cuadrado).
const STILL = [
  { id: '26798', img: 'assets/p/26798_7706.webp', w: 575, h: 516, x: 2, y: 14, width: 50, rot: -16, z: 3, delay: 0.25, alt: 'Lámpara de fotocurado Woodpecker' },
  { id: '23459', img: 'assets/p/23459_659.webp', w: 316, h: 617, x: 45, y: 6, width: 29, rot: -9, z: 2, delay: 0.35, alt: 'Estetoscopio Littmann Classic III azul marino' },
  { id: '18897', img: 'assets/p/18897_7170.webp', w: 610, h: 248, x: 62, y: 33, width: 36, rot: -28, z: 4, delay: 0.5, alt: 'Alicate Germania para uñas encarnadas' },
  { id: '26327', img: 'assets/p/26327_5731.webp', w: 576, h: 465, x: 6, y: 56, width: 44, rot: 0, z: 5, delay: 0.45, alt: 'Tensiómetro digital Omron' },
  { id: '24326', img: 'assets/p/24326_5799.webp', w: 560, h: 330, x: 50, y: 71, width: 40, rot: -14, z: 6, delay: 0.6, alt: 'Jeringa de composite Spectra Smart' },
];

// Etiquetas técnicas: punto de anclaje sobre el producto (ax, ay) y posición del rótulo (lx, ly).
const LABELS = [
  { id: '26798', ax: 15, ay: 24, lx: 1, ly: 3.5, align: 'left', mobile: true },
  { id: '23459', ax: 63, ay: 62, lx: 99, ly: 52, align: 'right', mobile: false },
  { id: '18897', ax: 83, ay: 37, lx: 99, ly: 14, align: 'right', mobile: true },
  { id: '26327', ax: 24, ay: 76, lx: 1, ly: 97, align: 'left', mobile: false, bottom: true },
  { id: '24326', ax: 75, ay: 82, lx: 99, ly: 97, align: 'right', mobile: true, bottom: true },
];

const SHORT = {
  '26798': 'Lámpara LED D',
  '23459': 'Littmann Classic III',
  '18897': 'Alicate Germania 1603',
  '26327': 'Omron HEM-7142',
  '24326': 'Spectra Smart 4 g',
};

function Ring() {
  // Disco lima + aro calibrado (60 marcas, mayores cada 30°) con un tramo libre para el rótulo.
  const cx = 53;
  const cy = 50;
  const ticks = [];
  for (let i = 0; i < 72; i++) {
    const deg = i * 5 - 90;
    const major = i % 6 === 0;
    const r1 = 41.2;
    const r2 = major ? 43.6 : 42.3;
    const a = (deg * Math.PI) / 180;
    ticks.push(
      <line
        key={i}
        x1={(cx + r1 * Math.cos(a)).toFixed(2)}
        y1={(cy + r1 * Math.sin(a)).toFixed(2)}
        x2={(cx + r2 * Math.cos(a)).toFixed(2)}
        y2={(cy + r2 * Math.sin(a)).toFixed(2)}
        className={major ? 'tick tick--major' : 'tick'}
      />
    );
  }
  return (
    <svg className="hero-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx={cx} cy={cy} r="35" className="hero-disc" />
      <circle cx={cx} cy={cy} r="41.2" className="hero-orbit" pathLength="100" />
      <g className="hero-ticks">{ticks}</g>
    </svg>
  );
}

function Stage() {
  return (
    <div className="hero-stage" aria-label="Bodegón con productos del catálogo">
      <Ring />
      {STILL.map((s) => (
        <a
          key={s.id}
          href={productHref(productById[s.id])}
          className="still-item"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.width}%`,
            zIndex: s.z,
            '--rot': `${s.rot}deg`,
            '--d': `${s.delay}s`,
          }}
        >
          <img src={s.img} width={s.w} height={s.h} alt={s.alt} decoding="async" fetchpriority={s.z > 4 ? 'high' : undefined} />
        </a>
      ))}
      <svg className="hero-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {LABELS.map((l, i) => {
          const ex = l.align === 'left' ? l.lx + 1 : l.lx - 1;
          const ey = l.bottom ? l.ly - 4.6 : l.ly + 4.6;
          return (
            <polyline
              key={l.id}
              className={`leader ${l.mobile ? '' : 'leader--desk'}`}
              style={{ '--i': i }}
              points={`${l.ax},${l.ay} ${l.ax},${ey} ${ex},${ey}`}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {LABELS.map((l, i) => {
        const p = productById[l.id];
        const sp = specialtyBySlug[p.specialty];
        return (
          <span key={l.id} className={l.mobile ? '' : 'max-md:hidden'}>
            <span className="leader-dot" style={{ left: `${l.ax}%`, top: `${l.ay}%`, '--i': i }} aria-hidden="true" />
            <a
              href={productHref(p)}
              className={`hero-label hero-label--${l.align} ${l.bottom ? 'hero-label--bottom' : ''}`}
              style={{ left: `${l.lx}%`, top: `${l.ly}%`, '--i': i }}
            >
              <span className="label-tech text-muted">
                {sp.code} · {p.id}
              </span>
              <span className="hero-label__name">{SHORT[p.id]}</span>
              <span className="hero-label__price tabular">{money(unitPrice(p))}</span>
            </a>
          </span>
        );
      })}
    </div>
  );
}

function Facts({ className = '' }) {
  return (
    <dl className={`hero-facts mt-8 grid-cols-3 gap-4 border-t border-line pt-5 md:mt-12 ${className}`}>
      <div>
        <dt className="label-tech text-muted">Marcas</dt>
        <dd className="tabular mt-1 font-display text-[26px] leading-none text-ink md:text-[30px]">{SITE.brandsCount}</dd>
      </div>
      <div>
        <dt className="label-tech text-muted">Familias</dt>
        <dd className="tabular mt-1 font-display text-[26px] leading-none text-ink md:text-[30px]">{SITE.familiesCount}</dd>
      </div>
      <div>
        <dt className="label-tech text-muted">Local</dt>
        <dd className="mt-1 text-[14px] font-medium leading-tight text-ink md:text-[15px]">
          San Lorenzo 260
          <span className="block font-normal text-muted">Mendoza</span>
        </dd>
      </div>
    </dl>
  );
}

export default function Hero() {
  return (
    <section className="hero relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-page items-center gap-y-8 px-gutter pb-10 pt-8 md:pb-16 md:pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pt-14">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <p className="hero-eyebrow label-tech text-ink/70">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime align-middle ring-1 ring-ink/20" aria-hidden="true" />
            Insumos y equipamiento para la salud · Mendoza
          </p>
          <h1 id="hero-title" className="hero-title mt-5 text-ink">
            <span className="hero-line"><span>Todo para</span></span>
            <span className="hero-line"><span><em>cuidar</em></span></span>
            <span className="hero-line"><span>mejor<span className="hero-dot" aria-hidden="true" /><span className="sr-only">.</span></span></span>
          </h1>
          <p className="hero-copy mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink/75 md:text-[18px]">
            Insumos y equipamiento para odontología, medicina, podología y ortopedia. Desde Mendoza, cerca de tu práctica.
          </p>
          <div className="hero-cta mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
            <a href="#catalogo" className="btn-primary">
              <span className="inline-flex items-center gap-2">
                Explorar productos <IconArrow size={18} className="max-sm:hidden" />
              </span>
            </a>
            <a href={whatsappLink('Hola, necesito asesoramiento para elegir un producto.')} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <span className="inline-flex items-center gap-2">
                <IconChat size={19} className="max-sm:hidden" /> Hablar con un asesor
              </span>
            </a>
          </div>
          <Facts className="hidden lg:grid" />
        </div>
        <div className="relative lg:col-span-6 xl:col-span-7">
          <Stage />
        </div>
        <div className="lg:hidden">
          <div className="md:hidden">
            <SearchBox variant="hero" inputId="q-hero" />
          </div>
          <Facts className="grid" />
        </div>
      </div>
    </section>
  );
}
