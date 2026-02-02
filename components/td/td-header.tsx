"use client"

import { Bell, ChevronLeft, Shield, Search, MessageSquare, Sparkles, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CleanSlateTab } from "@/app/page"

interface TDHeaderProps {
  isCleanSlateOpen: boolean
  onCloseCleanSlate: () => void
  cleanSlateTab: CleanSlateTab
  setCleanSlateTab: (tab: CleanSlateTab) => void
}

export function TDHeader({ isCleanSlateOpen, onCloseCleanSlate, cleanSlateTab, setCleanSlateTab }: TDHeaderProps) {
  const cleanSlateTabs: { id: CleanSlateTab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "disputes", label: "Disputes" },
    { id: "reports", label: "Reports" },
    { id: "support", label: "Support" },
  ]

  return (
    <header className="glass sticky top-0 z-50">
      {/* Main Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-5">
          {isCleanSlateOpen ? (
            <button 
              onClick={onCloseCleanSlate}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              aria-label="Back to TD Banking"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </button>
          ) : (
            <TDLogo />
          )}
        </div>

        {isCleanSlateOpen ? (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green">
              <Sparkles className="w-6 h-6 text-[#0A0F14]" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">Clean Slate</span>
              <p className="text-xs text-white/40">AI Credit Monitor</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10" aria-label="Search">
              <Search className="w-5 h-5 text-white/60" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 relative" aria-label="Notifications">
              <Bell className="w-5 h-5 text-white/60" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#00D9A4] rounded-full border-2 border-[#0A0F14]" />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D9A4]/20 to-[#00B8A9]/20 flex items-center justify-center hover:from-[#00D9A4]/30 hover:to-[#00B8A9]/30 transition-colors border border-[#00D9A4]/30" aria-label="Profile">
              <User className="w-5 h-5 text-[#00D9A4]" />
            </button>
          </div>
        )}
      </div>

      {/* Clean Slate Sub-Navigation */}
      {isCleanSlateOpen && (
        <nav className="flex border-t border-white/5 px-6">
          {cleanSlateTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCleanSlateTab(tab.id)}
              className={`flex-1 py-5 text-sm font-semibold transition-all relative ${
                cleanSlateTab === tab.id 
                  ? "text-[#00D9A4]" 
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.label}
              {cleanSlateTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-gradient-to-r from-[#00D9A4]/50 via-[#00D9A4] to-[#00D9A4]/50 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

function TDLogo() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green">
        <span className="font-bold text-[#0A0F14] text-2xl tracking-tight">TD</span>
      </div>
      <div className="hidden">
        <p className="font-bold text-white text-lg">TD Bank</p>
        <p className="text-xs text-white/40">Personal Banking</p>
      </div>
    </div>
  )
}
