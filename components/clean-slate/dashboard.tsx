"use client";

import React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  ChevronRight,
  Lock,
  RefreshCw,
  Info,
  Zap,
} from "lucide-react";
import { CreditScoreChart } from "./credit-score-chart";
import { DiscrepancyCard } from "./discrepancy-card";

export function CleanSlateDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="pb-12">
      {/* Credit Score Section */}
      <section className="px-8 pt-8 pb-10 animate-fade-in">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-primary/60" />
            <span className="text-sm text-muted-foreground font-medium">
              Bank-Level Encryption
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 -mr-2 btn-press"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        <div className="text-center mb-10 animate-fade-in-up">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">
            Your Credit Score
          </p>
          <div className="relative inline-flex items-center justify-center animate-scale-in">
            <CreditScoreGauge score={742} />
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in stagger-2">
            <Badge className="bg-primary/15 text-primary border-0 gap-2 px-4 py-2 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +12 pts
            </Badge>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </div>

        {/* Bureau Scores */}
        <div className="grid grid-cols-2 gap-5">
          <BureauScore bureau="Equifax" score={742} change={+8} delay={0} />
          <BureauScore bureau="TransUnion" score={738} change={+15} delay={1} />
        </div>

        <p className="text-center text-sm text-muted-foreground/50 mt-8 animate-fade-in stagger-4">
          Last Updated: Jan 20, 2026 at 9:45 AM
        </p>
      </section>

      {/* Credit Health Score */}
      <section className="px-8 pb-10 animate-fade-in stagger-3">
        <div className="glass-card rounded-3xl p-7 card-interactive">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <span className="font-bold text-foreground text-lg">
                Credit Health Score
              </span>
            </div>
            <button className="text-muted-foreground/50 hover:text-muted-foreground transition-colors p-2 -mr-2 btn-press icon-hover">
              <Info className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="url(#healthGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${94 * 2.51} 251`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="healthGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#00D9A4" />
                    <stop offset="100%" stopColor="#00FFB8" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground">
                94%
              </span>
            </div>
            <div className="flex-1">
              <p className="text-foreground font-semibold text-lg">
                Excellent report accuracy
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                1 unresolved discrepancy affecting your score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Trend */}
      <section className="px-8 pb-10 animate-fade-in stagger-4">
        <div className="glass-card rounded-3xl p-7 card-interactive">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-foreground text-lg">
              12-Month Credit Trend
            </span>
            <Badge className="bg-primary/15 text-primary border-0 text-xs px-4 py-1.5 font-semibold">
              Good
            </Badge>
          </div>
          <CreditScoreChart />
        </div>
      </section>

      {/* Active Discrepancies */}
      <section className="px-8 pb-10 animate-fade-in stagger-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-foreground text-lg">Active Discrepancies</h2>
          <Badge className="bg-destructive/15 text-destructive border-0 px-4 py-1.5 font-semibold animate-pulse">
            2 New
          </Badge>
        </div>

        <div className="space-y-5">
          <DiscrepancyCard
            type="Incorrect Payment Status"
            description="TD Visa payment marked as late, but payment was made on time"
            dateDetected="Jan 18, 2026"
            severity="high"
            impact="-15 points"
            status="new"
          />
          <DiscrepancyCard
            type="Unauthorized Hard Inquiry"
            description="Hard inquiry from unknown lender 'QuickCash Loans'"
            dateDetected="Jan 15, 2026"
            severity="medium"
            impact="-8 points"
            status="new"
          />
          <DiscrepancyCard
            type="Incorrect Account Balance"
            description="TD Line of Credit showing outdated balance"
            dateDetected="Jan 10, 2026"
            severity="low"
            impact="-3 points"
            status="under-review"
          />
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 bg-transparent rounded-2xl h-16 text-sm font-semibold btn-press"
        >
          View All Discrepancies
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </section>

      {/* Quick Stats */}
      <section className="px-8 pb-10 animate-fade-in stagger-6">
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={<AlertTriangle className="w-6 h-6 text-[#FFB800]" />}
            value="3"
            label="Active Issues"
            delay={0}
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-[#00D4FF]" />}
            value="1"
            label="Under Review"
            delay={1}
          />
          <StatCard
            icon={<CheckCircle2 className="w-6 h-6 text-[#00FF9D]" />}
            value="12"
            label="Resolved"
            delay={2}
          />
        </div>
      </section>

      {/* Credit Recommendations */}
      <section className="px-8 pb-10 animate-fade-in stagger-7">
        <div className="glass-card rounded-3xl p-7 border border-primary/20 card-interactive">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center flex-shrink-0 animate-pulse-glow">
              <Zap className="w-8 h-8 text-[#0A0F14]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">Improve Your Score</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Pay down your TD Visa by $500 to improve your utilization ratio
              </p>
              <p className="text-sm text-primary font-semibold mt-4">
                Projected: +12 points in 60 days
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground/50 flex-shrink-0 mt-1" />
          </div>
        </div>
      </section>

      {/* Fraud Alert Section */}
      <section className="px-8 pb-8 animate-fade-in stagger-8">
        <div className="glass-card rounded-3xl p-7 border-l-4 border-l-destructive card-interactive">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-destructive/15 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">Fraud Alert</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                1 unauthorized hard inquiry detected. Review and report if you
                don't recognize it.
              </p>
              <div className="flex gap-4 mt-5">
                <Button
                  size="sm"
                  className="bg-destructive hover:bg-destructive/80 text-destructive-foreground h-12 text-sm rounded-xl px-5 font-semibold btn-press"
                >
                  Report Identity Theft
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-12 text-sm bg-transparent border-border text-foreground hover:bg-secondary rounded-xl px-5 font-medium btn-press"
                >
                  Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CreditScoreGauge({ score }: { score: number }) {
  const percentage = ((score - 300) / (900 - 300)) * 100;

  return (
    <div className="relative w-64 h-36 overflow-hidden">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--border)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.51} 251`}
          className="animate-[progress-fill_1s_ease-out]"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4757" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#00D9A4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-6xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-primary font-medium mt-1">Good</span>
      </div>
    </div>
  );
}

function BureauScore({
  bureau,
  score,
  change,
  delay = 0,
}: {
  bureau: string;
  score: number;
  change: number;
  delay?: number;
}) {
  return (
    <div 
      className="glass-card rounded-2xl p-6 card-interactive animate-fade-in-scale"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <p className="text-sm text-muted-foreground font-medium">{bureau}</p>
      <div className="flex items-end justify-between mt-3">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span
          className={`text-sm flex items-center gap-1.5 font-semibold ${change >= 0 ? "text-primary" : "text-destructive"}`}
        >
          {change >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {change >= 0 ? "+" : ""}
          {change}
        </span>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <div 
      className="glass-card rounded-2xl p-5 text-center card-interactive animate-pop-in"
      style={{ animationDelay: `${delay * 0.08}s` }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-2 font-medium">{label}</p>
    </div>
  );
}
