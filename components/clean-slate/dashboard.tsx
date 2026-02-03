"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Activity,
  FileText,
  Zap,
  X,
  Brain,
  Target,
  TrendingDown,
  Loader2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
    type: "Unauthorized Inquiry",
    bureau: "TransUnion",
    severity: "medium",
    description: "Hard inquiry from 'QuickLoans Inc.' - not authorized",
    detectedDate: "Dec 10, 2024",
    status: "reviewing",
  },
];

const creditFactors: CreditFactor[] = [
  {
    name: "Payment History",
    impact: "positive",
    description: "100% on-time payments",
    weight: 35,
  },
  {
    name: "Credit Utilization",
    impact: "negative",
    description: "42% - aim for under 30%",
    weight: 30,
  },
  {
    name: "Credit Age",
    impact: "positive",
    description: "Average age: 6.2 years",
    weight: 15,
  },
];

export function CleanSlateDashboard() {
  const [showScore, setShowScore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showAutoDispute, setShowAutoDispute] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [disputeStep, setDisputeStep] = useState(0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const startAIAnalysis = () => {
    setShowAIAnalysis(true);
    setAnalysisStep(0);
    // Simulate analysis steps
    setTimeout(() => setAnalysisStep(1), 1000);
    setTimeout(() => setAnalysisStep(2), 2000);
    setTimeout(() => setAnalysisStep(3), 3000);
  };

  const startAutoDispute = () => {
    setShowAutoDispute(true);
    setDisputeStep(0);
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Credit Score Hero Card */}
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-sm pb-6">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#008A00] animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Live monitoring active
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Updated 2h ago</span>
          </button>
        </div>

        {/* Main Score Display */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your Credit Score
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Powered by TransUnion
              </p>
            </div>
            <button
              onClick={() => setShowScore(!showScore)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {showScore ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Score Circle */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  className="dark:stroke-gray-800"
                />
                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${((742 - 300) / 600) * 264} 264`}
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#008A00" />
                    <stop offset="100%" stopColor="#00B87A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {showScore ? "742" : "•••"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  out of 900
                </span>
              </div>
            </div>

            {/* Score Status */}
            <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-[#008A00]" />
              <span className="text-sm font-medium text-[#008A00]">
                +12 pts this month
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                Good
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Percentile
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                Top 35%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                YTD Change
              </p>
              <p className="font-semibold text-[#008A00]">+44 pts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 py-4 space-y-4">
        {/* AI Quick Actions - Simplified */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startAIAnalysis}
            className="flex items-center gap-3 p-4 bg-[#008A00] text-white rounded-2xl hover:bg-[#006B00] transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold text-sm">AI Analysis</p>
              <p className="text-xs text-white/70">Get recommendations</p>
            </div>
          </button>
          <button
            onClick={startAutoDispute}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Shield className="w-5 h-5 text-[#008A00]" />
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Auto Dispute</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fix 2 issues</p>
            </div>
          </button>
        </div>

        {/* Discrepancies Alert */}
        {discrepancies.filter((d) => d.status !== "resolved").length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Issues Found
                </span>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-0.5 rounded-full">
                  {discrepancies.filter((d) => d.status !== "resolved").length}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              {discrepancies.slice(0, 2).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      d.severity === "high"
                        ? "bg-red-500"
                        : d.severity === "medium"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {d.type}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {d.bureau}
                    </p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-2.5 text-sm font-medium text-[#008A00] bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              Review All Issues
            </button>
          </div>
        )}

        {/* Credit Factors */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#008A00]" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Credit Factors
              </span>
            </div>
            <span className="text-2xl font-bold text-[#008A00]">94%</span>
          </div>
          <div className="space-y-3">
            {creditFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    factor.impact === "positive"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : factor.impact === "negative"
                        ? "bg-red-100 dark:bg-red-900/30"
                        : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {factor.impact === "positive" ? (
                    <CheckCircle2 className="w-4 h-4 text-[#008A00]" />
                  ) : factor.impact === "negative" ? (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {factor.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {factor.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bureau Comparison */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-900 dark:text-white">
              Bureau Scores
            </span>
            <button className="text-sm text-[#008A00] font-medium">
              Compare
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <BureauCard
              bureau="Equifax"
              score={showScore ? 738 : 0}
              change={8}
            />
            <BureauCard
              bureau="TransUnion"
              score={showScore ? 745 : 0}
              change={12}
            />
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />

      {/* AI Analysis Sheet */}
      <Sheet open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-6 h-6 text-[#008A00]" />
              AI Credit Analysis
            </SheetTitle>
            <SheetDescription>
              Analyzing your credit report for personalized recommendations
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto px-4 space-y-4">
            {/* Analysis Progress */}
            <div className="space-y-3">
              <AnalysisStep 
                title="Scanning Credit Report" 
                description="Checking all accounts and payment history"
                completed={analysisStep >= 1}
                active={analysisStep === 0}
              />
              <AnalysisStep 
                title="Identifying Issues" 
                description="Found 2 potential discrepancies"
                completed={analysisStep >= 2}
                active={analysisStep === 1}
              />
              <AnalysisStep 
                title="Generating Recommendations" 
                description="Creating personalized action plan"
                completed={analysisStep >= 3}
                active={analysisStep === 2}
              />
            </div>

            {/* Results */}
            {analysisStep >= 3 && (
              <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#008A00]/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-5 h-5 text-[#008A00]" />
                    <span className="font-semibold text-gray-900 dark:text-white">Score Potential</span>
                  </div>
                  <p className="text-3xl font-bold text-[#008A00] mb-1">+45 points</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Achievable within 60 days</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">Top Recommendations</p>
                  <div className="space-y-3">
                    <RecommendationItem 
                      title="Dispute incorrect TD Visa balance"
                      impact="+15 pts"
                      priority="high"
                    />
                    <RecommendationItem 
                      title="Lower credit utilization to 30%"
                      impact="+20 pts"
                      priority="medium"
                    />
                    <RecommendationItem 
                      title="Remove unauthorized inquiry"
                      impact="+10 pts"
                      priority="high"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                  onClick={() => {
                    setShowAIAnalysis(false);
                    toast.success("Action plan saved!", { description: "Check your disputes tab to get started." });
                  }}
                >
                  Start Action Plan
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Auto Dispute Sheet */}
      <Sheet open={showAutoDispute} onOpenChange={setShowAutoDispute}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Shield className="w-6 h-6 text-[#008A00]" />
              Auto-Dispute Issues
            </SheetTitle>
            <SheetDescription>
              Review and submit disputes for detected issues
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto px-4 space-y-4">
            {disputeStep === 0 && (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400">Select issues to dispute:</p>
                <div className="space-y-3">
                  {discrepancies.map((d) => (
                    <DisputeItem key={d.id} discrepancy={d} />
                  ))}
                </div>
                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                    onClick={() => setDisputeStep(1)}
                  >
                    Generate Dispute Letters
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={() => setShowAutoDispute(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {disputeStep === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-12 h-12 text-[#008A00] animate-spin mb-4" />
                  <p className="font-semibold text-gray-900 dark:text-white">Generating Dispute Letters</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI is crafting personalized letters...</p>
                </div>
                {setTimeout(() => setDisputeStep(2), 2500) && null}
              </div>
            )}

            {disputeStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#008A00]/10 rounded-2xl p-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#008A00] mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">Letters Generated!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 dispute letters ready to send</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">Equifax - Incorrect Balance</span>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Formal dispute letter with supporting evidence request</p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">TransUnion - Unauthorized Inquiry</span>
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Inquiry removal request with identity verification</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                    onClick={() => {
                      setShowAutoDispute(false);
                      setDisputeStep(0);
                      toast.success("Disputes Submitted!", { description: "You'll receive updates within 30 days." });
                    }}
                  >
                    Submit All Disputes
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={() => {
                      setShowAutoDispute(false);
                      setDisputeStep(0);
                    }}
                  >
                    Save for Later
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper Components
function AnalysisStep({ title, description, completed, active }: { title: string; description: string; completed: boolean; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-[#008A00]/10' : 'bg-gray-50 dark:bg-gray-800'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completed ? 'bg-[#008A00]' : active ? 'bg-[#008A00]/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-white" />
        ) : active ? (
          <Loader2 className="w-5 h-5 text-[#008A00] animate-spin" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        )}
      </div>
      <div>
        <p className={`font-medium text-sm ${completed || active ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function RecommendationItem({ title, impact, priority }: { title: string; impact: string; priority: 'high' | 'medium' | 'low' }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${priority === 'high' ? 'bg-red-500' : priority === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
        <span className="text-sm text-gray-900 dark:text-white">{title}</span>
      </div>
      <span className="text-sm font-semibold text-[#008A00]">{impact}</span>
    </div>
  );
}

function DisputeItem({ discrepancy }: { discrepancy: Discrepancy }) {
  const [selected, setSelected] = useState(true);
  return (
    <button 
      onClick={() => setSelected(!selected)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selected ? 'border-[#008A00] bg-[#008A00]/5' : 'border-gray-200 dark:border-gray-700'}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${discrepancy.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'}`} />
            <span className="font-medium text-gray-900 dark:text-white">{discrepancy.type}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{discrepancy.bureau}</p>
          <p className="text-xs text-gray-400 mt-1">{discrepancy.description}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#008A00] bg-[#008A00]' : 'border-gray-300'}`}>
          {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    new: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    reviewing: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600",
    disputed: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    resolved: "bg-green-100 dark:bg-green-900/30 text-green-600",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status as keyof typeof styles] || styles.new}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function BureauCard({
  bureau,
  score,
  change,
}: {
  bureau: string;
  score: number;
  change: number;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{bureau}</p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {score > 0 ? score : "•••"}
        </span>
        <div className="flex items-center gap-1 text-[#008A00]">
          <TrendingUp className="w-3 h-3" />
          <span className="text-xs font-medium">+{change}</span>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="text-[#008A00]">{icon}</div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </button>
  );
}
