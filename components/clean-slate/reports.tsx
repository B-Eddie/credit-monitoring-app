"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  FileText,
  Download,
  ChevronRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Eye,
  Share2,
  Printer,
  FileSpreadsheet,
  BarChart3,
  Activity,
  AlertTriangle,
  Info,
  Shield,
  Lock,
  User,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Loader2,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

// Types
interface Report {
  id: string;
  month: string;
  year: string;
  date: string;
  score: number;
  change: number;
  discrepancies: number;
  status: "available" | "generating" | "archived";
  highlights: string[];
}

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  bureau?: string;
  status: "success" | "pending" | "failed";
  category: "dispute" | "alert" | "report" | "account" | "security";
}

// Sample data
const reports: Report[] = [
  {
    id: "RPT-2024-12",
    month: "December",
    year: "2024",
    date: "Dec 1, 2024",
    score: 742,
    change: 10,
    discrepancies: 3,
    status: "available",
    highlights: [
      "Score increased +10 points",
      "1 new inquiry detected",
      "Utilization at 42%",
    ],
  },
  {
    id: "RPT-2024-11",
    month: "November",
    year: "2024",
    date: "Nov 1, 2024",
    score: 732,
    change: 14,
    discrepancies: 1,
    status: "available",
    highlights: [
      "Score increased +14 points",
      "Late payment error resolved",
      "Credit age improved",
    ],
  },
  {
    id: "RPT-2024-10",
    month: "October",
    year: "2024",
    date: "Oct 1, 2024",
    score: 718,
    change: 6,
    discrepancies: 2,
    status: "available",
    highlights: [
      "Score increased +6 points",
      "2 disputes filed",
      "Duplicate account found",
    ],
  },
  {
    id: "RPT-2024-09",
    month: "September",
    year: "2024",
    date: "Sep 1, 2024",
    score: 712,
    change: 7,
    discrepancies: 0,
    status: "archived",
    highlights: ["Score increased +7 points", "All clear - no issues"],
  },
  {
    id: "RPT-2024-08",
    month: "August",
    year: "2024",
    date: "Aug 1, 2024",
    score: 705,
    change: 7,
    discrepancies: 1,
    status: "archived",
    highlights: ["Score increased +7 points", "1 balance correction"],
  },
];

const auditLogs: AuditLog[] = [
  {
    id: "AUD-001",
    timestamp: "Dec 18, 2024 • 3:45 PM",
    action: "Dispute Submitted",
    details: "Incorrect balance dispute filed for TD Visa",
    bureau: "Equifax",
    status: "success",
    category: "dispute",
  },
  {
    id: "AUD-002",
    timestamp: "Dec 18, 2024 • 2:30 PM",
    action: "Score Alert",
    details: "Credit score increased by 10 points",
    status: "success",
    category: "alert",
  },
  {
    id: "AUD-003",
    timestamp: "Dec 17, 2024 • 11:20 AM",
    action: "Report Generated",
    details: "Monthly credit report for December 2024",
    status: "success",
    category: "report",
  },
  {
    id: "AUD-004",
    timestamp: "Dec 15, 2024 • 9:15 AM",
    action: "Fraud Alert",
    details: "Unauthorized inquiry detected from QuickLoans Inc.",
    bureau: "Equifax",
    status: "pending",
    category: "security",
  },
  {
    id: "AUD-005",
    timestamp: "Dec 12, 2024 • 4:50 PM",
    action: "Document Uploaded",
    details: "Bank statement added to dispute DSP-2024-001",
    status: "success",
    category: "dispute",
  },
  {
    id: "AUD-006",
    timestamp: "Dec 10, 2024 • 10:00 AM",
    action: "Account Sync",
    details: "Credit report synced with TransUnion",
    bureau: "TransUnion",
    status: "success",
    category: "account",
  },
];

export function CleanSlateReports() {
  const [activeTab, setActiveTab] = useState<"reports" | "audit">("reports");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showLatestReport, setShowLatestReport] = useState(false);
  const [insightsStep, setInsightsStep] = useState(0);

  const startAIInsights = () => {
    setShowAIInsights(true);
    setInsightsStep(0);
    setTimeout(() => setInsightsStep(1), 1500);
    setTimeout(() => setInsightsStep(2), 3000);
  };

  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-sm px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Reports
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Credit history & insights
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008A00]/50 text-sm"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-[#008A00]">+44</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              YTD Points
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              12
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Reports
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              94%
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Success
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* AI Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startAIInsights}
            className="flex items-center gap-3 p-4 bg-[#008A00] text-white rounded-2xl hover:bg-[#006B00] transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold text-sm">AI Insights</p>
              <p className="text-xs text-white/70">Trend analysis</p>
            </div>
          </button>
          <button
            onClick={() => setShowLatestReport(true)}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="w-5 h-5 text-[#008A00]" />
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                Latest Report
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                December 2024
              </p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "reports"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "audit"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Activity
          </button>
        </div>

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <>
            {/* Report List */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {reports.slice(0, 4).map((report, index) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left ${
                    index !== 0
                      ? "border-t border-gray-100 dark:border-gray-800"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {report.month} {report.year}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {report.highlights[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${report.change >= 0 ? "text-[#008A00]" : "text-red-500"}`}
                    >
                      {report.change >= 0 ? "+" : ""}
                      {report.change}
                    </p>
                    <p className="text-xs text-gray-500">{report.score}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Activity Tab */}
        {activeTab === "audit" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {auditLogs.slice(0, 5).map((log, index) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 p-4 ${
                  index !== 0
                    ? "border-t border-gray-100 dark:border-gray-800"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    log.category === "dispute"
                      ? "bg-purple-100 dark:bg-purple-900/30"
                      : log.category === "alert"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : log.category === "security"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {log.category === "dispute" ? (
                    <FileText className="w-4 h-4 text-purple-500" />
                  ) : log.category === "alert" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : log.category === "security" ? (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {log.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {log.details}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />

      {/* AI Insights Sheet */}
      <Sheet open={showAIInsights} onOpenChange={setShowAIInsights}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="w-6 h-6 text-[#008A00]" />
              AI Credit Insights
            </SheetTitle>
            <SheetDescription>
              Smart analysis of your credit trends and patterns
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-4 space-y-4">
            {insightsStep < 2 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#008A00]/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-[#008A00]" />
                </div>
                <Loader2 className="w-8 h-8 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">
                  {insightsStep === 0
                    ? "Analyzing 12 months of data..."
                    : "Generating insights..."}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  {insightsStep === 0
                    ? "Reviewing score changes and patterns"
                    : "Creating personalized recommendations"}
                </p>
              </div>
            )}

            {insightsStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                {/* Score Trend */}
                <div className="bg-[#008A00]/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Score Trend
                    </span>
                    <div className="flex items-center gap-1 text-[#008A00]">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">+44 pts</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your score has increased steadily over the past 6 months.
                    Keep up the great work!
                  </p>
                </div>

                {/* Key Insights */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">
                    Key Insights
                  </p>
                  <div className="space-y-3">
                    <InsightItem
                      icon={<Target className="w-4 h-4" />}
                      title="Utilization improved"
                      description="Down from 45% to 28% this quarter"
                      positive
                    />
                    <InsightItem
                      icon={<Zap className="w-4 h-4" />}
                      title="Payment streak"
                      description="18 consecutive on-time payments"
                      positive
                    />
                    <InsightItem
                      icon={<AlertTriangle className="w-4 h-4" />}
                      title="Hard inquiry detected"
                      description="New inquiry from Dec 2024"
                      positive={false}
                    />
                  </div>
                </div>

                {/* Predictions */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">
                    Predictions
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Next month estimate
                      </span>
                      <span className="font-bold text-[#008A00]">747 (+5)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        6 month outlook
                      </span>
                      <span className="font-bold text-[#008A00]">770+</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                  onClick={() => {
                    setShowAIInsights(false);
                    setInsightsStep(0);
                    toast.success("Insights saved!", {
                      description: "Check your email for the full report.",
                    });
                  }}
                >
                  Share Full Report
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Latest Report Sheet */}
      <Sheet open={showLatestReport} onOpenChange={setShowLatestReport}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-6 h-6 text-[#008A00]" />
              December 2024 Report
            </SheetTitle>
            <SheetDescription>
              Your latest credit report summary
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-4 space-y-4">
            {/* Score Summary */}
            <div className="bg-[#008A00]/10 rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Credit Score
              </p>
              <p className="text-5xl font-bold text-[#008A00]">742</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-[#008A00]">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+12 from last month</span>
              </div>
            </div>

            {/* Bureau Breakdown */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">
                Bureau Scores
              </p>
              <div className="space-y-3">
                <BureauRow bureau="Equifax" score={738} change={+8} />
                <BureauRow bureau="TransUnion" score={745} change={+12} />
                <BureauRow bureau="Experian" score={743} change={+15} />
              </div>
            </div>

            {/* Report Highlights */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">
                Highlights
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#008A00]" />
                  <span>All accounts in good standing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#008A00]" />
                  <span>Credit utilization at 28%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span>1 new inquiry this month</span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                onClick={() => {
                  setShowLatestReport(false);
                  toast.success("Report downloaded!", {
                    description: "Check your downloads folder.",
                  });
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Report (PDF)
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl"
                onClick={() => setShowLatestReport(false)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper components for sheets
function InsightItem({
  icon,
  title,
  description,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${positive ? "bg-[#008A00]/10 text-[#008A00]" : "bg-orange-100 dark:bg-orange-900/30 text-orange-500"}`}
      >
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white text-sm">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function BureauRow({
  bureau,
  score,
  change,
}: {
  bureau: string;
  score: number;
  change: number;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {bureau}
      </span>
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-900 dark:text-white">{score}</span>
        <span className="text-sm text-[#008A00] font-medium">+{change}</span>
      </div>
    </div>
  );
}

// Report Detail Component
function ReportDetail({
  report,
  onBack,
}: {
  report: Report;
  onBack: () => void;
}) {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-sm px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {report.month} {report.year}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Score: {report.score}
        </p>
      </div>
      <div className="px-4 py-4 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="font-semibold text-gray-900 dark:text-white mb-3">
            Highlights
          </p>
          <div className="space-y-2">
            {report.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 text-[#008A00]" />
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}

// Sub-components

function ComparisonBar({
  month,
  score,
  maxScore,
  current = false,
}: {
  month: string;
  score: number;
  maxScore: number;
  current?: boolean;
}) {
  const height = (score / maxScore) * 100;

  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <span className="text-sm font-semibold text-foreground">{score}</span>
      <div className="w-full h-20 bg-secondary/50 rounded-t-lg relative overflow-hidden">
        <div
          className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
            current
              ? "bg-gradient-to-t from-primary to-primary/50"
              : "bg-gradient-to-t from-muted-foreground/30 to-muted-foreground/10"
          }`}
          style={{ height: `${height}%` }}
        />
      </div>
      <span
        className={`text-xs ${current ? "text-primary font-medium" : "text-muted-foreground"}`}
      >
        {month}
      </span>
    </div>
  );
}

function ReportCard({
  report,
  onClick,
  delay = 0,
}: {
  report: Report;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-card rounded-2xl p-5 card-interactive animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {report.month} {report.year}
            </p>
            <p className="text-xs text-muted-foreground">{report.date}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-foreground">{report.score}</p>
          <p
            className={`text-xs flex items-center justify-end gap-1 ${
              report.change >= 0 ? "text-primary" : "text-destructive"
            }`}
          >
            {report.change >= 0 ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {report.change >= 0 ? "+" : ""}
            {report.change}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {report.discrepancies > 0 ? (
            <span className="flex items-center gap-1 text-[#FFB800]">
              <AlertTriangle className="w-3.5 h-3.5" />
              {report.discrepancies} issues
            </span>
          ) : (
            <span className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All clear
            </span>
          )}
          <Badge
            className={`text-xs h-5 px-2 border-0 ${
              report.status === "available"
                ? "bg-primary/15 text-primary"
                : report.status === "generating"
                  ? "bg-[#FFB800]/15 text-[#FFB800]"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {report.status === "available"
              ? "Available"
              : report.status === "generating"
                ? "Generating"
                : "Archived"}
          </Badge>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  );
}

function ExportCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-secondary/50 transition-colors group text-left">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </button>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
      }`}
    >
      {label}
    </button>
  );
}

function AuditLogCard({ log, delay = 0 }: { log: AuditLog; delay?: number }) {
  const categoryConfig = {
    dispute: {
      icon: <FileText className="w-4 h-4" />,
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/15",
    },
    alert: {
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "text-[#FFB800]",
      bg: "bg-[#FFB800]/15",
    },
    report: {
      icon: <BarChart3 className="w-4 h-4" />,
      color: "text-primary",
      bg: "bg-primary/15",
    },
    account: {
      icon: <User className="w-4 h-4" />,
      color: "text-muted-foreground",
      bg: "bg-secondary",
    },
    security: {
      icon: <Lock className="w-4 h-4" />,
      color: "text-destructive",
      bg: "bg-destructive/15",
    },
  };

  const statusConfig = {
    success: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "text-primary",
    },
    pending: { icon: <Clock className="w-4 h-4" />, color: "text-[#FFB800]" },
    failed: {
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "text-destructive",
    },
  };

  const category = categoryConfig[log.category];
  const status = statusConfig[log.status];

  return (
    <div
      className="glass-card rounded-2xl p-5 animate-fade-in"
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${category.bg} flex items-center justify-center ${category.color} flex-shrink-0`}
        >
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-medium text-foreground text-sm">{log.action}</p>
            <span className={status.color}>{status.icon}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            {log.details}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {log.timestamp}
            </span>
            {log.bureau && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {log.bureau}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
