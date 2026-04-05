"use client";

export function LoginFooter() {
  return (
    <footer className="w-full bg-theme-card border-t border-theme px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6">
        <a 
          href="#" 
          className="text-xs text-theme-muted hover:text-theme-secondary transition-colors"
        >
          Privacy Policy
        </a>
        <span className="text-xs text-theme-muted">•</span>
        <a 
          href="#" 
          className="text-xs text-theme-muted hover:text-theme-secondary transition-colors"
        >
          Terms
        </a>
        <span className="text-xs text-theme-muted">•</span>
        <a 
          href="#" 
          className="text-xs text-theme-muted hover:text-theme-secondary transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
