"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortalsSection from "@/components/PortalsSection";
import DocumentFlowSection from "@/components/DocumentFlowSection";
import KPIDashboardSection from "@/components/KPIDashboardSection";
import FinancialTriggersSection from "@/components/FinancialTriggersSection";
import GanttSection from "@/components/GanttSection";
import VehicleHealthSection from "@/components/VehicleHealthSection";
import TechStackSection from "@/components/TechStackSection";
import ControlAccountSection from "@/components/ControlAccountSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <PortalsSection />
      <div className="section-divider" />
      <DocumentFlowSection />
      <div className="section-divider" />
      <KPIDashboardSection />
      <div className="section-divider" />
      <FinancialTriggersSection />
      <div className="section-divider" />
      <GanttSection />
      <div className="section-divider" />
      <VehicleHealthSection />
      <div className="section-divider" />
      <TechStackSection />
      <div className="section-divider" />
      <ControlAccountSection />
      <div className="section-divider" />
      <FooterSection />
    </main>
  );
}
