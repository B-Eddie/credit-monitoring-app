"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  ChevronRight,
  Moon,
  Sun,
  Eye,
  Type,
  Volume2,
  Mic,
  Shield,
  Lock,
  Bell,
  User,
  CreditCard,
  Building2,
  FileText,
  HelpCircle,
  LogOut,
  Smartphone,
  Mail,
  Globe,
  Palette,
  Accessibility,
  ZoomIn,
  ZoomOut,
  Contrast,
  VolumeX,
  Phone,
  ChevronDown,
  Check,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";

export function CleanSlateSettings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("accessibility");

  return (
    <div className="pb-32 bg-background">
      {/* Header */}
      <section className="px-8 pt-8 pb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your Clean Slate experience
        </p>
      </section>

      {/* Account Section */}
      <section className="px-8 pb-6 animate-fade-in stagger-1">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Account
        </h3>
        <div className="glass-card rounded-2xl border border-border/50 divide-y divide-border/50">
          <SettingRow
            icon={<User className="w-5 h-5" />}
            title="Profile"
            description="John Doe • john.doe@email.com"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<Lock className="w-5 h-5" />}
            title="Security"
            description="Password, 2FA, biometrics"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<Building2 className="w-5 h-5" />}
            title="Connected Bureaus"
            description="Equifax, TransUnion"
            action={
              <Badge className="bg-primary/15 text-primary border-0 text-xs h-6 px-3">
                2 Active
              </Badge>
            }
          />
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="px-8 pb-6 animate-fade-in stagger-2">
        <button
          onClick={() =>
            setExpandedSection(expandedSection === "accessibility" ? null : "accessibility")
          }
          className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3"
        >
          <span className="flex items-center gap-2">
            <Accessibility className="w-4 h-4" />
            Accessibility
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSection === "accessibility" ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSection === "accessibility" && (
          <div className="glass-card rounded-2xl border border-primary/20 divide-y divide-border/50 animate-fade-in">
            {/* Theme Toggle */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-primary" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium text-foreground text-sm">Appearance</p>
                    <p className="text-xs text-muted-foreground">Light or dark theme</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === "light"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Text Size</p>
                    <p className="text-xs text-muted-foreground">Adjust text size for readability</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize("small")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "small"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ZoomOut className="w-4 h-4 mx-auto mb-1" />
                  Small
                </button>
                <button
                  onClick={() => setFontSize("medium")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "medium"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Type className="w-4 h-4 mx-auto mb-1" />
                  Medium
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "large"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ZoomIn className="w-4 h-4 mx-auto mb-1" />
                  Large
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <ToggleSetting
              icon={<Contrast className="w-5 h-5" />}
              title="High Contrast"
              description="Increase contrast for better visibility"
              enabled={highContrast}
              onToggle={() => setHighContrast(!highContrast)}
            />

            {/* Reduce Motion */}
            <ToggleSetting
              icon={<Eye className="w-5 h-5" />}
              title="Reduce Motion"
              description="Minimize animations and transitions"
              enabled={reduceMotion}
              onToggle={() => setReduceMotion(!reduceMotion)}
            />

            {/* Screen Reader */}
            <ToggleSetting
              icon={<Volume2 className="w-5 h-5" />}
              title="Screen Reader Support"
              description="Optimize for screen readers"
              enabled={screenReader}
              onToggle={() => setScreenReader(!screenReader)}
            />

            {/* Voice Commands */}
            <ToggleSetting
              icon={<Mic className="w-5 h-5" />}
              title="Voice Commands"
              description="Control app with voice (Beta)"
              enabled={voiceCommands}
              onToggle={() => setVoiceCommands(!voiceCommands)}
              beta
            />
          </div>
        )}
      </section>

      {/* Notifications Section */}
      <section className="px-8 pb-6 animate-fade-in stagger-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Notifications
        </h3>
        <div className="glass-card rounded-2xl border border-border/50 divide-y divide-border/50">
          <SettingRow
            icon={<Bell className="w-5 h-5" />}
            title="Alert Preferences"
            description="Manage notification types"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<Smartphone className="w-5 h-5" />}
            title="Push Notifications"
            description="Enabled"
            action={
              <div className="w-12 h-7 rounded-full bg-primary flex items-center">
                <div className="w-5 h-5 rounded-full bg-white shadow-md ml-auto mr-1" />
              </div>
            }
          />
          <SettingRow
            icon={<Mail className="w-5 h-5" />}
            title="Email Digest"
            description="Weekly summary"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="px-8 pb-6 animate-fade-in stagger-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Privacy & Security
        </h3>
        <div className="glass-card rounded-2xl border border-border/50 divide-y divide-border/50">
          <SettingRow
            icon={<Shield className="w-5 h-5" />}
            title="Data Privacy"
            description="Manage your data preferences"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<FileText className="w-5 h-5" />}
            title="Export Data"
            description="Download all your data"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<Lock className="w-5 h-5" />}
            title="Two-Factor Auth"
            description="Enabled via TD App"
            action={
              <Badge className="bg-primary/15 text-primary border-0 text-xs h-6 px-3 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Active
              </Badge>
            }
          />
        </div>
      </section>

      {/* Help & Support */}
      <section className="px-8 pb-6 animate-fade-in stagger-5">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Help & Support
        </h3>
        <div className="glass-card rounded-2xl border border-border/50 divide-y divide-border/50">
          <SettingRow
            icon={<HelpCircle className="w-5 h-5" />}
            title="Help Center"
            description="FAQs and guides"
            action={<ExternalLink className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<Phone className="w-5 h-5" />}
            title="Contact Support"
            description="1-800-TD-HELP"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
          <SettingRow
            icon={<FileText className="w-5 h-5" />}
            title="Terms & Privacy"
            description="Legal documents"
            action={<ExternalLink className="w-5 h-5 text-muted-foreground" />}
          />
        </div>
      </section>

      {/* App Info */}
      <section className="px-8 pb-6 animate-fade-in stagger-6">
        <div className="glass-card rounded-2xl p-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#00B8A9] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="font-semibold text-foreground">Clean Slate AI</p>
          <p className="text-xs text-muted-foreground mt-1">Version 1.0.0 (Demo)</p>
          <p className="text-xs text-muted-foreground mt-3">
            Powered by TD Bank • Your data is protected with bank-level encryption
          </p>
        </div>
      </section>

      {/* Sign Out */}
      <section className="px-8 pb-10 animate-fade-in stagger-7">
        <Button
          variant="outline"
          className="w-full h-14 border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent rounded-2xl font-semibold btn-press"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </section>
    </div>
  );
}

// Sub-components

function SettingRow({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <button className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="text-left">
          <p className="font-medium text-foreground text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </button>
  );
}

function ToggleSetting({
  icon,
  title,
  description,
  enabled,
  onToggle,
  beta = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  beta?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-foreground text-sm">{title}</p>
            {beta && (
              <Badge className="bg-[#FFB800]/15 text-[#FFB800] border-0 text-[10px] h-5 px-2">
                Beta
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-7 rounded-full transition-all ${
          enabled ? "bg-primary" : "bg-secondary"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
