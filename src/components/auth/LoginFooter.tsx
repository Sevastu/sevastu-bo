"use client";

export function LoginFooter() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6">
        <a 
          href="#" 
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Privacy Policy
        </a>
        <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
        <a 
          href="#" 
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Terms
        </a>
        <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
        <a 
          href="#" 
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
