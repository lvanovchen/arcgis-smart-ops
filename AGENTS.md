# AGENTS.md

## 项目概述
数智运维 (wl-szyw) - 基于 ArcGIS 的智能运维平台

## 技术栈
- **前端框架**: Vue 3 + Composition API + `<script setup>`
- **构建工具**: Vite ^8.2
- **类型安全**: TypeScript ~6.0
- **UI 组件**: Element Plus ^2.14
- **状态管理**: Pinia ^4.0
- **CSS 框架**: Tailwind CSS ^3.4
- **地图引擎**: ArcGIS Core API ^5.0
- **测试框架**: Playwright ^1.62

## 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本 (vue-tsc -b && vite build)
npm run preview      # 预览构建结果
npm test             # 运行 E2E 测试
npm run test:ui      # Playwright UI 模式
```

## 项目结构
- `src/views/` - 页面组件 (HomeView, MapView, AboutView)
- `src/router/` - 路由配置
- `src/stores/` - Pinia 状态管理
- `e2e/` - Playwright E2E 测试
- `.env` - 环境变量 (VITE_ARCGIS_API_KEY)

## 关键约定
- **Map 初始化**: ArcGIS MapView 在 `onMounted` 中创建，在 `onUnmounted` 中调用 `view?.destroy()` 释放资源
- **坐标系**: 默认中心点上海 `[121.4737, 31.2304]`
- **依赖优化**: Vite 配置中已 include `@arcgis/core`
- **构建目标**: `esnext`

## 测试注意事项
- E2E 测试使用 Playwright，配置在 `playwright.config.ts`
- 测试文件位于 `e2e/` 目录

## 相关文档
- [ArcGIS JS API 文档](https://developers.arcgis.com/javascript/latest/)
- [Vue 3 文档](https://vuejs.org/guide/introduction.html)
