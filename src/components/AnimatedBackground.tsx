import { useEffect, useRef } from "react";

const PINE = { r: 47, g: 110, b: 86 };
const GOLD = { r: 201, g: 154, b: 46 };

function lerpColor(t: number) {
  const r = Math.round(PINE.r + (GOLD.r - PINE.r) * t);
  const g = Math.round(PINE.g + (GOLD.g - PINE.g) * t);
  const b = Math.round(PINE.b + (GOLD.b - PINE.b) * t);
  return `${r}, ${g}, ${b}`;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
}

const MAX_DIST = 170;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: Node[] = [];
    let rafId = 0;

    const buildNodes = () => {
      const count = Math.min(110, Math.max(45, Math.round((width * height) / 13000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 2.6 + 1.8,
        hue: Math.random(),
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.32;
            ctx.strokeStyle = `rgba(${lerpColor((a.hue + b.hue) / 2)}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const color = lerpColor(node.hue);
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${color}, 1)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduceMotion) rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute w-[620px] h-[620px] rounded-full opacity-[0.28] blur-[100px] animate-float-a"
        style={{ background: "#2f6e56", top: "-12%", left: "-10%" }}
      />
      <div
        className="absolute w-[680px] h-[680px] rounded-full opacity-[0.24] blur-[110px] animate-float-b"
        style={{ background: "#c99a2e", bottom: "-16%", right: "-12%" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
