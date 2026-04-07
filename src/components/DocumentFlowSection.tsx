"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, Check, Clock, AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DocumentFlowSection() {
  const { t } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);

  const DOC_STAGES = [
    {
      code: "OQUT", name: t("doc.oqut.name"), table: "OQUT / QUT1", color: "var(--violet)",
      description: t("doc.oqut.desc"),
      fields: ["CardCode", "DocDate", "Route", "CargoType", "EstWeight", "QuotedPrice"],
      trigger: t("doc.oqut.trigger"),
      journal: [t("doc.oqut.journal")],
    },
    {
      code: "ORDR", name: t("doc.ordr.name"), table: "ORDR / RDR1", color: "var(--cyan)",
      description: t("doc.ordr.desc"),
      fields: ["CardCode", "DocDate", "VehicleCode", "DriverCode", "PlannedDate", "NetTotal"],
      trigger: t("doc.ordr.trigger"),
      journal: [t("doc.ordr.journal")],
    },
    {
      code: "ODLN", name: t("doc.odln.name"), table: "ODLN / DLN1", color: "var(--emerald)",
      description: t("doc.odln.desc"),
      fields: ["CardCode", "DocDate", "ActualWeight", "DeliveryTime", "POD_Ref"],
      trigger: t("doc.odln.trigger"),
      journal: ["Dr. Cost of Goods Delivered", "Cr. Inventory / Trip WIP"],
    },
    {
      code: "OINV", name: t("doc.oinv.name"), table: "OINV / INV1", color: "var(--amber)",
      description: t("doc.oinv.desc"),
      fields: ["CardCode", "DocDate", "TaxCode", "GrossTotal", "DueDate", "GLAccount"],
      trigger: t("doc.oinv.trigger"),
      journal: ["Dr. Accounts Receivable (Control)", "Cr. Revenue Account", "Cr. Tax Liability"],
    },
    {
      code: "ORCT", name: t("doc.orct.name"), table: "ORCT / RCT2", color: "var(--cyan)",
      description: t("doc.orct.desc"),
      fields: ["CardCode", "DocDate", "PaymentMethod", "Amount", "BankAccount", "InvoiceRef"],
      trigger: t("doc.orct.trigger"),
      journal: ["Dr. Bank / Cash Account", "Cr. Accounts Receivable (Control)"],
    },
  ];

  const active = DOC_STAGES[activeIdx];

  return (
    <section className="relative py-32 px-8" id="doc-flow">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_30%_50%,var(--violet-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("docflow.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("docflow.title")}{" "}<span className="italic text-gradient-amber">{t("docflow.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("docflow.subtitle")}</p>
        </motion.div>

        {/* Flow nodes */}
        <div className="relative mb-12">
          <div className="absolute top-8 left-[10%] right-[10%] h-px hidden md:block" style={{ background: 'var(--border-subtle)' }}>
            <motion.div className="h-full" style={{ background: `linear-gradient(90deg, var(--violet), var(--cyan), var(--emerald), var(--amber), var(--cyan))`, transformOrigin: "left" }}
              animate={{ scaleX: (activeIdx + 1) / DOC_STAGES.length }} transition={{ duration: 0.5, ease: "easeInOut" }} />
          </div>
          <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-4 md:gap-0 relative z-10">
            {DOC_STAGES.map((stage, i) => (
              <div key={stage.code} className="flex items-start">
                <motion.div className="flex flex-col items-center relative cursor-pointer" onClick={() => setActiveIdx(i)}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <motion.div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300"
                    style={{ background: i === activeIdx ? `${stage.color}20` : 'var(--bg-elevated)', border: `2px solid ${i === activeIdx ? stage.color : 'var(--border-subtle)'}`, boxShadow: i === activeIdx ? `0 0 30px ${stage.color}25` : 'none' }}
                    whileHover={{ scale: 1.1 }}>
                    <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: i === activeIdx ? stage.color : 'var(--text-dim)' }}>{stage.code}</span>
                  </motion.div>
                  <span className="text-xs text-center max-w-[100px] leading-tight" style={{ fontFamily: 'var(--font-mono)', color: i === activeIdx ? stage.color : 'var(--text-dim)' }}>{stage.name}</span>
                </motion.div>
                {i < DOC_STAGES.length - 1 && (
                  <div className="hidden md:flex items-center mx-2 mt-6">
                    <ArrowRight size={14} style={{ color: i < activeIdx ? DOC_STAGES[i + 1].color : 'var(--text-dim)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div key={active.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }} className="glass rounded-2xl p-8 relative overflow-hidden" style={{ borderColor: `${active.color}20` }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] opacity-10" style={{ background: active.color }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${active.color}15`, color: active.color }}><FileText size={22} /></div>
                  <div>
                    <h3 className="text-2xl" style={{ fontFamily: 'var(--font-display)', color: active.color }}>{active.name}</h3>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{active.table}</span>
                  </div>
                </div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{active.description}</p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--bg-void)' }}>
                  <Clock size={14} style={{ color: active.color }} />
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{t("docflow.trigger")}: {active.trigger}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest mb-3 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("docflow.keyFields")}</span>
                  <div className="flex flex-wrap gap-2">
                    {active.fields.map((field) => (
                      <span key={field} className="inline-block px-2.5 py-1 rounded-md text-xs" style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-void)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>{field}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("docflow.journalEntry")}</span>
                <div className="rounded-xl p-4 space-y-2" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                  {active.journal.map((line, i) => {
                    const isDebit = line.startsWith("Dr.");
                    const isCredit = line.startsWith("Cr.");
                    return (
                      <div key={i} className="flex items-start gap-2">
                        {isDebit && <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: 'var(--emerald-dim)', color: 'var(--emerald)', fontFamily: 'var(--font-mono)' }}>DR</span>}
                        {isCredit && <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: 'var(--rose-dim)', color: 'var(--rose)', fontFamily: 'var(--font-mono)' }}>CR</span>}
                        {!isDebit && !isCredit && <AlertTriangle size={14} style={{ color: 'var(--text-dim)' }} />}
                        <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: isDebit ? 'var(--emerald)' : isCredit ? 'var(--rose)' : 'var(--text-dim)' }}>
                          {line.replace(/^(Dr\.|Cr\.)\s*/, "")}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Check size={14} style={{ color: 'var(--emerald)' }} />
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("docflow.autoPost")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
