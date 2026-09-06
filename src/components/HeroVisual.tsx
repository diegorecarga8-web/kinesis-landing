import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroVisual() {
  const conflictRef = useRef<SVGGElement>(null);
  const resolvedRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !conflictRef.current || !resolvedRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
    tl.set(conflictRef.current, { opacity: 1 })
      .set(resolvedRef.current, { opacity: 0 })
      .to(conflictRef.current, { opacity: 0, duration: 0.5, delay: 1.4, ease: "power2.out" })
      .to(resolvedRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "<");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg viewBox="0 0 320 380" className="w-full max-w-[360px] h-auto" role="img" aria-label="Agenda sin cruces">
      <text x="0" y="18" className="fill-muted" style={{ font: "12px Inter" }}>8:00</text>
      <line x1="52" y1="12" x2="320" y2="12" className="stroke-stroke" strokeWidth="1" />
      <text x="0" y="78" className="fill-muted" style={{ font: "12px Inter" }}>9:00</text>
      <line x1="52" y1="72" x2="320" y2="72" className="stroke-stroke" strokeWidth="1" />
      <text x="0" y="138" className="fill-muted" style={{ font: "12px Inter" }}>10:00</text>
      <line x1="52" y1="132" x2="320" y2="132" className="stroke-stroke" strokeWidth="1" />
      <text x="0" y="198" className="fill-muted" style={{ font: "12px Inter" }}>11:00</text>
      <line x1="52" y1="192" x2="320" y2="192" className="stroke-stroke" strokeWidth="1" />
      <text x="0" y="258" className="fill-muted" style={{ font: "12px Inter" }}>12:00</text>
      <line x1="52" y1="252" x2="320" y2="252" className="stroke-stroke" strokeWidth="1" />
      <text x="0" y="318" className="fill-muted" style={{ font: "12px Inter" }}>13:00</text>
      <line x1="52" y1="312" x2="320" y2="312" className="stroke-stroke" strokeWidth="1" />
      <line x1="52" y1="372" x2="320" y2="372" className="stroke-stroke" strokeWidth="1" />

      <rect x="60" y="18" width="180" height="48" rx="4" fill="#2f6e56" opacity="0.85" />
      <text x="72" y="47" fill="#F5F5F5" style={{ font: "500 11px Inter" }}>Valoración — María G.</text>

      <rect x="60" y="258" width="180" height="48" rx="4" fill="#2f6e56" opacity="0.85" />
      <text x="72" y="287" fill="#F5F5F5" style={{ font: "500 11px Inter" }}>Sesión — Carlos R.</text>

      <g ref={conflictRef}>
        <rect x="60" y="138" width="150" height="42" rx="4" fill="#B4432E" opacity="0.85" />
        <rect x="150" y="150" width="150" height="42" rx="4" fill="#B4432E" opacity="0.55" />
      </g>
      <g ref={resolvedRef} opacity="0">
        <rect x="60" y="138" width="240" height="42" rx="4" fill="#2f6e56" opacity="0.85" />
        <text x="72" y="164" fill="#F5F5F5" style={{ font: "500 11px Inter" }}>Sesión — Ana P.</text>
        <rect x="60" y="198" width="240" height="42" rx="4" fill="#2f6e56" opacity="0.85" />
        <text x="72" y="224" fill="#F5F5F5" style={{ font: "500 11px Inter" }}>Recuperación — Ana P.</text>
        <circle cx="292" cy="146" r="9" fill="#C99A2E" />
        <path d="M288 146 l3 4 l7 -8" stroke="#0A0A0A" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
