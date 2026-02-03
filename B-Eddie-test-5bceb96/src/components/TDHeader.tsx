"use client";

import { Bell, ArrowLeftRight, Send, Receipt } from "lucide-react";
import { useState, useEffect } from "react";

interface TDHeaderProps {
  userName: string;
}

export function TDHeader({ userName }: TDHeaderProps) {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  return (
    <div className="td-gradient pt-12 pb-4 px-4">
      {/* Top bar with tabs */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex bg-white/20 rounded-full p-1">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-[#008A00]"
          >
            Banking
          </button>
          <button
            type="button"
            className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
          >
            Investing
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/80 text-sm">{greeting},</p>
          <h1 className="text-white text-xl font-semibold">{userName}</h1>
        </div>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <Bell className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <QuickAction icon={<ArrowLeftRight className="w-4 h-4" />} label="Move a Transfer" />
        <QuickAction icon={<Send className="w-4 h-4" />} label="Transfer" />
        <QuickAction icon={<Receipt className="w-4 h-4" />} label="Pay a Bill" />
      </div>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="quick-action flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full text-white text-sm whitespace-nowrap"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
