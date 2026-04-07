"use client";
import { motion } from "framer-motion";
import { Truck, AlertTriangle, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface TripBar {
  vehicle: string; plate: string; driver: string; route: string;
  startDay: number; startHour: number; durationHours: number;
  color: string; status: "active" | "completed" | "conflict"; costCenter: string;
}

const TRIPS: TripBar[] = [
  { vehicle: "Volvo FH16", plate: "UZ-01-AB", driver: "A. Karimov", route: "Tashkent → Samarkand", startDay: 0, startHour: 6, durationHours: 14, color: "var(--cyan)", status: "completed", costCenter: "CC-101" },
  { vehicle: "Volvo FH16", plate: "UZ-01-AB", driver: "A. Karimov", route: "Samarkand → Bukhara", startDay: 1, startHour: 8, durationHours: 10, color: "var(--cyan)", status: "active", costCenter: "CC-101" },
  { vehicle: "MAN TGX", plate: "UZ-02-CD", driver: "B. Usmanov", route: "Bukhara → Navoi", startDay: 0, startHour: 4, durationHours: 18, color: "var(--emerald)", status: "completed", costCenter: "CC-102" },
  { vehicle: "MAN TGX", plate: "UZ-02-CD", driver: "B. Usmanov", route: "Navoi → Tashkent", startDay: 2, startHour: 6, durationHours: 20, color: "var(--emerald)", status: "active", costCenter: "CC-102" },
  { vehicle: "Scania R500", plate: "UZ-03-EF", driver: "C. Rakhimov", route: "Fergana → Andijan", startDay: 0, startHour: 10, durationHours: 8, color: "var(--amber)", status: "completed", costCenter: "CC-103" },
  { vehicle: "Scania R500", plate: "UZ-03-EF", driver: "C. Rakhimov", route: "Andijan → Fergana", startDay: 1, startHour: 2, durationHours: 8, color: "var(--amber)", status: "completed", costCenter: "CC-103" },
  { vehicle: "Scania R500", plate: "UZ-03-EF", driver: "C. Rakhimov", route: "Fergana → Tashkent", startDay: 1, startHour: 14, durationHours: 16, color: "var(--amber)", status: "active", costCenter: "CC-103" },
  { vehicle: "DAF XF", plate: "UZ-04-GH", driver: "D. Ibragimov", route: "Nukus → Urgench", startDay: 0, startHour: 0, durationHours: 36, color: "var(--violet)", status: "completed", costCenter: "CC-104" },
  { vehicle: "DAF XF", plate: "UZ-04-GH", driver: "D. Ibragimov", route: "Urgench → Bukhara", startDay: 2, startHour: 14, durationHours: 24, color: "var(--violet)", status: "active", costCenter: "CC-104" },
  { vehicle: "IVECO S-Way", plate: "UZ-05-IJ", driver: "E. Tursunov", route: "Karshi → Termez", startDay: 0, startHour: 8, durationHours: 12, color: "var(--rose)", status: "completed", costCenter: "CC-105" },
  { vehicle: "IVECO S-Way", plate: "UZ-05-IJ", driver: "E. Tursunov", route: "Termez → Karshi", startDay: 1, startHour: 6, durationHours: 12, color: "var(--rose)", status: "conflict", costCenter: "CC-105" },
];

const VEHICLES = [...new Map(TRIPS.map(t => [t.plate, t])).values()];

export default function GanttSection() {
  const { t } = useApp();
  const totalSlots = 7 * 24;

  return (
    <section className="relative py-32 px-8" id="fleet">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_80%,var(--violet-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("fleet.title")}{" "}<span className="italic text-gradient-violet">{t("fleet.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("fleet.subtitle")}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-3 flex items-center gap-6 flex-wrap" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: 'var(--emerald)', opacity: 0.7 }} /><span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.completed")}</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: 'var(--cyan)' }} /><span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.active")}</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: 'var(--rose)' }} /><span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.conflict")}</span></div>
            <div className="ml-auto text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.distRules")}</div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="flex" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="w-52 flex-shrink-0 px-4 py-2" style={{ borderRight: '1px solid var(--border-subtle)' }}>
                  <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("fleet.vehicle")}</span>
                </div>
                <div className="flex-1 flex">
                  {DAYS.map((day, i) => (
                    <div key={day} className="flex-1 text-center py-2" style={{ borderRight: i < 6 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{day}</span>
                    </div>
                  ))}
                </div>
              </div>
              {VEHICLES.map((vehicle, vi) => {
                const vehicleTrips = TRIPS.filter(t => t.plate === vehicle.plate);
                return (
                  <div key={vehicle.plate} className="flex group" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <div className="w-52 flex-shrink-0 px-4 py-3 flex items-center gap-3" style={{ borderRight: '1px solid var(--border-subtle)' }}>
                      <Truck size={14} style={{ color: vehicle.color }} />
                      <div className="min-w-0">
                        <span className="text-xs font-medium block truncate" style={{ color: 'var(--text-primary)' }}>{vehicle.vehicle}</span>
                        <span className="text-xs block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{vehicle.plate} · {vehicle.driver}</span>
                      </div>
                    </div>
                    <div className="flex-1 relative" style={{ height: '56px' }}>
                      {DAYS.slice(1).map((_, i) => (<div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${((i + 1) / 7) * 100}%`, background: 'var(--border-subtle)' }} />))}
                      {vehicleTrips.map((trip, ti) => {
                        const startOffset = (trip.startDay * 24 + trip.startHour) / totalSlots;
                        const width = trip.durationHours / totalSlots;
                        const barColor = trip.status === "conflict" ? "var(--rose)" : trip.color;
                        const opacity = trip.status === "completed" ? 0.5 : 1;
                        return (
                          <motion.div key={ti} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: vi * 0.1 + ti * 0.05 }}
                            className="absolute top-2 bottom-2 rounded-md flex items-center px-2 overflow-hidden cursor-pointer group/bar"
                            style={{ left: `${startOffset * 100}%`, width: `${width * 100}%`, background: `${barColor}20`, border: `1px solid ${barColor}40`, opacity, transformOrigin: 'left' }}>
                            <span className="text-xs truncate" style={{ fontFamily: 'var(--font-mono)', color: barColor, fontSize: '10px' }}>{trip.route}</span>
                            {trip.status === "conflict" && <AlertTriangle size={10} className="ml-auto flex-shrink-0" style={{ color: 'var(--rose)' }} />}
                            {trip.status === "completed" && <Check size={10} className="ml-auto flex-shrink-0" style={{ color: 'var(--emerald)' }} />}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
