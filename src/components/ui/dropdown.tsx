"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ trigger, children, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 ${className}`}>
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
