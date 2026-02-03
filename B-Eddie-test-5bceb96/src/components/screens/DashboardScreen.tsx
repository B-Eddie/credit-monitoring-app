/** @jsxImportSource react */
"use client";

import { AccountCard } from "@/components/AccountCard";
import { ChevronRight, Plus, AlertCircle, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardScreenProps {
  onAccountClick: (accountId: string) => void;
}

export function DashboardScreen({ onAccountClick }: DashboardScreenProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="px-4 py-4">
        {/* My Accounts Section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">My Accounts</h2>
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
            <span className="text-sm text-gray-600">Banking</span>
            <span className="text-sm font-semibold text-gray-900">
              $8,459.82
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="chequing"
              name="TD Every Day Chequing"
              balance={5234.56}
              accountNumber="••7892"
              onClick={() => onAccountClick("chequing-1")}
            />
            <AccountCard
              type="savings"
              name="TD High Interest Savings"
              balance={3225.26}
              accountNumber="••4521"
              onClick={() => onAccountClick("savings-1")}
            />
          </div>
        </div>

        {/* Credit Card Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Credit Card</span>
            <span className="text-sm font-semibold text-red-600">
              -$2,456.77
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="credit"
              name="TD Cash Back Visa"
              balance={-2456.77}
              accountNumber="••1403"
              creditLimit={10000}
              onClick={() => onAccountClick("credit-1")}
            />
          </div>
        </div>

        {/* Investing Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Investing</span>
            <span className="text-sm font-semibold text-gray-900">
              $15,846.26
            </span>
          </div>
          <div className="space-y-2">
            <AccountCard
              type="investing"
              name="TD Direct Investing TFSA"
              balance={15846.26}
              onClick={() => onAccountClick("investing-1")}
            />
          </div>
        </div>

        {/* Add Account Button */}
        <button
          type="button"
          className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl text-[#008A00] hover:bg-[#E8F5E9] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Account and Services</span>
        </button>

        {/* Need to Know Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Need to know
          </h3>

          <div className="space-y-3">
            {/* Alert Card */}
            <div className="bg-[#FFF3E0] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Your new Access Card is on its way
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Expected delivery in 5-7 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Credit Score Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#008A00]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">
                    Your credit score is looking good
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-[#008A00]">
                      742
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      +12 pts
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
