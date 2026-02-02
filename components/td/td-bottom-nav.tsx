"use client";

import React from "react";
import {
  Home,
  CreditCard,
  ArrowRightLeft,
  Grid3X3,
  LayoutDashboard,
  FileSearch,
  FileText,
  HelpCircle,
} from "lucide-react";
import type { MainTab, CleanSlateTab } from "@/app/page";

interface TDBottomNavProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  isCleanSlateOpen: boolean;
  cleanSlateTab: CleanSlateTab;
  setCleanSlateTab: (tab: CleanSlateTab) => void;
}

export function TDBottomNav({
  activeTab,
  setActiveTab,
  isCleanSlateOpen,
  cleanSlateTab,
  setCleanSlateTab,
}: TDBottomNavProps) {
  const mainTabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home className="w-6 h-6" /> },
    {
      id: "accounts",
      label: "Accounts",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: "payments",
      label: "Transfer",
      icon: <ArrowRightLeft className="w-6 h-6" />,
    },
    { id: "more", label: "More", icon: <Grid3X3 className="w-6 h-6" /> },
  ];

  const cleanSlateTabs: {
    id: CleanSlateTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "dashboard",
      label: "Overview",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      id: "disputes",
      label: "Disputes",
      icon: <FileSearch className="w-6 h-6" />,
    },
    { id: "reports", label: "Reports", icon: <FileText className="w-6 h-6" /> },
    { id: "support", label: "Help", icon: <HelpCircle className="w-6 h-6" /> },
  ];

  const tabs = isCleanSlateOpen ? cleanSlateTabs : mainTabs;

  return (
    <nav className="glass sticky bottom-0 z-50 safe-area-bottom border-t border-border">
      <div className="flex px-4 py-3">
        {tabs.map((tab, index) => {
          const isActive = isCleanSlateOpen
            ? cleanSlateTab === tab.id
            : activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isCleanSlateOpen) {
                  setCleanSlateTab(tab.id as CleanSlateTab);
                } else {
                  setActiveTab(tab.id as MainTab);
                }
              }}
              className={`flex-1 flex flex-col items-center py-4 gap-2.5 transition-all relative btn-press animate-fade-in-up ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {isActive && (
                <div className="absolute inset-x-4 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scale-in" />
              )}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive ? "bg-primary/15 border border-primary/30 scale-105" : "hover:bg-secondary"
                }`}
              >
                {tab.icon}
              </div>
              <span className="text-[11px] font-semibold tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
