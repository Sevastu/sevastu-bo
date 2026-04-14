"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  time: string;
}

const mockNotifications: NotificationItem[] = [
  { id: 1, title: "New job assigned", time: "2 min ago" },
  { id: 2, title: "Worker verified", time: "10 min ago" },
  { id: 3, title: "Payment received", time: "1 hour ago" },
];

export function Notification() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] rounded-lg transition-colors"
      >
        <Bell size={20} />

        {/* Notification Dot */}
        <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-lg z-50">
          
          {/* Header */}
          <div className="p-3 border-b border-[var(--color-border)] font-semibold text-[var(--color-text)]">
            Notifications
          </div>

          {/* Notification List */}
          <div className="max-h-60 overflow-y-auto">
            {mockNotifications.length === 0 ? (
              <div className="p-4 text-center text-[var(--color-text-secondary)]">
                No notifications
              </div>
            ) : (
              mockNotifications.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-[var(--color-muted)] transition-colors cursor-pointer"
                >
                  <div className="text-sm text-[var(--color-text)]">
                    {item.title}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {item.time}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-[var(--color-border)] text-center">
            <button className="text-sm text-[var(--color-primary)] hover:underline">
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}