import React from "react";
import { Search, Sparkles, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoHome: () => void;
  isSinglePostView: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  onGoHome,
  isSinglePostView,
  isDarkMode,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div
          onClick={onGoHome}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 font-sans uppercase">
              AI BLOG
            </span>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="hidden sm:block flex-1 max-w-md mx-8">
          {!isSinglePostView && (
            <div className="relative">
              <Search className="absolute top-2.5 left-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Mavzu bo'yicha tezkor qidiruv..."
                className="w-full pl-10 pr-10 py-2 text-xs bg-white/5 border border-white/10 focus:border-cyan-500/80 text-slate-100 rounded-xl focus:outline-none placeholder-slate-500 transition-colors backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute top-2.5 right-3 h-4.5 w-4.5 flex items-center justify-center text-slate-500 hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Theme Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={onToggleTheme}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            title={isDarkMode ? "Kunduzgi rejim (Light mode)" : "Tungi rejim (Dark mode)"}
          >
            {isDarkMode ? (
              <Sun className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-indigo-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      <div className="sm:hidden px-4 pb-3 pt-1">
        {!isSinglePostView && (
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Qidiruv..."
              className="w-full pl-9 pr-9 py-1.5 text-xs bg-white/5 border border-white/10 text-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute top-2.5 right-2.5 text-slate-500"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
