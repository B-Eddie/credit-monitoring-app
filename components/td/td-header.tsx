"use client";

import { Bell, ChevronLeft, Sparkles, Settings } from "lucide-react";
import type { CleanSlateTab } from "@/app/page";

interface TDHeaderProps {
  isCleanSlateOpen: boolean;
  onCloseCleanSlate: () => void;
  cleanSlateTab: CleanSlateTab;
  setCleanSlateTab: (tab: CleanSlateTab) => void;
}

export function TDHeader({
  isCleanSlateOpen,
  onCloseCleanSlate,
  cleanSlateTab,
  setCleanSlateTab,
}: TDHeaderProps) {
  const cleanSlateTabs: { id: CleanSlateTab; label: string }[] = [
    { id: "dashboard", label: "Home" },
    { id: "disputes", label: "Disputes" },
    { id: "reports", label: "Reports" },
    { id: "support", label: "Help" },
  ];

  // Only show header when Clean Slate is open - main TD header is in home screen now
  if (!isCleanSlateOpen) {
    return null;
  }

  return (
    <header className="td-gradient pt-12 pb-4 px-4">
      {/* Clean Slate Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onCloseCleanSlate}
          className="flex items-center gap-2 text-white"
          aria-label="Back to TD Banking"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">Clean Slate</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCleanSlateTab("notifications")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setCleanSlateTab("settings")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Clean Slate Tab Navigation */}
      <div className="flex bg-white/20 rounded-full p-1">
        {cleanSlateTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCleanSlateTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-all ${
              cleanSlateTab === tab.id
                ? "bg-white text-[#008A00]"
                : "text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
