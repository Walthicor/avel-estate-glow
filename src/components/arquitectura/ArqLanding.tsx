import { useCallback, useEffect, useRef, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { AvelLogo } from "../brand/AvelLogo";
import { SITE } from "../../config/site";
import {
  ARQ_IMAGES, CITIES_LINE, COMMITMENTS, heroFor, HERO_BY_SERVICE, IMAGINE, srcSetFor, COMPARISON, FAQS, PACKAGES, PROBLEMS, REASONS, SERVICES, STATS, STEPS, TESTIMONIALS,
  type ServiceTab,
} from "../../content/arquitectura";
import { Calculator } from "./Calculator";
import { CompareSlider } from "./CompareSlider";
import { Projects } from "./Projects";
import { QuoteForm } from "./QuoteForm";
import { captureAttribution } from "../../lib/attribution";
import { trackEvent } from "../../lib/analytics";
import { CountUp, DrawIcon, MaskWords, RiseIn } from "./motion";
import { QuoteBuddy } from "../landing/QuoteBuddy";
import { ArqTitle, Rotulo, WaIcon, btnGold, btnLine, onWaClick, waLink, type GoQuote, type Prefill } from "./shared";

const wrap = "mx-auto max-w-[1240px]";
const sec = "px-5 py-20 md:px-10 md:py-28";

export function ArqLanding() {
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const goQuote: GoQuote = useCallback((p) => {
    if (p) setPrefill({ ...p, nonce: Date.now() });
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const wa = waLink("Hola AVEL Arquitectura, quiero información para mi proyecto.");
  const { servicio } = useSearch({ strict: false }) as { servicio?: string };
  const hero = heroFor(servicio);
  const reduce = useReducedMotion();

  useEffect(() => {
    captureAttribution();
    const pre = servicio ? HERO_BY_SERVICE[servicio]?.prefill : undefined;
    if (pre) setPrefill({ ...pre, keepStep: true, nonce: Date.now() });
  }, [servicio]);

  return (
    <div className="arq-body bg-obra pb-20 text-hueso md:pb-0">
      {/* Barra superior */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-hueso/10 bg-obra/90 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between px-5 md:px-10`}>
          <a href="#inicio" className="flex items-center gap-3" aria-label="AVEL Arquitectura, ir al inicio">
            <AvelLogo className="h-9!" />
            <span className="arq-mono text-[10px] text-gold sm:text-[11px]">Arquitectura</span>
          </a>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => goQuote()} className="avel-pulse rounded-full bg-oro px-5 py-2.5 text-[14px] font-medium text-obra hover:brightness-110">Cotizar</button>
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" onClick={onWaClick} aria-label="Escribir por WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-hueso/20 text-gold hover:border-gold"><WaIcon /></a>
            ) : null}
          </div>
        </div>
      </header>

      {/* 1. Héroe */}
      <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.img
          src={ARQ_IMAGES.hero} srcSet={srcSetFor(ARQ_IMAGES.hero)} sizes="100vw"
          alt="Casa Rengifo terminada: casa moderna de tres niveles con jardín en Popayán" fetchPriority="high" width={1290} height={1165}
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] will-change-transform"
          initial={{ scale: 1 }} animate={reduce ? { scale: 1 } : { scale: 1.08 }} transition={{ duration: 12, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obra via-obra/75 to-obra/30" aria-hidden="true" />
        <div className={`${wrap} relative w-full px-5 pb-16 pt-32 md:px-10 md:pb-24`}>
          <Rotulo>Para quienes van a construir una vez y quieren hacerlo bien</Rotulo>
          <h1 className={`arq-display mt-5 break-words ${hero.h1.length > 30 ? "max-w-[18ch] text-[clamp(38px,7vw,96px)]" : "max-w-[12ch] text-[clamp(48px,10vw,120px)]"}`}>
            <MaskWords key={hero.h1} text={hero.h1} gold={hero.gold} goldCls="text-oro" onMount delay={0.15} />
          </h1>
          <RiseIn delay={0.7}>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-hueso/85 md:text-[19px]">{hero.sub}</p>
          </RiseIn>
          <RiseIn delay={0.9} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#calculadora" className={btnGold}>Calcular mi proyecto gratis</a>
            {wa ? <a href={wa} target="_blank" rel="noreferrer" onClick={onWaClick} className={btnLine}><WaIcon /> Hablar con nuestro equipo</a> : null}
          </RiseIn>
          <p className="arq-mono mt-5 text-[11px] text-hueso/70">Gratis · 3 minutos · Te respondemos en menos de 24 horas hábiles</p>
        </div>
      </section>

      {/* 2. Cifras */}
      <section className="border-y border-hueso/10 bg-carbon px-5 py-14 md:px-10">
        <div className={wrap}>
          <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-hueso/10 pl-5">
                <dd className="arq-display text-[clamp(30px,4.5vw,56px)] text-oro">
                  {s.fixed ? s.num : <CountUp to={s.num} prefix={s.prefix} suffix={s.suffix} plain={s.plain} />}
                </dd>
                <dt className="arq-mono mt-2 text-[11px] text-hueso/70">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="arq-mono mt-10 text-center text-[11px] text-hueso/60">{CITIES_LINE}</p>
        </div>
      </section>

      {/* 3. La realidad (dolor) */}
      <section className={`${sec} bg-hueso text-obra`}>
        <div className={wrap}>
          <Rotulo light>(01) — La realidad</Rotulo>
          <ArqTitle light text="Así empiezan casi todas las obras que terminan mal" gold="terminan mal" className="mt-4 max-w-[20ch] text-[clamp(34px,6vw,76px)]" />
          <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-obra/75">Nadie empieza a construir pensando que le va a salir mal. Pero en Colombia la historia se repite una y otra vez:</p>
          <ol className="mt-12 border-t border-obra/20">
            {PROBLEMS.map((p, i) => (
              <li key={p.t} className="grid gap-3 border-b border-obra/20 py-7 md:grid-cols-[72px_1fr_1fr] md:gap-8">
                <span className="arq-mono text-[13px] text-oro-ink">0{i + 1}</span>
                <h3 className="arq-display text-[clamp(20px,2.4vw,28px)] leading-tight">{p.t}</h3>
                <p className="text-[16px] leading-relaxed text-obra/75">{p.d}</p>
              </li>
            ))}
          </ol>
          <p className="arq-display mt-16 max-w-[24ch] text-[clamp(28px,4.5vw,58px)] leading-tight">
            Un error en planos se corrige con un borrador. El mismo error en obra se corrige con un martillo… <span className="text-oro-ink">y con tu plata.</span>
          </p>
          <p className="arq-mono mt-8 text-[13px] text-oro-ink">Por eso no empezamos ninguna obra sin tenerla resuelta en papel.</p>
        </div>
      </section>

      {/* 4. Solución */}
      <section className={sec}>
        <div className={wrap}>
          <Rotulo>(02) — La solución</Rotulo>
          <ArqTitle text="Primero la construimos en papel. Después en tu lote." gold="en papel." className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-hueso/80">
            Antes de poner un ladrillo, tu proyecto ya existe completo: diseñado, calculado, presupuestado actividad por actividad y programado semana a semana. Un solo equipo responde por todo. Tú tomas las decisiones importantes con la información en la mano.
          </p>
          <div className="mt-12">
            <CompareSlider
              before={ARQ_IMAGES.render} after={ARQ_IMAGES.obra}
              beforeLabel="Render 3D" afterLabel="Obra entregada"
              beforeAlt="Render 3D de la fachada posterior de la Casa Rengifo" afterAlt="Casa Rengifo terminada, fachada posterior con jardín en Popayán"
            />
            <p className="arq-mono mt-4 text-center text-[11px] leading-relaxed text-hueso/60">Casa Rengifo · 644 m² · Popayán. Así la diseñamos. Así la entregamos.</p>
          </div>
        </div>
      </section>

      {/* 5. Imagina */}
      <section className="border-t border-hueso/10 bg-carbon px-5 py-20 md:px-10 md:py-28">
        <div className={wrap}>
          <Rotulo>Imagina esto</Rotulo>
          <ul className="mt-8 grid gap-8">
            {IMAGINE.map((t, i) => (
              <li key={t}>
                <RiseIn delay={i * 0.15}>
                  <p className="arq-display max-w-[24ch] text-[clamp(26px,4.2vw,54px)] leading-tight">{t}</p>
                </RiseIn>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-[18px] text-hueso/80">Eso es construir con un plan. <span className="text-oro">Eso es lo que hacemos.</span></p>
        </div>
      </section>

      {/* 6. Servicios */}
      <Services goQuote={goQuote} />

      {/* 7. Calculadora */}
      <Calculator goQuote={goQuote} />

      {/* 8. Proyectos */}
      <Projects goQuote={goQuote} />

      {/* 9. Desde Popayán */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <img src={ARQ_IMAGES.popayan} srcSet={srcSetFor(ARQ_IMAGES.popayan)} sizes="100vw" alt="" aria-hidden="true" loading="lazy" width={1402} height={1122} className="absolute inset-0 h-full w-full object-cover grayscale" />
        <div className="absolute inset-0 bg-obra/85" aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <Rotulo>(06) — Desde Popayán</Rotulo>
          <ArqTitle text="Venimos de la ciudad que le enseñó a Colombia a construir bien" gold="a construir bien" className="mt-4 max-w-[20ch] text-[clamp(32px,5.5vw,72px)]" />
          <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-hueso/85">
            El 31 de marzo de 1983, un terremoto destruyó buena parte de Popayán. De esa tragedia nació el primer código sismorresistente del país. Aquí la seguridad estructural no es un requisito más: es memoria. Ese es el estándar con el que diseñamos cada proyecto, en cualquier ciudad.
          </p>
        </div>
      </section>

      {/* 10. Dirección */}
      <section className={`${sec} bg-carbon`}>
        <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div>
            <Rotulo>(07) — Quién dirige tus proyectos</Rotulo>
            <ArqTitle text="Tu proyecto lo dirige alguien que piensa como inversionista" gold="como inversionista" className="mt-4 text-[clamp(32px,5vw,64px)]" />
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-hueso/80">
              Nuestros proyectos los dirige un arquitecto que no solo diseña: ha sido promotor y gerente de edificios completos, como el Popayán Trade Center. Por eso trata tu proyecto como lo que es: una inversión que tiene que cuadrar.
            </p>
            <ul className="arq-mono mt-8 grid gap-3 text-[12px] text-hueso/75">
              <li>Arquitecto · Universidad de San Buenaventura, Cali</li>
              <li>Especialista en Gerencia de la Construcción · Pontificia Universidad Javeriana, Cali</li>
              <li>MBA · Universidad Externado de Colombia</li>
              <li>Promotor y gerente de proyectos desde 2014</li>
            </ul>
          </div>
          <div className="rounded-[4px] border border-hueso/10 p-8 md:p-12">
            <p className="arq-display text-[clamp(36px,5.5vw,72px)] text-oro">+$84.000 millones</p>
            <p className="arq-mono mt-3 text-[12px] text-hueso/80">en proyectos gestionados</p>
            <p className="mt-6 text-[13px] text-hueso/60">Incluye proyectos entregados, en obra y en desarrollo.</p>
          </div>
        </div>
      </section>

      {/* 11. Por qué elegirnos */}
      <section className={sec}>
        <div className={wrap}>
          <Rotulo>(08) — Por qué elegirnos</Rotulo>
          <ArqTitle text="Por qué nos eligen quienes construyen una sola vez" gold="una sola vez" className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-hueso/10 md:grid-cols-3">
            {REASONS.map((r, i) => (
              <li key={r.t} className="bg-obra p-7">
                <span className="arq-mono text-[12px] text-gold">0{i + 1}</span>
                <h3 className="arq-display mt-3 text-[20px]">{r.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-hueso/75">{r.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="arq-mono text-[11px]">
                  <th scope="col" className="py-4 pr-4 font-normal text-hueso/50"><span className="sr-only">Aspecto</span></th>
                  <th scope="col" className="py-4 pr-4 font-normal text-hueso/60">Construir como casi todos</th>
                  <th scope="col" className="py-4 font-normal text-oro">Construir con AVEL Arquitectura</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([k, a, b]) => (
                  <tr key={k} className="border-t border-hueso/10">
                    <th scope="row" className="py-5 pr-4 text-[15px] font-medium">{k}</th>
                    <td className="py-5 pr-4 text-[15px] text-hueso/60">{a}</td>
                    <td className="py-5 text-[15px]"><span className="mr-2 text-oro" aria-hidden="true">✓</span>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12. Paquetes */}
      <section className={`${sec} bg-hueso text-obra`}>
        <div className={wrap}>
          <Rotulo light>(09) — Paquetes</Rotulo>
          <ArqTitle light text="Elige hasta dónde quieres tener el control" gold="tener el control" className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
          <div className="mt-14 grid items-center gap-6 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <article key={p.id} className={`flex flex-col rounded-[4px] bg-paper p-8 ${p.recommended ? "border-2 border-oro-ink lg:py-14" : "border border-obra/15"}`}>
                {p.recommended ? <span className="arq-mono mb-4 self-start rounded-full bg-oro px-3 py-1 text-[10px] text-obra">Recomendado</span> : null}
                <h3 className="arq-display text-[28px]">{p.name}</h3>
                <p className="mt-3 text-[15px] font-medium">{p.for}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-obra/75">{p.includes}</p>
                {p.note ? <p className="mt-3 text-[15px] italic text-oro-ink">{p.note}</p> : null}
                <button type="button" onClick={() => goQuote({ packages: [p.id], ...(p.developer ? { projectType: "Desarrollador" } : {}) })}
                  className={`mt-8 self-start rounded-full px-6 py-3.5 text-[15px] font-medium ${p.recommended ? "bg-obra text-hueso" : "border border-obra text-obra hover:bg-obra hover:text-hueso"}`}>
                  {p.cta}
                </button>
              </article>
            ))}
          </div>
          <p className="arq-display mt-14 max-w-[30ch] text-[clamp(22px,3vw,36px)] leading-snug">
            El diseño y la planeación son una fracción pequeña del costo de una obra. <span className="text-oro-ink">Un solo error en obra puede costar más que todos los diseños juntos.</span>
          </p>
          <p className="mt-6 max-w-[70ch] text-[15px] text-obra/75">Cobramos por metro cuadrado según el paquete y el terreno. Te enviamos una propuesta con el valor total y los pagos por etapa.</p>
        </div>
      </section>

      {/* 13. Cómo trabajamos */}
      <section className={sec}>
        <div className={wrap}>
          <Rotulo>(10) — Cómo trabajamos</Rotulo>
          <ArqTitle text="De tu lote a tus llaves, sin perderte en el camino" gold="sin perderte" className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
          <Steps />
        </div>
      </section>

      {/* 14. Constructoras */}
      <section className="bg-oro px-5 py-16 text-obra md:px-10 md:py-20">
        <div className={`${wrap} flex flex-col gap-8 md:flex-row md:items-end md:justify-between`}>
          <div>
            <p className="arq-display max-w-[22ch] text-[clamp(28px,4vw,52px)] leading-tight">¿Tu proyecto depende de que los números cuadren?</p>
            <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-obra/85">
              Cada mes de atraso son intereses del crédito constructor y utilidad que se evapora. Cada actividad mal presupuestada es margen perdido. Hemos sido promotores y gerentes de edificios de más de 8.000 m²: planeamos tu proyecto como si nuestra plata estuviera adentro.
            </p>
          </div>
          <button type="button" onClick={() => goQuote({ packages: ["desarrolladores"], projectType: "Desarrollador" })} className="shrink-0 self-start rounded-full bg-obra px-7 py-4 text-[15px] font-medium text-hueso hover:bg-carbon">Agendar reunión</button>
        </div>
      </section>

      {/* 15. Exterior */}
      <section className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
        <img src={ARQ_IMAGES.exterior} srcSet={srcSetFor(ARQ_IMAGES.exterior)} sizes="100vw" alt="Casa campestre Ballesteros iluminada al atardecer en Popayán" loading="lazy" width={1280} height={604} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-obra/80" aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <Rotulo>¿Vives fuera de Colombia?</Rotulo>
          <ArqTitle text="Estás lejos. Tu plata no debería estar a ciegas." gold="a ciegas." className="mt-4 max-w-[18ch] text-[clamp(32px,5.5vw,72px)]" />
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-hueso/85">
            Mandas dinero y no sabes bien en qué se gasta. Las fotos que te envían no muestran la verdad. La obra no avanza y desde allá no puedes hacer nada. Con nosotros tienes presupuesto exacto antes de girar, avances en video cada semana, reuniones por videollamada y firma digital. Construye en tu tierra como si estuvieras aquí.
          </p>
          <button type="button" onClick={() => goQuote({ residence: "Vivo en el exterior" })} className={`${btnGold} mt-8`}>Empezar mi proyecto desde el exterior</button>
        </div>
      </section>

      {/* 16. Compromisos */}
      <section className={sec}>
        <div className={wrap}>
          <Rotulo>(11) — Nuestros compromisos</Rotulo>
          <ArqTitle text="Lo que te prometemos por escrito" gold="por escrito" className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <li key={c.t} className="flex gap-4 rounded-[4px] border border-hueso/10 bg-carbon p-7">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-oro text-obra" aria-hidden="true">✓</span>
                <div>
                  <h3 className="arq-display text-[20px]">{c.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-hueso/75">{c.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 17. Urgencia */}
      <section className="bg-oro px-5 py-12 text-obra md:px-10">
        <div className={`${wrap} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <p className="max-w-[60ch] text-[18px] leading-relaxed">
            <strong className="arq-display text-[22px]">Cada mes que esperas, construir cuesta más.</strong> Los materiales y la mano de obra suben año tras año. Planear hoy es asegurar tus números.
          </p>
          <button type="button" onClick={() => goQuote()} className="shrink-0 self-start rounded-full bg-obra px-7 py-4 text-[15px] font-medium text-hueso hover:bg-carbon md:self-center">Asegurar mis números</button>
        </div>
      </section>

      {/* 18. Testimonios: oculto hasta tener testimonios reales */}
      {TESTIMONIALS.length > 0 ? (
        <section className={sec}>
          <div className={`${wrap} grid gap-6 md:grid-cols-3`}>
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="rounded-[4px] bg-carbon p-7">
                <blockquote className="text-[17px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="arq-mono mt-5 text-[11px] text-oro">{t.author} · {t.project}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* 19. FAQ */}
      <section className={`${sec} bg-hueso text-obra`}>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
          <div>
            <Rotulo light>(12) — Preguntas frecuentes</Rotulo>
            <ArqTitle light text="Lo que más nos preguntan" gold="preguntan" className="mt-4 text-[clamp(32px,5vw,60px)]" />
          </div>
          <div className="border-t border-obra/15">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-obra/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-medium">
                  {f.q}
                  <span className="arq-mono text-oro-ink transition group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-obra/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 20. Cotizador */}
      <QuoteForm prefill={prefill} />

      {/* 21. Cierre */}
      <section className="border-t border-hueso/10 bg-obra px-5 py-20 md:px-10 md:py-28">
        <div className={`${wrap} flex flex-col items-start gap-10`}>
          <ArqTitle text="Vas a construir una sola vez. Hazlo con un plan." gold="Hazlo con un plan." className="max-w-[16ch] text-[clamp(38px,7vw,104px)]" />
          <button type="button" onClick={() => goQuote()} className={btnGold}>Cotizar mi proyecto</button>
        </div>
      </section>

      {/* 22. Pie */}
      <footer className="overflow-hidden border-t border-hueso/10 bg-obra px-5 pb-10 pt-16 md:px-10">
        <p className="arq-display select-none text-center text-[28vw] leading-[0.8] text-oro/15" aria-hidden="true">AVEL</p>
        <div className={`${wrap} mt-10 flex flex-col gap-4 text-[14px] text-hueso/70 md:flex-row md:items-center md:justify-between`}>
          <p>AVEL Arquitectura es una división de AVEL Estates.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {wa ? <a href={wa} target="_blank" rel="noreferrer" onClick={onWaClick} className="text-gold hover:underline">WhatsApp</a> : null}
            <a href={`mailto:${SITE.publicEmail}`} className="text-gold hover:underline">{SITE.publicEmail}</a>
            <a href="/es/legal/privacy" className="hover:text-hueso">Privacidad</a>
            <a href="/es/legal/terms" className="hover:text-hueso">Términos</a>
            <a href="/es/legal/habeas-data" className="hover:text-hueso">Habeas data</a>
          </div>
        </div>
      </footer>

      <QuoteBuddy onClick={() => goQuote()} />
    </div>
  );
}

const TABS: ServiceTab[] = ["Diseñar", "Planear", "Controlar"];

function Services({ goQuote }: { goQuote: GoQuote }) {
  const [tab, setTab] = useState<ServiceTab>("Diseñar");
  const list = SERVICES.filter((s) => s.tab === tab);
  const reduce = useReducedMotion();
  const pick = (s: (typeof SERVICES)[number]) => {
    trackEvent("servicio_elegido", { servicio: s.name });
    goQuote({ services: [s.id] });
  };
  return (
    <section className={`${sec} border-t border-hueso/10`}>
      <div className={wrap}>
        <Rotulo>(03) — Servicios</Rotulo>
        <ArqTitle text="Cada servicio existe para quitarte un riesgo de encima" gold="un riesgo" className="mt-4 max-w-[18ch] text-[clamp(34px,6vw,76px)]" />
        <div role="tablist" aria-label="Tipo de servicio" className="mt-10 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`rounded-full border px-6 py-3 text-[15px] transition ${tab === t ? "border-oro bg-oro text-obra" : "border-hueso/20 hover:border-oro"}`}>
              {t}
            </button>
          ))}
        </div>
        {/* Escritorio: tarjetas */}
        <div role="tabpanel" className="mt-10 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s, i) => (
              <motion.article
                key={`${tab}-${s.id}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="flex flex-col rounded-[4px] border border-hueso/10 bg-carbon p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-oro motion-reduce:hover:translate-y-0"
              >
                <span className="text-gold"><DrawIcon key={`${tab}-${s.id}`} d={s.icon} /></span>
                <h3 className="arq-display mt-5 text-[22px]">{s.name}</h3>
                <ServiceBody s={s} />
                <button type="button" onClick={() => pick(s)} className="avel-pulse mt-6 self-start rounded-full border border-oro px-5 py-2.5 text-[14px] text-oro hover:bg-oro hover:text-obra">Lo necesito</button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        {/* Celular: acordeones */}
        <div className="mt-8 border-t border-hueso/10 md:hidden">
          {list.map((s) => (
            <details key={s.id} className="group border-b border-hueso/10 py-5">
              <summary className="flex cursor-pointer list-none items-center gap-4">
                <span className="text-gold"><DrawIcon key={`${tab}-${s.id}`} d={s.icon} className="h-6 w-6" /></span>
                <span className="arq-display flex-1 text-[18px]">{s.name}</span>
                <span className="arq-mono text-oro transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <ServiceBody s={s} />
              <button type="button" onClick={() => pick(s)} className="avel-pulse mt-5 rounded-full border border-oro px-5 py-2.5 text-[14px] text-oro">Lo necesito</button>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBody({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <div className="mt-4 grid gap-4 text-[15px] leading-relaxed">
      <p className="arq-display text-[18px] leading-snug text-oro">{s.hook}</p>
      <dl className="grid gap-3">
        <div><dt className="arq-mono text-[10px] text-hueso/50">Sin esto</dt><dd className="text-hueso/60">{s.without}</dd></div>
        <div><dt className="arq-mono text-[10px] text-oro">Con nosotros</dt><dd className="text-hueso/90">{s.withUs}</dd></div>
        <div><dt className="arq-mono text-[10px] text-hueso/50">Recibes</dt><dd className="arq-mono text-[11px] leading-relaxed text-hueso/75">{s.get}</dd></div>
      </dl>
    </div>
  );
}

function Steps() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [lit, setLit] = useState(reduce ? STEPS.length : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.floor(v * (STEPS.length - 1) + 0.001) + (v > 0.02 ? 1 : 0)));
  const on = (i: number) => reduce || i < lit;
  return (
    <ol ref={ref} className="relative mt-14 grid gap-0 md:grid-cols-5">
      {/* Línea base y línea dorada que se llena con el scroll */}
      <span className="absolute left-0 top-0 h-full w-px bg-hueso/15 md:h-px md:w-full" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-0 hidden h-px w-full origin-left bg-oro md:block"
        style={reduce ? {} : { scaleX: progress }} aria-hidden="true"
      />
      <motion.span
        className="absolute left-0 top-0 h-full w-px origin-top bg-oro md:hidden"
        style={reduce ? {} : { scaleY: progress }} aria-hidden="true"
      />
      {STEPS.map((s, i) => (
        <li key={s.t} className="relative pb-10 pl-6 md:pb-0 md:pl-0 md:pr-6 md:pt-8">
          <span className={`absolute -left-[4px] top-1 h-[9px] w-[9px] rounded-full transition-[transform,opacity] duration-500 md:-top-[4px] md:left-0 ${on(i) ? "scale-125 bg-oro" : "bg-hueso/30"}`} aria-hidden="true" />
          <div className={`transition-opacity duration-500 ${on(i) ? "opacity-100" : "opacity-40"}`}>
            <span className="arq-mono text-[12px] text-oro">0{i + 1}</span>
            <h3 className="arq-display mt-2 text-[19px]">{s.t}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-hueso/70">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
