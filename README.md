# 🍎 Cloudflare D1 Blog Engine

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![D1 Database](https://img.shields.io/badge/Database-D1_SQL-yellow?logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**[中文]** 一个基于 **Cloudflare Pages + D1 (SQLite)** 构建的半静态博客引擎。采用 "Code as Content" 理念，Markdown 驱动内容，边缘节点实时渲染 HTML，并配备了 Apple 风格的毛玻璃 (Frosted Glass) UI 设计。

**[English]** A semi-static blog engine built on **Cloudflare Pages + D1 (SQLite)**. Embracing the "Code as Content" philosophy, it features Markdown-driven publishing, edge-side runtime rendering, and an Apple-inspired frosted glass UI design.

---

## 🎯 选择你的模式 / Choose Your Mode

| 🚀 **老手版 (For Veterans)** | 🌱 **新手版 (For Newcomers)** |
| :--- | :--- |
| 适合熟悉 CLI、Wrangler 和 SQL 的开发者。<br>关注架构原理、本地开发和自定义部署。 | 适合专注内容创作的作者。<br>关注如何写文章、如何发布以及基本的后台管理。 |
| [点击跳转 / Jump to Section](#-老手版-veteran-mode) | [点击跳转 / Jump to Section](#-新手版-newcomer-mode) |

---

## 🚀 老手版 (Veteran Mode)

### 🛠 架构原理 (Architecture)

这是一个 **Jamstack (Semi-Static)** 架构。它没有构建时的 HTML 生成步骤 (No Build Step for HTML)，所有页面在 **Runtime (Edge)** 生成。

1.  **静态资源**: Markdown 文件托管在 `public/blog-md/`。
2.  **边缘渲染**: `functions/post/[slug].ts` 拦截请求 -> `fetch` 获取对应 Markdown -> 解析为 HTML。
3.  **数据存储**: 评论系统和用户鉴权存储在 Cloudflare D1 (SQLite)。
4.  **混合鉴权**: 管理员通过环境变量验证，普通用户通过 DB 验证。

### ⚡️ 快速部署 (Quick Start)

**Prerequisites:** Node.js, Wrangler CLI.

1.  **Clone & Install**
    ```bash
    git clone [https://github.com/your-repo/blog.git](https://github.com/your-repo/blog.git)
    cd blog
    npm install
    ```

2.  **Initialize D1 Database**
    ```bash
    # Create DB
    npx wrangler d1 create blog-db

    # Execute Schema (Local)
    npx wrangler d1 execute blog-db --local --file=./schema.sql
    ```

3.  **Configure `wrangler.toml`**
    Ensure `database_id` matches your created D1 ID.
    ```toml
    [[d1_databases]]
    binding = "DB"
    database_name = "blog-db"
    database_id = "YOUR-REAL-DB-UUID"
    ```

4.  **Local Development**
    ```bash
    # Run with local D1 simulation
    npm run dev
    # Or: npx wrangler pages dev . --d1 DB=blog-db
    ```

### 📦 Production Deployment

1.  **Push to GitHub**.
2.  **Cloudflare Dashboard Setup**:
    * **Build command**: `npm install`
    * **Build output directory**: `public`
    * **Environment Variables**: Set `ADMIN_USER` and `ADMIN_PASS`.
3.  **Bind D1**: Go to Pages Settings -> Functions -> D1 Database Bindings -> Bind `DB` to your `blog-db`.

---

## 🌱 新手版 (Newcomer Mode)

### 📝 如何写博客 (How to Write)

你不需要登录任何后台来写文章，你的代码库就是你的 CMS。
**You don't need a CMS. Your repository is your CMS.**

1.  **新建文件**: 在项目目录 `public/blog-md/` 下创建一个新的 `.md` 文件（例如 `my-story.md`）。
2.  **编写内容**: 使用标准 Markdown 语法写作。
3.  **发布**: 将文件提交到 GitHub。
    ```bash
    git add public/blog-md/my-story.md
    git commit -m "New post: My Story"
    git push
    ```
4.  **访问**: 文章将自动发布在 `https://你的域名/post/my-story`。
5.  **更新首页**: 记得修改 `functions/index.ts`，手动添加新文章的链接（目前版本需要手动添加）。

### 🔐 管理员后台 (Admin Dashboard)

* **访问地址**: `/blog-admin`
* **功能**: 删除违规评论、查看注册用户。
* **登录**: 使用你在 Cloudflare 环境变量中设置的 `ADMIN_USER` 和 `ADMIN_PASS`。

### 🎨 评论功能 (Comments)

* 普通访客可以注册账号并在文章下方发表评论。
* 数据安全存储在 Cloudflare D1 数据库中。

---

## 📂 目录结构 (Directory Structure)

```text
/
├── functions/             # ⚡️ Serverless Functions (Backend Logic)
│   ├── index.ts           # 🏠 Homepage Rendering
│   ├── blog-login.ts      # 🔐 Auth & Login Logic
│   ├── blog-admin.ts      # 🛡️ Admin Dashboard
│   ├── style.ts           # 🎨 Shared Apple-Style CSS
│   └── post/
│       └── [slug].ts      # 📄 Article Renderer (Markdown -> HTML)
├── public/                # 🌍 Static Assets (Build Output)
│   └── blog-md/           # 📝 Your Markdown Posts live here!
├── wrangler.toml          # ⚙️ Cloudflare Configuration
└── package.json           # 📦 Dependencies
