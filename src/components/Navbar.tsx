import { useEffect, useState } from "react";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Kinesis", href: "#trabajo" },
  { label: "Proceso", href: "#proceso" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow ${
          scrolled ? "shadow-md shadow-black/20" : ""
        }`}
      >
        <a
          href="#inicio"
          onClick={handleClick("#inicio")}
          className="w-9 h-9 rounded-full accent-gradient p-[1.5px] group"
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg group-hover:scale-110 transition-transform">
            <span className="font-display italic text-[13px] text-text-primary">K</span>
          </span>
        </a>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleClick(link.href)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              active === link.href
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link.label}
          </a>
        ))}

        <div className="w-px h-5 bg-stroke mx-1" />

        <a
          href="mailto:diegorecarga8@gmail.com?subject=Quiero%20hablar%20de%20un%20sistema"
          className="group relative rounded-full p-[1.5px]"
        >
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1 bg-surface group-hover:bg-bg rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-text-primary transition-colors">
            Hablemos <span aria-hidden="true">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
