import { ArrowRight, Zap, Star, ExternalLink } from 'lucide-react'
import { cn } from '../lib/utils'
import type { Provider } from '../data/providers'

// 模块级常量：分类 → 标签配色，render 期间不会变
const CATEGORY_COLOR_MAP: Record<string, string> = {
  '国内': 'bg-blue-50 text-blue-600 border-blue-200',
  '国际': 'bg-purple-50 text-purple-600 border-purple-200',
  '免费额度高': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'LLM': 'bg-amber-50 text-amber-600 border-amber-200',
}

interface ProviderCardProps {
  provider: Provider
  index?: number
}

export function ProviderCard({ provider, index = 0 }: ProviderCardProps) {

  return (
    <div
      className="gradient-border-card group cursor-pointer"
      style={{ animationDelay: `${index * 80}ms`, animation: `fadeInUp 0.5s ease-out ${index * 80}ms both` }}
    >
      <div className="relative p-7 h-full flex flex-col">
        {/* 右上角：折扣角标 + 价格标签（错开堆叠） */}
        {(provider.discount || provider.priceTag) && (
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
            {provider.discount !== undefined && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #EF4444, #F97316)',
                }}
              >
                {(provider.discount / 10).toFixed(provider.discount % 10 === 0 ? 0 : 1)}折
              </span>
            )}
            {provider.priceTag && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                }}
              >
                {provider.priceTag}
              </span>
            )}
          </div>
        )}

        {/* 图标 + 信息 */}
        <div
          className={cn(
            "flex items-center gap-4 mb-5",
            (provider.discount || provider.priceTag) && "pr-20"
          )}
        >
          <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-3xl rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
            {provider.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300 break-words">
              {provider.name}
            </h3>
            <p className="text-xs text-text-muted mt-0.5 break-words">{provider.enName}</p>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {provider.category.map((cat) => (
            <span
              key={cat}
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                CATEGORY_COLOR_MAP[cat] || "bg-gray-50 text-text-muted border-gray-200"
              )}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* 免费额度 */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 mb-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm font-semibold text-emerald-700">
            {provider.freeTier}
          </span>
        </div>

        {/* 功能列表 */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {provider.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* 访问链接 */}
        <a
          href={provider.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-5 py-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 group/link"
        >
          <span className="text-sm font-semibold text-text-secondary group-hover/link:text-primary transition-colors">
            访问官网
          </span>
          <ExternalLink className="w-4 h-4 text-text-muted group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
        </a>
      </div>
    </div>
  )
}
