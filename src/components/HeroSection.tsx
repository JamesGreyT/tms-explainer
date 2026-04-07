"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useApp } from "@/context/AppContext";

const TICKER_ITEMS = [
  "OINV-00412 ▸ A/R Invoice Posted",
  "TRIP-0871 ▸ Tashkent → Samarkand ▸ In Transit",
  "OPDN-00198 ▸ Fuel Receipt Logged",
  "GRNI Cleared ▸ Vendor: FuelCorp Ltd",
  "KPI ▸ Profit/Trip: $842 ▸ +12.3%",
  "GPS ▸ Vehicle UZ-01-AB ▸ 41.2995°N",
  "OPOR-00067 ▸ Tire Purchase Order",
  "A/P Invoice ▸ OPCH-00312 ▸ Matched",
  "HEALTH ▸ Volvo FH16 ▸ Score: 94/100",
  "MAINT ▸ UZ-03-EF ▸ Brake Pad Due",
];

export default function HeroSection() {
  const { t } = useApp();

  const stats = [
    { label: t("hero.stat.trips"), value: "500+", color: "var(--emerald)" },
    { label: t("hero.stat.load"), value: "<2s", color: "var(--cyan)" },
    { label: t("hero.stat.gps"), value: "5sec", color: "var(--amber)" },
    { label: t("hero.stat.docs"), value: "12", color: "var(--violet)" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--cyan-glow),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,var(--emerald-glow),transparent_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-60" />

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[15, 35, 55, 75, 90].map((x, i) => (
          <line key={i} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="var(--border-subtle)" strokeWidth="1" />
        ))}
        {[15, 55, 90].map((x, i) => (
          <circle key={`p-${i}`} r="2" fill="var(--cyan)" opacity="0.3">
            <animateMotion dur={`${4 + i * 2}s`} repeatCount="indefinite" path={`M${(x / 100) * 1920},0 L${(x / 100) * 1920},1080`} />
          </circle>
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase glass" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', borderColor: 'var(--cyan-dim)' }}>
            <span className="relative w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--emerald)' }} />
            {t("hero.badge")}
          </span>
          <span className="text-xs tracking-wider uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("hero.version")}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="block" style={{ color: 'var(--text-primary)' }}>{t("hero.title1")}</span>
          <span className="block text-gradient-cyan">{t("hero.title2")}</span>
          <span className="block italic" style={{ color: 'var(--text-secondary)' }}>{t("hero.title3")}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="max-w-2xl text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t("hero.subtitle")}{" "}
          <span style={{ color: 'var(--cyan)' }}>{t("hero.subtitleHighlight")}</span>.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-light tracking-tight" style={{ fontFamily: 'var(--font-mono)', color: stat.color }}>{stat.value}</span>
              <span className="text-xs uppercase tracking-widest mt-1" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex items-center gap-3" style={{ color: 'var(--text-dim)' }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowDown size={16} /></motion.div>
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>{t("hero.scroll")}</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 py-3 overflow-hidden" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="ticker-tape flex whitespace-nowrap gap-12">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-xs tracking-wide" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
