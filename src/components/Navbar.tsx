"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Locale } from "@/i18n/translations";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

export default function Navbar() {
  const { t, theme, setTheme, locale, setLocale } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const LINKS = [
    { label: t("nav.portals"), href: "#portals" },
    { label: t("nav.documents"), href: "#doc-flow" },
    { label: t("nav.kpis"), href: "#kpi" },
    { label: t("nav.triggers"), href: "#triggers" },
    { label: t("nav.fleet"), href: "#fleet" },
    { label: t("nav.vehicle"), href: "#vehicle" },
    { label: t("nav.stack"), href: "#stack" },
    { label: t("nav.gl"), href: "#control" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--cyan-dim)', border: '1px solid var(--cyan)' }}>
            <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>T</span>
          </div>
          <span className="text-sm tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            TMS <span className="italic" style={{ color: 'var(--text-dim)' }}>Enterprise</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden xl:flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 hover:bg-[var(--bg-elevated)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-[var(--bg-elevated)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', border: '1px solid var(--border-subtle)' }}
            >
              <Globe size={13} />
              {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div
                className="absolute top-full right-0 mt-1 rounded-lg overflow-hidden py-1 min-w-[60px]"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', zIndex: 100 }}
              >
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); setLangOpen(false); }}
                    className="block w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-[var(--bg-card)]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: locale === l.code ? 'var(--cyan)' : 'var(--text-dim)',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-[var(--bg-elevated)]"
            style={{ color: 'var(--text-dim)', border: '1px solid var(--border-subtle)' }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <span className="relative w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--emerald)' }} />
            <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>
              {t("nav.systemActive")}
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button className="xl:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--text-secondary)' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="xl:hidden px-8 pb-6"
          style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(20px)' }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-subtle)' }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
