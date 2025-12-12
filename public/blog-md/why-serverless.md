# ☁️ 为什么我选择 Serverless 构建这个博客

> "The best infrastructure is the one you don't have to manage."

在构建这个博客之初，我面临着无数的选择：WordPress、Ghost、Next.js... 但我想要一些**更纯粹、更极客**的东西。

## 🏗️ 架构解析

这个博客采用了目前最前沿的 **Jamstack (Semi-Static)** 架构，运行在 Cloudflare 的边缘网络 (Edge Network) 上。

### 核心组件

1.  **Cloudflare Pages**: 托管静态资源 (HTML/CSS/Images)。
2.  **Cloudflare D1**: 基于 SQLite 的边缘数据库，用于存储用户评论和账户信息。
3.  **Cloudflare Functions**: 运行 TypeScript 代码，处理动态请求和 Markdown 渲染。

## ⚡️ 速度与激情的碰撞

传统的动态网站每次访问都需要去源服务器 (Origin Server) 查询数据库，而这个架构完全不同：

- **0ms 冷启动**: 静态资源直接从全球 275+ 个数据中心分发。
- **边缘计算**: 渲染逻辑在离用户最近的节点执行，延迟极低。
- **极致省钱**: 对于个人博客来说，几乎是零成本。

## 🛠️ 代码即内容 (Code as Content)

我最喜欢的一点是，发表文章不需要登录复杂的后台 CMS。

```typescript
// 只需要 Git Push
git add my-new-post.md
git commit -m "Publishing a new thought"
git push
