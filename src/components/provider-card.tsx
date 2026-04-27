"use client";

import { ExternalLink, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Provider } from "@/data/providers";

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-surface border border-border rounded-2xl p-7",
        "transition-all duration-300 ease-out",
        "hover:translate-y-[-6px] hover:border-primary hover:shadow-xl hover:shadow-primary/10",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]",
        "before:bg-gradient-to-r before:from-primary before:to-secondary",
        "before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100"
      )}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="text-4xl w-14 h-14 flex items-center justify-center bg-primary/10 rounded-2xl">
          {provider.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">{provider.name}</h3>
          <p className="text-sm text-text-secondary">{provider.enName}</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 border border-success/30 rounded-lg text-sm font-semibold text-success mb-4">
        <Check className="w-3.5 h-3.5" />
        {provider.freeTier}
      </div>

      <ul className="space-y-2 mb-5">
        {provider.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-sm text-text-secondary pb-2 border-b border-border/30 last:border-0 last:pb-0"
          >
            <span className="text-accent font-semibold flex-shrink-0">→</span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={provider.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 text-primary-light font-semibold text-sm",
          "transition-all duration-200 group-hover:gap-3"
        )}
      >
        访问官网
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
