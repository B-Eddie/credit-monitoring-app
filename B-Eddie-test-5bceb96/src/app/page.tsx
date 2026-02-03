"use client";

import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TDHeader } from "@/components/TDHeader";
import { BottomNav } from "@/components/BottomNav";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import { TransferScreen } from "@/components/screens/TransferScreen";
import { MenuScreen } from "@/components/screens/MenuScreen";
import { AccountDetailScreen } from "@/components/screens/AccountDetailScreen";

type Tab = "accounts" | "transfer" | "menu";
type Screen = "dashboard" | "account-detail" | "transfer" | "menu";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("accounts");
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "accounts") {
      setCurrentScreen("dashboard");
      setSelectedAccountId(null);
    } else if (tab === "transfer") {
      setCurrentScreen("transfer");
    } else if (tab === "menu") {
      setCurrentScreen("menu");
    }
  };

  const handleAccountClick = (accountId: string) => {
    setSelectedAccountId(accountId);
    setCurrentScreen("account-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
    setSelectedAccountId(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return (
          <>
            <TDHeader userName="Taylor" />
            <DashboardScreen onAccountClick={handleAccountClick} />
          </>
        );
      case "account-detail":
        return (
          <AccountDetailScreen
            accountId={selectedAccountId || "chequing-1"}
            onBack={handleBackToDashboard}
          />
        );
      case "transfer":
        return <TransferScreen />;
      case "menu":
        return <MenuScreen />;
      default:
        return (
          <>
            <TDHeader userName="Taylor" />
            <DashboardScreen onAccountClick={handleAccountClick} />
          </>
        );
    }
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
        {currentScreen !== "account-detail" && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </PhoneFrame>
  );
}
