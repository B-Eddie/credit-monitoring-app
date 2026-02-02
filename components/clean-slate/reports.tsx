"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    highlights: ["Score increased +10 points", "1 new inquiry detected", "Utilization at 42%"],
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
    highlights: ["Score increased +14 points", "Late payment error resolved", "Credit age improved"],
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
    highlights: ["Score increased +6 points", "2 disputes filed", "Duplicate account found"],
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

  if (selectedReport) {
    return (
      <ReportDetail
        report={selectedReport}
        onBack={() => setSelectedReport(null)}
      />
    );
  }

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Credit history & activity logs
            </p>
          </div>
          <Button
            variant="outline"
            className="h-11 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl font-medium btn-press"
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports & logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-8 pb-8 animate-fade-in stagger-1">
        <div className="grid grid-cols-3 gap-3">
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">+44</p>
            <p className="text-xs text-muted-foreground mt-1">Points (YTD)</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground mt-1">Reports</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#00D4FF]">94%</p>
            <p className="text-xs text-muted-foreground mt-1">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-8 pb-6 animate-fade-in stagger-2">
        <div className="flex gap-2 p-1.5 bg-secondary/50 rounded-2xl">
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "reports"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Reports
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "audit"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="w-4 h-4" />
            Audit Log
          </button>
        </div>
      </section>

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <>
          {/* Monthly Comparison */}
          <section className="px-8 pb-8 animate-fade-in stagger-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Score Comparison</h3>
              <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                Last 3 months
              </Badge>
            </div>
            <div className="glass-card rounded-3xl p-6 border border-border/50">
              <div className="flex items-end justify-between h-32 mb-4">
                <ComparisonBar month="Oct" score={718} maxScore={750} />
                <ComparisonBar month="Nov" score={732} maxScore={750} />
                <ComparisonBar month="Dec" score={742} maxScore={750} current />
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">+24</p>
                  <p className="text-xs text-muted-foreground">3-month gain</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-[#FFB800]">6</p>
                  <p className="text-xs text-muted-foreground">Issues found</p>
                </div>
              </div>
            </div>
          </section>

          {/* Report Archive */}
          <section className="px-8 pb-8 animate-fade-in stagger-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Report Archive</h3>
              <button className="text-sm text-primary font-medium flex items-center gap-1 btn-press">
                View all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {reports.map((report, index) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onClick={() => setSelectedReport(report)}
                  delay={index}
                />
              ))}
            </div>
          </section>

          {/* Export Options */}
          <section className="px-8 pb-8 animate-fade-in stagger-5">
            <h3 className="font-semibold text-foreground mb-4">Export Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <ExportCard
                icon={<FileText className="w-6 h-6" />}
                title="PDF Report"
                description="Full detailed report"
              />
              <ExportCard
                icon={<FileSpreadsheet className="w-6 h-6" />}
                title="CSV Data"
                description="Raw data export"
              />
              <ExportCard
                icon={<Printer className="w-6 h-6" />}
                title="Print Summary"
                description="Print-friendly view"
              />
              <ExportCard
                icon={<Share2 className="w-6 h-6" />}
                title="Share Report"
                description="Send to email"
              />
            </div>
          </section>
        </>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <>
          {/* Filter Pills */}
          <section className="px-8 pb-6 animate-fade-in stagger-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <FilterPill
                label="All"
                active={!filterCategory}
                onClick={() => setFilterCategory(null)}
              />
              <FilterPill
                label="Disputes"
                active={filterCategory === "dispute"}
                onClick={() => setFilterCategory("dispute")}
              />
              <FilterPill
                label="Alerts"
                active={filterCategory === "alert"}
                onClick={() => setFilterCategory("alert")}
              />
              <FilterPill
                label="Reports"
                active={filterCategory === "report"}
                onClick={() => setFilterCategory("report")}
              />
              <FilterPill
                label="Security"
                active={filterCategory === "security"}
                onClick={() => setFilterCategory("security")}
              />
            </div>
          </section>

          {/* Audit Entries */}
          <section className="px-8 pb-8 animate-fade-in stagger-4">
            <div className="space-y-3">
              {auditLogs
                .filter((log) => !filterCategory || log.category === filterCategory)
                .map((log, index) => (
                  <AuditLogCard key={log.id} log={log} delay={index} />
                ))}
            </div>
          </section>

          {/* Transparency Notice */}
          <section className="px-8 pb-8 animate-fade-in stagger-5">
            <div className="glass-card rounded-2xl p-5 border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Full Transparency</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every action taken on your behalf is logged here. We never modify your credit report without your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
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
      <span className={`text-xs ${current ? "text-primary font-medium" : "text-muted-foreground"}`}>
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
    dispute: { icon: <FileText className="w-4 h-4" />, color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/15" },
    alert: { icon: <AlertTriangle className="w-4 h-4" />, color: "text-[#FFB800]", bg: "bg-[#FFB800]/15" },
    report: { icon: <BarChart3 className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/15" },
    account: { icon: <User className="w-4 h-4" />, color: "text-muted-foreground", bg: "bg-secondary" },
    security: { icon: <Lock className="w-4 h-4" />, color: "text-destructive", bg: "bg-destructive/15" },
  };

  const statusConfig = {
    success: { icon: <CheckCircle2 className="w-4 h-4" />, color: "text-primary" },
    pending: { icon: <Clock className="w-4 h-4" />, color: "text-[#FFB800]" },
    failed: { icon: <AlertTriangle className="w-4 h-4" />, color: "text-destructive" },
  };

  const category = categoryConfig[log.category];
  const status = statusConfig[log.status];

  return (
    <div
      className="glass-card rounded-2xl p-5 animate-fade-in"
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${category.bg} flex items-center justify-center ${category.color} flex-shrink-0`}>
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

// Report Detail View
function ReportDetail({
  report,
  onBack,
}: {
  report: Report;
  onBack: () => void;
}) {
  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 btn-press"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Back to Reports</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {report.month} {report.year}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{report.date}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 border-border hover:bg-secondary bg-transparent rounded-xl btn-press"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 border-border hover:bg-secondary bg-transparent rounded-xl btn-press"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Score Summary */}
      <section className="px-8 pb-8 animate-fade-in stagger-1">
        <div className="glass-card rounded-3xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Credit Score</p>
              <p className="text-5xl font-bold text-foreground">{report.score}</p>
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                report.change >= 0 ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
              }`}
            >
              {report.change >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-semibold">
                {report.change >= 0 ? "+" : ""}
                {report.change} pts
              </span>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Equifax</p>
              <p className="text-xl font-bold text-foreground">738</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">TransUnion</p>
              <p className="text-xl font-bold text-foreground">745</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-8 pb-8 animate-fade-in stagger-2">
        <h3 className="font-semibold text-foreground mb-4">Key Highlights</h3>
        <div className="space-y-3">
          {report.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-3 glass-card rounded-xl p-4"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-foreground">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discrepancies */}
      {report.discrepancies > 0 && (
        <section className="px-8 pb-8 animate-fade-in stagger-3">
          <h3 className="font-semibold text-foreground mb-4">
            Issues Found ({report.discrepancies})
          </h3>
          <div className="glass-card rounded-2xl p-5 border border-[#FFB800]/20 bg-[#FFB800]/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-1">
                  {report.discrepancies} discrepancies detected
                </p>
                <p className="text-sm text-muted-foreground">
                  Review and dispute these items to improve your score
                </p>
                <Button
                  size="sm"
                  className="mt-4 h-10 bg-[#FFB800] hover:bg-[#FFB800]/90 text-black rounded-xl font-semibold btn-press"
                >
                  View Discrepancies
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download Options */}
      <section className="px-8 pb-8 animate-fade-in stagger-4">
        <div className="space-y-3">
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-semibold btn-press">
            <Download className="w-5 h-5 mr-2" />
            Download Full Report (PDF)
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 border-border text-foreground hover:bg-secondary bg-transparent rounded-2xl font-semibold btn-press"
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Export Data (CSV)
          </Button>
        </div>
      </section>
    </div>
  );
}
