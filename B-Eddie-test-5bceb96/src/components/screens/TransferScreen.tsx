"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  CreditCard,
  Globe,
  Clock,
  ChevronRight,
  Smartphone,
  Building,
} from "lucide-react";

export function TransferScreen() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="td-gradient pt-12 pb-6 px-4">
        <h1 className="text-xl font-semibold text-white text-center">Pay & Transfer</h1>
      </div>

      <ScrollArea className="flex-1 -mt-2">
        <div className="bg-white rounded-t-3xl pt-6 px-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <QuickAction icon={<Send className="w-6 h-6" />} label="Send" />
            <QuickAction icon={<ArrowDownLeft className="w-6 h-6" />} label="Request" />
            <QuickAction icon={<Receipt className="w-6 h-6" />} label="Pay Bill" />
            <QuickAction icon={<ArrowUpRight className="w-6 h-6" />} label="Transfer" />
          </div>

          {/* Send Money Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">SEND MONEY</h3>
            <div className="space-y-2">
              <TransferOption
                icon={<Smartphone className="w-5 h-5" />}
                title="Interac e-Transfer"
                subtitle="Send money instantly to anyone in Canada"
              />
              <TransferOption
                icon={<Globe className="w-5 h-5" />}
                title="TD Global Transfer"
                subtitle="Send money to 200+ countries"
              />
              <TransferOption
                icon={<Building className="w-5 h-5" />}
                title="Transfer Between Accounts"
                subtitle="Move money between your TD accounts"
              />
            </div>
          </div>

          {/* Pay Bills Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">PAY BILLS</h3>
            <div className="space-y-2">
              <TransferOption
                icon={<Receipt className="w-5 h-5" />}
                title="Pay a Bill"
                subtitle="Pay your bills to registered payees"
              />
              <TransferOption
                icon={<CreditCard className="w-5 h-5" />}
                title="Pay Credit Card"
                subtitle="Make a payment to your TD credit card"
              />
            </div>
          </div>

          {/* Recent Transfers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">RECENT</h3>
              <button type="button" className="text-[#008A00] text-sm font-medium">
                See all
              </button>
            </div>
            <div className="space-y-3">
              <RecentTransfer
                name="Sarah Johnson"
                date="Jan 28, 2026"
                amount={-150.00}
                type="e-Transfer"
              />
              <RecentTransfer
                name="Toronto Hydro"
                date="Jan 25, 2026"
                amount={-89.45}
                type="Bill Payment"
              />
              <RecentTransfer
                name="Michael Chen"
                date="Jan 23, 2026"
                amount={75.00}
                type="e-Transfer"
                incoming
              />
            </div>
          </div>

          {/* Scheduled */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">SCHEDULED</h3>
            </div>
            <div className="bg-[#E8F5E9] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Rogers Communications</p>
                  <p className="text-sm text-gray-600">Feb 5, 2026</p>
                </div>
                <span className="font-semibold text-gray-900">$125.00</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#E8F5E9] hover:bg-[#C8E6C9] transition-colors"
    >
      <div className="text-[#008A00]">{icon}</div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

function TransferOption({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#008A00]">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}

function RecentTransfer({
  name,
  date,
  amount,
  type,
  incoming = false,
}: {
  name: string;
  date: string;
  amount: number;
  type: string;
  incoming?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
        {initials}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-500">{type} · {date}</p>
      </div>
      <span className={`font-semibold ${incoming ? "text-[#008A00]" : "text-gray-900"}`}>
        {incoming ? "+" : ""}{new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount)}
      </span>
    </div>
  );
}
