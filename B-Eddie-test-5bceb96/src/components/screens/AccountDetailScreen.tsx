"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";

interface AccountDetailScreenProps {
  accountId: string;
  onBack: () => void;
}

const accountData: Record<string, {
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
  color: string;
}> = {
  "chequing-1": {
    name: "TD Every Day Chequing",
    type: "Chequing Account",
    balance: 5234.56,
    accountNumber: "****7892",
    color: "#008A00",
  },
  "savings-1": {
    name: "TD High Interest Savings",
    type: "Savings Account",
    balance: 3225.26,
    accountNumber: "****4521",
    color: "#2E7D32",
  },
  "credit-1": {
    name: "TD Cash Back Visa",
    type: "Credit Card",
    balance: -2456.77,
    accountNumber: "****1403",
    color: "#1565C0",
  },
  "investing-1": {
    name: "TD Direct Investing TFSA",
    type: "Investment Account",
    balance: 15846.26,
    accountNumber: "****9012",
    color: "#7B1FA2",
  },
};

const transactions = [
  {
    id: 1,
    name: "Starbucks",
    category: "Coffee & Drinks",
    icon: Coffee,
    date: "Today, 9:42 AM",
    amount: -5.75,
  },
  {
    id: 2,
    name: "Amazon.ca",
    category: "Shopping",
    icon: ShoppingBag,
    date: "Today, 8:15 AM",
    amount: -89.99,
  },
  {
    id: 3,
    name: "Payroll Deposit",
    category: "Income",
    icon: Briefcase,
    date: "Jan 31, 2026",
    amount: 3250.00,
  },
  {
    id: 4,
    name: "Uber Eats",
    category: "Food & Dining",
    icon: Utensils,
    date: "Jan 30, 2026",
    amount: -42.50,
  },
  {
    id: 5,
    name: "Shell Gas Station",
    category: "Transportation",
    icon: Car,
    date: "Jan 29, 2026",
    amount: -65.00,
  },
  {
    id: 6,
    name: "Rent Payment",
    category: "Housing",
    icon: Home,
    date: "Jan 28, 2026",
    amount: -1800.00,
  },
  {
    id: 7,
    name: "Tim Hortons",
    category: "Coffee & Drinks",
    icon: Coffee,
    date: "Jan 28, 2026",
    amount: -4.25,
  },
  {
    id: 8,
    name: "Loblaws",
    category: "Groceries",
    icon: ShoppingBag,
    date: "Jan 27, 2026",
    amount: -156.78,
  },
];

export function AccountDetailScreen({ accountId, onBack }: AccountDetailScreenProps) {
  const account = accountData[accountId] || accountData["chequing-1"];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div
        className="pt-12 pb-6 px-4"
        style={{ background: `linear-gradient(180deg, ${account.color} 0%, ${account.color}dd 100%)` }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <div className="text-center">
          <p className="text-white/80 text-sm">{account.type}</p>
          <h1 className="text-white text-lg font-semibold mt-1">{account.name}</h1>
          <p className="text-white/60 text-xs mt-1">{account.accountNumber}</p>
          <p className="text-white text-3xl font-bold mt-4">
            {formatCurrency(account.balance)}
          </p>
          <p className="text-white/80 text-sm mt-1">Available Balance</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <QuickActionButton icon={<ArrowUpRight className="w-5 h-5" />} label="Send" />
          <QuickActionButton icon={<ArrowDownLeft className="w-5 h-5" />} label="Request" />
          <QuickActionButton icon={<MoreHorizontal className="w-5 h-5" />} label="More" />
        </div>
      </div>

      <ScrollArea className="flex-1 -mt-2">
        <div className="bg-white rounded-t-3xl pt-6 px-4">
          {/* Transactions Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Transactions</h2>
            <button type="button" className="flex items-center gap-1 text-[#008A00] text-sm font-medium">
              <span>Filter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Transaction List */}
          <div className="space-y-1">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>

          <div className="py-6 text-center">
            <button
              type="button"
              className="text-[#008A00] font-medium text-sm"
            >
              Load more transactions
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1"
    >
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
        {icon}
      </div>
      <span className="text-xs text-white">{label}</span>
    </button>
  );
}

function TransactionItem({
  transaction,
}: {
  transaction: {
    name: string;
    category: string;
    icon: typeof Coffee;
    date: string;
    amount: number;
  };
}) {
  const Icon = transaction.icon;
  const isPositive = transaction.amount > 0;

  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{transaction.name}</p>
        <p className="text-xs text-gray-500">{transaction.category} · {transaction.date}</p>
      </div>
      <span className={`font-semibold ${isPositive ? "text-[#008A00]" : "text-gray-900"}`}>
        {isPositive ? "+" : ""}
        {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(transaction.amount)}
      </span>
    </button>
  );
}
