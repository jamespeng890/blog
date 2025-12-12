// functions/index.ts
import { appleStyle } from './style';

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <title>My Blog</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${appleStyle}
      </head>
      <body>
        <div class="container">
          <header style="text-align: center; margin-bottom: 60px; margin-top: 40px;">
            <h1 style="font-size: 48px; margin-bottom: 10px; letter-spacing: -1px;">Blog.</h1>
            <p style="color: #86868b; font-size: 20px;">Ideas, collected.</p>
          </header>

          <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 50px;">
            <a href="/blog-login"><button>登录账户</button></a>
            <a href="/blog-admin"><button style="background: rgba(0,0,0,0.05); color: #333; border: 1px solid rgba(0,0,0,0.1);">管理后台</button></a>
          </div>

          <div class="glass-card">
            <h3 style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 15px; margin-bottom: 20px;">最新文章</h3>
            <ul style="list-style: none; padding: 0;">
              
              <li style="margin-bottom: 20px;">
                <a href="/post/why-serverless" style="text-decoration: none; color: inherit; display: block; padding: 15px; border-radius: 12px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.03)'" onmouseout="this.style.background='transparent'">
                  <h4 style="margin: 0 0 8px 0; font-size: 20px; color: var(--accent-blue);">☁️ 为什么我选择 Serverless 构建这个博客</h4>
                  <p style="margin: 0; color: #666; font-size: 14px;">"The best infrastructure is the one you don't have to manage." 探索 Jamstack 架构的奥秘...</p>
                </a>
              </li>

              <li style="margin-bottom: 20px;">
                <a href="/post/digital-minimalism" style="text-decoration: none; color: inherit; display: block; padding: 15px; border-radius: 12px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.03)'" onmouseout="this.style.background='transparent'">
                  <h4 style="margin: 0 0 8px 0; font-size: 20px; color: var(--accent-blue);">🍎 数字极简主义：重塑你的数字生活</h4>
                  <p style="margin: 0; color: #666; font-size: 14px;">在信息过载的时代，如何通过“断舍离”找回内心的宁静？...</p>
                </a>
              </li>
              
              <li style="margin-top: 30px; border-top: 1px solid #eee; pt: 20px;">
                 <p style="font-size: 12px; color: #999; margin-bottom: 10px;">More Stories</p>
                 <a href="/post/hello-world" style="font-size: 14px; margin-right: 15px;">代码之禅</a>
                 <a href="/post/second-post" style="font-size: 14px;">深度工作</a>
              </li>

            </ul>
          </div>
          
          <footer style="text-align: center; color: #999; font-size: 12px; margin-top: 60px; padding-bottom: 40px;">
            <p>Designed with Cloudflare Pages & D1</p>
          </footer>
        </div>
      </body>
    </html>
  `;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
