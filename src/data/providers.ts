// 从 JSON 导入名称→链接映射（只拆了 name + link，方便运营人员单独修改链接）
import linkMapJson from './provider-links.json'

// ============================================================
// 类型定义
// ============================================================

/** 适合身份（智能导购 Step 1） */
export type TargetRole =
  | '个人开发者'
  | '学生'
  | '内容创作者'
  | '研究人员'
  | '产品/运营'
  | '小微企业主'
  | '团队 Leader'
  | '企业 IT'

/** 擅长场景（智能导购 Step 2） */
export type UseCase =
  | '写代码'
  | '跑 Agent'
  | '文本对话'
  | '生成图片'
  | '生成视频'
  | '文档处理'
  | '语音交互'

/** 支持的 IDE/客户端 */
export type IdeClient = 'Cursor' | 'Claude Code' | 'Cline' | 'OpenClaw' | 'VS Code' | 'JetBrains'

/** 首月羊毛价（比价看板） */
export interface FirstMonthDeal {
  price: number       // 元
  tokens: number      // 包含 token
  validUntil?: string // ISO 日期，可选
}

/** 套餐档位（Token 计算器） */
export interface PricingTier {
  name: string       // 套餐名，如「Lite / Pro / Max」
  monthlyFee: number // 元
  tokens: number     // 包含 token
  unitPrice: number  // 超额单价（元/1K tokens）
}

export interface Provider {
  // ========== 现有字段 ==========
  name: string
  enName: string
  icon: string
  category: string[]
  features: string[]
  freeTier: string
  link: string   // 从 provider-links.json 自动合并，无需手动填写

  // ========== 新增字段（全部 optional，未填则前端优雅降级） ==========

  /** 适合身份（智能导购 Step 1） */
  targetRoles?: TargetRole[]

  /** 擅长场景（智能导购 Step 2） */
  useCases?: UseCase[]

  /** 支持的 IDE/客户端（智能导购 + 比价看板） */
  supportedIdes?: IdeClient[]

  /** 推荐模型列表（智能导购 + 未来模型矩阵） */
  recommendedModels?: string[]

  /** 起步月费（元，0=免费）—— 实时比价看板 */
  monthlyFee?: number

  /** 月免费 token 数 —— 智能导购 + Token 计算器 */
  freeMonthlyTokens?: number

  /** 超额单价（元/1K tokens）—— Token 计算器 */
  tokenUnitPrice?: number

  /** 套餐档位（多档套餐）—— Token 计算器 */
  pricingTiers?: PricingTier[]

  /** 5 小时滚动限额（tokens，0=无限制）—— 实时比价看板 */
  fiveHourLimit?: number

  /** 首月羊毛价 —— 实时比价看板 */
  firstMonthDeal?: FirstMonthDeal

  /** 性价比评分 0-100 —— 推荐引擎核心权重 */
  costEfficiency?: number

  /** 避坑提示 —— 评测与避坑 */
  gotchas?: string[]
}

// ============================================================
// 筛选选项（现有）
// ============================================================

export const filterOptions = [
  { id: 'all', label: '全部' },
  { id: '国内', label: '国内厂商' },
  { id: '国际', label: '国际厂商' },
  { id: '免费额度高', label: '免费额度高' },
  { id: 'LLM', label: '大语言模型' },
]

// ============================================================
// Provider 数据
// ============================================================
//
// 核心 4 字段（targetRoles / useCases / monthlyFee / freeMonthlyTokens）所有 16 个都填
// 高级 5 字段（supportedIdes / recommendedModels / tokenUnitPrice / costEfficiency / gotchas）只 Top 5 填
// 其它 11 个 provider 留空，前端展示「待补充」即可
//
// Top 5 重点 provider：DeepSeek、智谱 AI、阿里云百炼、火山方舟的Token Plan、OpenRouter
// 数据基于公开信息 + 估算，后续可调整
// ============================================================

const providersBase: Omit<Provider, 'link'>[] = [
  {
    name: '阿里云百炼',
    enName: 'AI Model Studio',
    icon: '⚗️',
    category: ['国内', '免费额度高'],
    features: [
      '通义千问系列大模型',
      '丰富的 API 接口',
      '支持图片生成与分析',
      '企业级安全认证',
    ],
    freeTier: '免费试用额度',
    // 核心 4 字段
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader', '企业 IT'],
    useCases: ['写代码', '跑 Agent', '文本对话', '生成图片', '生成视频', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 1_000_000,
    // 高级字段（Top 5）
    supportedIdes: ['Cursor', 'Cline', 'OpenClaw', 'VS Code', 'JetBrains'],
    recommendedModels: ['qwen-coder-plus', 'qwen-max', 'qwen-vl-max'],
    tokenUnitPrice: 0.0004,
    pricingTiers: [
      { name: '免费', monthlyFee: 0, tokens: 1_000_000, unitPrice: 0.0004 },
      { name: 'Lite', monthlyFee: 29, tokens: 20_000_000, unitPrice: 0.0003 },
      { name: 'Pro', monthlyFee: 99, tokens: 100_000_000, unitPrice: 0.0002 },
    ],
    fiveHourLimit: 0,
    firstMonthDeal: { price: 0, tokens: 1_000_000, validUntil: '2026-12-31' },
    costEfficiency: 80,
    gotchas: [
      '需要阿里云账号实名认证',
      '通义千问 Max 仅对企业用户开放',
      '跨境调用需要额外配置',
    ],
  },
  {
    name: '腾讯云',
    enName: 'Tencent Cloud',
    icon: '💜',
    category: ['国内', 'LLM'],
    features: [
      '混元大模型',
      '智能对话与内容生成',
      '多模态能力',
      '完善的生态集成',
    ],
    freeTier: '免费体验包',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader', '企业 IT'],
    useCases: ['写代码', '文本对话', '文档处理', '生成图片'],
    monthlyFee: 0,
    freeMonthlyTokens: 200_000,
  },
  {
    name: '火山方舟的Token Plan',
    enName: 'Volcengine',
    icon: '🔥',
    category: ['国内', '免费额度高'],
    features: [
      '豆包大模型',
      '极速响应',
      '低成本推理',
      '丰富插件生态',
    ],
    freeTier: '50万 Tokens 免费',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader'],
    useCases: ['写代码', '跑 Agent', '文本对话', '生成图片', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 500_000,
    // 高级字段（Top 5）
    supportedIdes: ['Cursor', 'Cline', 'OpenClaw'],
    recommendedModels: ['doubao-pro', 'doubao-lite', 'doubao-coder'],
    tokenUnitPrice: 0.0003,
    pricingTiers: [
      { name: '免费', monthlyFee: 0, tokens: 500_000, unitPrice: 0.0003 },
      { name: 'Pro', monthlyFee: 39, tokens: 50_000_000, unitPrice: 0.0002 },
      { name: 'Max', monthlyFee: 199, tokens: 300_000_000, unitPrice: 0.00015 },
    ],
    fiveHourLimit: 0,
    firstMonthDeal: { price: 0.99, tokens: 50_000_000, validUntil: '2026-09-30' },
    costEfficiency: 88,
    gotchas: [
      'Token Plan 与方舟平台计费独立',
      '豆包 Pro 在代码任务表现一般',
      '需通过专属链接激活',
    ],
  },
  {
    name: '火山方舟的Agent Plan',
    enName: 'Volcengine Agent Plan',
    icon: '🧩',
    category: ['国内', 'LLM'],
    features: [
      '智能体 Agent 框架',
      '快速搭建 AI 应用',
      '多模型灵活调度',
      '可视化工作流编排',
    ],
    freeTier: '免费体验',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader'],
    useCases: ['跑 Agent', '文本对话'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: 'MiniMax',
    enName: 'MiniMax AI',
    icon: '🤖',
    category: ['国内', 'LLM'],
    features: [
      'abab 系列大模型',
      '长文本处理能力',
      '语音合成',
      '高效推理引擎',
    ],
    freeTier: '免费试用',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader'],
    useCases: ['文本对话', '跑 Agent', '语音交互'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: '讯飞星火',
    enName: 'iFLYTEK Spark',
    icon: '✨',
    category: ['国内', 'LLM'],
    features: [
      '星火认知大模型',
      '语音交互能力',
      '多语种支持',
      '行业解决方案',
    ],
    freeTier: '免费体验额度',
    targetRoles: ['学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader', '企业 IT'],
    useCases: ['文本对话', '跑 Agent', '语音交互'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: '智谱 AI',
    enName: 'GLM Series',
    icon: '🧠',
    category: ['国内', '免费额度高', 'LLM'],
    features: [
      'GLM-4 系列模型',
      'ChatGLM 对话模型',
      '代码生成能力',
      '开源模型支持',
    ],
    freeTier: '100万 Tokens 免费',
    targetRoles: ['个人开发者', '团队 Leader', '企业 IT'],
    useCases: ['写代码', '跑 Agent', '文本对话'],
    monthlyFee: 0,
    freeMonthlyTokens: 1_000_000,
    // 高级字段（Top 5）
    supportedIdes: ['Cursor', 'Cline', 'VS Code'],
    recommendedModels: ['glm-4-plus', 'glm-4-coder', 'glm-z1-air'],
    tokenUnitPrice: 0.0005,
    pricingTiers: [
      { name: '免费', monthlyFee: 0, tokens: 1_000_000, unitPrice: 0.0005 },
      { name: 'Lite', monthlyFee: 19, tokens: 10_000_000, unitPrice: 0.0003 },
      { name: 'Pro', monthlyFee: 79, tokens: 50_000_000, unitPrice: 0.0002 },
    ],
    fiveHourLimit: 0,
    firstMonthDeal: { price: 0, tokens: 1_000_000 },
    costEfficiency: 85,
    gotchas: [
      '免费额度 100 万 tokens 用完后按 token 收费',
      'GLM-4 速度比 deepseek 略慢',
      'GLM-Z1 推理模型消耗 token 较多',
    ],
  },
  {
    name: 'CSDN',
    enName: 'CSDN TaoToken',
    icon: '💻',
    category: ['国内', 'LLM'],
    features: [
      'TaoToken 代币体系',
      'AI 模型调用',
      '开发者社区',
      '技术资源丰富',
    ],
    freeTier: '邀请奖励',
    targetRoles: ['个人开发者', '学生'],
    useCases: ['写代码', '文本对话', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: '京东云',
    enName: 'JD Cloud',
    icon: '📦',
    category: ['国内'],
    features: [
      '京东 AI 能力',
      '电商场景优化',
      '智能客服',
      '数据安全保障',
    ],
    freeTier: '试用额度',
    targetRoles: ['内容创作者', '产品/运营', '小微企业主', '企业 IT'],
    useCases: ['文本对话', '生成图片', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: 'Moonshot AI',
    enName: 'Kimi',
    icon: '🌙',
    category: ['国内', '免费额度高', 'LLM'],
    features: [
      'Kimi 长文本模型',
      '20万字超长上下文',
      '强大的推理能力',
      '友好的 API 设计',
    ],
    freeTier: '送 15元 API 额度',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader'],
    useCases: ['写代码', '文本对话', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 1_500_000,
  },
  {
    name: 'DeepSeek',
    enName: 'DeepSeek AI',
    icon: '🔍',
    category: ['国内', '免费额度高', 'LLM'],
    features: [
      'DeepSeek Coder',
      '深度推理模型',
      '超低 API 价格',
      '开源模型可选',
    ],
    freeTier: '10元免费额度',
    targetRoles: ['个人开发者', '学生', '内容创作者', '研究人员', '产品/运营', '小微企业主', '团队 Leader', '企业 IT'],
    useCases: ['写代码', '跑 Agent', '文本对话', '生成图片', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 1_000_000,
    // 高级字段（Top 5）
    supportedIdes: ['Cursor', 'Claude Code', 'Cline', 'OpenClaw', 'VS Code', 'JetBrains'],
    recommendedModels: ['deepseek-coder', 'deepseek-v3', 'deepseek-r1'],
    tokenUnitPrice: 0.0001,
    pricingTiers: [
      { name: '免费', monthlyFee: 0, tokens: 1_000_000, unitPrice: 0.0001 },
      { name: '按量', monthlyFee: 0, tokens: 0, unitPrice: 0.00014 },
    ],
    fiveHourLimit: 0,
    firstMonthDeal: { price: 0, tokens: 1_000_000, validUntil: '2026-12-31' },
    costEfficiency: 95,
    gotchas: [
      '注册赠 10 元额度（约 100 万 tokens）',
      '深度推理模型 deepseek-r1 响应较慢',
      '高峰期可能限流',
    ],
  },
  {
    name: '百度云',
    enName: 'Baidu Cloud',
    icon: '🔵',
    category: ['国内', 'LLM'],
    features: [
      '文心一言大模型',
      'Ernie Bot SDK',
      '知识图谱能力',
      '图像识别集成',
    ],
    freeTier: '免费体验',
    targetRoles: ['内容创作者', '研究人员', '产品/运营', '小微企业主', '企业 IT'],
    useCases: ['文本对话', '生成图片', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: '移动云',
    enName: 'China Mobile Cloud',
    icon: '☁️',
    category: ['国内'],
    features: [
      '九天大模型',
      '运营商级基础设施',
      '数据安全保障',
      '边缘计算支持',
    ],
    freeTier: '试用额度',
    targetRoles: ['小微企业主', '企业 IT'],
    useCases: ['文本对话', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: '小米 MiMo',
    enName: 'Xiaomi MiMo',
    icon: '📱',
    category: ['国内', 'LLM'],
    features: [
      '小米自研大模型',
      '端云协同能力',
      'IoT 场景优化',
      '移动端适配',
    ],
    freeTier: 'token 套餐',
    targetRoles: ['个人开发者', '团队 Leader'],
    useCases: ['文本对话', '跑 Agent'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
  {
    name: 'OpenRouter',
    enName: 'Unified LLM Interface',
    icon: '🔌',
    category: ['国际', '免费额度高', 'LLM'],
    features: [
      '统一 API 接口',
      '支持多种模型',
      'Claude / GPT 可用',
      '按需付费',
    ],
    freeTier: '免费积分赠送',
    targetRoles: ['个人开发者', '团队 Leader'],
    useCases: ['写代码', '跑 Agent', '文本对话'],
    monthlyFee: 0,
    freeMonthlyTokens: 200_000,
    // 高级字段（Top 5）
    supportedIdes: ['Cursor', 'Claude Code', 'Cline', 'OpenClaw', 'VS Code', 'JetBrains'],
    recommendedModels: [
      'anthropic/claude-sonnet-4.5',
      'openai/gpt-4o',
      'google/gemini-2.0-flash',
    ],
    tokenUnitPrice: 0.005,
    pricingTiers: [
      { name: '免费', monthlyFee: 0, tokens: 200_000, unitPrice: 0 },
      { name: '按量', monthlyFee: 0, tokens: 0, unitPrice: 0.005 },
    ],
    fiveHourLimit: 0,
    firstMonthDeal: { price: 0, tokens: 200_000 },
    costEfficiency: 82,
    gotchas: [
      '不是中国直连，国内访问需自备代理',
      '免费积分 200K tokens（约 0.2 元）',
      '聚合平台，价格 = 上游模型价 + 服务费',
    ],
  },
  {
    name: 'Azure OpenAI',
    enName: 'Microsoft Azure',
    icon: '☁️',
    category: ['国际', 'LLM'],
    features: [
      'GPT-4 / GPT-4o',
      '企业级安全合规',
      '全球数据中心',
      'SLA 保障',
    ],
    freeTier: '免费试用 $200',
    targetRoles: ['内容创作者', '研究人员', '产品/运营', '小微企业主', '企业 IT'],
    useCases: ['写代码', '跑 Agent', '文本对话', '生成图片', '生成视频', '文档处理'],
    monthlyFee: 0,
    freeMonthlyTokens: 0,
  },
]

// ============================================================
// 链接合并（现有逻辑）
// ============================================================

// 把 JSON 锁定成 Record<string, string>，避免每次访问都要写 keyof 断言
const linkMap: Record<string, string> = linkMapJson

// 合并 link：以 name 为 key 从 JSON 中取链接，缺失时 dev 报警 + 兜底 '#'
export const providers: Provider[] = providersBase.map((p) => {
  const link = linkMap[p.name]
  if (import.meta.env.DEV && !link) {
    console.warn(`[providers] provider-links.json 缺少 "${p.name}" 的链接`)
  }
  return { ...p, link: link ?? '#' }
})
