"use client";

import { filterOptions } from "@/data/providers";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterSection({ activeFilter, onFilterChange }: FilterSectionProps) {
  return (
    <div className="sticky top-0 z-50 glass border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                "border border-border bg-surface",
                "hover:border-primary hover:text-text-primary",
                activeFilter === option.id && [
                  "bg-primary border-primary text-white",
                  "shadow-lg shadow-primary/25"
                ]
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
