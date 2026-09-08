# ArcGIS 加载天地图 2D/3D Demo 实现计划

## Goal
在现有 Vue3 + ArcGIS 项目中集成天地图作为底图，实现 2D 地图和 3D 场景两个 Demo 页面。

## Current Context / Assumptions
- 项目已使用 ArcGIS Core API ^5.0 + Vue 3 + Vite
- 天地图 Key: `e6d33e5510e72c75e414aeff0a92ab00`
- 天地图瓦片服务支持 WMTS 协议，可直接在 ArcGIS 中通过 `WebTileLayer` 加载
- 项目结构: `src/views/` 存放页面组件，`src/router/` 存放路由配置

## Technical Approach

### 天地图瓦片 URL 格式
```
矢量底图: https://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk={key}&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}
矢量注记: https://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk={key}&...
影像底图: https://t{0-7}.tianditu.gov.cn/img_c/wmts?tk={key}&...
影像注记: https://t{0-7}.tianditu.gov.cn/cia_c/wmts?tk={key}&...
地形底图: https://t{0-7}.tianditu.gov.cn/ter_c/wmts?tk={key}&...
地形注记: https://t{0-7}.tianditu.gov.cn/cta_c/wmts?tk={key}&...
```

### ArcGIS 集成方式
使用 `WebTileLayer` 加载天地图瓦片作为自定义底图。

## Step-by-Step Plan

### Step 1: 创建天地图工具模块
**文件**: `src/utils/tianditu.ts`

封装天地图瓦片 URL 生成和 WebTileLayer 创建逻辑：
- 导出 `createTiandituLayer(type, key)` 函数
- 支持类型: `vec` (矢量), `img` (影像), `ter` (地形)
- 返回配置好的 `WebTileLayer` 实例
- 注记图层单独创建，便于叠加显示

### Step 2: 创建 2D 天地图 Demo 页面
**文件**: `src/views/Tianditu2DView.vue`

- 使用 `MapView` + 天地图作为底图
- 添加图层切换控件（矢量/影像/地形）
- 添加缩放、旋转控件
- 默认中心点: 上海 `[121.4737, 31.2304]`

### Step 3: 创建 3D 天地图 Demo 页面
**文件**: `src/views/Tianditu3DView.vue`

- 使用 `SceneView` + 天地图作为底图
- 配置 `ground: "world-elevation"` 启用地形
- 添加 3D 导航控件
- 配置初始相机角度

### Step 4: 添加路由配置
**文件**: `src/router/index.ts`

新增路由:
- `/tianditu-2d` → Tianditu2DView
- `/tianditu-3d` → Tianditu3DView

### Step 5: 更新导航菜单
**文件**: `src/App.vue`

在导航栏添加天地图 Demo 入口链接。

## Files Likely to Change
| File | Action |
|------|--------|
| `src/utils/tianditu.ts` | 新建 - 天地图工具模块 |
| `src/views/Tianditu2DView.vue` | 新建 - 2D 地图页面 |
| `src/views/Tianditu3DView.vue` | 新建 - 3D 场景页面 |
| `src/router/index.ts` | 修改 - 添加路由 |
| `src/App.vue` | 修改 - 添加导航链接 |

## Tests / Validation
1. `npm run dev` 启动开发服务器
2. 访问 `/tianditu-2d` 验证 2D 地图加载正常
3. 访问 `/tianditu-3d` 验证 3D 场景加载正常
4. 测试图层切换功能（矢量/影像/地形）
5. `npm run build` 验证构建无错误

## Risks, Tradeoffs & Open Questions

### Risks
- 天地图瓦片服务可能存在 CORS 限制，需确认跨域支持
- 天地图 WMTS 服务的 TileMatrixSet 为 `c`（CGCS2000），需确保 ArcGIS 正确解析

### Tradeoffs
- 使用 `WebTileLayer` 而非直接加载天地图 JS API，保持 ArcGIS 统一体验
- 注记图层与底图分离，便于独立控制显隐

### Open Questions
- 天地图 Key 是否有调用频率限制？
- 是否需要添加天地图 API 的免责声明（天地图要求显示版权信息）？

## Implementation Notes

### WebTileLayer 配置示例
```typescript
import WebTileLayer from "@arcgis/core/layers/WebTileLayer.js";

const tiandituVec = new WebTileLayer({
  urlTemplate: "https://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=YOUR_KEY&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}",
  subDomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
  copyright: "天地图 GS(2023)336号"
});
```

### 3D SceneView 注意事项
- 天地图瓦片在 3D 场景中需要 `SceneView` 而非 `MapView`
- 需要配置 `ground` 属性启用高程
