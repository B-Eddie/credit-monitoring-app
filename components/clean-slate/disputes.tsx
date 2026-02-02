"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Disputes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage your credit disputes
            </p>
          </div>
          <Button
            onClick={() => setShowNewDispute(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-5 rounded-xl font-semibold btn-press"
          >
            <Plus className="w-5 h-5 mr-2" />
            New
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search disputes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="px-8 pb-8 animate-fade-in stagger-1">
        <div className="grid grid-cols-4 gap-3">
          <SummaryCard
            value={activeDisputes.length.toString()}
            label="Active"
            color="text-[#00D4FF]"
          />
          <SummaryCard value="1" label="Pending" color="text-[#FFB800]" />
          <SummaryCard value="12" label="Resolved" color="text-primary" />
          <SummaryCard value="94%" label="Success" color="text-foreground" />
        </div>
      </section>

      {/* Tabs */}
      <section className="px-8 pb-6 animate-fade-in stagger-2">
        <div className="flex gap-2 p-1.5 bg-secondary/50 rounded-2xl">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "active"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active ({activeDisputes.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "history"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            History
          </button>
        </div>
      </section>

      {/* Dispute List */}
      <section className="px-8 pb-10 animate-fade-in stagger-3">
        <div className="space-y-4">
          {(activeTab === "active" ? disputes : resolvedDisputes).map(
            (dispute, index) => (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                onClick={() => setSelectedDispute(dispute)}
                delay={index}
              />
            ),
          )}
        </div>
      </section>

      {/* AI Bulk Actions */}
      {activeTab === "active" && (
        <section className="px-8 pb-10 animate-fade-in stagger-4">
          <div className="glass-card rounded-3xl p-6 border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">
                  AI Quick Actions
                </p>
                <p className="text-sm text-muted-foreground">
                  Let AI handle your disputes automatically
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl text-sm font-medium btn-press justify-center"
                onClick={() =>
                  alert(
                    "Generating AI dispute letters for all active disputes...",
                  )
                }
              >
                <Bot className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Auto-Generate Letters</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl text-sm font-medium btn-press justify-center"
                onClick={() =>
                  alert("Submitting all pending disputes to bureaus...")
                }
              >
                <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Submit All Pending</span>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-8 pb-10 animate-fade-in stagger-5">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ActionCard
            icon={<Upload className="w-6 h-6" />}
            title="Upload Documents"
            description="Add supporting files"
            onClick={() => alert("Opening document upload...")}
          />
          <ActionCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Message Specialist"
            description="Get expert help"
            onClick={() => alert("Opening chat with specialist...")}
          />
          <ActionCard
            icon={<Phone className="w-6 h-6" />}
            title="Call Support"
            description="1-800-TD-HELP"
            onClick={() => window.open("tel:1-800-843-4357")}
          />
          <ActionCard
            icon={<FileSpreadsheet className="w-6 h-6" />}
            title="View Templates"
            description="Dispute letter templates"
            onClick={() => alert("Opening dispute letter templates...")}
          />
        </div>
      </section>

      {/* Tips */}
      <section className="px-8 pb-8 animate-fade-in stagger-6">
        <div className="glass-card rounded-2xl p-5 border border-[#00D4FF]/20 bg-[#00D4FF]/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Pro Tip</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Disputes with supporting documents are 3x more likely to be
                resolved in your favor. Always attach bank statements and
                payment confirmations.
              </p>
            </div>
          </div>
        </div>
      </section>
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
    <div className="glass-card rounded-2xl p-4 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function DisputeCard({
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
