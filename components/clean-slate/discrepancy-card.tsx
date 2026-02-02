"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, AlertCircle, ChevronRight, Sparkles } from "lucide-react"

interface DiscrepancyCardProps {
  type: string
  description: string
  dateDetected: string
  severity: "high" | "medium" | "low"
  impact: string
  status: "new" | "under-review" | "resolved"
}

export function DiscrepancyCard({ 
  type, 
  description, 
  dateDetected, 
  severity, 
  impact, 
  status 
}: DiscrepancyCardProps) {
  const severityConfig = {
    high: {
      color: "text-[#FF4757]",
      bg: "bg-[#FF4757]/20",
      borderColor: "border-l-[#FF4757]",
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "High Priority"
    },
    medium: {
      color: "text-[#FFB800]",
      bg: "bg-[#FFB800]/20",
      borderColor: "border-l-[#FFB800]",
      icon: <AlertCircle className="w-4 h-4" />,
      label: "Medium Priority"
    },
    low: {
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/20",
      borderColor: "border-l-[#00D4FF]",
      icon: <Clock className="w-4 h-4" />,
      label: "Low Priority"
    }
  }

  const statusConfig = {
    new: { color: "text-[#FF4757]", bg: "bg-[#FF4757]/20", label: "New" },
    "under-review": { color: "text-[#FFB800]", bg: "bg-[#FFB800]/20", label: "Under Review" },
    resolved: { color: "text-[#00D9A4]", bg: "bg-[#00D9A4]/20", label: "Resolved" }
  }

  const sev = severityConfig[severity]
  const stat = statusConfig[status]

  return (
    <div className={`glass-card rounded-2xl p-5 border-l-2 ${sev.borderColor}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${sev.bg} ${sev.color} flex items-center justify-center flex-shrink-0`}>
            {sev.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-semibold text-white text-[15px]">{type}</h3>
              <Badge className={`${stat.bg} ${stat.color} border-0 text-[10px] h-5 px-2.5 font-semibold`}>
                {stat.label}
              </Badge>
            </div>
            <p className="text-sm text-white/50 mt-2 line-clamp-2 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-5 text-xs text-white/40 font-medium">
          <span>Detected: {dateDetected}</span>
          <span className={`${sev.color} font-semibold`}>{impact}</span>
        </div>
        {status === "new" && (
          <Button 
            size="sm" 
            className="h-10 bg-gradient-to-r from-[#00D9A4] to-[#00B8A9] hover:opacity-90 text-[#0A0F14] font-semibold text-xs rounded-xl gap-2 px-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Dispute
          </Button>
        )}
        {status === "under-review" && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-10 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-xl font-medium"
          >
            View Status
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}
