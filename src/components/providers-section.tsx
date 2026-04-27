"use client";

import { useState, useEffect } from "react";
import { providers, type Provider } from "@/data/providers";
import { ProviderCard } from "@/components/provider-card";
import { FilterSection } from "@/components/filter-section";
import { Search, Box } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProvidersSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providers);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProviders(providers);
    } else {
      setFilteredProviders(
        providers.filter((p) => p.category.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  if (!mounted) {
    return null;
  }

  return (
    <section id="providers" className="py-24">
      <FilterSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="text-center mb-12">
          <div className="w-14 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">云服务商 Coding Plan</h2>
          <p className="text-text-secondary text-lg">
            选择一个或多个平台开始你的 AI 开发之旅
          </p>
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <div
                key={provider.name}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProviderCard provider={provider} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">暂无匹配的服务商</h3>
            <p className="text-text-secondary">尝试选择其他筛选条件</p>
          </div>
        )}
      </div>
    </section>
  );
}
