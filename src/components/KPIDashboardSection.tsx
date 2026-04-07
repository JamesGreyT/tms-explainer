"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Truck, Route, Package, Users, CalendarClock } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function KPIDashboardSection() {
  const { t } = useApp();
  const [activeDim, setActiveDim] = useState("fleet");

  const DIMENSIONS = [
    { id: "fleet", label: t("kpi.dim.fleet"), icon: <Truck size={14} />, color: "var(--cyan)" },
    { id: "route", label: t("kpi.dim.route"), icon: <Route size={14} />, color: "var(--emerald)" },
    { id: "cargo", label: t("kpi.dim.cargo"), icon: <Package size={14} />, color: "var(--amber)" },
    { id: "customer", label: t("kpi.dim.customer"), icon: <Users size={14} />, color: "var(--violet)" },
    { id: "time", label: t("kpi.dim.time"), icon: <CalendarClock size={14} />, color: "var(--rose)" },
  ];

  const MOCK_KPIS = [
    { label: t("kpi.metric.profitTrip"), value: "$842", change: "+12.3%", positive: true },
    { label: t("kpi.metric.fleetUtil"), value: "87.4%", change: "+3.1%", positive: true },
    { label: t("kpi.metric.revenueKm"), value: "$1.24", change: "-0.8%", positive: false },
    { label: t("kpi.metric.onTime"), value: "94.2%", change: "+1.7%", positive: true },
    { label: t("kpi.metric.grni"), value: "$12.4K", change: "-45%", positive: true },
    { label: t("kpi.metric.dso"), value: "28", change: "-3d", positive: true },
  ];

  const TRIP_DATA = [
    { route: "Tashkent → Samarkand", revenue: 2400, cost: 1560, margin: 35 },
    { route: "Bukhara → Navoi", revenue: 1800, cost: 1080, margin: 40 },
    { route: "Fergana → Andijan", revenue: 960, cost: 720, margin: 25 },
    { route: "Nukus → Urgench", revenue: 3200, cost: 2240, margin: 30 },
    { route: "Karshi → Termez", revenue: 1600, cost: 1120, margin: 30 },
    { route: "Samarkand → Bukhara", revenue: 2100, cost: 1260, margin: 40 },
  ];

  return (
    <section className="relative py-32 px-8" id="kpi">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_70%_30%,var(--cyan-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("kpi.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("kpi.title")}{" "}<span className="italic text-gradient-cyan">{t("kpi.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("kpi.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-2 mb-10">
          {DIMENSIONS.map((dim) => (
            <button key={dim.id} onClick={() => setActiveDim(dim.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)', background: activeDim === dim.id ? `${dim.color}15` : 'var(--bg-elevated)', border: `1px solid ${activeDim === dim.id ? `${dim.color}40` : 'var(--border-subtle)'}`, color: activeDim === dim.id ? dim.color : 'var(--text-dim)' }}>
              {dim.icon}{dim.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {MOCK_KPIS.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4 glass-hover">
              <span className="text-xs block mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{kpi.label}</span>
              <span className="text-2xl font-light block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{kpi.value}</span>
              <span className="flex items-center gap-1 text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: kpi.positive ? 'var(--emerald)' : 'var(--rose)' }}>
                {kpi.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{kpi.change}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{t("kpi.profitByRoute")}</h3>
            <span className="flex items-center gap-2 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>
              <span className="relative w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--emerald)' }} />{t("kpi.realtime")}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {[t("kpi.col.route"), t("kpi.col.revenue"), t("kpi.col.cost"), t("kpi.col.margin"), ""].map((h) => (
                    <th key={h || "actions"} className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRIP_DATA.map((trip, i) => (
                  <motion.tr key={trip.route} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td className="px-6 py-3" style={{ color: 'var(--text-primary)' }}>{trip.route}</td>
                    <td className="px-6 py-3" style={{ color: 'var(--emerald)' }}>${trip.revenue.toLocaleString()}</td>
                    <td className="px-6 py-3" style={{ color: 'var(--rose)' }}>${trip.cost.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-void)' }}>
                          <motion.div className="h-full rounded-full" style={{ background: trip.margin >= 35 ? 'var(--emerald)' : trip.margin >= 30 ? 'var(--amber)' : 'var(--rose)' }}
                            initial={{ width: 0 }} whileInView={{ width: `${trip.margin}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
                        </div>
                        <span style={{ color: trip.margin >= 35 ? 'var(--emerald)' : trip.margin >= 30 ? 'var(--amber)' : 'var(--rose)' }}>{trip.margin}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: 'var(--cyan)' }}>Drill →</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
