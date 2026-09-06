import { useEffect, useState } from "react";
import gsap from "gsap";
import HeroVisual from "./HeroVisual";

const ROLES = ["agendas", "historiales clínicos", "recordatorios", "reportes"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
      .fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        "-=0.9"
      );
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-16 items-center pt-24 md:pt-0">
        <div>
          <p className="blur-in text-xs text-muted tracking-[0.3em] mb-8">Estudio de software</p>
          <h1 className="name-reveal text-6xl md:text-7xl lg:text-8xl font-display italic leading-[0.95] tracking-tight text-text-primary mb-6">
            Kinesis
          </h1>
          <p className="blur-in text-lg md:text-xl text-text-primary mb-6">
            Construimos{" "}
            <span key={roleIndex} className="font-display italic animate-role-fade-in inline-block">
              {ROLES[roleIndex]}
            </span>{" "}
            que no fallan.
          </p>
          <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
            Diseñamos y mantenemos sistemas de gestión a medida para consultorios
            y negocios de servicios — como el que estás viendo funcionar más abajo.
          </p>
          <div className="blur-in inline-flex flex-wrap gap-4">
            <a
              href="#trabajo"
              className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:scale-105 transition-transform"
            >
              Ver Kinesis en acción
            </a>
            <a
              href="mailto:diegorecarga8@gmail.com?subject=Quiero%20hablar%20de%20un%20sistema"
              className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke text-text-primary hover:border-transparent hover:scale-105 transition-all relative group"
            >
              <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              Hablemos
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end blur-in">
          <HeroVisual />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-0 w-full h-3 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
