// 纯函数库：推荐引擎 + 算账器辅助
// 不依赖 React，可在 Node 端测试 / SSR 复用

import {
  type Provider,
  type TargetRole,
  type UseCase,
  type PricingTier,
} from '../data/providers'

// ============================================================
// 推荐引擎
// ============================================================

/**
 * 按身份 + 用途过滤，按 costEfficiency 降序，取前 N
 * @param all provider 列表
 * @param role 用户身份
 * @param useCases 用户用途（多选；空数组表示不限制）
 * @param limit 返回数量，默认 3
 */
export function pickTopN(
  all: Provider[],
  role: TargetRole,
  useCases: UseCase[] = [],
  limit = 3,
): Provider[] {
  const filtered = all.filter((p) => {
    const roleMatch = p.targetRoles?.includes(role) ?? false
    const useCaseMatch =
      useCases.length === 0 || useCases.some((uc) => p.useCases?.includes(uc))
    return roleMatch && useCaseMatch
  })
  return [...filtered]
    .sort((a, b) => (b.costEfficiency ?? 0) - (a.costEfficiency ?? 0))
    .slice(0, limit)
}

/** 兼容旧名 */
export const pickTop3 = (all: Provider[], role: TargetRole, useCases: UseCase[] = []) =>
  pickTopN(all, role, useCases, 3)

// ============================================================
// 算账器
// ============================================================

/** tokens 单位换算 */
const ONE_M = 1_000_000

/**
 * 找到最匹配的档位：tokens 包含需求量的最低档
 * - 没有匹配档位时返回最高档（按量计费）
 * - 无档位数据时返回 null
 */
export function findBestTier(
  tiers: PricingTier[] | undefined,
  monthlyTokensM: number,
): PricingTier | null {
  if (!tiers || tiers.length === 0) return null
  const tokens = monthlyTokensM * ONE_M
  return tiers.find((t) => t.tokens >= tokens) ?? tiers[tiers.length - 1]
}

/**
 * 估算月费（元）
 * @returns null 表示无法估算（用量未填 或 provider 无档位）
 */
export function estimateMonthlyCost(
  p: Provider,
  monthlyTokensM: number,
): number | null {
  if (monthlyTokensM <= 0) return null
  const tier = findBestTier(p.pricingTiers, monthlyTokensM)
  if (!tier) return null
  const tokens = monthlyTokensM * ONE_M
  const overage = Math.max(0, tokens - tier.tokens)
  return tier.monthlyFee + (overage / 1000) * tier.unitPrice
}

// ============================================================
// 行为 → token 估算（Token 消耗计算器用）
// ============================================================

/**
 * 估算"每天写 X 行代码"的月 token 消耗
 * 经验值：每行代码 ≈ 50 tokens（提示词 + 生成）
 */
export const TOKENS_PER_LINE = 50

/**
 * 估算"每天跑 N 次 Agent 任务"的月 token 消耗
 * 经验值：单次 Agent 任务 ≈ 5000 tokens（多轮推理 + 工具调用）
 */
export const TOKENS_PER_AGENT_RUN = 5000

export interface BehaviorInputs {
  linesPerDay: number
  agentRunsPerDay: number
}

/** 行为 → 月 token（百万） */
export function behaviorToMonthlyTokensM(input: BehaviorInputs): number {
  const totalTokens =
    input.linesPerDay * TOKENS_PER_LINE + input.agentRunsPerDay * TOKENS_PER_AGENT_RUN
  // 按每月 30 天计算
  return (totalTokens * 30) / ONE_M
}

// ============================================================
// 每日使用时长 → 月 Token 估算（智能导购 Step 3）
// ============================================================

/**
 * 不同用途每秒平均消耗 Token 数（经验值）
 * - 写代码：对话密度高，平均 ~40 tokens/s（含提示词+生成）
 * - 跑 Agent：多轮推理+工具调用，平均 ~60 tokens/s
 * - 文本对话：轻量交互，平均 ~30 tokens/s
 * - 生成图片：约 1000 tokens/张（按 5 秒生成）
 * - 生成视频：约 50000 tokens/秒（高分辨率）
 * - 文档处理：平均 ~35 tokens/s（读取+总结）
 * - 语音交互：平均 ~50 tokens/s（ASR+LLM+TTS）
 */
const TOKENS_PER_SECOND: Record<UseCase, number> = {
  '写代码': 40,
  '跑 Agent': 60,
  '文本对话': 30,
  '生成图片': 200, // 1000 tokens / 5s
  '生成视频': 500, // 简化：按中等分辨率
  '文档处理': 35,
  '语音交互': 50,
}

/**
 * 将用户填写的「每日使用时长（分钟）」转换为月 Token 消耗（百万）
 * - 每日分钟数 × 60 秒 × 各用途权重 → 总 Token 数
 * - 按每月 30 天计算，再除以 1,000,000 转 M tokens
 * @param dailyMinutes 用户每天使用时长（分钟）
 * @param useCases 用户选中的用途（多选；空数组表示纯文本对话）
 */
export function dailyMinutesToMonthlyTokensM(
  dailyMinutes: number,
  useCases: UseCase[] = [],
): number {
  if (dailyMinutes <= 0) return 0
  const secondsPerDay = dailyMinutes * 60

  // 优先按实际用途估算 token 强度；无用途时默认文本对话
  const activeUseCases = useCases.length > 0 ? useCases : (['文本对话'] as UseCase[])
  const avgTokensPerSecond =
    activeUseCases.reduce((sum, uc) => sum + TOKENS_PER_SECOND[uc], 0) /
    activeUseCases.length

  const totalTokens = secondsPerDay * avgTokensPerSecond
  return (totalTokens * 30) / ONE_M
}
