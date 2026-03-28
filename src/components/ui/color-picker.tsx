"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg bg-card hover:border-primary transition-colors group">
      <div className="relative w-10 h-10 rounded-md overflow-hidden border shadow-sm shrink-0">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-[-5px] w-[calc(100%+10px)] h-[calc(100%+10px)] cursor-pointer"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Label className="text-sm font-medium block truncate group-hover:text-primary transition-colors">
          {label}
        </Label>
        <span className="text-xs text-muted-foreground uppercase font-mono">
          {value}
        </span>
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 h-8 text-xs font-mono uppercase"
        maxLength={7}
      />
    </div>
  );
}
