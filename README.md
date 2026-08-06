# 数智运维 (wl-szyw)

基于 ArcGIS 的智能运维平台，使用 Vue 3 + TypeScript + Vite 构建。

## 技术栈

| 技术 | 版本 | 用途 |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.5 | 前端框架，使用 Composition API + `<script setup>` |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0 | 类型安全的 JavaScript 超集 |
| [Vite](https://vite.dev/) | ^8.2 | 构建工具，快速 HMR 开发体验 |
| [Element Plus](https://element-plus.org/) | ^2.14 | UI 组件库，提供按钮、表单、表格等组件 |
| [Pinia](https://pinia.vuejs.org/) | ^4.0 | 状态管理，Vue 官方推荐的 Vuex 替代方案 |
| [Vue Router](https://router.vuejs.org/) | ^4.6 | 路由管理，SPA 页面导航 |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | 原子化 CSS 框架，快速构建自定义界面 |
| [ArcGIS Core API](https://developers.arcgis.com/javascript/) | ^5.0 | GIS 地图引擎，提供地图渲染、空间分析能力 |
| [Playwright](https://playwright.dev/) | ^1.62 | E2E 测试框架，跨浏览器自动化测试 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 运行 E2E 测试
npm test
```

## 项目结构

```
wl-szyw/
├── e2e/                          # E2E 测试文件
│   ├── home.spec.ts
│   └── navigation.spec.ts
├── src/
│   ├── assets/                   # 静态资源
│   ├── router/                   # Vue Router 路由配置
│   │   └── index.ts
│   ├── stores/                   # Pinia 状态管理
│   │   └── counter.ts
│   ├── views/                    # 页面组件
│   │   ├── HomeView.vue
│   │   ├── MapView.vue
│   │   └── AboutView.vue
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 入口文件
│   └── style.css                 # 全局样式 (Tailwind)
├── .env                          # 环境变量 (ArcGIS API Key)
├── index.html                    # HTML 入口
├── playwright.config.ts          # Playwright 配置
├── postcss.config.js             # PostCSS 配置
├── tailwind.config.js            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
└── vite.config.ts                # Vite 配置
```

## 环境变量

在 `.env` 文件中配置 ArcGIS API Key：

```
VITE_ARCGIS_API_KEY=your_api_key_here
```

获取方式：[ArcGIS Location Platform](https://developers.arcgis.com/)

## 页面说明

- **首页** (`/`) - 展示 Pinia 状态管理示例和 Element Plus 组件
- **地图** (`/map`) - ArcGIS Core API 地图展示，默认中心点上海
- **关于** (`/about`) - 技术栈说明

## 相关文档

- [Vue 3 文档](https://vuejs.org/guide/introduction.html)
- [Vite 文档](https://vite.dev/guide/)
- [Element Plus 文档](https://element-plus.org/zh-CN/guide/quickstart.html)
- [Pinia 文档](https://pinia.vuejs.org/zh/getting-started.html)
- [Vue Router 文档](https://router.vuejs.org/zh/guide/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs/installation)
- [ArcGIS JS API 文档](https://developers.arcgis.com/javascript/latest/)
- [Playwright 文档](https://playwright.dev/docs/intro)
