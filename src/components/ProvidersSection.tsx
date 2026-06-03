import { useState, useEffect, useRef } from 'react'
import { providers, filterOptions, type Provider } from '../data/providers'
import { ProviderCard } from './ProviderCard'
import { SlidersHorizontal, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

export function ProvidersSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providers)
  const [mounted, setMounted] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)
  const sectionRef = useRef<HTMLElement>(null)

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
    setVisibleCount(9)
  }, [activeFilter])

  if (!mounted) return null

  const visibleProviders = filteredProviders.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProviders.length

  return (
    <section id="providers" ref={sectionRef} className="relative py-28 overflow-hidden bg-white">
      {/* 吸顶筛选栏 */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <SlidersHorizontal className="w-4 h-4" />
              <span>筛选分类</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={cn(
                    "filter-btn",
                    activeFilter === option.id && "active"
                  )}
                >
                  {option.label}
                  <span className="ml-2 text-xs opacity-70">
                    {option.id === 'all' 
                      ? providers.length 
                      : providers.filter(p => p.category.includes(option.id)).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="text-xs text-text-muted hidden md:block">
              共 {filteredProviders.length} 个服务商
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16">
        {/* 标题 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-4">
            <Zap className="w-3 h-3" />
            官方合作链接 · 实时更新
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-text-primary">
            云服务商 <span className="gradient-text">Coding Plan</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto text-balance">
            选择一个或多个平台开始你的 AI 开发之旅
          </p>
        </div>

        {/* 卡片网格 */}
        {filteredProviders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProviders.map((provider, i) => (
                <ProviderCard key={provider.name} provider={provider} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(c => c + 6)}
                  className="btn-ghost px-8 py-3 rounded-xl text-sm font-medium"
                >
                  加载更多（剩余 {filteredProviders.length - visibleCount} 个）
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-text-primary">暂无匹配的服务商</h3>
            <p className="text-text-muted">尝试选择其他筛选条件</p>
          </div>
        )}
      </div>
    </section>
  )
}
