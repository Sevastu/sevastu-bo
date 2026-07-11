"use client";

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ActionMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

interface ActionMenuProps {
  items: (ActionMenuItem | 'separator')[];
  trigger?: React.ReactNode;
}

export default function ActionMenu({ items, trigger }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {items.map((item, index) => {
          if (item === 'separator') {
            return <DropdownMenuSeparator key={`sep-${index}`} />;
          }

          return (
            <DropdownMenuItem
            
              key={`item-${index}`}
              onSelect={(e) => {
                e.preventDefault();
                if (!item.disabled) {
                  item.onClick();
                }
              }}
              disabled={item.disabled}
              className={
                item.variant === "destructive"
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
