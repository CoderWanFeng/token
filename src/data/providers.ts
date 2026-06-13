// 从 JSON 导入名称→链接映射（只拆了 name + link，方便运营人员单独修改链接）
import linkMapJson from './provider-links.json'

export interface Provider {
  name: string
  enName: string
  icon: string
  category: string[]
  features: string[]
  freeTier: string
  link: string   // 从 provider-links.json 自动合并，无需手动填写
}

// 把 JSON 锁定成 Record<string, string>，避免每次访问都要写 keyof 断言
const linkMap: Record<string, string> = linkMapJson

export const filterOptions = [
  { id: 'all', label: '全部' },
  { id: '国内', label: '国内厂商' },
  { id: '国际', label: '国际厂商' },
  { id: '免费额度高', label: '免费额度高' },
  { id: 'LLM', label: '大语言模型' },
]

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
  },
]

// 合并 link：以 name 为 key 从 JSON 中取链接，缺失时 dev 报警 + 兜底 '#'
export const providers: Provider[] = providersBase.map((p) => {
  const link = linkMap[p.name]
  if (import.meta.env.DEV && !link) {
    console.warn(`[providers] provider-links.json 缺少 "${p.name}" 的链接`)
  }
  return { ...p, link: link ?? '#' }
})
