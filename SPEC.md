# Coding Plan 推广网站 - 设计规格

## 1. Concept & Vision

一个现代化的单页推广网站，聚合展示各大云服务商的 AI Coding/Token Plans。设计风格融合科技感与亲和力，让开发者能够快速对比各平台的免费额度和特色功能，找到最适合自己项目的方案。整体感觉像是一个精心策划的"开发者工具箱"导航页。

## 2. 技术栈

- **框架**: Next.js 16.1.6，静态导出模式（`output: 'export'`）
- **前端**: React 19.2.3 + TypeScript 5
- **UI 组件**: Radix UI + shadcn/ui 模式
- **样式**: Tailwind CSS 4 + tw-animate-css
- **图标**: Lucide React
- **工具库**: class-variance-authority, clsx, tailwind-merge

## 3. Design Language

### Color Palette
| 变量名 | 色值 | 用途 |
|--------|------|------|
| primary | `#6366F1` | 主色调 |
| primary-light | `#818CF8` | 浅主色 |
| secondary | `#8B5CF6` | 次要色 |
| accent | `#22D3EE` | 强调色 |
| background | `#0F172A` | 背景色 |
| surface | `#1E293B` | 卡片/表面色 |
| surface-light | `#334155` | 浅表面色 |
| text-primary | `#F8FAFC` | 主要文字 |
| text-secondary | `#94A3B8` | 次要文字 |
| success | `#10B981` | 成功/免费标签 |
| border | `#475569` | 边框色 |

### Typography
- **字体**: Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **标题**: font-weight: 700-800
- **正文**: font-weight: 400-500

## 4. Layout & Structure

### 页面结构
1. **Hero Section** - 标题、副标题、CTA按钮、统计数据
2. **Filter Section** - 固定顶部，筛选按钮
3. **Providers Grid** - 响应式卡片网格，展示各云服务商信息
4. **How to Choose** - 三步骤指南
5. **Footer** - 版权信息和链接

### 响应式断点
- Mobile: < 768px (单列)
- Tablet: 768px - 1023px (双列)
- Desktop: ≥ 1024px (三列)

## 5. Features & Interactions

### 核心功能
- **Provider Cards**: 展示每个云服务商的品牌、名称、免费额度、主要特点
- **Filter**: 快速筛选服务商（全部/国内厂商/国际厂商/免费额度高/大语言模型）
- **Direct Links**: 跳转到各平台的注册页面

### 交互效果
- Card hover: 上浮 + 边框变主色 + 顶部渐变条显示
- Filter buttons: 激活状态填充主色
- 平滑滚动到锚点
- 入场动画（fade-in + slide-in）

## 6. Component Inventory

| 组件 | 路径 | 说明 |
|------|------|------|
| Hero | `components/hero.tsx` | 首屏区域 |
| FilterSection | `components/filter-section.tsx` | 筛选栏 |
| ProviderCard | `components/provider-card.tsx` | 服务商卡片 |
| ProvidersSection | `components/providers-section.tsx` | 服务商区域容器 |
| HowToChoose | `components/how-to-choose.tsx` | 选择指南区域 |
| Footer | `components/footer.tsx` | 页脚 |
| Button | `components/ui/button.tsx` | 按钮组件 |

## 7. Data

服务商数据统一管理在 `src/data/providers.ts`：
- 12 个云服务商
- 支持 category 分类筛选
- 包含 name, enName, icon, features, freeTier, link

## 8. Project Structure

```
d:\code\token\
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局样式 + Tailwind
│   │   ├── layout.tsx        # 根布局
│   │   └── page.tsx          # 首页
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx    # Button 组件
│   │   ├── hero.tsx          # Hero 区域
│   │   ├── filter-section.tsx
│   │   ├── provider-card.tsx
│   │   ├── providers-section.tsx
│   │   ├── how-to-choose.tsx
│   │   └── footer.tsx
│   ├── data/
│   │   └── providers.ts      # 服务商数据
│   └── lib/
│       └── utils.ts          # 工具函数 (cn)
├── next.config.ts             # Next.js 配置（静态导出）
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```
