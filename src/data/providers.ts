export interface Provider {
  name: string
  enName: string
  icon: string
  category: string[]
  features: string[]
  freeTier: string
  link: string
}

export const providers: Provider[] = [
  {
    name: '阿里云百炼',
    enName: 'AI Model Studio',
    icon: '⚗️',
    category: ['国内', '免费额度高'],
    features: [
      '通义千问系列大模型',
      '丰富的 API 接口',
      '支持图片生成与分析',
      '企业级安全认证'
    ],
    freeTier: '免费试用额度',
    link: 'https://www.aliyun.com/benefit/scene/codingplan?scm=20140722.S_card@@%E6%B4%BB%E5%8A%A8@@4220167._.ID_card@@%E6%B4%BB%E5%8A%A8@@4220167-RL_codingplan-LOC_2024SPSearchCard-OR_ser-PAR1_2127e66a17744276040951204d0c48-V_4-RE_new13-P0_0-P1_0&source=5176.29345612&userCode=t6duaoe1'
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
      '完善的生态集成'
    ],
    freeTier: '免费体验包',
    link: 'https://curl.qcloud.com/Z9TkzRuj'
  },
  {
    name: '火山方舟',
    enName: 'Volcengine',
    icon: '🔥',
    category: ['国内', '免费额度高'],
    features: [
      '豆包大模型',
      '极速响应',
      '低成本推理',
      '丰富插件生态'
    ],
    freeTier: '50万 Tokens 免费',
    link: 'https://volcengine.com/L/wREW6vCIBBI'
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
      '高效推理引擎'
    ],
    freeTier: '免费试用',
    link: 'https://platform.minimaxi.com/subscribe/token-plan?code=8T7rWtR7CZ&source=link'
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
      '行业解决方案'
    ],
    freeTier: '免费体验额度',
    link: 'https://maas.xfyun.cn/packageSubscription?inviteCode=MAAS-D628AC34'
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
      '开源模型支持'
    ],
    freeTier: '100万 Tokens 免费',
    link: 'https://www.bigmodel.cn/glm-coding?ic=RGTKPCFP0D'
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
      '数据安全保障'
    ],
    freeTier: '试用额度',
    link: 'https://3.cn/2It-3fII'
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
      '友好的 API 设计'
    ],
    freeTier: '送 15元 API 额度',
    link: 'https://platform.moonshot.cn/'
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
      '开源模型可选'
    ],
    freeTier: '10元免费额度',
    link: 'https://platform.deepseek.com/'
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
      '图像识别集成'
    ],
    freeTier: '免费体验',
    link: 'https://cloud.baidu.com/campaign/ambassador-product/index.html?ambassadorId=ff638219f0f54a7a82e21d4aa7ad95ba#knowledge-model'
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
      '边缘计算支持'
    ],
    freeTier: '试用额度',
    link: 'https://ecloud.10086.cn/portal/act/codingplan'
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
      '移动端适配'
    ],
    freeTier: 'token 套餐',
    link: 'https://platform.xiaomimimo.com/#/token-plan'
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
      '按需付费'
    ],
    freeTier: '免费积分赠送',
    link: 'https://openrouter.ai/'
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
      'SLA 保障'
    ],
    freeTier: '免费试用 $200',
    link: 'https://azure.microsoft.com/zh-cn/products/ai-services/openai-service/'
  }
]

export const filterOptions = [
  { id: 'all', label: '全部' },
  { id: '国内', label: '国内厂商' },
  { id: '国际', label: '国际厂商' },
  { id: '免费额度高', label: '免费额度高' },
  { id: 'LLM', label: '大语言模型' },
]
