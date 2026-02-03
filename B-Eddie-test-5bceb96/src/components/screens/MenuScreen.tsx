"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Settings,
  Lock,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  MessageCircle,
  MapPin,
  ChevronRight,
  Shield,
  Smartphone,
  LogOut,
  Gift,
  Star,
} from "lucide-react";

export function MenuScreen() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="td-gradient pt-12 pb-6 px-4">
        <h1 className="text-xl font-semibold text-white text-center">Menu</h1>
      </div>

      <ScrollArea className="flex-1 -mt-2">
        <div className="bg-white rounded-t-3xl pt-6 px-4">
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#008A00] flex items-center justify-center">
              <span className="text-xl font-semibold text-white">TU</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">Taylor User</h2>
              <p className="text-sm text-gray-500">View and edit profile</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-4 bg-red-50 rounded-xl">
              <Bell className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-900">You have 3 unread notifications</span>
              <div className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                3
              </div>
            </div>
          </div>

          {/* Card Management */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">CARD MANAGEMENT</h3>
            <div className="space-y-1 bg-gray-50 rounded-xl overflow-hidden">
              <MenuItem
                icon={<CreditCard className="w-5 h-5" />}
                title="Manage Cards"
                subtitle="Lock, unlock, or report lost cards"
              />
              <MenuItem
                icon={<Lock className="w-5 h-5" />}
                title="Card Lock & Unlock"
                subtitle="Temporarily disable your cards"
              />
              <MenuItem
                icon={<Smartphone className="w-5 h-5" />}
                title="Digital Wallet"
                subtitle="Add cards to Apple Pay or Google Pay"
              />
            </div>
          </div>

          {/* Security */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">SECURITY</h3>
            <div className="space-y-1 bg-gray-50 rounded-xl overflow-hidden">
              <MenuItem
                icon={<Shield className="w-5 h-5" />}
                title="Security Settings"
                subtitle="Manage your security preferences"
              />
              <MenuItem
                icon={<Bell className="w-5 h-5" />}
                title="Alerts & Notifications"
                subtitle="Customize your alerts"
              />
              <MenuItem
                icon={<Lock className="w-5 h-5" />}
                title="Change Password"
                subtitle="Update your login credentials"
              />
            </div>
          </div>

          {/* Offers & Rewards */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">OFFERS & REWARDS</h3>
            <div className="space-y-1 bg-gray-50 rounded-xl overflow-hidden">
              <MenuItem
                icon={<Gift className="w-5 h-5" />}
                title="TD Rewards"
                badge="New"
                subtitle="View and redeem your rewards"
              />
              <MenuItem
                icon={<Star className="w-5 h-5" />}
                title="Special Offers"
                subtitle="Exclusive deals just for you"
              />
            </div>
          </div>

          {/* Help & Support */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">HELP & SUPPORT</h3>
            <div className="space-y-1 bg-gray-50 rounded-xl overflow-hidden">
              <MenuItem
                icon={<MessageCircle className="w-5 h-5" />}
                title="TD Clari"
                subtitle="Chat with our AI assistant"
              />
              <MenuItem
                icon={<HelpCircle className="w-5 h-5" />}
                title="Help Centre"
                subtitle="FAQs and support articles"
              />
              <MenuItem
                icon={<MapPin className="w-5 h-5" />}
                title="Find a Branch or ATM"
                subtitle="Locate TD near you"
              />
              <MenuItem
                icon={<FileText className="w-5 h-5" />}
                title="Documents & Statements"
                subtitle="View your account statements"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">SETTINGS</h3>
            <div className="space-y-1 bg-gray-50 rounded-xl overflow-hidden">
              <MenuItem
                icon={<Settings className="w-5 h-5" />}
                title="App Settings"
                subtitle="Preferences and language"
              />
            </div>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 p-4 mb-8 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pb-6">
            <p>TD Canada Trust App</p>
            <p>Version 10.14.0 (Prototype)</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors text-left"
    >
      <div className="text-[#008A00]">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900">{title}</p>
          {badge && (
            <span className="text-xs bg-[#008A00] text-white px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}
