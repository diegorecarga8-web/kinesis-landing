import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

const ITEMS = [
  {
    span: "md:col-span-7",
    tag: "Caso real",
    title: "Kinesis",
    desc: "Agenda sin cruces, historia clínica centralizada, recordatorios automáticos y sincronización con Google Calendar. En producción, usado todos los días.",
  },
  {
    span: "md:col-span-5",
    tag: "Servicio",
    title: "Automatización con IA",
    desc: "Flujos que hacen el trabajo repetitivo solo: recordatorios, reportes, seguimiento de clientes.",
  },
  {
    span: "md:col-span-5",
    tag: "Servicio",
    title: "Integraciones",
    desc: "Google Calendar, correo transaccional, exportación a Excel — tu sistema conectado con lo que ya usás.",
  },
  {
    span: "md:col-span-7",
    tag: "Servicio",
    title: "Paneles a medida",
    desc: "Vistas y reportes pensados para cómo trabaja tu equipo, no una plantilla genérica.",
  },
];

export default function SelectedWork() {
  return (
    <section id="trabajo" className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...fadeUp} className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted tracking-[0.3em]">Lo que construimos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary max-w-lg">
              Un caso real, <span className="italic">y lo que sigue</span>
            </h2>
          </div>
          <a
            href="mailto:diegorecarga8@gmail.com?subject=Quiero%20hablar%20de%20un%20sistema"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-text-primary hover:border-transparent relative group"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            Hablemos de tu sistema <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              className={`${item.span} group relative overflow-hidden rounded-3xl border border-stroke bg-surface p-8 md:p-10 min-h-[220px] flex flex-col justify-end`}
            >
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <span className="text-xs text-muted tracking-[0.2em] mb-3">{item.tag}</span>
              <h3 className="text-2xl font-display italic text-text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-muted max-w-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
