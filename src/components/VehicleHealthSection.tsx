"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse, Truck, CheckCircle2, AlertTriangle, XCircle,
  CircleGauge, Disc3, Lightbulb, Droplets, Cog, Container,
  Wrench, Calendar, Clock, ChevronDown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface Vehicle {
  name: string;
  plate: string;
  healthScore: number;
  nextService: string;
  nextServiceKm: string;
  lastInspection: string;
  openDefects: number;
  color: string;
  odometerKm: number;
  checklist: { item: string; icon: React.ReactNode; status: "pass" | "warn" | "fail" }[];
  maintenanceLog: { date: string; type: string; status: "completed" | "scheduled" | "overdue"; cost: string; vendor: string }[];
}

const VEHICLES: Vehicle[] = [
  {
    name: "Volvo FH16", plate: "UZ-01-AB", healthScore: 94, nextService: "2026-04-15", nextServiceKm: "12,400 km",
    lastInspection: "2026-04-05", openDefects: 0, color: "var(--cyan)", odometerKm: 187600,
    checklist: [
      { item: "vehicle.tires", icon: <CircleGauge size={16} />, status: "pass" },
      { item: "vehicle.brakes", icon: <Disc3 size={16} />, status: "pass" },
      { item: "vehicle.lights", icon: <Lightbulb size={16} />, status: "pass" },
      { item: "vehicle.fluids", icon: <Droplets size={16} />, status: "warn" },
      { item: "vehicle.engine", icon: <Cog size={16} />, status: "pass" },
      { item: "vehicle.body", icon: <Container size={16} />, status: "pass" },
    ],
    maintenanceLog: [
      { date: "2026-04-01", type: "vehicle.oilChange", status: "completed", cost: "$280", vendor: "AutoServ Tashkent" },
      { date: "2026-03-15", type: "vehicle.tireRotation", status: "completed", cost: "$120", vendor: "TirePro UZ" },
      { date: "2026-04-15", type: "vehicle.transmission", status: "scheduled", cost: "$650", vendor: "Volvo Service Center" },
    ],
  },
  {
    name: "MAN TGX", plate: "UZ-02-CD", healthScore: 78, nextService: "2026-04-08", nextServiceKm: "800 km",
    lastInspection: "2026-04-03", openDefects: 2, color: "var(--emerald)", odometerKm: 234100,
    checklist: [
      { item: "vehicle.tires", icon: <CircleGauge size={16} />, status: "warn" },
      { item: "vehicle.brakes", icon: <Disc3 size={16} />, status: "fail" },
      { item: "vehicle.lights", icon: <Lightbulb size={16} />, status: "pass" },
      { item: "vehicle.fluids", icon: <Droplets size={16} />, status: "pass" },
      { item: "vehicle.engine", icon: <Cog size={16} />, status: "warn" },
      { item: "vehicle.body", icon: <Container size={16} />, status: "pass" },
    ],
    maintenanceLog: [
      { date: "2026-04-03", type: "vehicle.inspection", status: "completed", cost: "$150", vendor: "GovInspect" },
      { date: "2026-04-08", type: "vehicle.brakeRepair", status: "overdue", cost: "$420", vendor: "MAN Service UZ" },
      { date: "2026-04-20", type: "vehicle.oilChange", status: "scheduled", cost: "$310", vendor: "AutoServ Tashkent" },
    ],
  },
  {
    name: "Scania R500", plate: "UZ-03-EF", healthScore: 88, nextService: "2026-04-22", nextServiceKm: "8,200 km",
    lastInspection: "2026-04-06", openDefects: 1, color: "var(--amber)", odometerKm: 156800,
    checklist: [
      { item: "vehicle.tires", icon: <CircleGauge size={16} />, status: "pass" },
      { item: "vehicle.brakes", icon: <Disc3 size={16} />, status: "pass" },
      { item: "vehicle.lights", icon: <Lightbulb size={16} />, status: "warn" },
      { item: "vehicle.fluids", icon: <Droplets size={16} />, status: "pass" },
      { item: "vehicle.engine", icon: <Cog size={16} />, status: "pass" },
      { item: "vehicle.body", icon: <Container size={16} />, status: "pass" },
    ],
    maintenanceLog: [
      { date: "2026-04-06", type: "vehicle.oilChange", status: "completed", cost: "$295", vendor: "Scania Dealer UZ" },
      { date: "2026-04-22", type: "vehicle.tireRotation", status: "scheduled", cost: "$140", vendor: "TirePro UZ" },
    ],
  },
];

function HealthGauge({ score, color }: { score: number; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = score >= 90 ? "var(--emerald)" : score >= 75 ? "var(--amber)" : "var(--rose)";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth="6" />
        <motion.circle cx="50" cy="50" r={radius} fill="none" stroke={scoreColor} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-light" style={{ fontFamily: 'var(--font-mono)', color: scoreColor }}>{score}</span>
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>/100</span>
      </div>
    </div>
  );
}

export default function VehicleHealthSection() {
  const { t } = useApp();
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [showLog, setShowLog] = useState(false);
  const vehicle = VEHICLES[activeVehicle];

  const statusIcon = (s: string) => {
    if (s === "pass") return <CheckCircle2 size={14} style={{ color: 'var(--emerald)' }} />;
    if (s === "warn") return <AlertTriangle size={14} style={{ color: 'var(--amber)' }} />;
    return <XCircle size={14} style={{ color: 'var(--rose)' }} />;
  };

  const statusLabel = (s: string) => {
    if (s === "pass") return t("vehicle.pass");
    if (s === "warn") return t("vehicle.warn");
    return t("vehicle.fail");
  };

  const logStatusStyle = (s: string) => {
    if (s === "completed") return { bg: 'var(--emerald-dim)', color: 'var(--emerald)', label: t("vehicle.completed2") };
    if (s === "scheduled") return { bg: 'var(--cyan-dim)', color: 'var(--cyan)', label: t("vehicle.scheduled") };
    return { bg: 'var(--rose-dim)', color: 'var(--rose)', label: t("vehicle.overdue") };
  };

  return (
    <section className="relative py-32 px-8" id="vehicle">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_60%_40%,var(--emerald-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("vehicle.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("vehicle.title")}{" "}<span className="italic text-gradient-emerald">{t("vehicle.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("vehicle.subtitle")}</p>
        </motion.div>

        {/* Vehicle selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {VEHICLES.map((v, i) => (
            <motion.button key={v.plate} onClick={() => { setActiveVehicle(i); setShowLog(false); }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
              style={{ background: i === activeVehicle ? `${v.color}10` : 'var(--bg-elevated)', border: `1px solid ${i === activeVehicle ? `${v.color}40` : 'var(--border-subtle)'}` }}>
              <Truck size={16} style={{ color: i === activeVehicle ? v.color : 'var(--text-dim)' }} />
              <div className="text-left">
                <span className="text-sm font-medium block" style={{ color: i === activeVehicle ? v.color : 'var(--text-secondary)' }}>{v.name}</span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{v.plate}</span>
              </div>
              <div className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ fontFamily: 'var(--font-mono)', background: v.healthScore >= 90 ? 'var(--emerald-dim)' : v.healthScore >= 75 ? 'var(--amber-dim)' : 'var(--rose-dim)', color: v.healthScore >= 90 ? 'var(--emerald)' : v.healthScore >= 75 ? 'var(--amber)' : 'var(--rose)' }}>
                {v.healthScore}
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeVehicle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Health overview */}
              <div className="lg:col-span-4 space-y-6">
                <div className="glass rounded-2xl p-6" style={{ borderColor: `${vehicle.color}20` }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: vehicle.color }}>{vehicle.name}</h3>
                      <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{vehicle.plate} · {vehicle.odometerKm.toLocaleString()} km</span>
                    </div>
                    <HealthGauge score={vehicle.healthScore} color={vehicle.color} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: t("vehicle.healthScore"), value: `${vehicle.healthScore}/100`, color: vehicle.healthScore >= 90 ? 'var(--emerald)' : vehicle.healthScore >= 75 ? 'var(--amber)' : 'var(--rose)' },
                      { label: t("vehicle.nextService"), value: vehicle.nextServiceKm, color: 'var(--cyan)' },
                      { label: t("vehicle.lastInspection"), value: vehicle.lastInspection, color: 'var(--text-secondary)' },
                      { label: t("vehicle.openDefects"), value: String(vehicle.openDefects), color: vehicle.openDefects > 0 ? 'var(--rose)' : 'var(--emerald)' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg p-3" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                        <span className="text-xs block mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{stat.label}</span>
                        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: stat.color }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Checklist + Log */}
              <div className="lg:col-span-8 space-y-6">
                {/* Pre-trip checklist */}
                <div className="glass rounded-2xl p-6" style={{ borderColor: `${vehicle.color}15` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <HeartPulse size={18} style={{ color: vehicle.color }} />
                    <h3 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{t("vehicle.checklistTitle")}</h3>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-void)', color: 'var(--text-dim)' }}>
                      {vehicle.lastInspection}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {vehicle.checklist.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-void)', border: `1px solid ${item.status === "fail" ? 'var(--rose)' : item.status === "warn" ? 'var(--amber)' : 'var(--border-subtle)'}30` }}>
                        <span style={{ color: item.status === "pass" ? 'var(--text-dim)' : item.status === "warn" ? 'var(--amber)' : 'var(--rose)' }}>{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs block truncate" style={{ color: 'var(--text-secondary)' }}>{t(item.item as any)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {statusIcon(item.status)}
                          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: item.status === "pass" ? 'var(--emerald)' : item.status === "warn" ? 'var(--amber)' : 'var(--rose)' }}>
                            {statusLabel(item.status)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Maintenance log */}
                <div className="glass rounded-2xl overflow-hidden" style={{ borderColor: `${vehicle.color}15` }}>
                  <button onClick={() => setShowLog(!showLog)}
                    className="w-full flex items-center justify-between px-6 py-4" style={{ borderBottom: showLog ? '1px solid var(--border-subtle)' : 'none' }}>
                    <div className="flex items-center gap-3">
                      <Wrench size={18} style={{ color: vehicle.color }} />
                      <h3 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{t("vehicle.maintenanceLog")}</h3>
                    </div>
                    <motion.div animate={{ rotate: showLog ? 180 : 0 }}><ChevronDown size={16} style={{ color: 'var(--text-dim)' }} /></motion.div>
                  </button>

                  <AnimatePresence>
                    {showLog && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-6 space-y-3">
                          {vehicle.maintenanceLog.map((entry, i) => {
                            const sty = logStatusStyle(entry.status);
                            return (
                              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-lg" style={{ background: 'var(--bg-void)', border: '1px solid var(--border-subtle)' }}>
                                <div className="flex items-center gap-2 min-w-[90px]">
                                  <Calendar size={12} style={{ color: 'var(--text-dim)' }} />
                                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{entry.date}</span>
                                </div>
                                <span className="text-sm flex-1" style={{ color: 'var(--text-secondary)' }}>{t(entry.type as any)}</span>
                                <span className="text-xs px-2 py-0.5 rounded" style={{ fontFamily: 'var(--font-mono)', background: sty.bg, color: sty.color }}>{sty.label}</span>
                                <span className="text-xs min-w-[50px] text-right" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{entry.cost}</span>
                                <span className="text-xs hidden sm:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{entry.vendor}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
