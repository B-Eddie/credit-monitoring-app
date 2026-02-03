"use client";

import { ChevronRight, CreditCard, Landmark, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AccountCardProps {
  type: "chequing" | "savings" | "credit" | "investing";
  name: string;
  balance: number;
  accountNumber?: string;
  creditLimit?: number;
  onClick?: () => void;
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

export function AccountCard({ type, name, balance, accountNumber, creditLimit, onClick }: AccountCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const Icon = icons[type];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      role="button"
      tabIndex={0}
      className="account-card w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm text-left cursor-pointer"
    >
      <div className={`w-10 h-10 rounded-full ${colors[type]} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 truncate">{name}</p>
          {accountNumber && (
            <span className="text-xs text-gray-500">{accountNumber}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-900">
            {showBalance ? formatCurrency(balance) : "••••••"}
          </p>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setShowBalance(!showBalance);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                setShowBalance(!showBalance);
              }
            }}
            role="button"
            tabIndex={0}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </span>
        </div>
        {creditLimit && (
          <p className="text-xs text-gray-500">
            Available: {formatCurrency(creditLimit - Math.abs(balance))}
          </p>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
