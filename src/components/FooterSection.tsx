"use client";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function FooterSection() {
  const { t } = useApp();

  const NAV_ITEMS = [
    { label: t("nav.portals"), href: "#portals" },
    { label: t("nav.documents"), href: "#doc-flow" },
    { label: t("nav.kpis"), href: "#kpi" },
    { label: t("nav.triggers"), href: "#triggers" },
    { label: t("nav.fleet"), href: "#fleet" },
    { label: t("nav.vehicle"), href: "#vehicle" },
    { label: t("nav.stack"), href: "#stack" },
    { label: t("nav.gl"), href: "#control" },
  ];

  return (
    <footer className="relative py-20 px-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              TMS <span className="italic" style={{ color: 'var(--text-dim)' }}>v3.0</span>
            </h3>
            <p className="text-sm max-w-xs" style={{ color: 'var(--text-dim)' }}>{t("footer.tagline")}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-xs px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-[var(--bg-elevated)]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{item.label}</a>
            ))}
          </div>
          <motion.a href="#" whileHover={{ y: -3 }} className="flex items-center gap-2 text-xs self-start"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
            <ArrowUp size={14} />{t("footer.backToTop")}
          </motion.a>
        </div>
        <div className="mt-16 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>© 2026 TMS Enterprise Platform</span>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{t("footer.standalone")}</span>
        </div>
      </div>
    </footer>
  );
}
