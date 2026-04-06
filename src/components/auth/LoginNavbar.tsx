"use client";

import { LanguageSwitch } from "./LanguageSwitch";
import { DarkModeToggle } from "./DarkModeToggle";

export function LoginNavbar() {
  return (
    <nav className="w-full bg-theme-card border-b border-theme px-6 py-3 transition-theme">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left side - Sevastu logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
          </div>
          <h1 className="text-3xl font-bold text-theme-primary">
            Sevastu
          </h1>
        </div>

        {/* Right side - Admin Login label, Language switch, Dark mode toggle */}
        <div className="flex items-center space-x-4">
          {/* Admin Login label */}
          <span className="text-sm text-theme-muted font-medium">
            Admin Login
          </span>
          
          {/* Language switch */}
          <LanguageSwitch />
          
          {/* Dark mode toggle */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
