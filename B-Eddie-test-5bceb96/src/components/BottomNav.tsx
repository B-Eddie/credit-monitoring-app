"use client";

import { Wallet, ArrowLeftRight, Menu, User } from "lucide-react";

interface BottomNavProps {
  activeTab: "accounts" | "transfer" | "menu";
  onTabChange: (tab: "accounts" | "transfer" | "menu") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="bg-white border-t border-gray-100 px-6 py-2 pb-6">
      <div className="flex items-center justify-around">
        <NavItem
          icon={<Wallet className="w-6 h-6" />}
          label="Accounts"
          active={activeTab === "accounts"}
          onClick={() => onTabChange("accounts")}
        />
        <NavItem
          icon={<ArrowLeftRight className="w-6 h-6" />}
          label="Pay & Transfer"
          active={activeTab === "transfer"}
          onClick={() => onTabChange("transfer")}
          hasNotification
        />
        <NavItem
          icon={<Menu className="w-6 h-6" />}
          label="Menu"
          active={activeTab === "menu"}
          onClick={() => onTabChange("menu")}
          notificationCount={3}
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  hasNotification?: boolean;
  notificationCount?: number;
}

function NavItem({ icon, label, active, onClick, hasNotification, notificationCount }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 py-2 px-4 ${
        active ? "text-[#008A00]" : "text-gray-500"
      }`}
    >
      <div className="relative">
        {icon}
        {notificationCount && notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-medium">
            {notificationCount}
          </span>
        )}
      </div>
      <span className={`text-xs ${active ? "font-medium" : ""}`}>{label}</span>
      {active && (
        <div className="absolute bottom-0 w-1 h-1 bg-[#008A00] rounded-full" />
      )}
    </button>
  );
}
