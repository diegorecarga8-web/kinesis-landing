import { motion } from "framer-motion";

const STATS = [
  { value: "0", label: "Citas cruzadas — validación automática" },
  { value: "100%", label: "De las citas con recordatorio automático" },
  { value: "1", label: "Sistema para pacientes, agenda e historia clínica" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function Stats() {
  return (
    <section className="py-20 md:py-28 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {STATS.map((stat) => (
            <motion.div key={stat.label} {...fadeUp}>
              <p className="text-5xl md:text-6xl font-display italic text-transparent bg-clip-text accent-gradient mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-muted max-w-[26ch]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
