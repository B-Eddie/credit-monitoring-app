"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Support</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Get help & learn about credit
            </p>
          </div>
          <Button
            variant="outline"
            className="h-11 border-primary/20 text-primary hover:bg-primary/10 bg-transparent rounded-xl font-medium btn-press"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="px-8 pb-6 animate-fade-in stagger-1">
        <div className="flex gap-2 p-1.5 bg-secondary/50 rounded-2xl">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "chat"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Chat
          </button>
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "learn"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Learn
          </button>
          <button
            onClick={() => setActiveTab("glossary")}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "glossary"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Glossary
          </button>
        </div>
      </section>

      {/* AI Chat Tab */}
      {activeTab === "chat" && (
        <section className="px-8 animate-fade-in stagger-2">
          {/* Chat Container */}
          <div className="glass-card rounded-3xl border border-border/50 overflow-hidden">
            {/* Chat Header */}
            <div className="p-5 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    Clean Slate AI
                  </p>
                  <p className="text-xs text-primary flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Online • Typically replies instantly
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Accessibility className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-5 space-y-4">
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
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <button className="p-3 hover:bg-secondary rounded-xl transition-colors">
                  <Mic className="w-5 h-5 text-muted-foreground" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage(inputValue)
                  }
                  placeholder="Type a message..."
                  className="flex-1 h-12 px-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="h-12 w-12 p-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl btn-press disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-foreground mb-4">
              Need Human Help?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ContactCard
                icon={<MessageSquare className="w-5 h-5" />}
                title="Live Chat"
                description="Chat with specialist"
                available
              />
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                title="Call Us"
                description="1-800-TD-HELP"
                available
              />
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                description="Response in 24hrs"
              />
              <ContactCard
                icon={<Clock className="w-5 h-5" />}
                title="Schedule"
                description="Book a callback"
              />
            </div>
          </div>
        </section>
      )}

      {/* Learn Tab */}
      {activeTab === "learn" && (
        <>
          {/* Featured Articles */}
          <section className="px-8 pb-8 animate-fade-in stagger-2">
            <h3 className="font-semibold text-foreground mb-4">Featured</h3>
            <div className="space-y-3">
              {articles
                .filter((a) => a.featured)
                .map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    featured
                    delay={index}
                  />
                ))}
            </div>
          </section>

          {/* Video Tutorials */}
          <section className="px-8 pb-8 animate-fade-in stagger-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Video Tutorials</h3>
              <button className="text-sm text-primary font-medium flex items-center gap-1 btn-press">
                View all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} delay={index} />
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section className="px-8 pb-8 animate-fade-in stagger-4">
            <h3 className="font-semibold text-foreground mb-4">All Articles</h3>
            <div className="space-y-3">
              {articles
                .filter((a) => !a.featured)
                .map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    delay={index}
                  />
                ))}
            </div>
          </section>

          {/* Categories */}
          <section className="px-8 pb-8 animate-fade-in stagger-5">
            <h3 className="font-semibold text-foreground mb-4">
              Browse by Topic
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <CategoryCard
                icon={<CreditCard className="w-5 h-5" />}
                title="Credit Basics"
                count={12}
              />
              <CategoryCard
                icon={<FileText className="w-5 h-5" />}
                title="Disputes"
                count={8}
              />
              <CategoryCard
                icon={<TrendingUp className="w-5 h-5" />}
                title="Improving Score"
                count={15}
              />
              <CategoryCard
                icon={<Shield className="w-5 h-5" />}
                title="Security"
                count={6}
              />
            </div>
          </section>
        </>
      )}

      {/* Glossary Tab */}
      {activeTab === "glossary" && (
        <section className="px-8 animate-fade-in stagger-2">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search terms..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Terms */}
          <div className="space-y-3">
            {filteredTerms.map((term, index) => (
              <GlossaryCard
                key={term.term}
                term={term}
                expanded={expandedTerm === term.term}
                onClick={() =>
                  setExpandedTerm(expandedTerm === term.term ? null : term.term)
                }
                delay={index}
              />
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium">No terms found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different search
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// Sub-components

function ChatMessage({
  message,
  onSuggestionClick,
}: {
  message: Message;
  onSuggestionClick: (text: string) => void;
}) {
  const isBot = message.type === "bot";

  return (
    <div
      className={`flex items-start gap-3 ${!isBot ? "flex-row-reverse" : ""}`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-[80%] ${
          isBot
            ? "glass-card rounded-2xl rounded-tl-none"
            : "bg-primary text-primary-foreground rounded-2xl rounded-tr-none"
        } p-4`}
      >
        <p
          className={`text-sm leading-relaxed ${isBot ? "text-foreground" : ""}`}
        >
          {message.content}
        </p>
        {message.suggestions && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        {isBot && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
            <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
              <ThumbsDown className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-xs text-muted-foreground ml-auto">
              {message.timestamp}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  description,
  available = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  available?: boolean;
}) {
  return (
    <button className="glass-card rounded-2xl p-4 text-left hover:bg-secondary/50 transition-colors group">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
          {icon}
        </div>
        {available && (
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        )}
      </div>
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
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
