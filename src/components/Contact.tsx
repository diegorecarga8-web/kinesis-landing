import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contacto" className="bg-bg pt-20 md:pt-28 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      <div className="overflow-hidden mb-20 md:mb-28">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl font-display italic text-stroke px-6"
              style={{ WebkitTextStroke: "1px hsl(0 0% 20%)" }}
            >
              CONSTRUIMOS SISTEMAS QUE FUNCIONAN •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display text-text-primary mb-8">
          ¿Hablamos de <span className="italic">tu sistema?</span>
        </h2>
        <a
          href="mailto:diegorecarga8@gmail.com?subject=Quiero%20hablar%20de%20un%20sistema"
          className="inline-flex items-center gap-2 rounded-full border-2 border-stroke px-8 py-4 text-text-primary hover:border-transparent transition-all relative group"
        >
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          diegorecarga8@gmail.com
        </a>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between flex-wrap gap-4 text-sm text-muted">
        <a
          href="https://github.com/diegorecarga8-web"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          GitHub
        </a>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2f6e56] animate-pulse" />
          Disponible para proyectos nuevos
        </div>
      </div>
    </footer>
  );
}
