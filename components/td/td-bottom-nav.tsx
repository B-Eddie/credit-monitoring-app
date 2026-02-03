"use client";

import React from "react";
import {
  Wallet,
  ArrowLeftRight,
  Menu,
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
  const mainTabs: {
    id: MainTab;
    label: string;
    icon: React.ReactNode;
    notificationCount?: number;
  }[] = [
    { id: "home", label: "Accounts", icon: <Wallet className="w-6 h-6" /> },
    {
      id: "payments",
      label: "Pay & Transfer",
      icon: <ArrowLeftRight className="w-6 h-6" />,
    },
    {
      id: "more",
      label: "Menu",
      icon: <Menu className="w-6 h-6" />,
      notificationCount: 3,
    },
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
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-2 pb-6 z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
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
              className={`relative flex flex-col items-center gap-1 py-2 px-4 transition-colors ${
                isActive ? "text-[#008A00]" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <div className="relative">
                {tab.icon}
                {"notificationCount" in tab &&
                  tab.notificationCount &&
                  tab.notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-medium">
                      {tab.notificationCount}
                    </span>
                  )}
              </div>
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 bg-[#008A00] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
