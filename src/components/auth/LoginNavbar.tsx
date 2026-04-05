"use client";

import { LanguageSwitch } from "./LanguageSwitch";
import { DarkModeToggle } from "./DarkModeToggle";

export function LoginNavbar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Sevastu logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            sevastu
          </h1>
        </div>

        {/* Right side - Admin Login label, Language switch, Dark mode toggle */}
        <div className="flex items-center space-x-4">
          {/* Admin Login label */}
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
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
