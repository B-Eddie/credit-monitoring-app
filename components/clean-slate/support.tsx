"use client"

import React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen, 
  PlayCircle,
  Search,
  ChevronRight,
  Bot,
  HelpCircle,
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Send,
  Sparkles
} from "lucide-react"

const articles = [
  { id: 1, title: "How Credit Scores Work", category: "Basics", readTime: "5 min" },
  { id: 2, title: "What Hurts Your Credit Most", category: "Education", readTime: "4 min" },
  { id: 3, title: "Understanding Hard vs Soft Inquiries", category: "Basics", readTime: "3 min" },
  { id: 4, title: "How to Dispute Errors Effectively", category: "Disputes", readTime: "6 min" },
  { id: 5, title: "Credit Utilization Explained", category: "Education", readTime: "4 min" },
]

const videos = [
  { id: 1, title: "The Dispute Process Explained", duration: "2:45" },
  { id: 2, title: "Reading Your Credit Report", duration: "3:12" },
  { id: 3, title: "Improving Your Credit Score", duration: "2:58" },
]

const glossary = [
  { term: "Credit Utilization", definition: "The ratio of your credit card balances to your credit limits" },
  { term: "Hard Inquiry", definition: "A credit check that can temporarily lower your score" },
  { term: "Soft Inquiry", definition: "A credit check that doesn't affect your score" },
  { term: "Payment History", definition: "Record of on-time and late payments on your accounts" },
]

export function CleanSlateSupport() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="pb-12">
      {/* Header */}
      <section className="px-8 pt-8 pb-10">
        <h1 className="text-2xl font-bold text-white mb-8">Help & Support</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
          <Input 
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D9A4]/50 focus:bg-white/10 rounded-2xl h-16 text-base"
          />
        </div>
      </section>

      {/* Quick Contact */}
      <section className="px-8 pb-10">
        <div className="grid grid-cols-3 gap-5">
          <ContactCard 
            icon={<Bot className="w-6 h-6" />}
            label="Ask AI"
            onClick={() => setShowChat(true)}
            highlight
          />
          <ContactCard 
            icon={<MessageSquare className="w-6 h-6" />}
            label="Chat"
          />
          <ContactCard 
            icon={<Phone className="w-6 h-6" />}
            label="Call"
          />
        </div>
      </section>

      {/* AI Chat Preview */}
      {showChat && (
        <section className="px-8 pb-10">
          <div className="glass-card rounded-3xl p-7 border border-[#00D9A4]/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#0A0F14]" />
                </div>
                <span className="font-bold text-white">Ask Clean Slate AI</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 text-sm text-white/30 hover:text-white hover:bg-white/5 rounded-xl font-medium"
                onClick={() => setShowChat(false)}
              >
                Close
              </Button>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 mb-5">
              <p className="text-sm text-white/70 leading-relaxed">
                Hi! I'm your Clean Slate AI assistant. I can help you understand your credit report, 
                explain how disputes work, and answer questions about your credit score.
              </p>
            </div>
            <div className="flex gap-4">
              <Input 
                placeholder="Type your question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D9A4]/50 rounded-xl h-14"
              />
              <Button size="icon" className="bg-gradient-to-r from-[#00D9A4] to-[#00B8A9] hover:opacity-90 text-[#0A0F14] rounded-xl h-14 w-14">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex gap-3 mt-5 flex-wrap">
              <QuickQuestion text="What's a good credit score?" />
              <QuickQuestion text="How do disputes work?" />
              <QuickQuestion text="Why did my score drop?" />
            </div>
          </div>
        </section>
      )}

      {/* Educational Articles */}
      <section className="px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-white text-lg flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#00D9A4]" />
            Learn About Credit
          </h2>
          <Button variant="ghost" size="sm" className="h-10 text-sm text-[#00D9A4] hover:text-[#00FFB8] hover:bg-transparent font-semibold">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {articles.slice(0, 3).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="pb-10">
        <h2 className="px-8 font-bold text-white text-lg flex items-center gap-3 mb-6">
          <PlayCircle className="w-5 h-5 text-[#00D9A4]" />
          Video Tutorials
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-2 px-8 scrollbar-hide">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Glossary */}
      <section className="px-8 pb-10">
        <div className="glass-card rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-[#00D9A4]" />
            <span className="font-bold text-white">Credit Glossary</span>
          </div>
          <div className="space-y-5">
            {glossary.map((item, i) => (
              <div key={i} className="border-b border-white/5 last:border-0 pb-5 last:pb-0">
                <p className="font-semibold text-white">{item.term}</p>
                <p className="text-sm text-white/40 mt-2 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-6 border-[#00D9A4]/20 text-[#00D9A4] hover:bg-[#00D9A4]/10 hover:border-[#00D9A4]/40 bg-transparent rounded-2xl h-14 font-semibold"
          >
            View Full Glossary
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-8 pb-10">
        <h2 className="font-bold text-white text-lg mb-6">Contact a Specialist</h2>
        <div className="glass-card rounded-3xl p-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-[#00D9A4]/15 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#00D9A4]" />
              </div>
              <div>
                <p className="font-semibold text-white">Call Support</p>
                <p className="text-sm text-white/30 mt-1">1-800-TD-CREDIT</p>
              </div>
            </div>
            <Badge className="bg-[#00D9A4]/15 text-[#00D9A4] border-0 text-xs px-4 py-1.5 font-semibold">24/7</Badge>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-[#00D4FF]/15 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#00D4FF]" />
              </div>
              <div>
                <p className="font-semibold text-white">Email Support</p>
                <p className="text-sm text-white/30 mt-1">cleanslate@td.com</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-white/20" />
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="px-8 pb-8">
        <h2 className="font-bold text-white text-lg mb-6">Popular Topics</h2>
        <div className="flex flex-wrap gap-4">
          <TopicBadge icon={<TrendingUp className="w-4 h-4" />} label="Improve Score" />
          <TopicBadge icon={<FileText className="w-4 h-4" />} label="File Dispute" />
          <TopicBadge icon={<Shield className="w-4 h-4" />} label="Fraud Protection" />
          <TopicBadge icon={<AlertTriangle className="w-4 h-4" />} label="Fix Errors" />
        </div>
      </section>
    </div>
  )
}

function ContactCard({ icon, label, onClick, highlight }: { icon: React.ReactNode; label: string; onClick?: () => void; highlight?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer transition-all ${
        highlight 
          ? 'border border-[#00D9A4]/30 hover:border-[#00D9A4]/50' 
          : 'hover:bg-white/5'
      }`}
    >
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
        highlight 
          ? 'bg-gradient-to-br from-[#00D9A4] to-[#00B8A9] text-[#0A0F14]' 
          : 'bg-white/5 text-[#00D9A4]'
      }`}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-white">{label}</span>
    </button>
  )
}

function QuickQuestion({ text }: { text: string }) {
  return (
    <button className="text-sm bg-white/5 px-5 py-2.5 rounded-xl text-white/50 hover:bg-[#00D9A4]/15 hover:text-[#00D9A4] transition-colors border border-white/10 hover:border-[#00D9A4]/30 font-medium">
      {text}
    </button>
  )
}

function ArticleCard({ article }: { article: { title: string; category: string; readTime: string } }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-[#00D9A4]/10 flex items-center justify-center group-hover:bg-[#00D9A4]/15 transition-colors">
          <BookOpen className="w-6 h-6 text-[#00D9A4]" />
        </div>
        <div>
          <p className="font-semibold text-white">{article.title}</p>
          <p className="text-sm text-white/30 mt-2">{article.category} • {article.readTime} read</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#00D9A4] transition-colors" />
    </div>
  )
}

function VideoCard({ video }: { video: { title: string; duration: string } }) {
  return (
    <div className="glass-card rounded-2xl flex-shrink-0 w-56 cursor-pointer hover:bg-white/5 transition-colors overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-[#1A232D] to-[#111820] flex items-center justify-center relative">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <PlayCircle className="w-8 h-8 text-white" />
        </div>
        <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-0 text-xs font-semibold">
          {video.duration}
        </Badge>
      </div>
      <div className="p-5">
        <p className="font-semibold text-white text-sm line-clamp-2">{video.title}</p>
      </div>
    </div>
  )
}

function TopicBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Badge 
      className="cursor-pointer bg-white/5 text-white/50 border-white/10 hover:bg-[#00D9A4]/15 hover:text-[#00D9A4] hover:border-[#00D9A4]/30 transition-all gap-2 px-5 py-2.5 text-sm font-medium"
    >
      {icon}
      {label}
    </Badge>
  )
}
