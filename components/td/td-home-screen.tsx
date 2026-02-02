"use client"

import React from "react"
import { ChevronRight, Shield, Eye, EyeOff, Plus, CreditCard, ArrowDownLeft, ArrowUpRight, Sparkles, Send, QrCode, Receipt } from "lucide-react"
import { useState } from "react"

interface TDHomeScreenProps {
  onOpenCleanSlate: () => void
}

export function TDHomeScreen({ onOpenCleanSlate }: TDHomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="pb-12">
      {/* Welcome & Balance Section */}
      <section className="px-8 pt-8 pb-10">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white/50 text-sm font-medium tracking-wide">Good morning, Ryan</p>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors p-2 -mr-2"
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Total Balance</p>
        <div className="flex items-baseline gap-2">
          <span className="text-white/50 text-4xl font-light">$</span>
          <h1 className="text-7xl font-semibold text-white tracking-tight">
            {showBalance ? "1,017,368" : "••••••"}
          </h1>
          <span className="text-white/40 text-2xl font-light">.67</span>
        </div>
        <p className="text-white/40 text-sm mt-4">Available across 3 accounts</p>
      </section>

      {/* Quick Actions - Primary */}
      <section className="px-8 pb-10">
        <div className="grid grid-cols-4 gap-6">
          <QuickAction icon={<Send className="w-6 h-6" />} label="Send" />
          <QuickAction icon={<QrCode className="w-6 h-6" />} label="Scan" />
          <QuickAction icon={<Receipt className="w-6 h-6" />} label="Pay Bills" />
          <QuickAction icon={<Plus className="w-6 h-6" />} label="More" />
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-10">
        <div className="px-8 flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg tracking-tight">My Cards</h2>
          <button className="flex items-center gap-2 text-[#00D9A4] text-sm font-medium hover:text-[#00FFB8] transition-colors">
            <span>Manage</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-5 overflow-x-auto pb-2 px-8 scrollbar-hide">
          <GlassCard 
            type="VISA"
            name="TD Everyday"
            balance={showBalance ? "$4,523.18" : "••••••"}
            lastFour="1550"
            expiry="04/27"
            gradient="from-[#00B8A9] to-[#00D9A4]"
            isPrimary
          />
          <GlassCard 
            type="VISA"
            name="TD Cash Back"
            balance={showBalance ? "$8,500.00" : "••••••"}
            lastFour="6670"
            expiry="09/26"
            gradient="from-[#1A232D] to-[#2A3644]"
          />
          <GlassCard 
            type="VISA"
            name="Savings"
            balance={showBalance ? "$4,345.24" : "••••••"}
            lastFour="3350"
            expiry="12/28"
            gradient="from-[#1A232D] to-[#2A3644]"
          />
        </div>
      </section>

      {/* Clean Slate AI Feature Card */}
      <section className="px-8 pb-10">
        <button 
          onClick={onOpenCleanSlate}
          className="w-full text-left"
        >
          <div className="rounded-3xl p-7 border border-[#00D9A4]/30 bg-gradient-to-br from-[#00D9A4]/10 to-transparent hover:border-[#00D9A4]/50 transition-all group relative overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00D9A4]/20 rounded-full blur-3xl" />
            
            <div className="flex items-start gap-5 mb-8 relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green flex-shrink-0">
                <Sparkles className="w-8 h-8 text-[#0A0F14]" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-white text-xl tracking-tight">Clean Slate AI</span>
                  <span className="text-[10px] bg-[#00D9A4] text-[#0A0F14] px-3 py-1 rounded-full font-bold uppercase tracking-wide">New</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">AI-powered credit monitoring & dispute resolution</p>
              </div>
              <ChevronRight className="w-6 h-6 text-white/30 group-hover:text-[#00D9A4] group-hover:translate-x-1 transition-all mt-1" />
            </div>
            
            <div className="flex items-center gap-10 relative">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Credit Score</p>
                <p className="text-5xl font-bold text-white tracking-tight">742</p>
              </div>
              <div className="h-16 w-px bg-white/10" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Health</p>
                <p className="text-5xl font-bold text-[#00D9A4] tracking-tight">94<span className="text-3xl">%</span></p>
              </div>
            </div>
          </div>
        </button>
      </section>

      {/* Transaction History */}
      <section className="px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg tracking-tight">Recent Activity</h2>
          <button className="text-sm text-[#00D9A4] font-medium hover:text-[#00FFB8] transition-colors flex items-center gap-1">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          <TransactionItem 
            merchant="Wise Transfer"
            date="Today, 4:30 PM"
            amount="+$20.00"
            type="Transfer"
            isPositive
          />
          <TransactionItem 
            merchant="Interac e-Transfer"
            date="Today, 3:34 PM"
            amount="+$240.00"
            type="Received"
            isPositive
          />
          <TransactionItem 
            merchant="Apple Pay - Starbucks"
            date="Today, 2:15 PM"
            amount="-$8.45"
            type="Purchase"
          />
          <TransactionItem 
            merchant="Netflix Subscription"
            date="Yesterday"
            amount="-$22.99"
            type="Subscription"
          />
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-8 pb-8">
        <h2 className="text-white font-semibold text-lg tracking-tight mb-6">Insights</h2>
        <div className="grid grid-cols-2 gap-4">
          <InsightCard 
            title="Monthly Spending"
            value="$2,458"
            subtitle="15% less than last month"
            positive
          />
          <InsightCard 
            title="Savings Goal"
            value="68%"
            subtitle="$3,400 of $5,000"
          />
        </div>
      </section>
    </div>
  )
}

function InsightCard({ title, value, subtitle, positive }: { title: string; value: string; subtitle: string; positive?: boolean }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{title}</p>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <p className={`text-xs ${positive ? 'text-[#00D9A4]' : 'text-white/40'}`}>{subtitle}</p>
    </div>
  )
}

function GlassCard({ 
  type, 
  name, 
  balance, 
  lastFour,
  expiry,
  gradient,
  isPrimary = false
}: { 
  type: string
  name: string
  balance: string
  lastFour: string
  expiry: string
  gradient: string
  isPrimary?: boolean
}) {
  return (
    <div className={`flex-shrink-0 w-56 h-36 rounded-3xl bg-gradient-to-br ${gradient} p-6 relative overflow-hidden ${isPrimary ? 'glow-green' : ''}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{type}</p>
            <p className="text-sm text-white font-semibold mt-1">{name}</p>
          </div>
          {isPrimary && (
            <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase">Primary</span>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-white tracking-tight">{balance}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-white/60 font-medium">•••• {lastFour}</p>
            <p className="text-[11px] text-white/60 font-medium">{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ icon, label, onClick, highlight }: { icon: React.ReactNode; label: string; onClick?: () => void; highlight?: boolean }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-3 group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
        highlight 
          ? 'bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] text-[#0A0F14] glow-green' 
          : 'bg-white/5 border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white'
      }`}>
        {icon}
      </div>
      <span className="text-xs text-white/60 font-medium tracking-wide">{label}</span>
    </button>
  )
}

function TransactionItem({ 
  merchant, 
  date, 
  amount, 
  type,
  isPositive = false 
}: { 
  merchant: string
  date: string
  amount: string
  type: string
  isPositive?: boolean
}) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isPositive ? 'bg-[#00D9A4]/10' : 'bg-white/5'
        }`}>
          {isPositive ? (
            <ArrowDownLeft className="w-6 h-6 text-[#00D9A4]" />
          ) : (
            <ArrowUpRight className="w-6 h-6 text-white/50" />
          )}
        </div>
        <div>
          <p className="font-semibold text-white text-[15px]">{merchant}</p>
          <p className="text-sm text-white/40 mt-1">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${isPositive ? 'text-[#00D9A4]' : 'text-white'}`}>
          {amount}
        </p>
        <p className="text-sm text-white/40 mt-1">{type}</p>
      </div>
    </div>
  )
}

function Star() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}
