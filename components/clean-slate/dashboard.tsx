"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Eye,
  EyeOff,
  RefreshCw,
  Info,
  Sparkles,
  Lock,
  CreditCard,
  FileWarning,
  AlertCircle,
  CircleCheck,
  Activity,
} from "lucide-react";

// Types
interface Discrepancy {
  id: string;
  type: string;
  bureau: string;
  severity: "high" | "medium" | "low";
  description: string;
  detectedDate: string;
  status: "new" | "reviewing" | "disputed" | "resolved";
}

interface CreditFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  description: string;
  weight: number;
}

// Sample data
const discrepancies: Discrepancy[] = [
  {
    id: "DISC-001",
    type: "Incorrect Balance",
    bureau: "Equifax",
    severity: "high",
    description:
      "TD Visa showing $2,400 balance instead of actual $1,200 paid balance",
    detectedDate: "Dec 15, 2024",
    status: "new",
  },
  {
    id: "DISC-002",
    type: "Duplicate Account",
    bureau: "TransUnion",
    severity: "medium",
    description:
      "Same credit card appearing twice with different account numbers",
    detectedDate: "Dec 12, 2024",
    status: "reviewing",
  },
  {
    id: "DISC-003",
    type: "Unauthorized Inquiry",
    bureau: "Equifax",
    severity: "high",
    description: "Hard inquiry from 'QuickLoans Inc.' - not authorized by you",
    detectedDate: "Dec 10, 2024",
    status: "disputed",
  },
];

const creditFactors: CreditFactor[] = [
  {
    name: "Payment History",
    impact: "positive",
    description: "100% on-time payments for 24 months",
    weight: 35,
  },
  {
    name: "Credit Utilization",
    impact: "negative",
    description: "Currently at 42% - aim for under 30%",
    weight: 30,
  },
  {
    name: "Credit Age",
    impact: "positive",
    description: "Average account age: 6.2 years",
    weight: 15,
  },
  {
    name: "Credit Mix",
    impact: "neutral",
    description: "2 credit cards, 1 auto loan",
    weight: 10,
  },
  {
    name: "New Credit",
    impact: "positive",
    description: "No new accounts in 12 months",
    weight: 10,
  },
];

const trendData = [
  { month: "Jul", score: 698 },
  { month: "Aug", score: 705 },
  { month: "Sep", score: 712 },
  { month: "Oct", score: 718 },
  { month: "Nov", score: 732 },
  { month: "Dec", score: 742 },
];

export function CleanSlateDashboard() {
  const [showScoreDetails, setShowScoreDetails] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh] = useState("2 hours ago");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="pb-32 bg-background relative">
      {/* Hero Section - Credit Score */}
      <section className="relative px-8 pt-8 pb-12 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-breathe" />

        {/* Refresh indicator */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">
                Live monitoring active
              </span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors btn-press"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Updated {lastRefresh}</span>
          </button>
        </div>

        {/* Main Score Display */}
        <div className="glass-card rounded-3xl p-8 relative border border-primary/20 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Credit Score
              </h2>
              <button
                onClick={() => setShowScoreDetails(!showScoreDetails)}
                className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              >
                {showScoreDetails ? (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
            <Badge className="bg-primary/15 text-primary border-0 text-sm h-8 px-4 font-semibold">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              +10 this month
            </Badge>
          </div>

          <div className="flex flex-col items-center py-8">
            <CreditScoreGauge
              score={showScoreDetails ? 742 : 0}
              hidden={!showScoreDetails}
            />
            <div className="flex items-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Range
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  300-900
                </p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Next Update
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  22 hours
                </p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Since Jan
                </p>
                <p className="text-sm font-semibold text-primary mt-1">
                  +44 pts
                </p>
              </div>
            </div>
          </div>

          {/* Score category indicator */}
          <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Good Standing</p>
                  <p className="text-sm text-muted-foreground">
                    Top 35% of Canadians
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Bureau Comparison */}
      <section className="px-8 pb-10 animate-fade-in stagger-1">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground text-lg">
            Bureau Scores
          </h3>
          <button className="text-sm text-primary font-medium flex items-center gap-1 btn-press">
            Compare
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <BureauScoreCard
            bureau="Equifax"
            score={showScoreDetails ? 738 : 0}
            change={8}
            lastUpdated="Dec 18"
            hidden={!showScoreDetails}
            delay={0}
          />
          <BureauScoreCard
            bureau="TransUnion"
            score={showScoreDetails ? 745 : 0}
            change={12}
            lastUpdated="Dec 17"
            hidden={!showScoreDetails}
            delay={1}
          />
        </div>
      </section>

      {/* Credit Health Score */}
      <section className="px-8 pb-10 animate-fade-in stagger-2">
        <div className="glass-card rounded-3xl p-7 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  Credit Health
                </h3>
                <p className="text-sm text-muted-foreground">
                  Overall assessment
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">94%</p>
              <p className="text-xs text-muted-foreground">Excellent</p>
            </div>
          </div>

          {/* Health factors */}
          <div className="space-y-4">
            {creditFactors.slice(0, 3).map((factor, index) => (
              <CreditFactorRow key={index} factor={factor} />
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-2xl h-12 text-sm font-semibold btn-press"
          >
            View All Factors
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* 12-Month Trend */}
      <section className="px-8 pb-10 animate-fade-in stagger-3">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground text-lg">Score Trend</h3>
          <Badge
            variant="outline"
            className="text-xs border-border text-muted-foreground"
          >
            Last 6 months
          </Badge>
        </div>
        <div className="glass-card rounded-3xl p-6 border border-border/50">
          <TrendChart data={trendData} />
        </div>
      </section>

      {/* Active Discrepancies */}
      <section className="px-8 pb-10 animate-fade-in stagger-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground text-lg">
              Active Discrepancies
            </h3>
            <Badge className="bg-destructive/15 text-destructive border-0 text-xs h-6 px-3">
              {discrepancies.filter((d) => d.status !== "resolved").length}{" "}
              found
            </Badge>
          </div>
          <button className="text-sm text-primary font-medium flex items-center gap-1 btn-press">
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {discrepancies.slice(0, 2).map((discrepancy, index) => (
            <DiscrepancyCard
              key={discrepancy.id}
              discrepancy={discrepancy}
              delay={index}
            />
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-2xl h-14 text-sm font-semibold btn-press"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          AI Dispute All Discrepancies
        </Button>
      </section>

      {/* Quick Stats */}
      <section className="px-8 pb-10 animate-fade-in stagger-5">
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
            icon={<CheckCircle2 className="w-6 h-6 text-primary" />}
            value="12"
            label="Resolved"
            delay={2}
          />
        </div>
      </section>

      {/* Credit Recommendations */}
      <section className="px-8 pb-10 animate-fade-in stagger-6">
        <h3 className="font-semibold text-foreground text-lg mb-5">
          AI Recommendations
        </h3>
        <div className="space-y-4">
          <RecommendationCard
            icon={<CreditCard className="w-6 h-6" />}
            title="Pay Down Credit Card"
            description="Reduce TD Visa balance by $500 to improve utilization ratio to 28%"
            impact="+12 points"
            timeframe="60 days"
            priority="high"
          />
          <RecommendationCard
            icon={<FileWarning className="w-6 h-6" />}
            title="Dispute Unauthorized Inquiry"
            description="Remove the QuickLoans inquiry you didn't authorize"
            impact="+5 points"
            timeframe="30 days"
            priority="medium"
          />
        </div>
      </section>

      {/* Fraud Alert Section */}
      <section className="px-8 pb-8 animate-fade-in stagger-7">
        <div className="rounded-3xl p-7 border-l-4 border-l-destructive bg-destructive/5 card-interactive">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-destructive/15 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-destructive animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-foreground text-lg">Fraud Alert</p>
                <Badge className="bg-destructive text-destructive-foreground text-xs">
                  Urgent
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                1 unauthorized hard inquiry detected from "QuickLoans Inc." on
                Dec 10, 2024
              </p>
              <div className="flex gap-3 mt-5">
                <Button
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground h-11 text-sm rounded-xl px-5 font-semibold btn-press"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Freeze Credit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-11 text-sm bg-transparent border-border text-foreground hover:bg-secondary rounded-xl px-5 font-medium btn-press"
                >
                  Review Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Components

function CreditScoreGauge({
  score,
  hidden,
}: {
  score: number;
  hidden?: boolean;
}) {
  const percentage = hidden ? 0 : ((score - 300) / (900 - 300)) * 100;

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
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4757" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#00D9A4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end">
        <span className="text-6xl font-bold text-foreground tabular-nums">
          {hidden ? "•••" : score}
        </span>
        <span className="text-sm text-primary font-medium mt-1">
          {hidden ? "Hidden" : "Good"}
        </span>
      </div>
    </div>
  );
}

function BureauScoreCard({
  bureau,
  score,
  change,
  lastUpdated,
  hidden,
  delay = 0,
}: {
  bureau: string;
  score: number;
  change: number;
  lastUpdated: string;
  hidden?: boolean;
  delay?: number;
}) {
  return (
    <div
      className="glass-card rounded-2xl p-5 card-interactive animate-fade-in-scale"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground font-medium">{bureau}</p>
        <span
          className={`text-xs flex items-center gap-1 font-semibold ${change >= 0 ? "text-primary" : "text-destructive"}`}
        >
          {change >= 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change >= 0 ? "+" : ""}
          {change}
        </span>
      </div>
      <p className="text-3xl font-bold text-foreground tabular-nums mb-2">
        {hidden ? "•••" : score}
      </p>
      <p className="text-xs text-muted-foreground">Updated {lastUpdated}</p>
    </div>
  );
}

function CreditFactorRow({ factor }: { factor: CreditFactor }) {
  const impactConfig = {
    positive: {
      color: "text-primary",
      icon: <CircleCheck className="w-4 h-4" />,
    },
    negative: {
      color: "text-destructive",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    neutral: {
      color: "text-muted-foreground",
      icon: <Info className="w-4 h-4" />,
    },
  };

  const config = impactConfig[factor.impact];

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
      <div className={`${config.color}`}>{config.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground text-sm">{factor.name}</p>
          <span className="text-xs text-muted-foreground">
            {factor.weight}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {factor.description}
        </p>
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: { month: string; score: number }[] }) {
  const maxScore = Math.max(...data.map((d) => d.score));
  const minScore = Math.min(...data.map((d) => d.score));
  const range = maxScore - minScore || 1;

  return (
    <div className="h-32 flex items-end justify-between gap-2">
      {data.map((item, index) => {
        const height = ((item.score - minScore) / range) * 80 + 20;
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all duration-500"
              style={{
                height: `${height}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
            <span className="text-xs text-muted-foreground">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function DiscrepancyCard({
  discrepancy,
  delay = 0,
}: {
  discrepancy: Discrepancy;
  delay?: number;
}) {
  const severityConfig = {
    high: {
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      badge: "bg-destructive text-destructive-foreground",
    },
    medium: {
      bg: "bg-[#FFB800]/10",
      border: "border-[#FFB800]/30",
      badge: "bg-[#FFB800] text-black",
    },
    low: {
      bg: "bg-[#00D4FF]/10",
      border: "border-[#00D4FF]/30",
      badge: "bg-[#00D4FF] text-black",
    },
  };

  const statusConfig = {
    new: { color: "text-destructive", label: "New" },
    reviewing: { color: "text-[#FFB800]", label: "Reviewing" },
    disputed: { color: "text-[#00D4FF]", label: "Disputed" },
    resolved: { color: "text-primary", label: "Resolved" },
  };

  const config = severityConfig[discrepancy.severity];
  const status = statusConfig[discrepancy.status];

  return (
    <div
      className={`rounded-2xl p-5 ${config.bg} border ${config.border} card-interactive animate-fade-in`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="font-semibold text-foreground">
              {discrepancy.type}
            </span>
            <Badge className={`${config.badge} text-xs h-5 px-2 font-medium`}>
              {discrepancy.severity.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {discrepancy.description}
          </p>
        </div>
        <Badge className="bg-secondary text-muted-foreground border-0 text-xs h-6 px-2 flex-shrink-0">
          {discrepancy.bureau}
        </Badge>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{discrepancy.detectedDate}</span>
          <span className={status.color}>{status.label}</span>
        </div>
        <Button
          size="sm"
          className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 font-semibold btn-press"
        >
          Dispute
        </Button>
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
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-2 font-medium">{label}</p>
    </div>
  );
}

function RecommendationCard({
  icon,
  title,
  description,
  impact,
  timeframe,
  priority,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
}) {
  const priorityConfig = {
    high: "border-l-primary",
    medium: "border-l-[#FFB800]",
    low: "border-l-[#00D4FF]",
  };

  return (
    <div
      className={`glass-card rounded-2xl p-5 border-l-4 ${priorityConfig[priority]} card-interactive`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Badge className="bg-primary/15 text-primary border-0 text-xs h-6 px-3">
              {impact}
            </Badge>
            <span className="text-xs text-muted-foreground">{timeframe}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );
}
