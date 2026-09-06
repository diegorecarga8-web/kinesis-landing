import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_COL = [
  { title: "Sin cruces", desc: "Dos citas del mismo fisioterapeuta nunca se superponen." },
  { title: "Historia clínica", desc: "Evaluación, tratamiento y evolución, todo en un lugar." },
  { title: "Roles y permisos", desc: "Cada persona entra con su propio usuario y nivel de acceso." },
];

const RIGHT_COL = [
  { title: "Recordatorios", desc: "Confirmación y aviso automático antes de cada cita." },
  { title: "Google Calendar", desc: "Cada fisioterapeuta ve sus citas en su propio calendario." },
  { title: "Exportar a Excel", desc: "Pacientes y agenda, descargables cuando los necesites." },
];

function Column({ items, direction }: { items: typeof LEFT_COL; direction: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: direction * 120,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {items.map((item) => (
        <div
          key={item.title}
          className="aspect-square max-w-[280px] rounded-3xl border border-stroke bg-surface p-6 flex flex-col justify-end"
        >
          <h4 className="font-display italic text-xl text-text-primary mb-2">{item.title}</h4>
          <p className="text-sm text-muted">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function Explorations() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current!.closest("section"),
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[220vh]">
      <div ref={contentRef} className="h-screen flex items-center justify-center relative z-10 pointer-events-none">
        <div className="text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted tracking-[0.3em]">Por dentro</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-text-primary">
            Cada detalle, <span className="italic">a propósito</span>
          </h2>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-2 gap-10 md:gap-24 max-w-[900px] w-full px-6">
          <Column items={LEFT_COL} direction={-1} />
          <Column items={RIGHT_COL} direction={1} />
        </div>
      </div>
    </section>
  );
}
