"use client";

import { useState, useRef, useEffect } from "react";
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
  Search,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Bot,
  Send,
  Play,
  BookOpen,
  HelpCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  Video,
  FileText,
  Shield,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Mic,
  Accessibility,
  Eye,
  Type,
  ChevronDown,
  Headphones,
  Loader2,
  User,
} from "lucide-react";

// Types
interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

// Sample data
const articles: Article[] = [
  {
    id: "ART-001",
    title: "Understanding Your Credit Score",
    description:
      "Learn what factors affect your credit score and how to improve it",
    readTime: "5 min read",
    category: "Basics",
    featured: true,
  },
  {
    id: "ART-002",
    title: "How to File a Successful Dispute",
    description: "Step-by-step guide to disputing errors on your credit report",
    readTime: "8 min read",
    category: "Disputes",
    featured: true,
  },
  {
    id: "ART-003",
    title: "Credit Utilization Explained",
    description: "Why keeping your utilization under 30% matters",
    readTime: "4 min read",
    category: "Basics",
  },
  {
    id: "ART-004",
    title: "Protecting Against Identity Theft",
    description: "Essential steps to secure your credit from fraudsters",
    readTime: "6 min read",
    category: "Security",
  },
  {
    id: "ART-005",
    title: "Building Credit from Scratch",
    description: "Tips for establishing credit history",
    readTime: "7 min read",
    category: "Basics",
  },
];

const videos: VideoTutorial[] = [
  {
    id: "VID-001",
    title: "Getting Started with Clean Slate AI",
    duration: "3:45",
    thumbnail: "gradient",
    category: "Tutorial",
  },
  {
    id: "VID-002",
    title: "How to Read Your Credit Report",
    duration: "5:20",
    thumbnail: "gradient",
    category: "Education",
  },
  {
    id: "VID-003",
    title: "Filing Your First Dispute",
    duration: "4:15",
    thumbnail: "gradient",
    category: "Tutorial",
  },
];

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Credit Score",
    definition:
      "A numerical representation (300-900 in Canada) of your creditworthiness based on your credit history.",
    category: "Basics",
  },
  {
    term: "Hard Inquiry",
    definition:
      "A credit check that occurs when you apply for credit. It can temporarily lower your score by a few points.",
    category: "Inquiries",
  },
  {
    term: "Credit Utilization",
    definition:
      "The percentage of your available credit that you're using. Keeping it under 30% is recommended.",
    category: "Basics",
  },
  {
    term: "Dispute",
    definition:
      "A formal request to investigate and correct inaccurate information on your credit report.",
    category: "Disputes",
  },
  {
    term: "Credit Bureau",
    definition:
      "Organizations (Equifax, TransUnion) that collect and maintain consumer credit information.",
    category: "Basics",
  },
  {
    term: "Soft Inquiry",
    definition:
      "A credit check that doesn't affect your score, such as checking your own credit or pre-approval offers.",
    category: "Inquiries",
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content:
      "Hi! I'm Clean Slate AI, your personal credit assistant. How can I help you today?",
    timestamp: "Just now",
    suggestions: [
      "Check my score",
      "Start a dispute",
      "Explain utilization",
      "Talk to human",
    ],
  },
];

export function CleanSlateSupport() {
  const [activeTab, setActiveTab] = useState<"chat" | "learn" | "glossary">(
    "chat",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [liveChatStep, setLiveChatStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startLiveChat = () => {
    setShowLiveChat(true);
    setLiveChatStep(0);
    setTimeout(() => setLiveChatStep(1), 2000);
    setTimeout(() => setLiveChatStep(2), 4000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses: Record<
        string,
        { content: string; suggestions?: string[] }
      > = {
        "check my score": {
          content:
            "Your current credit score is 742, which is in the 'Good' range! You've improved by 10 points this month. Would you like me to break down the factors affecting your score?",
          suggestions: ["Yes, show factors", "How to improve?", "View history"],
        },
        "start a dispute": {
          content:
            "I can help you start a dispute! I found 3 potential discrepancies on your report. The most impactful one is an incorrect balance on your TD Visa. Would you like me to generate a dispute letter for this?",
          suggestions: [
            "Generate letter",
            "Show all issues",
            "Explain process",
          ],
        },
        "explain utilization": {
          content:
            "Credit utilization is the percentage of your available credit you're using. Your current utilization is 42%, which is a bit high. Keeping it under 30% can boost your score. Paying down $500 on your TD Visa would bring it to 28%!",
          suggestions: ["Payment tips", "Calculate impact", "Set reminder"],
        },
        "talk to human": {
          content:
            "I understand. I'll connect you with a credit specialist. They're available Mon-Fri 9am-8pm EST. Would you prefer a call or live chat?",
          suggestions: ["Request call", "Live chat", "Schedule later"],
        },
        default: {
          content:
            "I'd be happy to help with that! Could you tell me more about what you're looking for? I can assist with checking your score, filing disputes, understanding credit terms, or connecting you with a specialist.",
          suggestions: ["Check my score", "File dispute", "Learn more"],
        },
      };

      const lowerText = text.toLowerCase();
      const response =
        Object.entries(botResponses).find(([key]) =>
          lowerText.includes(key),
        )?.[1] || botResponses.default;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: "Just now",
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const filteredTerms = glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      term.definition.toLowerCase().includes(glossarySearch.toLowerCase()),
  );

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl shadow-sm px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Help
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get support & learn
            </p>
          </div>
          <button
            onClick={() => window.open("tel:1-800-843-4357")}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008A00]/50 text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* AI Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab("chat")}
            className="flex items-center gap-3 p-4 bg-[#008A00] text-white rounded-2xl hover:bg-[#006B00] transition-colors"
          >
            <Bot className="w-5 h-5" />
            <div className="text-left">
              <p className="font-semibold text-sm">AI Assistant</p>
              <p className="text-xs text-white/70">Ask anything</p>
            </div>
          </button>
          <button
            onClick={startLiveChat}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-[#008A00]" />
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                Live Chat
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Talk to human
              </p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "chat"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "learn"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setActiveTab("glossary")}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "glossary"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Terms
          </button>
        </div>

        {/* AI Chat Tab */}
        {activeTab === "chat" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-[#008A00]/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#008A00] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    Clean Slate AI
                  </p>
                  <p className="text-xs text-[#008A00] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008A00] animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSuggestionClick={handleSendMessage}
                />
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="glass-card rounded-2xl rounded-tl-none p-4">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage(inputValue)
                  }
                  placeholder="Type a message..."
                  className="flex-1 h-10 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008A00]/50 text-sm"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="h-10 w-10 bg-[#008A00] hover:bg-[#006B00] text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Learn Tab */}
        {activeTab === "learn" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {articles.slice(0, 4).map((article, index) => (
              <button
                key={article.id}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left ${
                  index !== 0
                    ? "border-t border-gray-100 dark:border-gray-800"
                    : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#008A00]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#008A00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {article.description}
                  </p>
                </div>
                <div className="text-xs text-gray-400">{article.readTime}</div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        )}

        {/* Glossary Tab */}
        {activeTab === "glossary" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {filteredTerms.slice(0, 5).map((term, index) => (
              <div
                key={term.term}
                className={`p-4 ${
                  index !== 0
                    ? "border-t border-gray-100 dark:border-gray-800"
                    : ""
                }`}
              >
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {term.term}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />

      {/* Live Chat Sheet */}
      <Sheet open={showLiveChat} onOpenChange={setShowLiveChat}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Headphones className="w-6 h-6 text-[#008A00]" />
              Live Support
            </SheetTitle>
            <SheetDescription>
              Connect with a TD Bank specialist
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-4 space-y-4">
            {liveChatStep === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#008A00]/10 flex items-center justify-center mb-4">
                  <Headphones className="w-8 h-8 text-[#008A00]" />
                </div>
                <Loader2 className="w-8 h-8 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">
                  Finding available agents...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Estimated wait: less than 2 minutes
                </p>
              </div>
            )}

            {liveChatStep === 1 && (
              <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#008A00]/10 flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-[#008A00]" />
                </div>
                <Loader2 className="w-8 h-8 text-[#008A00] animate-spin mb-4" />
                <p className="font-semibold text-gray-900 dark:text-white">
                  Connecting to agent...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Sarah M. is joining the chat
                </p>
              </div>
            )}

            {liveChatStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#008A00]/10 rounded-2xl p-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#008A00] mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    Connected!
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You&apos;re now chatting with Sarah M.
                  </p>
                </div>

                {/* Agent Info */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#008A00] flex items-center justify-center text-white font-bold">
                      SM
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Sarah M.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Credit Specialist • 5 years
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initial Agent Message */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Hi there! I&apos;m Sarah, your dedicated Clean Slate support
                    specialist. How can I help you today with your credit
                    monitoring?
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Just now</p>
                </div>

                {/* Quick Topics */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quick topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Dispute help",
                      "Score questions",
                      "Account issue",
                      "Billing",
                    ].map((topic) => (
                      <button
                        key={topic}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => {
                          setShowLiveChat(false);
                          setLiveChatStep(0);
                          toast.success("Topic sent!", {
                            description: `Sarah is typing a response about "${topic}"...`,
                          });
                        }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="pt-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent border-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none text-sm"
                    />
                    <Button
                      size="sm"
                      className="bg-[#008A00] hover:bg-[#006B00]"
                      onClick={() => {
                        setShowLiveChat(false);
                        setLiveChatStep(0);
                        toast.success("Message sent!", {
                          description: "Sarah will respond shortly.",
                        });
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Chat Message Component
function ChatMessage({
  message,
  onSuggestionClick,
}: {
  message: Message;
  onSuggestionClick: (text: string) => void;
}) {
  return (
    <div
      className={`flex ${message.type === "user" ? "justify-end" : "items-start gap-2"}`}
    >
      {message.type === "bot" && (
        <div className="w-7 h-7 rounded-lg bg-[#008A00] flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl p-3 ${
          message.type === "user"
            ? "bg-[#008A00] text-white rounded-br-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        {message.suggestions && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="text-xs px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Contact Card - Simplified
function ContactCard({
  icon,
  title,
  description,
  available,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  available?: boolean;
}) {
  return (
    <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${available ? "bg-[#008A00]/10 text-[#008A00]" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}
      >
        {icon}
      </div>
      <div className="text-left">
        <p className="font-medium text-sm text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </button>
  );
}

function ArticleCard({
  article,
  featured = false,
  delay = 0,
}: {
  article: Article;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <button
      className={`w-full text-left glass-card rounded-2xl p-5 card-interactive animate-fade-in ${
        featured ? "border border-primary/20" : ""
      }`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            featured
              ? "bg-gradient-to-br from-primary to-[#00B8A9]"
              : "bg-primary/10"
          }`}
        >
          <BookOpen
            className={`w-5 h-5 ${featured ? "text-primary-foreground" : "text-primary"}`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground text-sm">
              {article.title}
            </p>
            {featured && (
              <Star className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Badge className="bg-secondary text-muted-foreground border-0 text-xs h-5 px-2">
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>
    </button>
  );
}

function VideoCard({
  video,
  delay = 0,
}: {
  video: VideoTutorial;
  delay?: number;
}) {
  return (
    <button
      className="flex-shrink-0 w-48 glass-card rounded-2xl overflow-hidden card-interactive animate-fade-in"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="h-28 bg-gradient-to-br from-primary/30 to-[#00B8A9]/30 flex items-center justify-center relative">
        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <p className="font-medium text-foreground text-sm line-clamp-2">
          {video.title}
        </p>
        <Badge className="bg-secondary text-muted-foreground border-0 text-xs h-5 px-2 mt-2">
          {video.category}
        </Badge>
      </div>
    </button>
  );
}

function CategoryCard({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <button className="glass-card rounded-2xl p-4 text-left hover:bg-secondary/50 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors mb-3">
        {icon}
      </div>
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{count} articles</p>
    </button>
  );
}

function GlossaryCard({
  term,
  expanded,
  onClick,
  delay = 0,
}: {
  term: GlossaryTerm;
  expanded: boolean;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-card rounded-2xl p-5 card-interactive animate-fade-in"
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-foreground">{term.term}</p>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </div>
      <Badge className="bg-secondary text-muted-foreground border-0 text-xs h-5 px-2 mb-2">
        {term.category}
      </Badge>
      {expanded && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border/50 animate-fade-in">
          {term.definition}
        </p>
      )}
    </button>
  );
}
