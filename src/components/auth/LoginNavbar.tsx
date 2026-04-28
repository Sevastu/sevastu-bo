"use client";

import { LanguageSwitch } from "./LanguageSwitch";
import { DarkModeToggle } from "./DarkModeToggle";
import logo from "@/assets/logo5.png";

export function LoginNavbar() {
  return (
    <nav className="w-full bg-theme-card border-b border-theme px-6 py-2 transition-theme">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side - Sevastu logo */}
        <div className="flex items-center gap-3">
          <div className="bg-transparent rounded-xl flex items-center justify-center">
              {/* <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg> */}
              <img src={logo.src} alt="Sevastu Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-theme-primary">
            Sevastu
          </h1>
        </div>

        {/* Right side - Admin Login label, Language switch, Dark mode toggle */}
        <div className="flex items-center space-x-1">
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
