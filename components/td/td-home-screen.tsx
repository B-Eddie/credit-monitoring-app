"use client";

import React from "react";
import {
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  AlertCircle,
  TrendingUp,
  Send,
  ArrowLeftRight,
  Receipt,
  Bell,
  Landmark,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

interface TDHomeScreenProps {
  onOpenCleanSlate: () => void;
}

export function TDHomeScreen({ onOpenCleanSlate }: TDHomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12
        ? "Good Morning"
        : hour < 18
          ? "Good Afternoon"
          : "Good Evening",
    );
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
      {/* TD Green Header */}
      <div className="td-gradient pt-12 pb-4 px-4">
        {/* Banking/Investing Toggle */}
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
            <h1 className="text-white text-xl font-semibold">Ryan</h1>
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
          <QuickActionPill
            icon={<ArrowLeftRight className="w-4 h-4" />}
            label="Move Money"
          />
          <QuickActionPill
            icon={<Send className="w-4 h-4" />}
            label="Transfer"
          />
          <QuickActionPill
            icon={<Receipt className="w-4 h-4" />}
            label="Pay a Bill"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* My Accounts Section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            My Accounts
          </h2>
          <button
            type="button"
            className="flex items-center gap-1 text-[#008A00] text-sm font-medium"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Banking Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Banking
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {showBalance ? "$8,459.82" : "••••••"}
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="chequing"
              name="TD Every Day Chequing"
              balance={5234.56}
              accountNumber="••7892"
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
            <AccountCard
              type="savings"
              name="TD High Interest Savings"
              balance={3225.26}
              accountNumber="••4521"
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
          </div>
        </div>

        {/* Credit Card Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Credit Card
            </span>
            <span className="text-sm font-semibold text-red-600">
              {showBalance ? "-$2,456.77" : "••••••"}
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="credit"
              name="TD Cash Back Visa"
              balance={-2456.77}
              accountNumber="••1403"
              creditLimit={10000}
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
          </div>
        </div>

        {/* Investing Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Investing
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {showBalance ? "$15,846.26" : "••••••"}
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="investing"
              name="TD Direct Investing TFSA"
              balance={15846.26}
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
          </div>
        </div>

        {/* Add Account Button */}
        {/* <button
          type="button"
          className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-[#008A00] hover:bg-[#E8F5E9] dark:hover:bg-[#008A00]/10 transition-colors mb-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Account and Services</span>
        </button> */}

        {/* Need to Know Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Need to know
          </h3>

          <div className="space-y-3">
            {/* Alert Card */}
            {/* <div className="bg-[#FFF3E0] dark:bg-orange-900/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    Your new Access Card is on its way
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Expected delivery in 5-7 business days
                  </p>
                </div>
              </div>
            </div> */}

            {/* Credit Score Card */}
            <button
              onClick={onOpenCleanSlate}
              className="w-full bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#008A00]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    Your credit score is looking good
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-[#008A00]">
                      {showBalance ? "742" : "•••"}
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                      +12 pts
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {/* Clean Slate AI Promo */}
            <button
              onClick={onOpenCleanSlate}
              className="w-full rounded-xl p-4 text-left relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #008A00 0%, #006B00 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">
                      Clean Slate AI
                    </span>
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-white/80">
                    AI-powered credit monitoring & disputes
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="quick-action flex items-center gap-2 px-3 py-2 bg-white/20 rounded-full text-white text-sm whitespace-nowrap hover:bg-white/30 active:scale-95 transition-all"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const icons = {
  chequing: Landmark,
  savings: Landmark,
  credit: CreditCard,
  investing: TrendingUp,
};

const colors = {
  chequing: "bg-[#008A00]",
  savings: "bg-[#2E7D32]",
  credit: "bg-[#1565C0]",
  investing: "bg-[#7B1FA2]",
};

function AccountCard({
  type,
  name,
  balance,
  accountNumber,
  creditLimit,
  showBalance,
  onToggleBalance,
}: {
  type: "chequing" | "savings" | "credit" | "investing";
  name: string;
  balance: number;
  accountNumber?: string;
  creditLimit?: number;
  showBalance: boolean;
  onToggleBalance: () => void;
}) {
  const Icon = icons[type];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <div className="account-card w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-sm text-left cursor-pointer transition-all">
      <div
        className={`w-10 h-10 rounded-full ${colors[type]} flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {name}
          </p>
          {accountNumber && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {accountNumber}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`text-lg font-semibold ${balance < 0 ? "text-red-600" : "text-gray-900 dark:text-white"}`}
          >
            {showBalance ? formatCurrency(balance) : "••••••"}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBalance();
            }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showBalance ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>
        {creditLimit && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Available: {formatCurrency(creditLimit - Math.abs(balance))}
          </p>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
