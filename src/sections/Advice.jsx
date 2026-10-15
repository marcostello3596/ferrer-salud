import { useState } from 'react';
import { SPECIALTIES } from '../data/categories.js';
import { SITE, whatsappLink } from '../data/site.js';
import { copyText } from '../lib/hooks.js';
import { useStore } from '../lib/store.jsx';
import { IconArrow, IconChat, IconClock, IconCopy, IconMail, IconPhone, IconPin } from '../components/Icons.jsx';

export default function Advice() {
  const { showToast } = useStore();
  const [area, setArea] = useState('');
  const [need, setNeed] = useState('');
  const msg = [
    'Hola, Ferrer Salud. Necesito asesoramiento para elegir un producto.',
    area ? `Especialidad: ${area}` : '',
    need.trim() ? `Lo que necesito: ${need.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <section id="asesoramiento" className="scroll-mt-24 bg-paper py-16 md:py-24" aria-labelledby="adv-title">
      <div className="mx-auto max-w-page px-gutter">
        <div className="advice" data-reveal>
          <div className="advice__art" aria-hidden="true">
            <span className="advice__disc" />
            <svg viewBox="0 0 200 200" className="advice__ring">
              <circle cx="100" cy="100" r="92" />
              {Array.from({ length: 48 }).map((_, i) => {
                const a = (i * 7.5 * Math.PI) / 180;
                const r2 = i % 4 === 0 ? 86 : 89;
                return <line key={i} x1={100 + 92 * Math.cos(a)} y1={100 + 92 * Math.sin(a)} x2={100 + r2 * Math.cos(a)} y2={100 + r2 * Math.sin(a)} />;
              })}
            </svg>
          </div>

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="label-tech text-muted">Asesoramiento</p>
              <h2 id="adv-title" className="display-2 mt-4 text-ink">
                ¿No sabés qué insumo elegir? <em>Lo vemos juntos.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted">
                Contanos para qué lo necesitás y te orientamos entre marcas, presentaciones y equipos. Respondemos por WhatsApp, por teléfono o en el local.
              </p>
              <ul className="mt-8 grid gap-4 text-[15px] text-ink sm:grid-cols-2">
                <li className="flex gap-3">
                  <IconChat size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium">WhatsApp</span>
                    <a className="tabular text-muted hover:text-ink" href={whatsappLink('Hola, quiero hacer una consulta.')} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay}</a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <IconPhone size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium">Teléfono</span>
                    <span className="tabular select-all text-muted">{SITE.phones}</span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <IconMail size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span className="min-w-0">
                    <span className="block font-medium">Email</span>
                    <span className="flex items-center gap-1">
                      <span className="select-all break-all text-muted">{SITE.email}</span>
                      <button
                        type="button"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/60 hover:bg-white hover:text-ink"
                        aria-label="Copiar email"
                        onClick={async () => {
                          const ok = await copyText(SITE.email);
                          showToast({ kind: 'info', text: ok ? 'Email copiado.' : 'Seleccioná el email para copiarlo.' });
                        }}
                      >
                        <IconCopy size={16} />
                      </button>
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <IconPin size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium">{SITE.address}</span>
                    <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">Ciudad de Mendoza · Ver mapa</a>
                  </span>
                </li>
                <li className="flex gap-3 sm:col-span-2">
                  <IconClock size={20} className="mt-0.5 shrink-0 text-brand" />
                  <span className="text-muted">
                    <span className="font-medium text-ink">Horario</span> · Lunes a viernes de 9 a 17 h · Sábados de 9 a 13 h
                  </span>
                </li>
              </ul>
            </div>

            <form
              className="advice__form lg:col-span-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="font-display text-[26px] leading-tight text-ink">Armá tu consulta</p>
              <p className="mt-1 text-[14px] text-muted">Se abre WhatsApp con el texto listo para enviar.</p>
              <fieldset className="mt-6">
                <legend className="field-label">¿Para qué especialidad?</legend>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => (
                    <label key={s.slug} className={`chip cursor-pointer ${area === s.name ? 'is-on' : ''}`}>
                      <input type="radio" name="adv-area" id={`adv-${s.slug}`} value={s.name} checked={area === s.name} onChange={() => setArea(s.name)} className="sr-only" />
                      {s.short}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label htmlFor="adv-need" className="field-label mt-5">¿Qué necesitás resolver?</label>
              <textarea
                id="adv-need"
                className="field min-h-[112px] py-3"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="Ej.: busco una lámpara de fotocurado inalámbrica para el consultorio"
              />
              <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
                <span className="inline-flex items-center gap-2">
                  <IconChat size={19} /> Enviar por WhatsApp <IconArrow size={18} />
                </span>
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
