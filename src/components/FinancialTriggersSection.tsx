"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ArrowRight, Database, BookOpen, CheckCircle2, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function FinancialTriggersSection() {
  const { t } = useApp();
  const [activeEvent, setActiveEvent] = useState(0);

  const EVENTS = [
    {
      action: t("triggers.ev1.action"), icon: "📦", description: t("triggers.ev1.desc"),
      docCreated: "Trip WIP Activation", color: "var(--cyan)",
      journalEntries: [
        { type: "DR" as const, account: "Trip Work-in-Progress", example: "$2,400" },
        { type: "CR" as const, account: "Accrued Transport Costs", example: "$2,400" },
      ],
    },
    {
      action: t("triggers.ev2.action"), icon: "⛽", description: t("triggers.ev2.desc"),
      docCreated: "OPDN (Goods Receipt PO)", color: "var(--emerald)",
      journalEntries: [
        { type: "DR" as const, account: "Fuel Expense / Trip Cost", example: "$340" },
        { type: "CR" as const, account: "GRNI Allocation Account", example: "$340" },
      ],
    },
    {
      action: t("triggers.ev3.action"), icon: "🛣️", description: t("triggers.ev3.desc"),
      docCreated: "Landed Cost Entry (OIPF)", color: "var(--amber)",
      journalEntries: [
        { type: "DR" as const, account: "Trip Landed Costs", example: "$85" },
        { type: "CR" as const, account: "Accrued Expenses", example: "$85" },
      ],
    },
    {
      action: t("triggers.ev4.action"), icon: "✅", description: t("triggers.ev4.desc"),
      docCreated: "OINV (A/R Invoice) + ODLN (Delivery)", color: "var(--violet)",
      journalEntries: [
        { type: "DR" as const, account: "Accounts Receivable", example: "$3,200" },
        { type: "CR" as const, account: "Transport Revenue", example: "$2,780" },
        { type: "CR" as const, account: "VAT Output Tax", example: "$420" },
      ],
    },
  ];

  const event = EVENTS[activeEvent];

  return (
    <section className="relative py-32 px-8" id="triggers">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_60%,var(--emerald-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("triggers.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("triggers.title")}{" "}<span className="italic text-gradient-emerald">{t("triggers.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("triggers.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-3">
            {EVENTS.map((ev, i) => (
              <motion.button key={i} onClick={() => setActiveEvent(i)}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4"
                style={{ background: i === activeEvent ? `${ev.color}10` : 'transparent', border: `1px solid ${i === activeEvent ? `${ev.color}30` : 'var(--border-subtle)'}` }}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: i === activeEvent ? `${ev.color}20` : 'var(--bg-elevated)' }}>{ev.icon}</div>
                  {i < EVENTS.length - 1 && <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3" style={{ background: 'var(--border-subtle)' }} />}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block" style={{ color: i === activeEvent ? ev.color : 'var(--text-secondary)' }}>{ev.action}</span>
                  <span className="text-xs block mt-0.5 truncate" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{ev.docCreated}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeEvent} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }} className="glass rounded-2xl p-8 relative overflow-hidden" style={{ borderColor: `${event.color}20` }}>
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[150px] opacity-5" style={{ background: event.color }} />

                <div className="flex items-center gap-4 mb-8 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${event.color}10`, border: `1px solid ${event.color}25` }}>
                    <Smartphone size={16} style={{ color: event.color }} />
                    <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: event.color }}>{t("triggers.driverApp")}</span>
                  </div>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ArrowRight size={16} style={{ color: event.color }} /></motion.div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                    <Zap size={16} style={{ color: 'var(--amber)' }} />
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("triggers.eventBus")}</span>
                  </div>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}><ArrowRight size={16} style={{ color: event.color }} /></motion.div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                    <Database size={16} style={{ color: 'var(--cyan)' }} />
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>PostgreSQL</span>
                  </div>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}><ArrowRight size={16} style={{ color: event.color }} /></motion.div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${event.color}10`, border: `1px solid ${event.color}25` }}>
                    <BookOpen size={16} style={{ color: event.color }} />
                    <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: event.color }}>{t("triggers.generalLedger")}</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>

                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                  <div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("triggers.autoJournal")}</span>
                    <CheckCircle2 size={14} style={{ color: 'var(--emerald)' }} />
                  </div>
                  <div className="p-4 space-y-3">
                    {event.journalEntries.map((entry, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ fontFamily: 'var(--font-mono)', background: entry.type === "DR" ? 'var(--emerald-dim)' : 'var(--rose-dim)', color: entry.type === "DR" ? 'var(--emerald)' : 'var(--rose)' }}>{entry.type}</span>
                          <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', paddingLeft: entry.type === "CR" ? '16px' : '0' }}>{entry.account}</span>
                        </div>
                        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: entry.type === "DR" ? 'var(--emerald)' : 'var(--rose)' }}>{entry.example}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
