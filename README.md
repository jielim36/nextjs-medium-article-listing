# Medium RSS Reader

一个极其轻量的Next.js项目，通过RSS获取Medium用户的最新文章。

## 功能特性

- 🚀 极其轻量，只依赖必要的包
- 📱 响应式设计，支持移动端
- 🔄 实时刷新功能
- 🌐 Vercel一键部署
- ⚙️ 环境变量配置

## 环境变量配置

在Vercel部署时，或在本地`.env.local`文件中设置以下环境变量：

```bash
MEDIUM_USERNAME=jielim36    # Medium用户名（不带@符号）
FEED_COUNT=5               # 获取文章数量
```

## 本地开发

1. 安装依赖：
```bash
npm install
```

2. 创建`.env.local`文件并配置环境变量：
```bash
MEDIUM_USERNAME=jielim36
FEED_COUNT=5
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

## Vercel部署

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 在Environment Variables中设置：
   - `MEDIUM_USERNAME`: Medium用户名（如：jielim36）
   - `FEED_COUNT`: 文章数量（如：5）
4. 点击Deploy

## 项目结构

```
.
├── app/
│   ├── api/rss/route.ts    # RSS API路由
│   ├── layout.tsx          # 根布局
│   └── page.tsx           # 主页面
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 技术栈

- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **RSS Parser** - RSS解析
- **Styled JSX** - CSS-in-JS

## RSS源

项目使用Medium的RSS feed格式：
`https://medium.com/feed/@{username}`

## 特性说明

- **垂直列表布局** - 文章以卡片形式垂直排列
- **环境变量控制** - 通过Vercel环境变量灵活配置用户名和文章数量
- **错误处理** - 完善的错误处理和加载状态
- **响应式设计** - 自适应桌面和移动设备