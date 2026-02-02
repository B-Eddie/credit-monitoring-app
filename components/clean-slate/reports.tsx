"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight,
  History,
  Shield,
  Clock,
  User
} from "lucide-react"

interface Report {
  id: string
  date: string
  bureau: string
  changes: number
  issues: number
  status: "clean" | "issues"
}

interface AuditEntry {
  id: string
  date: string
  reason: string
  employeeId: string
  type: "review" | "limit" | "application"
}

const reports: Report[] = [
  { id: "RPT-001", date: "January 2026", bureau: "Both", changes: 3, issues: 2, status: "issues" },
  { id: "RPT-002", date: "December 2025", bureau: "Both", changes: 1, issues: 0, status: "clean" },
  { id: "RPT-003", date: "November 2025", bureau: "Both", changes: 2, issues: 1, status: "issues" },
  { id: "RPT-004", date: "October 2025", bureau: "Both", changes: 0, issues: 0, status: "clean" },
  { id: "RPT-005", date: "September 2025", bureau: "Both", changes: 4, issues: 0, status: "clean" },
]

const auditLog: AuditEntry[] = [
  { id: "AUD-001", date: "Jan 20, 2026", reason: "Account Review", employeeId: "TD-45892", type: "review" },
  { id: "AUD-002", date: "Jan 15, 2026", reason: "Credit Limit Increase Request", employeeId: "TD-32156", type: "limit" },
  { id: "AUD-003", date: "Dec 28, 2025", reason: "Annual Account Review", employeeId: "TD-45892", type: "review" },
  { id: "AUD-004", date: "Nov 15, 2025", reason: "New Product Application", employeeId: "TD-78234", type: "application" },
]

export function CleanSlateReports() {
  const [activeTab, setActiveTab] = useState("reports")

  return (
    <div className="pb-12">
      {/* Header */}
      <section className="px-8 pt-8 pb-10">
        <h1 className="text-2xl font-bold text-white mb-4">Credit Reports & History</h1>
        <p className="text-sm text-white/40 leading-relaxed">
          Access your historical credit reports and see when TD accessed your information
        </p>
      </section>

      {/* Tabs */}
      <section className="px-8 pb-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/5 border border-white/10 p-2 rounded-2xl h-16">
            <TabsTrigger 
              value="reports" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9A4] data-[state=active]:to-[#00B8A9] data-[state=active]:text-[#0A0F14] rounded-xl text-white/50 gap-2 h-12 font-semibold"
            >
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9A4] data-[state=active]:to-[#00B8A9] data-[state=active]:text-[#0A0F14] rounded-xl text-white/50 gap-2 h-12 font-semibold"
            >
              <History className="w-4 h-4" />
              Audit Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="mt-8 space-y-8">
            {/* Month Comparison */}
            <div className="glass-card rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-[#00D9A4]" />
                <span className="font-bold text-white">Monthly Comparison</span>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <ComparisonCard 
                  month="January 2026"
                  score={742}
                  change={+12}
                  issues={2}
                />
                <ComparisonCard 
                  month="December 2025"
                  score={730}
                  change={-5}
                  issues={0}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-6 border-[#00D9A4]/20 text-[#00D9A4] hover:bg-[#00D9A4]/10 hover:border-[#00D9A4]/40 bg-transparent rounded-2xl h-14 font-semibold"
              >
                View Detailed Comparison
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Report Archive */}
            <div>
              <h2 className="font-bold text-white text-lg mb-6">Report Archive</h2>
              <div className="space-y-4">
                {reports.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="glass-card rounded-3xl p-7">
              <h3 className="font-bold text-white mb-5">Export Options</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5 rounded-xl h-14 font-semibold">
                  <Download className="w-5 h-5 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/5 rounded-xl h-14 font-semibold">
                  <Download className="w-5 h-5 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-8 space-y-8">
            {/* Transparency Info */}
            <div className="glass-card rounded-3xl p-7 border border-[#00D9A4]/20">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-[#00D9A4]/15 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-[#00D9A4]" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Transparency Audit Log</p>
                  <p className="text-sm text-white/40 mt-3 leading-relaxed">
                    This log shows every time TD accessed your credit information and why. 
                    You can flag any suspicious access for review.
                  </p>
                </div>
              </div>
            </div>

            {/* Audit Entries */}
            <div>
              <h2 className="font-bold text-white text-lg mb-6">Access History</h2>
              <div className="space-y-4">
                {auditLog.map(entry => (
                  <AuditCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-xs text-white/40 mt-2 font-medium">Total Accesses</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white">2</p>
                <p className="text-xs text-white/40 mt-2 font-medium">This Month</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#00D9A4]">0</p>
                <p className="text-xs text-white/40 mt-2 font-medium">Flagged</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function ComparisonCard({ month, score, change, issues }: { month: string; score: number; change: number; issues: number }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
      <p className="text-sm text-white/40 mb-3 font-medium">{month}</p>
      <p className="text-4xl font-bold text-white">{score}</p>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Badge 
          className={`text-xs h-7 border-0 font-semibold ${change >= 0 ? 'bg-[#00D9A4]/15 text-[#00D9A4]' : 'bg-[#FF4757]/15 text-[#FF4757]'}`}
        >
          {change >= 0 ? '+' : ''}{change} pts
        </Badge>
        {issues > 0 && (
          <Badge className="text-xs h-7 bg-[#FF4757]/15 text-[#FF4757] border-0 font-semibold">
            {issues} issues
          </Badge>
        )}
      </div>
    </div>
  )
}

function ReportCard({ report }: { report: Report }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
            report.status === "clean" ? "bg-[#00D9A4]/15 text-[#00D9A4]" : "bg-[#FF4757]/15 text-[#FF4757]"
          }`}>
            {report.status === "clean" ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="font-semibold text-white">{report.date}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-white/30 font-medium">{report.changes} changes</span>
              {report.issues > 0 && (
                <Badge className="text-xs h-6 bg-[#FF4757]/15 text-[#FF4757] border-0 font-semibold">
                  {report.issues} issues flagged
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-12 w-12 p-0 text-white/30 hover:text-white hover:bg-white/5 rounded-xl">
            <Eye className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-12 w-12 p-0 text-white/30 hover:text-white hover:bg-white/5 rounded-xl">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AuditCard({ entry }: { entry: AuditEntry }) {
  const typeConfig = {
    review: { icon: <Eye className="w-5 h-5" />, color: "bg-[#00D9A4]/15 text-[#00D9A4]" },
    limit: { icon: <FileText className="w-5 h-5" />, color: "bg-[#00D4FF]/15 text-[#00D4FF]" },
    application: { icon: <User className="w-5 h-5" />, color: "bg-[#FFB800]/15 text-[#FFB800]" }
  }

  const config = typeConfig[entry.type]

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-5">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${config.color}`}>
            {config.icon}
          </div>
          <div>
            <p className="font-semibold text-white">{entry.reason}</p>
            <div className="flex items-center gap-5 mt-3 text-sm text-white/30 font-medium">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {entry.date}
              </span>
              <span>Employee: {entry.employeeId}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-10 text-sm text-white/30 hover:text-white hover:bg-white/5 rounded-xl font-medium"
        >
          Why?
        </Button>
      </div>
    </div>
  )
}
