import { useMemo, useState } from 'react'
import { providers, filterOptions } from '../data/providers'
import { ProviderCard } from './ProviderCard'
import { SlidersHorizontal, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

// 模块级预算筛选计数（providers 是静态的，不需要每次 render 重算）
const categoryCounts: Record<string, number> = { all: providers.length }
for (const p of providers) {
  for (const c of p.category) {
    categoryCounts[c] = (categoryCounts[c] ?? 0) + 1
  }
}

const PAGE_SIZE = 9
const PAGE_STEP = 6

export function ProvidersSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // 直接从 activeFilter 派生过滤结果，useEffect + setState 的反模式去掉
  const filteredProviders = useMemo(
    () =>
      activeFilter === 'all'
        ? providers
        : providers.filter((p) => p.category.includes(activeFilter)),
    [activeFilter],
  )

  const visibleProviders = useMemo(
    () => filteredProviders.slice(0, visibleCount),
    [filteredProviders, visibleCount],
  )
  const hasMore = visibleCount < filteredProviders.length

  return (
    <section id="providers" className="relative py-28 overflow-hidden bg-white">
      {/* 吸顶筛选栏 */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <SlidersHorizontal className="w-4 h-4" />
              <span>筛选分类</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setActiveFilter(option.id)
                      setVisibleCount(PAGE_SIZE)
                    }}
                    className={cn('filter-btn', isActive && 'active')}
                  >
                    {option.label}
                    <span className="ml-2 text-xs opacity-70">
                      {categoryCounts[option.id] ?? 0}
                    </span>
                  </button>
                )
              })}
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
                  onClick={() => setVisibleCount((c) => c + PAGE_STEP)}
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
