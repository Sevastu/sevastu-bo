"use client";

import React, { useEffect } from "react";

interface BlurOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  blurStrength?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  preventScroll?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const blurClasses = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md", 
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl"
};

export function BlurOverlay({
  isOpen,
  onClose,
  blurStrength = "md",
  opacity = 0.3,
  preventScroll = true,
  className = "",
  children
}: BlurOverlayProps) {
  
  // Prevent background scrolling when overlay is active
  useEffect(() => {
    if (preventScroll && isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Disable scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scrolling
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isOpen, preventScroll]);

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Background Overlay */}
      <div
        className={`
          fixed inset-0 z-40 
          ${blurClasses[blurStrength]}
          transition-all duration-300 ease-in-out
          ${className}
        `}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${opacity})`,
          WebkitBackdropFilter: `blur(${blurStrength === 'sm' ? '4px' : blurStrength === 'md' ? '8px' : blurStrength === 'lg' ? '12px' : '16px'})`,
          backdropFilter: `blur(${blurStrength === 'sm' ? '4px' : blurStrength === 'md' ? '8px' : blurStrength === 'lg' ? '12px' : '16px'})`
        }}
        onClick={onClose}
      />
      
      {/* Content (side panel, modal, etc.) */}
      {children && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="h-full w-full pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

// Example usage component for side panel
interface BlurOverlaySidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "right" | "left";
  width?: string;
  blurStrength?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

export function BlurOverlaySidePanel({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-96",
  blurStrength = "md",
  opacity = 0.3
}: BlurOverlaySidePanelProps) {
  
  return (
    <BlurOverlay 
      isOpen={isOpen} 
      onClose={onClose}
      blurStrength={blurStrength}
      opacity={opacity}
    >
      <div 
        className={`
          fixed top-0 h-full bg-white shadow-2xl 
          transform transition-transform duration-300 ease-in-out
          ${position === "right" ? "right-0" : "left-0"} 
          ${width}
          ${isOpen 
            ? position === "right" 
              ? "translate-x-0" 
              : "translate-x-0"
            : position === "right" 
              ? "translate-x-full" 
              : "-translate-x-full"
          }
        `}
      >
        {children}
      </div>
    </BlurOverlay>
  );
}
