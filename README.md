# 🍎 Cloudflare D1 Blog Engine

> 一个极简、高性能的半静态博客系统，运行在 Cloudflare Edge 上。

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![D1 Database](https://img.shields.io/badge/D1_SQL-F38020?style=flat-square&logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)

## 📖 项目介绍

这是一个探索 **Jamstack** 与 **边缘计算** 结合的实验性博客项目。它摒弃了传统的 CMS 繁重架构，采用 "Code as Content" 的理念。

核心逻辑是：**半静态 (Semi-Static)**。
- 博客文章以 `.md` 文件形式托管在 Git 仓库中。
- 访问时通过 Cloudflare Functions 实时获取并渲染为 HTML。
- 评论和用户系统由 D1 (SQLite) 数据库驱动。
- 整体 UI 采用 Apple 风格的毛玻璃 (Frosted Glass) 设计语言。

## ✨ 核心特性

- **Markdown 驱动**: 在 `blog-md/` 目录下丢入 `.md` 文件，即可自动发布。
- **边缘渲染**: 使用 Cloudflare Pages Functions (`functions/`) 进行 SSR (服务端渲染)。
- **混合鉴权**:
  - **管理员**: 基于环境变量 (Environment Variables) 的无数据库验证，极度安全。
  - **访客**: 基于 D1 数据库的注册/登录系统，用于发表评论。
- **极致设计**: 原生 CSS 实现的 Apple 风格 UI，支持移动端适配。

## 📂 目录结构

```text
/
├── blog-md/           # 📝 文章库：在这里提交 Markdown 文件即发布
├── functions/         # ⚡️ 后端逻辑：处理路由、渲染、API
│   ├── post/          # 文章动态路由渲染 ([slug].ts)
│   ├── blog-login.ts  # 登录逻辑
│   └── blog-admin.ts  # 管理员面板
├── schema.sql         # 🗄️ D1 数据库结构
└── public/            # 静态资源
