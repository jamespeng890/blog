// functions/index.ts
import { appleStyle } from './style';

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // 尝试从数据库获取最新的文章评论（这里暂时模拟获取文章列表，
  // 实际生产中通常需要一个 posts 表，或者我们在前端硬编码几个链接测试）
  // 为了演示，我们先手动显示一个欢迎页面和硬编码的测试文章链接
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Apple Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${appleStyle}
      </head>
      <body>
        <div class="container">
          <header style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 48px; margin-bottom: 10px;">Blog.</h1>
            <p style="color: #86868b; font-size: 20px;">Ideas, collected.</p>
          </header>

          <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 40px;">
            <a href="/blog-login"><button>Sign In</button></a>
            <a href="/blog-admin"><button style="background: rgba(0,0,0,0.05); color: #333;">Admin</button></a>
          </div>

          <div class="glass-card">
            <h3>Latest Posts</h3>
            <ul style="list-style: none; padding: 0;">
              
              <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05);">
                <a href="/post/hello-world" style="text-decoration: none; color: inherit; display: block;">
                  <h4 style="margin: 0 0 5px 0; font-size: 18px; color: var(--accent-blue);">Hello World</h4>
                  <p style="margin: 0; color: #666; font-size: 14px;">点击查看第一篇测试文章...</p>
                </a>
              </li>

              <li style="margin-bottom: 15px;">
                 <p style="color: #999; font-size: 14px; text-align: center;">More posts coming soon...</p>
              </li>
            </ul>
          </div>
          
          <footer style="text-align: center; color: #999; font-size: 12px; margin-top: 40px;">
            <p>Designed by Cloudflare & D1</p>
          </footer>
        </div>
      </body>
    </html>
  `;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};
