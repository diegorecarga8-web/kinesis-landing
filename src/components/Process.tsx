import { motion } from "framer-motion";

const STEPS = [
  {
    n: "1",
    title: "Agendamos una demo",
    desc: "Te mostramos Kinesis funcionando con un caso real, sin compromiso.",
  },
  {
    n: "2",
    title: "Lo configuramos para tu negocio",
    desc: "Tu marca, tus servicios, tu equipo. Vos no tocás nada técnico.",
  },
  {
    n: "3",
    title: "Empezás a usarlo",
    desc: "Te acompañamos las primeras semanas hasta que todo el equipo esté cómodo.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function Process() {
  return (
    <section id="proceso" className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted tracking-[0.3em]">Cómo trabajamos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary max-w-lg">
            De la demo a <span className="italic">tu sistema en marcha</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl space-y-1">
          {STEPS.map((step) => (
            <motion.div
              key={step.n}
              {...fadeUp}
              className="flex items-center gap-6 p-6 rounded-[28px] bg-surface/30 hover:bg-surface border border-stroke transition-colors"
            >
              <span className="text-4xl font-display italic text-transparent bg-clip-text accent-gradient shrink-0">
                {step.n}
              </span>
              <div>
                <h3 className="text-lg font-display text-text-primary mb-1">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
