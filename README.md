# Coding Plan 对比平台

聚合 **16+ 主流 AI 云服务商**的 Coding Plan / Token Plan，对比免费额度、Token 定价与模型能力，帮助开发者快速找到最划算的方案。

在线访问：https://coderwanfeng.github.io/token/

---

## 功能特性

| 页面 | 功能 |
|------|------|
| **智能导购** | 3 步问答：身份 + 用途 + 月用量，自动推荐最划算的 Plan |
| **实时比价看板** | 筛选 + 排序 16+ 平台的档位，支持按身份/场景过滤 |
| **Token 计算器** | 输入日均代码行数 / Agent 任务次数，估算月 Token 消耗与月费 |
| **评测与避坑** | 各平台真实使用反馈、计费陷阱、限流风险等 |
| **Token 入门指南** | 新手指南：Token 是什么、计费原理、主流模型价格参考、FAQ |

---

## 技术栈

- **框架**：React 18 + TypeScript + Vite 6
- **样式**：Tailwind CSS 3
- **路由**：React Router DOM v6（路由级懒加载）
- **图标**：Lucide React
- **SEO**：React Helmet Async
- **构建**：Vite（esbuild 压缩 + Rollup 分包）

---

## 项目结构

```
src/
├── components/          # 通用 UI 组件
│   ├── Footer.tsx       # 页脚 + GitHub 编辑入口
│   ├── Hero.tsx         # 首页英雄区
│   ├── HowToChoose.tsx   # 三步选型指南
│   ├── ProvidersSection.tsx  # 服务商列表 + 分类筛选
│   ├── ProviderCard.tsx  # 单个服务商卡片
│   ├── Button.tsx       # 按钮组件
│   ├── ErrorBoundary.tsx # React 错误边界
│   └── NotFound.tsx     # 404 页面
│   └── ui/              # 原子化 UI 组件
├── pages/               # 路由页面
│   ├── Home/            # 首页
│   │   └── SmartGuide.tsx   # 智能导购
│   ├── TokenGuide/      # Token 入门指南
│   │   ├── BillingSteps.tsx # 计费原理
│   │   ├── BenefitsGrid.tsx # 权益说明
│   │   ├── PricingTable.tsx  # 价格参考表
│   │   └── Faq.tsx      # 常见问题
│   ├── Compare.tsx      # 实时比价看板
│   ├── Calculator.tsx   # Token 消耗计算器
│   └── Reviews.tsx      # 评测与避坑
├── data/
│   ├── providers.ts     # 服务商数据 + 类型定义
│   └── provider-links.json  # 推广链接（可独立更新）
├── lib/
│   ├── recommend.ts     # 推荐引擎 + 算账器（纯函数，可 SSR）
│   └── utils.ts         # 工具函数（cn 合并类名）
├── hooks/               # 自定义 React Hooks
│   └── useScrollThreshold.ts  # 滚动阈值检测
├── types/               # 类型定义统一入口
│   └── index.ts         # barrel export
├── App.tsx              # 路由配置 + GitHub Octocat
├── main.tsx             # 入口文件
└── index.css            # 全局样式 + Tailwind 指令
```

---

## 环境要求

- Node.js ≥ 18
- npm ≥ 9

---

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

---

## 数据维护

服务商数据集中在两个文件：

- **`src/data/providers.ts`** — 名称、分类、功能特性、定价档位等结构化数据
- **`src/data/provider-links.json`** — 推广链接（运营可独立修改，不影响其他数据）

---

## 部署

项目使用 Vite 构建，部署到 GitHub Pages（子路径 `/token/`）。

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. **Fork** 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交改动：`git commit -m 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 发起 Pull Request

---

## 许可证

[MIT License](./LICENSE)
