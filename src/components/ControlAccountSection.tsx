"use client";
import { motion } from "framer-motion";
import { Shield, Equal, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ControlAccountSection() {
  const { t } = useApp();

  const FLOW_STEPS = [
    { label: t("control.step1"), items: [
      { text: "Customer places order", color: "var(--cyan)" },
      { text: "Driver logs expenses", color: "var(--emerald)" },
      { text: "Vendor submits fuel bill", color: "var(--amber)" },
    ]},
    { label: t("control.step2"), items: [
      { text: "A/R Invoice (OINV)", color: "var(--cyan)" },
      { text: "Goods Receipt PO (OPDN)", color: "var(--emerald)" },
      { text: "A/P Invoice (OPCH)", color: "var(--amber)" },
    ]},
    { label: t("control.step3"), items: [
      { text: "Customer balance: +$3,200", color: "var(--cyan)" },
      { text: "Trip cost accrual: +$340", color: "var(--emerald)" },
      { text: "Vendor balance: +$1,800", color: "var(--amber)" },
    ]},
    { label: t("control.step4"), items: [
      { text: "A/R Control: Dr $3,200", color: "var(--cyan)" },
      { text: "GRNI Account: Dr $340", color: "var(--emerald)" },
      { text: "A/P Control: Cr $1,800", color: "var(--amber)" },
    ]},
  ];

  return (
    <section className="relative py-32 px-8" id="control">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,var(--cyan-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("control.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("control.title")}{" "}<span className="italic text-gradient-cyan">{t("control.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("control.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {FLOW_STEPS.map((step, si) => (
            <motion.div key={step.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.15 }} className="relative">
              <span className="text-6xl font-light absolute -top-4 -left-2 opacity-5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{String(si + 1).padStart(2, "0")}</span>
              <div className="glass rounded-xl p-5 relative z-10">
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{step.label}</h3>
                <div className="space-y-3">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: item.color }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              {si < 3 && <div className="hidden md:flex absolute top-1/2 -right-3 z-20"><motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: si * 0.2 }} style={{ color: 'var(--text-dim)' }}>→</motion.div></div>}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-8 glow-cyan" style={{ borderColor: 'var(--cyan-dim)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield size={20} style={{ color: 'var(--cyan)' }} />
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--cyan)' }}>{t("control.reconciliation")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
              <span className="text-xs uppercase tracking-widest block mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("control.subLedger")}</span>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>Customers (A/R)</span><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>$148,200</span></div>
                <div className="flex justify-between"><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)' }}>Vendors (A/P)</span><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rose)' }}>($67,400)</span></div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--emerald-dim)', border: '2px solid var(--emerald)' }}>
                <Equal size={24} style={{ color: 'var(--emerald)' }} />
              </motion.div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
              <span className="text-xs uppercase tracking-widest block mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("control.glControl")}</span>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>A/R Control (1200)</span><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>$148,200</span></div>
                <div className="flex justify-between"><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)' }}>A/P Control (2100)</span><span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rose)' }}>($67,400)</span></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6 pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--emerald)' }} />
            <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>{t("control.proof")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
