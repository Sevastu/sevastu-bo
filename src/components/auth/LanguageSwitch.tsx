"use client";

import { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown";

export function LanguageSwitch() {
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const languages = [
    { code: "EN", name: "English" },
    { code: "HI", name: "हिंदी" }
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-theme-secondary hover:text-theme transition-colors">
          <span>🌐</span>
          <span>{language}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      }
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as "EN" | "HI")}
          className="w-full text-left px-4 py-2 text-sm text-theme-secondary hover:bg-theme-muted transition-colors"
        >
          {lang.name}
        </button>
      ))}
    </Dropdown>
  );
}
