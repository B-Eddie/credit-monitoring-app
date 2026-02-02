"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  BellOff,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  FileText,
  CreditCard,
  Mail,
  Smartphone,
  Settings,
  Trash2,
  Check,
  X,
  Filter,
} from "lucide-react";

// Types
interface Notification {
  id: string;
  type: "score" | "dispute" | "fraud" | "tip" | "report" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable?: boolean;
  priority: "high" | "medium" | "low";
}

// Sample data
const notifications: Notification[] = [
  {
    id: "NOT-001",
    type: "fraud",
    title: "Unauthorized Inquiry Detected",
    message:
      "A hard inquiry from 'QuickLoans Inc.' was detected on your Equifax report. Review and dispute if unauthorized.",
    timestamp: "2 hours ago",
    read: false,
    actionable: true,
    priority: "high",
  },
  {
    id: "NOT-002",
    type: "score",
    title: "Score Increased! 🎉",
    message:
      "Your credit score increased by 10 points to 742. Keep up the great work!",
    timestamp: "Today",
    read: false,
    actionable: false,
    priority: "medium",
  },
  {
    id: "NOT-003",
    type: "dispute",
    title: "Dispute Update",
    message:
      "Your dispute DSP-2024-001 is now under investigation by Equifax. Expected resolution: 28 days.",
    timestamp: "Yesterday",
    read: false,
    actionable: true,
    priority: "medium",
  },
  {
    id: "NOT-004",
    type: "tip",
    title: "Credit Tip",
    message:
      "Paying down your TD Visa by $500 could improve your utilization ratio and boost your score by ~12 points.",
    timestamp: "2 days ago",
    read: true,
    actionable: false,
    priority: "low",
  },
  {
    id: "NOT-005",
    type: "report",
    title: "Monthly Report Ready",
    message:
      "Your December 2024 credit report is now available. View your score trends and any changes.",
    timestamp: "Dec 1",
    read: true,
    actionable: true,
    priority: "low",
  },
  {
    id: "NOT-006",
    type: "dispute",
    title: "Dispute Resolved",
    message:
      "Great news! Your late payment dispute has been resolved in your favor. The error has been removed.",
    timestamp: "Nov 28",
    read: true,
    actionable: false,
    priority: "medium",
  },
];

export function CleanSlateNotifications() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<string | null>(null);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notificationList.filter(
    (n) => !filter || n.type === filter,
  );

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="h-10 border-border text-muted-foreground hover:bg-secondary bg-transparent rounded-xl text-sm btn-press disabled:opacity-50"
            >
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <FilterPill
            label="All"
            active={!filter}
            onClick={() => setFilter(null)}
            count={notificationList.length}
          />
          <FilterPill
            label="Alerts"
            active={filter === "fraud"}
            onClick={() => setFilter("fraud")}
            count={notificationList.filter((n) => n.type === "fraud").length}
          />
          <FilterPill
            label="Score"
            active={filter === "score"}
            onClick={() => setFilter("score")}
            count={notificationList.filter((n) => n.type === "score").length}
          />
          <FilterPill
            label="Disputes"
            active={filter === "dispute"}
            onClick={() => setFilter("dispute")}
            count={notificationList.filter((n) => n.type === "dispute").length}
          />
          <FilterPill
            label="Reports"
            active={filter === "report"}
            onClick={() => setFilter("report")}
            count={notificationList.filter((n) => n.type === "report").length}
          />
        </div>
      </section>

      {/* Notifications List */}
      <section className="px-8 pb-10 animate-fade-in stagger-1">
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id)}
              onDelete={() => deleteNotification(notification.id)}
              delay={index}
            />
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium">No notifications</p>
            <p className="text-sm text-muted-foreground mt-1">
              {filter
                ? "No notifications in this category"
                : "You're all caught up!"}
            </p>
          </div>
        )}
      </section>

      {/* Notification Settings */}
      <section className="px-8 pb-10 animate-fade-in stagger-2">
        <h3 className="font-semibold text-foreground mb-4">
          Notification Preferences
        </h3>
        <div className="glass-card rounded-2xl border border-border/50 divide-y divide-border/50">
          <NotificationSetting
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Fraud Alerts"
            description="Immediate alerts for suspicious activity"
            enabled
            priority="Always on"
          />
          <NotificationSetting
            icon={<TrendingUp className="w-5 h-5" />}
            title="Score Changes"
            description="When your score increases or decreases"
            enabled
          />
          <NotificationSetting
            icon={<FileText className="w-5 h-5" />}
            title="Dispute Updates"
            description="Status changes on your disputes"
            enabled
          />
          <NotificationSetting
            icon={<CreditCard className="w-5 h-5" />}
            title="Credit Tips"
            description="Personalized recommendations"
            enabled={false}
          />
        </div>
      </section>

      {/* Delivery Methods */}
      <section className="px-8 pb-10 animate-fade-in stagger-3">
        <h3 className="font-semibold text-foreground mb-4">Delivery Methods</h3>
        <div className="space-y-3">
          <DeliveryMethod
            icon={<Smartphone className="w-5 h-5" />}
            title="Push Notifications"
            description="Instant alerts on your device"
            enabled
          />
          <DeliveryMethod
            icon={<Mail className="w-5 h-5" />}
            title="Email"
            description="Daily digest to your inbox"
            enabled
          />
        </div>
      </section>
    </div>
  );
}

// Sub-components

function FilterPill({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
      }`}
    >
      {label}
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-primary-foreground/20" : "bg-muted-foreground/20"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function NotificationCard({
  notification,
  onRead,
  onDelete,
  delay = 0,
}: {
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
  delay?: number;
}) {
  const typeConfig = {
    fraud: {
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-destructive",
      bg: "bg-destructive/15",
    },
    score: {
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/15",
    },
    dispute: {
      icon: <FileText className="w-5 h-5" />,
      color: "text-[#00D4FF]",
      bg: "bg-[#00D4FF]/15",
    },
    tip: {
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-[#FFB800]",
      bg: "bg-[#FFB800]/15",
    },
    report: {
      icon: <FileText className="w-5 h-5" />,
      color: "text-muted-foreground",
      bg: "bg-secondary",
    },
    system: {
      icon: <Bell className="w-5 h-5" />,
      color: "text-muted-foreground",
      bg: "bg-secondary",
    },
  };

  const config = typeConfig[notification.type];

  return (
    <div
      className={`glass-card rounded-2xl p-5 animate-fade-in ${
        !notification.read ? "border-l-4 border-l-primary" : ""
      }`}
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center ${config.color} flex-shrink-0`}
        >
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p
              className={`font-semibold text-sm ${notification.read ? "text-muted-foreground" : "text-foreground"}`}
            >
              {notification.title}
            </p>
            {notification.priority === "high" && (
              <Badge className="bg-destructive text-destructive-foreground text-xs h-5 px-2">
                Urgent
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {notification.timestamp}
            </span>
            <div className="flex items-center gap-2">
              {notification.actionable && (
                <Button
                  size="sm"
                  className="h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-medium btn-press"
                >
                  View
                </Button>
              )}
              {!notification.read && (
                <button
                  onClick={onRead}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <button
                onClick={onDelete}
                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSetting({
  icon,
  title,
  description,
  enabled,
  priority,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  priority?: string;
}) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {priority && (
          <Badge className="bg-destructive/15 text-destructive border-0 text-xs h-6 px-2">
            {priority}
          </Badge>
        )}
        <button
          onClick={() => !priority && setIsEnabled(!isEnabled)}
          className={`w-12 h-7 rounded-full transition-all ${
            isEnabled || priority ? "bg-primary" : "bg-secondary"
          } ${priority ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
              isEnabled || priority ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function DeliveryMethod({
  icon,
  title,
  description,
  enabled,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`w-12 h-7 rounded-full transition-all ${
          isEnabled ? "bg-primary" : "bg-secondary"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
