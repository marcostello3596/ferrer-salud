import { SPECIALTIES } from '../data/categories.js';
import { SITE, whatsappLink } from '../data/site.js';
import { catalogHref } from '../lib/router.js';
import { Logo } from '../components/ui.jsx';

export default function Footer() {
  return (
    <footer id="contacto" className="site-footer bg-ink text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Contacto y navegación</h2>
      <div className="mx-auto max-w-page px-gutter pb-10 pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="w-[150px]" />
            <p className="mt-6 max-w-xs font-display text-[26px] leading-tight text-white">Precisión que cuida, desde Mendoza.</p>
          </div>
          <nav aria-label="Especialidades" className="lg:col-span-2">
            <p className="label-tech text-white/50">Especialidades</p>
            <ul className="mt-4 grid gap-2.5 text-[15px]">
              {SPECIALTIES.map((s) => (
                <li key={s.slug}><a className="footer-link" href={catalogHref(s.slug)}>{s.name}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Comprar" className="lg:col-span-2">
            <p className="label-tech text-white/50">Comprar</p>
            <ul className="mt-4 grid gap-2.5 text-[15px]">
              <li><a className="footer-link" href="#catalogo">Catálogo</a></li>
              <li><a className="footer-link" href="#ofertas">Ofertas</a></li>
              <li><a className="footer-link" href="#marcas">Marcas</a></li>
              <li><a className="footer-link" href="#asesoramiento">Asesoramiento</a></li>
            </ul>
          </nav>
          <address className="not-italic lg:col-span-4">
            <p className="label-tech text-white/50">Contacto</p>
            <ul className="mt-4 grid gap-2.5 text-[15px] text-white/85">
              <li>
                <a className="footer-link" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.address}, {SITE.city}
                </a>
              </li>
              <li>
                WhatsApp{' '}
                <a className="footer-link tabular" href={whatsappLink('Hola, quiero hacer una consulta.')} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                Email <span className="select-all">{SITE.email}</span>
              </li>
              <li className="tabular">Tel. {SITE.phones}</li>
              <li className="text-white/60">Lunes a viernes 9 a 17 h · Sábados 9 a 13 h</li>
            </ul>
          </address>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12.5px] leading-relaxed text-white/55 md:flex-row md:justify-between">
          <p>
            © 2026 {SITE.legalName}. {SITE.pricesNote} {SITE.imagesNote}
          </p>
          <p>
            Maqueta de propuesta. Precios y stock de referencia relevados el {SITE.snapshotDate}; los textos de muestra están señalados.
          </p>
        </div>
      </div>
    </footer>
  );
}
