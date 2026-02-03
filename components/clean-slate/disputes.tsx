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
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  Upload,
  MessageSquare,
  Phone,
  FileSpreadsheet,
  Sparkles,
  AlertTriangle,
  Send,
  Paperclip,
  Bot,
  Filter,
  Search,
  Plus,
  ArrowRight,
  Shield,
  RefreshCw,
  Eye,
  Download,
  Building2,
  User,
  Mail,
  Loader2,
  Wand2,
  CheckCheck,
} from "lucide-react";

// Types
interface Dispute {
  id: string;
  type: string;
  bureau: string;
  status:
    | "submitted"
    | "investigating"
    | "resolved"
    | "rejected"
    | "pending_docs";
  description: string;
  submittedDate: string;
  daysRemaining: number;
  lastUpdate: string;
  assignedTo?: string;
  documents: number;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  date: string;
  event: string;
  status: "completed" | "current" | "pending";
}

// Sample data
const disputes: Dispute[] = [
  {
    id: "DSP-2024-001",
    type: "Incorrect Balance",
    bureau: "Equifax",
    status: "investigating",
    description:
      "TD Visa showing $2,400 balance instead of actual $1,200 paid balance. Statement attached.",
    submittedDate: "Dec 15, 2024",
    daysRemaining: 28,
    lastUpdate: "Dec 18, 2024",
    assignedTo: "Sarah M.",
    documents: 3,
    timeline: [
      { date: "Dec 15", event: "Dispute submitted", status: "completed" },
      { date: "Dec 16", event: "Documentation reviewed", status: "completed" },
      { date: "Dec 18", event: "Sent to bureau", status: "current" },
      { date: "Jan 12", event: "Expected resolution", status: "pending" },
    ],
  },
  {
    id: "DSP-2024-002",
    type: "Unauthorized Inquiry",
    bureau: "Equifax",
    status: "submitted",
    description:
      "Hard inquiry from 'QuickLoans Inc.' not authorized. Never applied for any loan with this company.",
    submittedDate: "Dec 10, 2024",
    daysRemaining: 35,
    lastUpdate: "Dec 10, 2024",
    documents: 1,
    timeline: [
      { date: "Dec 10", event: "Dispute submitted", status: "current" },
      { date: "Pending", event: "Under review", status: "pending" },
      { date: "Pending", event: "Bureau response", status: "pending" },
    ],
  },
  {
    id: "DSP-2024-003",
    type: "Duplicate Account",
    bureau: "TransUnion",
    status: "pending_docs",
    description:
      "Same TD credit card appearing twice with different account numbers. Need identity verification.",
    submittedDate: "Dec 8, 2024",
    daysRemaining: 0,
    lastUpdate: "Dec 16, 2024",
    assignedTo: "Michael R.",
    documents: 2,
    timeline: [
      { date: "Dec 8", event: "Dispute submitted", status: "completed" },
      { date: "Dec 12", event: "Review started", status: "completed" },
      { date: "Dec 16", event: "Documents requested", status: "current" },
    ],
  },
];

const resolvedDisputes: Dispute[] = [
  {
    id: "DSP-2024-098",
    type: "Late Payment Error",
    bureau: "Equifax",
    status: "resolved",
    description:
      "Payment marked as late but was paid on time. Bank statement provided.",
    submittedDate: "Nov 5, 2024",
    daysRemaining: 0,
    lastUpdate: "Nov 28, 2024",
    documents: 2,
    timeline: [
      { date: "Nov 5", event: "Dispute submitted", status: "completed" },
      { date: "Nov 28", event: "Resolved - Removed", status: "completed" },
    ],
  },
  {
    id: "DSP-2024-095",
    type: "Wrong Account Info",
    bureau: "TransUnion",
    status: "resolved",
    description:
      "Account showing wrong credit limit. Updated to correct amount.",
    submittedDate: "Oct 20, 2024",
    daysRemaining: 0,
    lastUpdate: "Nov 15, 2024",
    documents: 1,
    timeline: [
      { date: "Oct 20", event: "Dispute submitted", status: "completed" },
      { date: "Nov 15", event: "Resolved - Corrected", status: "completed" },
    ],
  },
];

export function CleanSlateDisputes() {
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutoGenerate, setShowAutoGenerate] = useState(false);
  const [showSubmitAll, setShowSubmitAll] = useState(false);
  const [generateStep, setGenerateStep] = useState(0);
  const [submitStep, setSubmitStep] = useState(0);

  const startAutoGenerate = () => {
    setShowAutoGenerate(true);
    setGenerateStep(0);
    setTimeout(() => setGenerateStep(1), 1500);
    setTimeout(() => setGenerateStep(2), 3000);
  };

  const startSubmitAll = () => {
    setShowSubmitAll(true);
    setSubmitStep(0);
  };

  if (showNewDispute) {
    return <NewDisputeFlow onBack={() => setShowNewDispute(false)} />;
  }

  if (selectedDispute) {
    return (
      <DisputeDetail
        dispute={selectedDispute}
        onBack={() => setSelectedDispute(null)}
      />
    );
  }

  const activeDisputes = disputes.filter(
    (d) => d.status !== "resolved" && d.status !== "rejected",
  );

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header Card */}
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-sm px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Disputes
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your credit disputes
            </p>
          </div>
          <button
            onClick={() => setShowNewDispute(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#008A00] text-white rounded-xl font-medium text-sm hover:bg-[#006B00] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search disputes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-10 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008A00]/50 text-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {activeDisputes.length}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Active
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-yellow-500">1</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Pending
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold text-[#008A00]">12</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Resolved
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
        {/* AI Quick Actions - At Top */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startAutoGenerate}
            className="flex items-center gap-3 p-4 bg-[#008A00] text-white rounded-2xl hover:bg-[#006B00] transition-colors"
          >
            <Bot className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold text-sm">Auto-Generate</p>
              <p className="text-xs text-white/70">AI dispute letters</p>
            </div>
          </button>
          <button
            onClick={startSubmitAll}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Send className="w-5 h-5 text-[#008A00]" />
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Submit All</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">3 ready to send</p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "active"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Active ({activeDisputes.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "history"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            History
          </button>
        </div>

        {/* Dispute List */}
        <div className="space-y-3">
          {(activeTab === "active" ? disputes : resolvedDisputes).map(
            (dispute) => (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                onClick={() => setSelectedDispute(dispute)}
              />
            ),
          )}
        </div>

        {/* Pro Tip */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">
                Pro Tip
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Disputes with supporting documents are 3x more likely to be
                resolved in your favor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />

      {/* Auto-Generate Sheet */}
      <Sheet open={showAutoGenerate} onOpenChange={setShowAutoGenerate}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Wand2 className="w-6 h-6 text-[#008A00]" />
              Auto-Generate Dispute Letters
            </SheetTitle>
            <SheetDescription>
              AI will create personalized dispute letters for each issue
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto px-4 space-y-4">
            {generateStep === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#008A00]/10 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-[#008A00]" />
                </div>
                <Loader2 className="w-8 h-8 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">Analyzing Your Issues</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Reviewing credit report discrepancies...
                </p>
              </div>
            )}

            {generateStep === 1 && (
              <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#008A00]/10 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-[#008A00]" />
                </div>
                <Loader2 className="w-8 h-8 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">Drafting Letters</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Creating legally compliant dispute letters...
                </p>
              </div>
            )}

            {generateStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#008A00]/10 rounded-2xl p-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#008A00] mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">3 Letters Generated!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ready for your review</p>
                </div>

                <div className="space-y-3">
                  <GeneratedLetterCard 
                    bureau="Equifax"
                    issue="Incorrect Balance"
                    summary="Formal request to correct TD Visa balance from $2,400 to actual $1,200"
                  />
                  <GeneratedLetterCard 
                    bureau="TransUnion"
                    issue="Unauthorized Inquiry"
                    summary="Request to remove unauthorized hard inquiry from QuickLoans Inc."
                  />
                  <GeneratedLetterCard 
                    bureau="Experian"
                    issue="Late Payment Error"
                    summary="Dispute of incorrectly reported late payment from March 2024"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                    onClick={() => {
                      setShowAutoGenerate(false);
                      setGenerateStep(0);
                      toast.success("Letters Saved!", { description: "Your dispute letters are ready in the drafts section." });
                    }}
                  >
                    Save All Letters
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={() => {
                      setShowAutoGenerate(false);
                      setGenerateStep(0);
                    }}
                  >
                    Edit Letters First
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Submit All Sheet */}
      <Sheet open={showSubmitAll} onOpenChange={setShowSubmitAll}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Send className="w-6 h-6 text-[#008A00]" />
              Submit All Disputes
            </SheetTitle>
            <SheetDescription>
              Review and submit your pending disputes to credit bureaus
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto px-4 space-y-4">
            {submitStep === 0 && (
              <>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Bureaus have 30 days to investigate and respond to your disputes.
                  </p>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">3 disputes ready to submit:</p>

                <div className="space-y-3">
                  {disputes.slice(0, 3).map((dispute) => (
                    <SubmitDisputeCard key={dispute.id} dispute={dispute} />
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                    onClick={() => setSubmitStep(1)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit All 3 Disputes
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full h-12 rounded-xl"
                    onClick={() => setShowSubmitAll(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}

            {submitStep === 1 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">Submitting Disputes</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Securely sending to credit bureaus...
                </p>
                {setTimeout(() => setSubmitStep(2), 2500) && null}
              </div>
            )}

            {submitStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#008A00]/10 rounded-2xl p-6 text-center">
                  <CheckCheck className="w-16 h-16 text-[#008A00] mx-auto mb-4" />
                  <p className="font-bold text-gray-900 dark:text-white text-xl">All Disputes Submitted!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Confirmation emails sent to your inbox
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white mb-3">What happens next?</p>
                  <div className="space-y-3">
                    <TimelineItem 
                      step="1"
                      title="Bureaus receive disputes"
                      description="Within 24 hours"
                    />
                    <TimelineItem 
                      step="2"
                      title="Investigation begins"
                      description="Bureaus contact creditors"
                    />
                    <TimelineItem 
                      step="3"
                      title="Resolution"
                      description="Results within 30 days"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl"
                  onClick={() => {
                    setShowSubmitAll(false);
                    setSubmitStep(0);
                    toast.success("Tracking enabled!", { description: "We'll notify you of any updates." });
                  }}
                >
                  Track My Disputes
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper components for sheets
function GeneratedLetterCard({ bureau, issue, summary }: { bureau: string; issue: string; summary: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900 dark:text-white">{bureau}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-[#008A00]/10 text-[#008A00]">{issue}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{summary}</p>
      <button className="text-sm text-[#008A00] font-medium mt-2">Preview Letter →</button>
    </div>
  );
}

function SubmitDisputeCard({ dispute }: { dispute: Dispute }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{dispute.type}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{dispute.bureau}</p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-[#008A00]" />
      </div>
    </div>
  );
}

function TimelineItem({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-[#008A00] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {step}
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white text-sm">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

// Sub-components

function SummaryCard({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-3 text-center border border-gray-100 dark:border-gray-800">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

function DisputeCard({
  dispute,
  onClick,
}: {
  dispute: Dispute;
  onClick: () => void;
}) {
  const statusConfig = {
    submitted: {
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      label: "Submitted",
    },
    investigating: {
      color: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      label: "Investigating",
    },
    resolved: {
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      label: "Resolved",
    },
    rejected: {
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
      label: "Rejected",
    },
    pending_docs: {
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      label: "Needs Docs",
    },
  };

  const config = statusConfig[dispute.status] || statusConfig.submitted;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-left hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white text-sm">
            {dispute.type}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {dispute.bureau} • {dispute.submittedDate}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${config.bg} ${config.color}`}
        >
          {config.label}
        </span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
        {dispute.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>
              {dispute.daysRemaining > 0
                ? `${dispute.daysRemaining} days left`
                : "Completed"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FileText className="w-3 h-3" />
            <span>{dispute.documents} docs</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </button>
  );
}

function QuickAction({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="text-[#008A00]">{icon}</div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {title}
      </span>
    </button>
  );
}

function DisputeCard_Old({
  dispute,
  onClick,
  delay = 0,
}: {
  dispute: Dispute;
  onClick: () => void;
  delay?: number;
}) {
  const statusConfig = {
    submitted: {
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/15",
      icon: <FileText className="w-3.5 h-3.5" />,
      label: "Submitted",
    },
    investigating: {
      color: "text-[#FFB800]",
      bg: "bg-[#FFB800]/15",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Under Review",
    },
    resolved: {
      color: "text-primary",
      bg: "bg-primary/15",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      label: "Resolved",
    },
    rejected: {
      color: "text-destructive",
      bg: "bg-destructive/15",
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: "Rejected",
    },
    pending_docs: {
      color: "text-[#FF6B35]",
      bg: "bg-[#FF6B35]/15",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      label: "Docs Needed",
    },
  };

  const stat = statusConfig[dispute.status];
  const isActive =
    dispute.status !== "resolved" && dispute.status !== "rejected";

  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-card rounded-3xl p-6 card-interactive animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="font-semibold text-foreground">
              {dispute.type}
            </span>
            <Badge
              className={`${stat.bg} ${stat.color} border-0 text-xs h-6 gap-1.5 px-3 font-medium`}
            >
              {stat.icon}
              {stat.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {dispute.description}
          </p>
        </div>
        <Badge className="bg-secondary text-muted-foreground border-0 text-xs h-7 flex-shrink-0 px-3">
          {dispute.bureau}
        </Badge>
      </div>

      {isActive && dispute.daysRemaining > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground text-xs">Progress</span>
            <span className="text-foreground font-medium text-xs">
              {dispute.daysRemaining} days remaining
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-[#00B8A9] rounded-full transition-all"
              style={{ width: `${((45 - dispute.daysRemaining) / 45) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {dispute.submittedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5" />
            {dispute.documents} docs
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </button>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:bg-secondary/50 transition-colors group text-left btn-press"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {description}
        </p>
      </div>
    </button>
  );
}

// Dispute Detail View
function DisputeDetail({
  dispute,
  onBack,
}: {
  dispute: Dispute;
  onBack: () => void;
}) {
  const statusConfig = {
    submitted: { color: "text-[#00D4FF]", label: "Submitted" },
    investigating: { color: "text-[#FFB800]", label: "Under Investigation" },
    resolved: { color: "text-primary", label: "Resolved" },
    rejected: { color: "text-destructive", label: "Rejected" },
    pending_docs: { color: "text-[#FF6B35]", label: "Documents Needed" },
  };

  const stat = statusConfig[dispute.status];

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 btn-press"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Back to Disputes</span>
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-2">
              {dispute.type}
            </h1>
            <p className={`text-sm font-medium ${stat.color}`}>{stat.label}</p>
          </div>
          <Badge className="bg-secondary text-muted-foreground border-0 h-8 px-4">
            {dispute.id}
          </Badge>
        </div>
      </section>

      {/* Status Timeline */}
      <section className="px-8 pb-8 animate-fade-in stagger-1">
        <div className="glass-card rounded-3xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-6">Timeline</h3>
          <div className="space-y-4">
            {dispute.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      event.status === "completed"
                        ? "bg-primary"
                        : event.status === "current"
                          ? "bg-[#FFB800] animate-pulse"
                          : "bg-secondary"
                    }`}
                  />
                  {index < dispute.timeline.length - 1 && (
                    <div
                      className={`w-0.5 h-8 ${
                        event.status === "completed"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-foreground text-sm">
                    {event.event}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-8 pb-8 animate-fade-in stagger-2">
        <div className="glass-card rounded-3xl p-6 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">Details</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {dispute.description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bureau</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {dispute.bureau}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Submitted</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {dispute.submittedDate}
              </p>
            </div>
            {dispute.assignedTo && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Assigned To
                </p>
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {dispute.assignedTo}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Documents</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                {dispute.documents} attached
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="px-8 pb-8 animate-fade-in stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Documents</h3>
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl text-sm btn-press"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="space-y-3">
          <DocumentItem name="TD_Visa_Statement_Dec2024.pdf" size="245 KB" />
          <DocumentItem name="Payment_Confirmation.png" size="128 KB" />
          <DocumentItem name="Identity_Verification.pdf" size="1.2 MB" />
        </div>
      </section>

      {/* Actions */}
      <section className="px-8 pb-8 animate-fade-in stagger-4">
        <div className="space-y-3">
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-semibold btn-press">
            <MessageSquare className="w-5 h-5 mr-2" />
            Message Specialist
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 border-border text-foreground hover:bg-secondary bg-transparent rounded-2xl font-semibold btn-press"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Dispute Letter
          </Button>
        </div>
      </section>
    </div>
  );
}

function DocumentItem({ name, size }: { name: string; size: string }) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
            {name}
          </p>
          <p className="text-xs text-muted-foreground">{size}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Eye className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Download className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

// New Dispute Flow
function NewDisputeFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBureau, setSelectedBureau] = useState("");
  const [description, setDescription] = useState("");

  const disputeTypes = [
    {
      id: "balance",
      label: "Incorrect Balance",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "inquiry",
      label: "Unauthorized Inquiry",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      id: "duplicate",
      label: "Duplicate Account",
      icon: <RefreshCw className="w-5 h-5" />,
    },
    {
      id: "late",
      label: "Late Payment Error",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "identity",
      label: "Identity Theft",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "other", label: "Other", icon: <Mail className="w-5 h-5" /> },
  ];

  const bureaus = [
    { id: "equifax", label: "Equifax" },
    { id: "transunion", label: "TransUnion" },
    { id: "both", label: "Both Bureaus" },
  ];

  const handleSubmit = () => {
    // Simulate submission
    setStep(4);
  };

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 btn-press"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Cancel</span>
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-2">New Dispute</h1>
        <p className="text-sm text-muted-foreground">
          {step === 1 && "Select the type of discrepancy"}
          {step === 2 && "Choose the credit bureau"}
          {step === 3 && "Describe the issue"}
          {step === 4 && "Dispute submitted!"}
        </p>

        {/* Progress */}
        {step < 4 && (
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Step 1: Type Selection */}
      {step === 1 && (
        <section className="px-8 pb-8 animate-fade-in">
          <div className="space-y-3">
            {disputeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.label);
                  setStep(2);
                }}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                  selectedType === type.label
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {type.icon}
                </div>
                <span className="font-medium text-foreground">
                  {type.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 2: Bureau Selection */}
      {step === 2 && (
        <section className="px-8 pb-8 animate-fade-in">
          <div className="space-y-3">
            {bureaus.map((bureau) => (
              <button
                key={bureau.id}
                onClick={() => {
                  setSelectedBureau(bureau.label);
                  setStep(3);
                }}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                  selectedBureau === bureau.label
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-foreground" />
                </div>
                <span className="font-medium text-foreground">
                  {bureau.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="w-full mt-6 h-12 border-border text-muted-foreground hover:bg-secondary bg-transparent rounded-xl btn-press"
          >
            Back
          </Button>
        </section>
      )}

      {/* Step 3: Description */}
      {step === 3 && (
        <section className="px-8 pb-8 animate-fade-in">
          <div className="glass-card rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/15 text-primary border-0 h-7 px-3">
                {selectedType}
              </Badge>
              <Badge className="bg-secondary text-muted-foreground border-0 h-7 px-3">
                {selectedBureau}
              </Badge>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail. Include account numbers, dates, and any relevant information..."
              className="w-full h-32 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
            />
          </div>

          {/* AI Suggestion */}
          <div className="glass-card rounded-2xl p-5 border border-primary/20 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground text-sm">
                AI Suggestion
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "My TD Visa account is showing an incorrect balance of $2,400. I
              made a payment of $1,200 on December 10, 2024, which should
              reflect on my account. Please find the attached bank statement as
              proof of payment."
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDescription(
                  "My TD Visa account is showing an incorrect balance of $2,400. I made a payment of $1,200 on December 10, 2024, which should reflect on my account. Please find the attached bank statement as proof of payment.",
                )
              }
              className="mt-4 h-9 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl text-sm btn-press"
            >
              Use This
            </Button>
          </div>

          {/* Upload */}
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center mb-6">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">
              Upload Documents
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, PNG, JPG up to 10MB
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1 h-14 border-border text-muted-foreground hover:bg-secondary bg-transparent rounded-2xl btn-press"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!description}
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-semibold btn-press disabled:opacity-50"
            >
              Submit Dispute
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <section className="px-8 pb-8 animate-fade-in">
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pop-in">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Dispute Submitted!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-[280px]">
              Your dispute has been submitted to {selectedBureau}. We'll notify
              you of any updates.
            </p>

            <div className="glass-card rounded-2xl p-6 w-full mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Reference ID
                </span>
                <span className="font-mono font-medium text-foreground">
                  DSP-2024-004
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Expected Resolution
                </span>
                <span className="font-medium text-foreground">
                  Jan 20, 2025
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-[#00D4FF]/15 text-[#00D4FF] border-0">
                  Processing
                </Badge>
              </div>
            </div>

            <Button
              onClick={onBack}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-semibold btn-press"
            >
              View All Disputes
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
