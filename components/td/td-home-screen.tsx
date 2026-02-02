"use client";

import React from "react";
import {
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  Plus,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  Send,
  QrCode,
  Receipt,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface TDHomeScreenProps {
  onOpenCleanSlate: () => void;
}

export function TDHomeScreen({ onOpenCleanSlate }: TDHomeScreenProps) {
  const [showBalance, setShowBalance] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pb-12">
      {/* Welcome & Balance Section */}
      <section className="px-8 pt-8 pb-10 animate-fade-in">
        <div className="flex items-center justify-between mb-1">
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Good morning, Ryan
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-2 btn-press"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )
              ) : (
                <span className="w-5 h-5 inline-block" aria-hidden />
              )}
            </button>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2 btn-press"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <p className="text-muted-foreground/60 text-xs uppercase tracking-widest mb-4">
          Total Balance
        </p>
        <div className="flex items-baseline gap-2 animate-fade-in-up">
          <span className="text-muted-foreground text-4xl font-light">$</span>
          <h1 className="text-7xl font-semibold text-foreground tracking-tight">
            {showBalance ? "117,368" : "••••••"}
          </h1>
          <span className="text-muted-foreground text-2xl font-light">.67</span>
        </div>
        <p className="text-muted-foreground text-sm mt-4 animate-fade-in stagger-2">
          Available across 3 accounts
        </p>
      </section>

      {/* Quick Actions - Primary */}
      <section className="px-8 pb-10">
        <div className="grid grid-cols-4 gap-6">
          <QuickAction
            icon={<Send className="w-6 h-6" />}
            label="Send"
            delay={0}
          />
          <QuickAction
            icon={<QrCode className="w-6 h-6" />}
            label="Scan"
            delay={1}
          />
          <QuickAction
            icon={<Receipt className="w-6 h-6" />}
            label="Pay Bills"
            delay={2}
          />
          <QuickAction
            icon={<Plus className="w-6 h-6" />}
            label="More"
            delay={3}
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-10 animate-fade-in stagger-3">
        <div className="px-8 flex items-center justify-between mb-6">
          <h2 className="text-foreground font-semibold text-lg tracking-tight">
            My Cards
          </h2>
          <button className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors btn-press">
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
            delay={0}
          />
          <GlassCard
            type="VISA"
            name="TD Cash Back"
            balance={showBalance ? "$8,500.00" : "••••••"}
            lastFour="6670"
            expiry="09/26"
            gradient="from-secondary to-muted"
            delay={1}
          />
          <GlassCard
            type="VISA"
            name="Savings"
            balance={showBalance ? "$4,345.24" : "••••••"}
            lastFour="3350"
            expiry="12/28"
            gradient="from-secondary to-muted"
            delay={2}
          />
        </div>
      </section>

      {/* Clean Slate AI Feature Card */}
      <section className="px-8 pb-10 animate-fade-in stagger-4">
        <button
          onClick={onOpenCleanSlate}
          className="w-full text-left btn-press"
        >
          <div className="rounded-3xl p-7 border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden card-interactive">
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-breathe pointer-events-none" />

            <div className="flex items-start gap-5 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center glow-green flex-shrink-0 animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-[#0A0F14]" />
              </div>
              <div className="flex-1 pt-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="font-bold text-foreground text-xl tracking-tight">
                    Clean Slate AI
                  </span>
                  <span className="text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold uppercase tracking-wide animate-pulse">
                    New
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI-powered credit monitoring & dispute resolution
                </p>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
            </div>

            <div className="flex items-end gap-6 sm:gap-10 relative z-10">
              <div className="flex-shrink-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Credit Score
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                  742
                </p>
              </div>
              <div className="h-16 w-px bg-border flex-shrink-0" />
              <div className="flex-shrink-0">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Health
                </p>
                <p className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
                  94<span className="text-2xl sm:text-3xl">%</span>
                </p>
              </div>
            </div>
          </div>
        </button>
      </section>

      {/* Transaction History */}
      <section className="px-8 pb-8 animate-fade-in stagger-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-foreground font-semibold text-lg tracking-tight">
            Recent Activity
          </h2>
          <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1 btn-press">
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
            delay={0}
          />
          <TransactionItem
            merchant="Interac e-Transfer"
            date="Today, 3:34 PM"
            amount="+$240.00"
            type="Received"
            isPositive
            delay={1}
          />
          <TransactionItem
            merchant="Apple Pay - Starbucks"
            date="Today, 2:15 PM"
            amount="-$8.45"
            type="Purchase"
            delay={2}
          />
          <TransactionItem
            merchant="Netflix Subscription"
            date="Yesterday"
            amount="-$22.99"
            type="Subscription"
            delay={3}
          />
        </div>
      </section>

      {/* Insights Section */}
      <section className="px-8 pb-8 animate-fade-in stagger-6">
        <h2 className="text-foreground font-semibold text-lg tracking-tight mb-6">
          Insights
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <InsightCard
            title="Monthly Spending"
            value="$2,458"
            subtitle="15% less than last month"
            positive
            delay={0}
          />
          <InsightCard
            title="Savings Goal"
            value="68%"
            subtitle="$3,400 of $5,000"
            delay={1}
          />
        </div>
      </section>
    </div>
  );
}

function InsightCard({
  title,
  value,
  subtitle,
  positive,
  delay = 0,
}: {
  title: string;
  value: string;
  subtitle: string;
  positive?: boolean;
  delay?: number;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-5 card-interactive animate-fade-in-scale"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
        {title}
      </p>
      <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
      <p
        className={`text-xs ${positive ? "text-primary" : "text-muted-foreground"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function GlassCard({
  type,
  name,
  balance,
  lastFour,
  expiry,
  gradient,
  isPrimary = false,
  delay = 0,
}: {
  type: string;
  name: string;
  balance: string;
  lastFour: string;
  expiry: string;
  gradient: string;
  isPrimary?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={`flex-shrink-0 w-56 h-36 rounded-3xl bg-gradient-to-br ${gradient} p-6 relative overflow-hidden ${isPrimary ? "glow-green animate-pulse-glow" : ""} card-interactive animate-slide-in-right`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />

      <div className="relative h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">
              {type}
            </p>
            <p className="text-sm text-white font-semibold mt-1">{name}</p>
          </div>
          {isPrimary && (
            <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold uppercase">
              Primary
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold text-white tracking-tight">
            {balance}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-white/60 font-medium">
              •••• {lastFour}
            </p>
            <p className="text-[11px] text-white/60 font-medium">{expiry}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
  highlight,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group animate-pop-in btn-press"
      style={{ animationDelay: `${delay * 0.08}s` }}
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 icon-hover ${
          highlight
            ? "bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] text-[#0A0F14] glow-green"
            : "bg-secondary border border-border text-muted-foreground group-hover:bg-accent group-hover:border-primary/20 group-hover:text-foreground"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs text-muted-foreground font-medium tracking-wide group-hover:text-foreground transition-colors">
        {label}
      </span>
    </button>
  );
}

function TransactionItem({
  merchant,
  date,
  amount,
  type,
  isPositive = false,
  delay = 0,
}: {
  merchant: string;
  date: string;
  amount: string;
  type: string;
  isPositive?: boolean;
  delay?: number;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-5 flex items-center justify-between hover:bg-accent/50 transition-all duration-200 card-interactive animate-fade-in-up"
      style={{ animationDelay: `${delay * 0.08}s` }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
            isPositive ? "bg-primary/10" : "bg-secondary"
          }`}
        >
          {isPositive ? (
            <ArrowDownLeft className="w-6 h-6 text-primary" />
          ) : (
            <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground text-[15px]">
            {merchant}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-bold text-lg ${isPositive ? "text-primary" : "text-foreground"}`}
        >
          {amount}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{type}</p>
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
