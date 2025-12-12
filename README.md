# 🍎 Cloudflare D1 Blog (Apple Style)

> 一个运行在 Cloudflare Edge 边缘网络上的半静态博客引擎。
> 融合了极简主义设计、Markdown 写作体验与 Serverless 极致性能。

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![D1 Database](https://img.shields.io/badge/Database-D1_SQLite-F38020?logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 📖 项目简介

这是一个探索 **Jamstack** 与 **边缘计算** 结合的实验性博客系统。它摒弃了传统 CMS 的繁重架构，拥抱 "Code as Content" 的理念。

你的文章以 Markdown 文件存储，通过 Git 版本控制管理。访客访问时，Cloudflare Functions 会在边缘节点实时抓取内容、读取 D1 数据库中的评论，并渲染成带有 Apple 设计美学（磨砂玻璃、大留白、系统级字体）的 HTML 页面。

## ✨ 核心特性

- **🎨 极致设计**: 原生 CSS 实现的 Apple 风格 UI (Frosted Glass)，完美适配移动端与暗色模式基础。
- **⚡️ 边缘渲染**: 使用 Cloudflare Pages Functions 进行 SSR，全球 CDN 加速，毫秒级响应。
- **📝 Markdown 驱动**: 文章即文件。支持代码高亮 (`highlight.js`) 和标准 Markdown 语法。
- **🔐 混合鉴权系统**:
  - **管理员**: 基于环境变量 (Environment Variables) 的无状态验证，极度安全。
  - **访客**: 基于 D1 数据库 (SQLite) 的用户注册/登录系统，用于发表评论。
- **💬 互动评论**: 评论数据存储于 Cloudflare D1，支持实时读取与管理。

## 📂 项目结构

```text
/
├── functions/             # ⚡️ 后端核心逻辑 (SSR & API)
│   ├── blog-login.ts      # 登录与鉴权处理
│   ├── blog-admin.ts      # 管理员后台 (评论管理)
│   ├── index.ts           # 首页渲染逻辑
│   ├── style.ts           # 全局 CSS 样式 (Apple Style)
│   └── post/
│       └── [slug].ts      # 文章动态路由与渲染引擎
├── public/                # 📦 静态资源发布目录 (构建输出目录)
│   └── blog-md/           # 📝 文章存储库 (Markdown 文件放这里)
├── schema.sql             # 🗄️ D1 数据库初始化 SQL
└── wrangler.toml          # Cloudflare 配置文件
