"use client"

import React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileSearch, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Upload, 
  MessageSquare,
  ChevronRight,
  FileText,
  Calendar
} from "lucide-react"

interface Dispute {
  id: string
  type: string
  bureau: string
  status: "submitted" | "investigating" | "resolved" | "rejected"
  submittedDate: string
  expectedResolution: string
  daysRemaining: number
  description: string
}

const disputes: Dispute[] = [
  {
    id: "DSP-001",
    type: "Incorrect Payment Status",
    bureau: "Equifax",
    status: "investigating",
    submittedDate: "Jan 18, 2026",
    expectedResolution: "Feb 17, 2026",
    daysRemaining: 28,
    description: "TD Visa payment marked as late, but payment was made on time"
  },
  {
    id: "DSP-002",
    type: "Unauthorized Hard Inquiry",
    bureau: "TransUnion",
    status: "submitted",
    submittedDate: "Jan 15, 2026",
    expectedResolution: "Feb 14, 2026",
    daysRemaining: 25,
    description: "Hard inquiry from unknown lender 'QuickCash Loans'"
  },
  {
    id: "DSP-003",
    type: "Incorrect Balance",
    bureau: "Equifax",
    status: "resolved",
    submittedDate: "Dec 20, 2025",
    expectedResolution: "Jan 19, 2026",
    daysRemaining: 0,
    description: "Credit card balance was $2,000 higher than actual"
  },
  {
    id: "DSP-004",
    type: "Duplicate Account",
    bureau: "TransUnion",
    status: "rejected",
    submittedDate: "Dec 15, 2025",
    expectedResolution: "Jan 14, 2026",
    daysRemaining: 0,
    description: "Same account appearing twice on credit report"
  }
]

export function CleanSlateDisputes() {
  const [activeTab, setActiveTab] = useState("active")

  const activeDisputes = disputes.filter(d => d.status === "submitted" || d.status === "investigating")
  const resolvedDisputes = disputes.filter(d => d.status === "resolved" || d.status === "rejected")

  return (
    <div className="pb-12">
      {/* Summary Header */}
      <section className="px-8 pt-8 pb-10">
        <h1 className="text-2xl font-bold text-white mb-8">Dispute Tracking</h1>
        <div className="grid grid-cols-4 gap-4">
          <SummaryItem value="2" label="Active" color="text-[#FFB800]" />
          <SummaryItem value="1" label="Submitted" color="text-[#00D4FF]" />
          <SummaryItem value="1" label="Resolved" color="text-[#00D9A4]" />
          <SummaryItem value="1" label="Rejected" color="text-[#FF4757]" />
        </div>
      </section>

      {/* Tabs */}
      <section className="px-8 pb-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/5 border border-white/10 p-2 rounded-2xl h-16">
            <TabsTrigger 
              value="active" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9A4] data-[state=active]:to-[#00B8A9] data-[state=active]:text-[#0A0F14] rounded-xl text-white/50 h-12 font-semibold"
            >
              Active ({activeDisputes.length})
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9A4] data-[state=active]:to-[#00B8A9] data-[state=active]:text-[#0A0F14] rounded-xl text-white/50 h-12 font-semibold"
            >
              History ({resolvedDisputes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-8 space-y-5">
            {activeDisputes.map(dispute => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
            
            {activeDisputes.length === 0 && (
              <div className="glass-card rounded-3xl p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#00D9A4] mx-auto mb-5" />
                <p className="font-bold text-white text-lg">No Active Disputes</p>
                <p className="text-sm text-white/40 mt-3">
                  All your disputes have been resolved
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-8 space-y-5">
            {resolvedDisputes.map(dispute => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Actions */}
      <section className="px-8 pb-10">
        <h2 className="font-bold text-white text-lg mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={<FileSearch className="w-6 h-6" />}
            title="New Dispute"
            description="Start a new dispute"
          />
          <ActionCard 
            icon={<Upload className="w-6 h-6" />}
            title="Upload Docs"
            description="Add supporting files"
          />
          <ActionCard 
            icon={<MessageSquare className="w-6 h-6" />}
            title="Contact Support"
            description="Chat with specialist"
          />
          <ActionCard 
            icon={<FileText className="w-6 h-6" />}
            title="View Templates"
            description="Dispute letter samples"
          />
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-8 pb-8">
        <div className="glass-card rounded-3xl p-7 border border-[#00D9A4]/20">
          <h3 className="font-bold text-white mb-6">Tips for Faster Resolution</h3>
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#00D9A4] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/50 leading-relaxed">Upload supporting documents like receipts or bank statements</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#00D9A4] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/50 leading-relaxed">Respond promptly to any requests from credit bureaus</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-[#00D9A4] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/50 leading-relaxed">Keep copies of all correspondence for your records</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function SummaryItem({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-white/40 mt-2 font-medium">{label}</p>
    </div>
  )
}

function DisputeCard({ dispute }: { dispute: Dispute }) {
  const statusConfig = {
    submitted: {
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/15",
      icon: <FileText className="w-3.5 h-3.5" />,
      label: "Submitted"
    },
    investigating: {
      color: "text-[#FFB800]",
      bg: "bg-[#FFB800]/15",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: "Under Investigation"
    },
    resolved: {
      color: "text-[#00D9A4]",
      bg: "bg-[#00D9A4]/15",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      label: "Resolved"
    },
    rejected: {
      color: "text-[#FF4757]",
      bg: "bg-[#FF4757]/15",
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: "Rejected"
    }
  }

  const stat = statusConfig[dispute.status]
  const isActive = dispute.status === "submitted" || dispute.status === "investigating"

  return (
    <div className="glass-card rounded-3xl p-7">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="font-semibold text-white text-[15px]">{dispute.type}</span>
            <Badge className={`${stat.bg} ${stat.color} border-0 text-xs h-6 gap-1.5 px-3 font-semibold`}>
              {stat.icon}
              {stat.label}
            </Badge>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">{dispute.description}</p>
        </div>
        <Badge className="bg-white/5 text-white/50 border-0 text-xs h-7 flex-shrink-0 font-medium px-3">
          {dispute.bureau}
        </Badge>
      </div>

      {isActive && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-white/30 font-medium">Progress</span>
            <span className="text-white font-semibold">{dispute.daysRemaining} days remaining</span>
          </div>
          <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00D9A4] to-[#00B8A9] rounded-full transition-all"
              style={{ width: `${((45 - dispute.daysRemaining) / 45) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-6 text-sm text-white/30 font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {dispute.submittedDate}
          </span>
          <span>ID: {dispute.id}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-10 text-[#00D9A4] hover:text-[#00FFB8] hover:bg-transparent p-0 font-semibold">
          Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

function ActionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group">
      <div className="w-14 h-14 rounded-xl bg-[#00D9A4]/10 flex items-center justify-center text-[#00D9A4] group-hover:bg-[#00D9A4]/15 transition-colors flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-white/30 mt-1">{description}</p>
      </div>
    </div>
  )
}
