import { useState, useEffect } from 'react'
import { providers, filterOptions, type Provider } from '../data/providers'
import { ProviderCard } from './ProviderCard'
import { cn } from '../lib/utils'

export function ProvidersSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providers)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProviders(providers)
    } else {
      setFilteredProviders(
        providers.filter((p) => p.category.includes(activeFilter))
      )
    }
  }, [activeFilter])

  if (!mounted) {
    return null
  }

  return (
    <section id="providers" className="py-24">
      <div className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
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
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.name} provider={provider} />
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
  )
}
