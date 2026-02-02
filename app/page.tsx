"use client";

import { useState } from "react";
import { TDHeader } from "@/components/td/td-header";
import { TDBottomNav } from "@/components/td/td-bottom-nav";
import { TDHomeScreen } from "@/components/td/td-home-screen";
import { CleanSlateDashboard } from "@/components/clean-slate/dashboard";
import { CleanSlateDisputes } from "@/components/clean-slate/disputes";
import { CleanSlateReports } from "@/components/clean-slate/reports";
import { CleanSlateSupport } from "@/components/clean-slate/support";

export type MainTab = "home" | "accounts" | "payments" | "services" | "more";
export type CleanSlateTab = "dashboard" | "disputes" | "reports" | "support";

export default function TDBankApp() {
  const [mainTab, setMainTab] = useState<MainTab>("home");
  const [cleanSlateTab, setCleanSlateTab] =
    useState<CleanSlateTab>("dashboard");
  const [isCleanSlateOpen, setIsCleanSlateOpen] = useState(false);

  const handleOpenCleanSlate = () => {
    setIsCleanSlateOpen(true);
    setCleanSlateTab("dashboard");
  };

  const handleCloseCleanSlate = () => {
    setIsCleanSlateOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Ambient background glow - adapts to theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-breathe" />
      <div
        className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-[#00E5CC]/5 rounded-full blur-[120px] pointer-events-none animate-breathe"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#00B8A9]/5 rounded-full blur-[100px] pointer-events-none animate-breathe"
        style={{ animationDelay: "2s" }}
      />

      {/* Mobile frame simulation */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TDHeader
          isCleanSlateOpen={isCleanSlateOpen}
          onCloseCleanSlate={handleCloseCleanSlate}
          cleanSlateTab={cleanSlateTab}
          setCleanSlateTab={setCleanSlateTab}
        />

        <main className="flex-1 overflow-y-auto">
          {isCleanSlateOpen ? (
            <div className="page-transition">
              {cleanSlateTab === "dashboard" && <CleanSlateDashboard />}
              {cleanSlateTab === "disputes" && <CleanSlateDisputes />}
              {cleanSlateTab === "reports" && <CleanSlateReports />}
              {cleanSlateTab === "support" && <CleanSlateSupport />}
            </div>
          ) : (
            <TDHomeScreen onOpenCleanSlate={handleOpenCleanSlate} />
          )}
        </main>

        <TDBottomNav
          activeTab={mainTab}
          setActiveTab={setMainTab}
          isCleanSlateOpen={isCleanSlateOpen}
          cleanSlateTab={cleanSlateTab}
          setCleanSlateTab={setCleanSlateTab}
        />
      </div>
    </div>
  );
}
