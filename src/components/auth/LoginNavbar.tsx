"use client";

import { LanguageSwitch } from "./LanguageSwitch";
import { DarkModeToggle } from "./DarkModeToggle";

export function LoginNavbar() {
  return (
    <nav className="w-full bg-theme-card border-b border-theme px-6 py-4 transition-theme">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Sevastu logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-theme">
            sevastu
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
