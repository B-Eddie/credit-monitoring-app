"use client";

import type React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4 gap-4">
      {/* Prototype Banner */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#008A00] text-white rounded-full text-sm font-medium shadow-lg">
          <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="6" fill="white" />
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#008A00" fontSize="14" fontWeight="bold" fontFamily="Arial">TD</text>
          </svg>
          <span>TD Mobile App - Web Prototype</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">For feature development and testing purposes only</p>
      </div>
      <div className="phone-frame w-full max-w-[380px]">
        <div className="phone-screen relative w-full h-[780px] flex flex-col">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-3 pb-1">
            <span className="text-xs font-medium text-white">9:41</span>
            <div className="phone-notch w-32 h-7 mx-auto" />
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C6.95 3 3 6.95 3 12s3.95 9 9 9 9-4 9-9-4-9-9-9zm4.47 7.78l-5.03 5.03c-.29.29-.77.29-1.06 0l-2.84-2.84c-.29-.29-.29-.77 0-1.06.29-.29.77-.29 1.06 0l2.31 2.31 4.5-4.5c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z"/>
              </svg>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-6 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="20" y="9" width="2" height="6" rx="1"/>
                <rect x="4" y="8" width="12" height="8" rx="1"/>
              </svg>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
