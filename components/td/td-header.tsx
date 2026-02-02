"use client";

import {
  Bell,
  ChevronLeft,
  Shield,
  Search,
  MessageSquare,
  Sparkles,
  User,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

  return (
    <header className="glass sticky top-0 z-50 animate-fade-in">
      {/* Main Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-5">
          {isCleanSlateOpen ? (
            <button
              onClick={onCloseCleanSlate}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors btn-press"
              aria-label="Back to TD Banking"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors border border-border">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </button>
          ) : (
            <TDLogo />
          )}
        </div>

        {isCleanSlateOpen ? (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="flex items-center gap-3 mr-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green">
                <Sparkles className="w-5 h-5 text-[#0A0F14]" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Clean Slate
              </span>
            </div>
            <button
              onClick={() => setCleanSlateTab("notifications")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border btn-press relative ${
                cleanSlateTab === "notifications"
                  ? "bg-primary/20 border-primary/30 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={() => setCleanSlateTab("settings")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border btn-press ${
                cleanSlateTab === "settings"
                  ? "bg-primary/20 border-primary/30 text-primary"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors border border-border btn-press icon-hover"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors border border-border relative btn-press icon-hover"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
            </button>
            <button
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-[#00B8A9]/20 flex items-center justify-center hover:from-primary/30 hover:to-[#00B8A9]/30 transition-colors border border-primary/30 btn-press icon-hover"
              aria-label="Profile"
            >
              <User className="w-5 h-5 text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* Clean Slate Sub-Navigation */}
      {isCleanSlateOpen && (
        <nav className="flex border-t border-border px-6 animate-slide-up">
          {cleanSlateTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setCleanSlateTab(tab.id)}
              className={`flex-1 py-5 text-sm font-semibold transition-all relative btn-press animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span
                className={
                  cleanSlateTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {tab.label}
              </span>
              {cleanSlateTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full animate-scale-in" />
              )}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function TDLogo() {
  return (
    <div className="flex items-center gap-4 animate-pop-in">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green">
        <span className="font-bold text-[#0A0F14] text-2xl tracking-tight">
          TD
        </span>
      </div>
      <div className="hidden">
        <p className="font-bold text-foreground text-lg">TD Bank</p>
        <p className="text-xs text-muted-foreground">Personal Banking</p>
      </div>
    </div>
  );
}
