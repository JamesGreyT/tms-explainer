"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Server, Database, Radio, Calculator, Container, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function TechStackSection() {
  const { t } = useApp();

  const STACK = [
    { layer: t("stack.layer.frontend"), tech: "React 19 / Next.js 16", rationale: t("stack.frontend.rationale"), icon: <Monitor size={20} />, color: "var(--cyan)", tags: ["SSR", "ISR", "Tailwind CSS", "BFF Pattern"] },
    { layer: t("stack.layer.mobile"), tech: "Flutter 3.x (Dart)", rationale: t("stack.mobile.rationale"), icon: <Smartphone size={20} />, color: "var(--emerald)", tags: ["Android 10+", "Offline-First", "SQLite", "Background GPS"] },
    { layer: t("stack.layer.backend"), tech: "Node.js 22 (TypeScript)", rationale: t("stack.backend.rationale"), icon: <Server size={20} />, color: "var(--amber)", tags: ["Express/Fastify", "Prisma ORM", "Bull MQ", "Zod"] },
    { layer: t("stack.layer.db"), tech: "PostgreSQL 16", rationale: t("stack.db.rationale"), icon: <Database size={20} />, color: "var(--violet)", tags: ["JSONB", "RLS", "pg_cron", "Header/Row Pattern"] },
    { layer: t("stack.layer.realtime"), tech: "WebSockets (Socket.io)", rationale: t("stack.realtime.rationale"), icon: <Radio size={20} />, color: "var(--rose)", tags: ["Redis Adapter", "Namespaces", "SSE Fallback", "5s SLA"] },
    { layer: t("stack.layer.logic"), tech: "Perpetual Inventory Engine", rationale: t("stack.logic.rationale"), icon: <Calculator size={20} />, color: "var(--cyan)", tags: ["Double-Entry", "Control Accounts", "GAAP/IFRS", "Real-time"] },
    { layer: t("stack.layer.infra"), tech: "Docker + Kubernetes", rationale: t("stack.infra.rationale"), icon: <Container size={20} />, color: "var(--emerald)", tags: ["AWS/GCP", "Terraform", "GitHub Actions", "Auto-scale"] },
    { layer: t("stack.layer.security"), tech: "JWT + RBAC + Audit Trail", rationale: t("stack.security.rationale"), icon: <ShieldCheck size={20} />, color: "var(--amber)", tags: ["Role-Based", "Immutable Docs", "Rate Limiting", "Full Audit"] },
  ];

  return (
    <section className="relative py-32 px-8" id="stack">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_80%_50%,var(--amber-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("stack.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("stack.title")}{" "}<span className="italic" style={{ color: 'var(--text-secondary)' }}>{t("stack.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-3xl" style={{ color: 'var(--text-secondary)' }}>{t("stack.subtitle")}</p>
        </motion.div>

        <div className="space-y-4">
          {STACK.map((item, i) => (
            <motion.div key={item.layer} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6 glass-hover group">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 flex-wrap mb-1">
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{item.layer}</span>
                    <span className="text-lg font-medium" style={{ color: item.color }}>{item.tech}</span>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.rationale}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="inline-block px-2 py-0.5 rounded text-xs"
                        style={{ fontFamily: 'var(--font-mono)', background: `${item.color}08`, color: `${item.color}`, border: `1px solid ${item.color}20` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-4xl font-light flex-shrink-0 opacity-10 hidden md:block" style={{ fontFamily: 'var(--font-mono)', color: item.color }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data flow architecture diagram */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 glass rounded-2xl p-8">
          <h3 className="text-xs uppercase tracking-widest mb-8" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("stack.dataFlow")}</h3>
          <svg viewBox="0 0 1000 240" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* WebSocket overlay line */}
            <text x="500" y="30" textAnchor="middle" fill="var(--rose)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.6">WebSocket (Socket.io) — Real-time sync layer</text>
            <line x1="80" y1="38" x2="920" y2="38" stroke="var(--rose)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

            {/* Nodes */}
            {[
              { x: 70, label: "Web Portal", sub: "Next.js 16", color: "var(--cyan)" },
              { x: 250, label: "Driver App", sub: "Flutter", color: "var(--emerald)" },
              { x: 430, label: "API Gateway", sub: "Node.js/TS", color: "var(--amber)" },
              { x: 610, label: "PostgreSQL", sub: "Doc Store", color: "var(--violet)" },
              { x: 790, label: "G/L Engine", sub: "Ledger", color: "var(--cyan)" },
              { x: 940, label: "Audit Log", sub: "Immutable", color: "var(--amber)" },
            ].map((node, i) => (
              <g key={i}>
                {i < 5 && <line x1={node.x + 55} y1="100" x2={node.x + 115} y2="100" stroke="var(--border-subtle)" strokeWidth="1" className="flow-line" />}
                <rect x={node.x - 45} y="70" width="110" height="60" rx="12" fill="var(--bg-elevated)" stroke={`${node.color}30`} strokeWidth="1" />
                <text x={node.x + 10} y="97" textAnchor="middle" fill={node.color} fontSize="10" fontFamily="var(--font-mono)">{node.label}</text>
                <text x={node.x + 10} y="117" textAnchor="middle" fill="var(--text-dim)" fontSize="9" fontFamily="var(--font-mono)">{node.sub}</text>
              </g>
            ))}

            {/* Bottom layer — Infrastructure */}
            <line x1="150" y1="160" x2="850" y2="160" stroke="var(--emerald)" strokeWidth="0.5" strokeDasharray="6 3" opacity="0.3" />
            <text x="500" y="175" textAnchor="middle" fill="var(--emerald)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.5">Docker + Kubernetes — Auto-scaling Infrastructure</text>

            {/* Security shield */}
            <rect x="200" y="190" width="600" height="28" rx="6" fill="none" stroke="var(--amber)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
            <text x="500" y="209" textAnchor="middle" fill="var(--amber)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.4">JWT + RBAC + Audit Trail — Security Layer</text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
