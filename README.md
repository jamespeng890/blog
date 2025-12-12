# 🍎 Cloudflare D1 Blog Engine

> **A Semi-Static, Edge-Computed Blog Architecture with Apple-Style UI.**
>
> **一个基于边缘计算、拥有 Apple 设计风格的半静态博客引擎。**

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Host-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com/)
[![D1 Database](https://img.shields.io/badge/Database-D1_SQL-F38020?style=for-the-badge&logo=sqlite)](https://developers.cloudflare.com/d1/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

## 📖 Introduction / 项目简介

**English:**
This project explores the fusion of **Jamstack** and **Edge Computing**. It abandons heavy CMS architectures in favor of a "Code as Content" philosophy.
- **Semi-Static:** Articles are stored as Markdown, rendered to HTML on the edge via Cloudflare Functions.
- **Dynamic Features:** Comments and User System powered by Cloudflare D1 (SQLite).
- **Aesthetics:** Native CSS implementation of the Apple "Frosted Glass" design language.

**中文:**
这是一个探索 **Jamstack** 与 **边缘计算** 结合的实验性博客项目。它摒弃了传统的 CMS 繁重架构，采用 "Code as Content" 的理念。
- **半静态架构**: 文章以 Markdown 存储，通过 Cloudflare Functions 在边缘实时渲染为 HTML。
- **动态能力**: 评论系统与用户账户由 Cloudflare D1 (SQLite) 数据库驱动。
- **极致美学**: 原生 CSS 实现的 Apple 风格“毛玻璃”设计语言。

---

## 🐣 Newcomer Edition / 新手版

> **For writers who want a beautiful, fast blog without dealing with complex servers.**
> **写给只想安静写字、拥有一个漂亮且极速博客的你。**

### ✨ Highlights / 核心亮点
- **极速体验**: 网站运行在全球 275+ 个数据中心，毫秒级打开。
- **极简发布**: 像写日记一样写博客，不需要登录复杂的后台。
- **精美设计**: 默认自带高端的 Apple 风格界面，支持暗黑模式（未来计划）。

### 📝 How to Publish / 如何发布文章

1.  **Create Content / 创建内容**:
    Navigate to the `public/blog-md/` folder and upload or create a new `.md` file (e.g., `my-story.md`).
    进入 `public/blog-md/` 文件夹，上传或新建一个 `.md` 文件（例如 `my-story.md`）。

2.  **Update Homepage / 更新首页**:
    Open `functions/index.ts` and add a link to your new post in the HTML section.
    打开 `functions/index.ts` 文件，在 HTML 代码中手动添加一行指向新文章的链接。
    *(Yes, we keep it manual to let you control the layout perfectly! / 是的，为了极致的布局控制，我们保持了手动更新！)*

3.  **Go Live / 上线**:
    Commit and push your changes to GitHub. Cloudflare will auto-deploy in seconds.
    提交并推送到 GitHub，Cloudflare 会在几秒钟内自动完成部署。

---

## 💻 Developer Edition / 程序员版

> **For geeks who love to tinker with Edge Computing and Serverless DBs.**
> **写给喜欢折腾边缘计算、Serverless 数据库的极客。**

### 🏗️ Architecture / 技术架构

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Cloudflare Pages Functions | Server-side rendering (SSR) at the edge. |
| **Database** | Cloudflare D1 (SQLite) | Stores users (`users`) and comments (`comments`). |
| **Content** | Markdown (`.md`) | Fetched dynamically from static assets. |
| **Styling** | Native CSS in JS | Encapsulated in `functions/style.ts` (No Tailwind/Bootstrap). |

### 📂 Directory Structure / 目录结构

```text
/
├── public/
│   └── blog-md/       # 📄 Content Source: Markdown files live here
├── functions/         # ⚡️ Serverless Functions (The Brain)
│   ├── _middleware.ts #    Request handling & Error catching
│   ├── index.ts       #    Homepage rendering (SSR)
│   ├── blog-login.ts  #    Auth logic (Cookie/Session)
│   ├── blog-admin.ts  #    Admin dashboard (Environment Variable Auth)
│   └── post/
│       └── [slug].ts  #    Dynamic Routing & MD Rendering
├── schema.sql         # 🗄️ Database Schema
└── wrangler.toml      # ⚙️ Cloudflare Configuration
