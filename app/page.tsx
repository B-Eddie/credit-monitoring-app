"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TDHeader } from "@/components/td/td-header";
import { TDBottomNav } from "@/components/td/td-bottom-nav";
import { TDHomeScreen } from "@/components/td/td-home-screen";
import { CleanSlateDashboard } from "@/components/clean-slate/dashboard";
import { CleanSlateDisputes } from "@/components/clean-slate/disputes";
import { CleanSlateReports } from "@/components/clean-slate/reports";
import { CleanSlateSupport } from "@/components/clean-slate/support";
import { CleanSlateNotifications } from "@/components/clean-slate/notifications";
import { CleanSlateSettings } from "@/components/clean-slate/settings";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  Smartphone,
  Receipt,
  Globe,
  ChevronRight,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  User,
  LogOut,
  Moon,
  Fingerprint,
  MessageSquare,
} from "lucide-react";

export type MainTab = "home" | "accounts" | "payments" | "services" | "more";
export type CleanSlateTab =
  | "dashboard"
  | "disputes"
  | "reports"
  | "support"
  | "notifications"
  | "settings";

export default function TDBankApp() {
  const [mainTab, setMainTab] = useState<MainTab>("home");
  const [cleanSlateTab, setCleanSlateTab] =
    useState<CleanSlateTab>("dashboard");
  const [isCleanSlateOpen, setIsCleanSlateOpen] = useState(false);
  const [showPayTransfer, setShowPayTransfer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleOpenCleanSlate = () => {
    setIsCleanSlateOpen(true);
    setCleanSlateTab("dashboard");
  };

  const handleCloseCleanSlate = () => {
    setIsCleanSlateOpen(false);
  };

  const handleTabChange = (tab: MainTab) => {
    if (tab === "payments") {
      setShowPayTransfer(true);
    } else if (tab === "more") {
      setShowMenu(true);
    } else {
      setMainTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Mobile frame simulation */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TDHeader
          isCleanSlateOpen={isCleanSlateOpen}
          onCloseCleanSlate={handleCloseCleanSlate}
          cleanSlateTab={cleanSlateTab}
          setCleanSlateTab={setCleanSlateTab}
        />

        <main className="flex-1 overflow-y-auto pb-20">
          {isCleanSlateOpen ? (
            <div className="bg-white dark:bg-gray-950 min-h-full">
              {cleanSlateTab === "dashboard" && <CleanSlateDashboard />}
              {cleanSlateTab === "disputes" && <CleanSlateDisputes />}
              {cleanSlateTab === "reports" && <CleanSlateReports />}
              {cleanSlateTab === "support" && <CleanSlateSupport />}
              {cleanSlateTab === "notifications" && <CleanSlateNotifications />}
              {cleanSlateTab === "settings" && <CleanSlateSettings />}
            </div>
          ) : (
            <TDHomeScreen onOpenCleanSlate={handleOpenCleanSlate} />
          )}
        </main>

        <TDBottomNav
          activeTab={mainTab}
          setActiveTab={handleTabChange}
          isCleanSlateOpen={isCleanSlateOpen}
          cleanSlateTab={cleanSlateTab}
          setCleanSlateTab={setCleanSlateTab}
        />
      </div>

      {/* Pay & Transfer Sheet */}
      <Sheet open={showPayTransfer} onOpenChange={setShowPayTransfer}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="text-xl">Pay & Transfer</SheetTitle>
            <SheetDescription>Send money and manage payments</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto space-y-6 px-1">
            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4">
              <QuickActionItem
                icon={<ArrowUpRight className="w-6 h-6" />}
                label="Send"
              />
              <QuickActionItem
                icon={<ArrowDownLeft className="w-6 h-6" />}
                label="Request"
              />
              <QuickActionItem
                icon={<CreditCard className="w-6 h-6" />}
                label="Pay Bills"
              />
              <QuickActionItem
                icon={<Smartphone className="w-6 h-6" />}
                label="Mobile"
              />
            </div>

            {/* Transfer Options */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Transfer Options
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <MenuListItem
                  icon={<Smartphone className="w-5 h-5" />}
                  title="Interac e-Transfer"
                  subtitle="Send to email or phone"
                  onClick={() => {
                    setShowPayTransfer(false);
                    toast.success("Opening e-Transfer", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<Building2 className="w-5 h-5" />}
                  title="Transfer Between Accounts"
                  subtitle="Move money instantly"
                  onClick={() => {
                    setShowPayTransfer(false);
                    toast.success("Opening Transfer", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<Globe className="w-5 h-5" />}
                  title="TD Global Transfer"
                  subtitle="Send money internationally"
                  onClick={() => {
                    setShowPayTransfer(false);
                    toast.success("Opening Global Transfer", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
              </div>
            </div>

            {/* Bill Payments */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Bill Payments
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <MenuListItem
                  icon={<Receipt className="w-5 h-5" />}
                  title="Pay a Bill"
                  subtitle="One-time or recurring"
                  onClick={() => {
                    setShowPayTransfer(false);
                    toast.success("Opening Bill Pay", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<FileText className="w-5 h-5" />}
                  title="Manage Payees"
                  subtitle="Add or edit bill payees"
                  onClick={() => {
                    setShowPayTransfer(false);
                    toast.success("Opening Payees", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Recent
              </p>
              <div className="space-y-2">
                <RecentTransferItem
                  name="John D."
                  amount="-$50.00"
                  type="e-Transfer"
                  time="Today"
                />
                <RecentTransferItem
                  name="Hydro One"
                  amount="-$142.30"
                  type="Bill Payment"
                  time="Yesterday"
                />
                <RecentTransferItem
                  name="Sarah M."
                  amount="+$25.00"
                  type="e-Transfer"
                  time="Dec 28"
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Menu Sheet */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="text-xl">Menu</SheetTitle>
            <SheetDescription>Account settings and more</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto space-y-6 px-1">
            {/* Profile */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-[#008A00] flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  John Doe
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  john.doe@email.com
                </p>
              </div>
            </div>

            {/* Account Settings */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Account
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <MenuListItem
                  icon={<User className="w-5 h-5" />}
                  title="Profile Settings"
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Opening Profile", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<Bell className="w-5 h-5" />}
                  title="Notifications"
                  badge="3"
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Opening Notifications", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<Shield className="w-5 h-5" />}
                  title="Security & Privacy"
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Opening Security", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Preferences
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <MenuListItem
                  icon={<Fingerprint className="w-5 h-5" />}
                  title="Biometric Login"
                  toggle
                  defaultOn
                />
                <MenuListItem
                  icon={<Moon className="w-5 h-5" />}
                  title="Dark Mode"
                  toggle
                  defaultOn
                />
              </div>
            </div>

            {/* Support */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                Support
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <MenuListItem
                  icon={<HelpCircle className="w-5 h-5" />}
                  title="Help & FAQ"
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Opening Help", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
                <MenuListItem
                  icon={<MessageSquare className="w-5 h-5" />}
                  title="Contact Us"
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Opening Contact", {
                      description: "Feature coming soon!",
                    });
                  }}
                />
              </div>
            </div>

            {/* Sign Out */}
            <button
              className="w-full p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2"
              onClick={() => {
                setShowMenu(false);
                toast.error("Signed out", {
                  description: "You have been signed out.",
                });
              }}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper Components
function QuickActionItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className="flex flex-col items-center gap-2 p-3"
      onClick={() =>
        toast.success(`${label}`, { description: "Feature coming soon!" })
      }
    >
      <div className="w-12 h-12 rounded-full bg-[#008A00]/10 flex items-center justify-center text-[#008A00]">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </button>
  );
}

function MenuListItem({
  icon,
  title,
  subtitle,
  badge,
  toggle,
  defaultOn,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  toggle?: boolean;
  defaultOn?: boolean;
  onClick?: () => void;
}) {
  const [isOn, setIsOn] = useState(defaultOn || false);

  return (
    <button
      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
      onClick={toggle ? () => setIsOn(!isOn) : onClick}
    >
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      {badge && (
        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
          {badge}
        </span>
      )}
      {toggle ? (
        <div
          className={`w-12 h-7 rounded-full transition-colors ${isOn ? "bg-[#008A00]" : "bg-gray-300 dark:bg-gray-600"} relative`}
        >
          <div
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-6" : "translate-x-1"}`}
          />
        </div>
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}

function RecentTransferItem({
  name,
  amount,
  type,
  time,
}: {
  name: string;
  amount: string;
  type: string;
  time: string;
}) {
  const isPositive = amount.startsWith("+");
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 font-medium">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {type} • {time}
        </p>
      </div>
      <span
        className={`font-semibold ${isPositive ? "text-[#008A00]" : "text-gray-900 dark:text-white"}`}
      >
        {amount}
      </span>
    </div>
  );
}
