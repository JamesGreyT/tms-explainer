"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor, Smartphone, Globe,
  BarChart3, GitBranch, ShoppingCart, Calendar,
  MapPin, ScanLine, Receipt, Wifi,
  UserCheck, Map, FileText,
  ChevronRight, X,
  HeartPulse, ClipboardCheck, Wrench,
  Brain, UserCog, CreditCard, Globe2, Bell, FileBarChart,
  Navigation, FileSignature, Timer, Weight, ShieldAlert, Fuel,
  ShoppingBag, FolderOpen, MessageSquareWarning, BadgeDollarSign, PieChart, UsersRound,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface Feature {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  detailKey: string;
  docCodes?: string[];
}

interface Portal {
  id: string;
  titleKey: string;
  subtitleKey: string;
  icon: React.ReactNode;
  color: string;
  glowClass: string;
  usersKey: string;
  features: Feature[];
}

const PORTALS: Portal[] = [
  {
    id: "admin",
    titleKey: "portal.admin.title",
    subtitleKey: "portal.admin.subtitle",
    icon: <Monitor size={24} />,
    color: "#22d3ee",
    glowClass: "glow-cyan",
    usersKey: "portal.admin.users",
    features: [
      { icon: <BarChart3 size={18} />, titleKey: "portal.admin.f1.title", descKey: "portal.admin.f1.desc", detailKey: "portal.admin.f1.detail", docCodes: ["OACT", "OOCR"] },
      { icon: <GitBranch size={18} />, titleKey: "portal.admin.f2.title", descKey: "portal.admin.f2.desc", detailKey: "portal.admin.f2.detail", docCodes: ["OACT", "OBTF"] },
      { icon: <ShoppingCart size={18} />, titleKey: "portal.admin.f3.title", descKey: "portal.admin.f3.desc", detailKey: "portal.admin.f3.detail", docCodes: ["OPOR", "OPDN", "OPCH", "GRNI"] },
      { icon: <Calendar size={18} />, titleKey: "portal.admin.f4.title", descKey: "portal.admin.f4.desc", detailKey: "portal.admin.f4.detail", docCodes: ["OOCR", "OCR1"] },
      { icon: <HeartPulse size={18} />, titleKey: "portal.admin.f5.title", descKey: "portal.admin.f5.desc", detailKey: "portal.admin.f5.detail", docCodes: ["OPOR", "OSCL"] },
      { icon: <Brain size={18} />, titleKey: "portal.admin.f6.title", descKey: "portal.admin.f6.desc", detailKey: "portal.admin.f6.detail" },
      { icon: <UserCog size={18} />, titleKey: "portal.admin.f7.title", descKey: "portal.admin.f7.desc", detailKey: "portal.admin.f7.detail" },
      { icon: <CreditCard size={18} />, titleKey: "portal.admin.f8.title", descKey: "portal.admin.f8.desc", detailKey: "portal.admin.f8.detail", docCodes: ["OCRD", "OITR"] },
      { icon: <Globe2 size={18} />, titleKey: "portal.admin.f9.title", descKey: "portal.admin.f9.desc", detailKey: "portal.admin.f9.detail", docCodes: ["OACT", "OBTF"] },
      { icon: <Bell size={18} />, titleKey: "portal.admin.f10.title", descKey: "portal.admin.f10.desc", detailKey: "portal.admin.f10.detail" },
      { icon: <FileBarChart size={18} />, titleKey: "portal.admin.f11.title", descKey: "portal.admin.f11.desc", detailKey: "portal.admin.f11.detail" },
    ],
  },
  {
    id: "driver",
    titleKey: "portal.driver.title",
    subtitleKey: "portal.driver.subtitle",
    icon: <Smartphone size={24} />,
    color: "#34d399",
    glowClass: "glow-emerald",
    usersKey: "portal.driver.users",
    features: [
      { icon: <MapPin size={18} />, titleKey: "portal.driver.f1.title", descKey: "portal.driver.f1.desc", detailKey: "portal.driver.f1.detail", docCodes: ["OINV", "INV1"] },
      { icon: <ScanLine size={18} />, titleKey: "portal.driver.f2.title", descKey: "portal.driver.f2.desc", detailKey: "portal.driver.f2.detail", docCodes: ["OPDN", "PDN1"] },
      { icon: <Receipt size={18} />, titleKey: "portal.driver.f3.title", descKey: "portal.driver.f3.desc", detailKey: "portal.driver.f3.detail", docCodes: ["OIPF", "IPF1"] },
      { icon: <Wifi size={18} />, titleKey: "portal.driver.f4.title", descKey: "portal.driver.f4.desc", detailKey: "portal.driver.f4.detail" },
      { icon: <ClipboardCheck size={18} />, titleKey: "portal.driver.f5.title", descKey: "portal.driver.f5.desc", detailKey: "portal.driver.f5.detail", docCodes: ["OSCL"] },
      { icon: <Wrench size={18} />, titleKey: "portal.driver.f6.title", descKey: "portal.driver.f6.desc", detailKey: "portal.driver.f6.detail" },
      { icon: <Navigation size={18} />, titleKey: "portal.driver.f7.title", descKey: "portal.driver.f7.desc", detailKey: "portal.driver.f7.detail" },
      { icon: <FileSignature size={18} />, titleKey: "portal.driver.f8.title", descKey: "portal.driver.f8.desc", detailKey: "portal.driver.f8.detail" },
      { icon: <Timer size={18} />, titleKey: "portal.driver.f9.title", descKey: "portal.driver.f9.desc", detailKey: "portal.driver.f9.detail" },
      { icon: <Weight size={18} />, titleKey: "portal.driver.f10.title", descKey: "portal.driver.f10.desc", detailKey: "portal.driver.f10.detail" },
      { icon: <ShieldAlert size={18} />, titleKey: "portal.driver.f11.title", descKey: "portal.driver.f11.desc", detailKey: "portal.driver.f11.detail" },
      { icon: <Fuel size={18} />, titleKey: "portal.driver.f12.title", descKey: "portal.driver.f12.desc", detailKey: "portal.driver.f12.detail" },
    ],
  },
  {
    id: "customer",
    titleKey: "portal.customer.title",
    subtitleKey: "portal.customer.subtitle",
    icon: <Globe size={24} />,
    color: "#fbbf24",
    glowClass: "glow-amber",
    usersKey: "portal.customer.users",
    features: [
      { icon: <UserCheck size={18} />, titleKey: "portal.customer.f1.title", descKey: "portal.customer.f1.desc", detailKey: "portal.customer.f1.detail", docCodes: ["OCRD", "OQUT"] },
      { icon: <Map size={18} />, titleKey: "portal.customer.f2.title", descKey: "portal.customer.f2.desc", detailKey: "portal.customer.f2.detail" },
      { icon: <FileText size={18} />, titleKey: "portal.customer.f3.title", descKey: "portal.customer.f3.desc", detailKey: "portal.customer.f3.detail", docCodes: ["OINV", "ORCT", "OITR"] },
      { icon: <ShoppingBag size={18} />, titleKey: "portal.customer.f4.title", descKey: "portal.customer.f4.desc", detailKey: "portal.customer.f4.detail", docCodes: ["OQUT", "ORDR"] },
      { icon: <FolderOpen size={18} />, titleKey: "portal.customer.f5.title", descKey: "portal.customer.f5.desc", detailKey: "portal.customer.f5.detail" },
      { icon: <MessageSquareWarning size={18} />, titleKey: "portal.customer.f6.title", descKey: "portal.customer.f6.desc", detailKey: "portal.customer.f6.detail" },
      { icon: <BadgeDollarSign size={18} />, titleKey: "portal.customer.f7.title", descKey: "portal.customer.f7.desc", detailKey: "portal.customer.f7.detail", docCodes: ["OQUT"] },
      { icon: <PieChart size={18} />, titleKey: "portal.customer.f8.title", descKey: "portal.customer.f8.desc", detailKey: "portal.customer.f8.detail" },
      { icon: <UsersRound size={18} />, titleKey: "portal.customer.f9.title", descKey: "portal.customer.f9.desc", detailKey: "portal.customer.f9.detail", docCodes: ["OCRD"] },
    ],
  },
];

function FeatureCard({ feature, color, isExpanded, onClick, t }: {
  feature: Feature;
  color: string;
  isExpanded: boolean;
  onClick: () => void;
  t: (key: any) => string;
}) {
  return (
    <motion.div layout onClick={onClick}
      className="relative glass rounded-xl p-4 cursor-pointer overflow-hidden doc-card"
      style={{ borderColor: isExpanded ? color : undefined }}
      whileHover={{ borderColor: `${color}40` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span style={{ color }}>{feature.icon}</span>
          <div className="min-w-0">
            <h4 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t(feature.titleKey)}</h4>
            <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-dim)' }}>{t(feature.descKey)}</p>
          </div>
        </div>
        <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} style={{ color: 'var(--text-dim)' }}>
          {isExpanded ? <X size={14} /> : <ChevronRight size={14} />}
        </motion.span>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="text-sm leading-relaxed mt-4 mb-3" style={{ color: 'var(--text-secondary)' }}>{t(feature.detailKey)}</p>
            {feature.docCodes && (
              <div className="flex flex-wrap gap-2">
                {feature.docCodes.map((code) => (
                  <span key={code} className="inline-block px-2 py-0.5 rounded text-xs"
                    style={{ fontFamily: 'var(--font-mono)', background: `${color}10`, color, border: `1px solid ${color}30` }}>
                    {code}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PortalsSection() {
  const { t } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Resolve colors from CSS vars at render
  const colorMap: Record<string, string> = {
    admin: "var(--cyan)",
    driver: "var(--emerald)",
    customer: "var(--amber)",
  };

  return (
    <section className="relative py-32 px-8 overflow-hidden" id="portals">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_50%,var(--cyan-glow),transparent)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("portals.section")}</span>
          <h2 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {t("portals.title")}{" "}
            <span className="italic" style={{ color: 'var(--text-secondary)' }}>{t("portals.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{t("portals.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PORTALS.map((portal, portalIdx) => (
            <motion.div key={portal.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: portalIdx * 0.15 }}
              className={`glass rounded-2xl p-6 ${portal.glowClass}`}
              style={{ borderColor: `${portal.color}15` }}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${portal.color}15`, color: portal.color }}>
                  {portal.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: portal.color }}>{t(portal.titleKey as any)}</h3>
                  <span className="text-xs" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{t(portal.subtitleKey as any)}</span>
                </div>
              </div>
              <p className="text-xs mt-3 mb-5 px-2 py-1 rounded-full inline-block"
                style={{ background: 'var(--bg-void)', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {t(portal.usersKey as any)}
              </p>
              <div className="space-y-3">
                {portal.features.map((feature) => {
                  const key = `${portal.id}-${feature.titleKey}`;
                  return (
                    <FeatureCard key={key} feature={feature} color={portal.color}
                      isExpanded={expanded === key}
                      onClick={() => setExpanded(expanded === key ? null : key)}
                      t={t} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
