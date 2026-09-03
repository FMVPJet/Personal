# Boyang.hu 照片网格设计参考

源自 boyang.hu 复刻项目（2026-09-01），L3 源码化完成。这份参考**仅含机制与参数**，不含任何第三方资产或个人信息。

---

## 一、Hover 动画时序（GSAP → framer-motion 转写）

从 `readable/BaseLayout/014-portfolio-item-hover.js` 字节级提取的精确参数：

### 进场（mouseenter）

```javascript
// GSAP 原始参数
T.killTweensOf([...titles, ...categories])
T.set(titles,     { y: 50,  opacity: 0 })
T.set(categories, { y: 30,  opacity: 0 })
T.to(title,       { duration: .2, opacity: 1, y: 0, delay: .15, ease: "power2.out" })
T.to(category,    { duration: .2, opacity: 1, y: 0, delay: .25, ease: "power2.out" })
```

**framer-motion variants 等价**：

```typescript
const itemVariants = {
  initial: {
    title: { y: 50, opacity: 0 },
    category: { y: 30, opacity: 0 }
  },
  hover: {
    title: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.2, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }  // power2.out
    },
    category: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.2, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }
}
```

### 退场（mouseleave）

```javascript
// GSAP 原始
T.to(title,    { duration: .2, opacity: 0, y: -50, ease: "power2.in" })
T.to(category, { duration: .2, opacity: 0, y: -30, delay: .05, ease: "power2.in" })
T.set(title,    { y: 50, opacity: 0, delay: .2 })
T.set(category, { y: 30, opacity: 0, delay: .25 })
```

**framer-motion**：

```typescript
exit: {
  title: { 
    y: -50, 
    opacity: 0, 
    transition: { duration: 0.2, ease: [0.55, 0.055, 0.675, 0.19] }  // power2.in
  },
  category: { 
    y: -30, 
    opacity: 0, 
    transition: { duration: 0.2, delay: 0.05, ease: [0.55, 0.055, 0.675, 0.19] }
  }
}
```

**关键观察**：
- 标题与分类的 y 差：50 vs 30（视觉上标题移动距离更大）
- 进场延迟差：.15 vs .25（分类晚 100ms 出现，层次感）
- 退场无需 `set` 的第二阶段 —— framer-motion 自动回到 initial

---

## 二、网格契约

### HTML 结构（必须字段）

```html
<div class="item [.wide] [.split-title] <category-class>">
  <a class="item-wrap">                      ← 无 href = 不触发导航，保留 hover
    <div class="item-content">               ← 相框挂载点（加 border/padding/shadow）
      <div class="item-image" 
           style="background-image:url(...)" 
           role="img" 
           aria-label="..." />               ← 封面，inline style
      <div class="item-caption">
        <h2 class="item-title">...</h2>     ← hover 时浮现
        <div class="item-title-hover">...</div>  ← hover 时替换标题
        <h4 class="item-cat">...</h4>       ← 分类标签，hover 时浮现
      </div>
    </div>
  </a>
</div>
```

### 布局参数（源站实测）

| 属性 | 值 | 说明 |
|---|---|---|
| 列数 | 2 | 桌面视口（≥ 768px） |
| `.wide` | 占两列 | 位置：第 1 / 5 / 8 项（8 项循环） |
| 无 `.wide` | 占一列 | — |
| 分类循环 | 3 类 | category-a → b → c → a → b → c → a → b |
| gap | 未测量 | 需从 CSS 提取 |

### React 组件接口（建议）

```typescript
interface PhotoGridItem {
  id: string
  imageUrl: string
  title: string           // 支持 \n 换行
  hoverText: string       // 如 "View Photo"
  category: string        // 对应 .category-* class
  wide?: boolean          // 是否占两格
}

interface PhotoGridProps {
  items: PhotoGridItem[]
  categories?: string[]   // 筛选器分类，undefined = 不显示筛选器
}
```

---

## 三、筛选器逻辑

`readable/BaseLayout/016-portfolio-filters.js` 的工作机制：

```javascript
// 点击 data-filter="<selector>" 时
document.querySelectorAll("#portfolio > .item").forEach(item => {
  if (selector === "*" || item.matches(selector)) {
    // 显示：移除 .hidden，播放入场动画
  } else {
    // 隐藏：加 .hidden，播放退场动画
  }
})
```

**React 实现（状态驱动）**：

```typescript
const [activeFilter, setActiveFilter] = useState<string>("*")
const filteredItems = items.filter(item => 
  activeFilter === "*" || item.category === activeFilter
)

// 用 AnimatePresence 包 filteredItems.map(...)
```

---

## 四、相框样式方向（待你定）

三个可挂载在 `.item-content` 上的方案：

### A. 白边卡纸（美术馆装裱）

```css
.item-content {
  background: white;
  padding: 20px;           /* 白边宽度 */
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### B. 深色细框

```css
.item-content {
  border: 2px solid #374151;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### C. 宝丽来式（改布局）

下方留宽白边，`.item-caption` 从绝对定位改为 static，在 `.item-image` 下方。

⚠ 需改 hover 逻辑：标题不再浮在封面上，而是始终在下方可见，hover 时只改透明度。

---

## 五、命名证据（如何反查）

30 个部件全部按代码自己的字面证据命名：

| 部件 | 证据类型 | 示例 |
|---|---|---|
| 003-scroll-to-top-control | DOM 选择器 | `.scrolltotop` / `#page-action-holder-right` |
| 014-portfolio-item-hover | DOM 选择器 | `.item-title-hover` / `.item-cat` |
| 016-portfolio-filters | DOM 选择器 | `#filters [data-filter]` / `#portfolio > .item` |
| 001-lifecycle-event-names | 字面量 | `"astro:before-preparation"` 等 4 个 |
| 000-vite-dep-map-and-gsap-head | 库指纹 | `__vite__mapDeps` / `3.15.0` |

**在 `readable/` 里搜你需要的机制**：

```bash
cd reference/boyang-hu/readable
grep -r 'querySelector\|addEventListener\|GSAP\|framer' .
```

---

## 六、依赖字体（可自托管）

源站用 **Poppins**（Google Fonts，OFL 1.1 许可证，可自托管）：

- 8 个 woff2 文件（latin 字符集，400/500/600/700 + normal/italic）
- 总体积 ~100KB

**Next.js 引入（推荐）**：

```typescript
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})
```

---

## 七、不需要的部件（可忽略）

| 部件 | 原因 |
|---|---|
| 009-photoswipe-lightbox | 你说不需要点击，所以灯箱不用 |
| 010-slider-build / 011-carousel-build | 你要静态网格，不需要轮播 |
| 012/013-justified-* | justified gallery 布局，与固定网格无关 |
| 008-menu-overlay | 274 行菜单遮罩层，个人站可能已有自己的导航 |
| 017 的磁性光标部分 | 除非你想要跟随鼠标的自定义光标 |

**你会用到的核心**：

- 014-portfolio-item-hover（上面的时序参数）
- 016-portfolio-filters（如果保留筛选器）
- 网格 HTML 契约（`grid.html`）

---

## 八、字节等价性证明

`readable/` 里的 30 个部件按序拼接，**逐字节等于**源站产物（`mirror/_astro/BaseLayout…DLKZFUrW.js`）。

这意味着上面的时序参数不是"看起来差不多"，而是**精确到小数点第二位的源站行为**。

验证过程记录在 `boyang-hu-rebuild/REBUILD_PLAN.md` §7 M7 日志：实测改 1 字节（`300` → `301`），门精确命名该部件，这是"能证死"的判别力。

---

**下一步**：告诉我相框方向（A/B/C）+ 筛选器留不留 + 这个网格放哪（独立路由 `/photos` 还是首页区块），我给你写对应的 React 组件 + Tailwind 样式 + framer-motion variants。
