import React from "react";

interface SearchProps {
  value: string;
  onChange: (text: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <div className="w-full flex justify-end">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search devices by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800/40 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-400 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200"
        />
      </div>
    </div>
  );
}
