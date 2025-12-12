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
            <a href="/blog-login"><button>Sign In</button></a>
            <a href="/blog-admin"><button style="background: rgba(0,0,0,0.05); color: #333; border: 1px solid rgba(0,0,0,0.1);">Dashboard</button></a>
          </div>

          <div class="glass-card">
            <h3 style="border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 15px; margin-bottom: 20px;">Latest Posts</h3>
            <ul style="list-style: none; padding: 0;">
              
              <li style="margin-bottom: 20px;">
                <a href="/post/hello-world" style="text-decoration: none; color: inherit; display: block; padding: 15px; border-radius: 12px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.03)'" onmouseout="this.style.background='transparent'">
                  <h4 style="margin: 0 0 8px 0; font-size: 20px; color: var(--accent-blue);">🧘‍♂️ 代码之禅：重构你的思维方式</h4>
                  <p style="margin: 0; color: #666; font-size: 14px;">"Code is like humor. When you have to explain it, it’s bad." ...</p>
                </a>
              </li>

              <li style="margin-bottom: 20px;">
                <a href="/post/second-post" style="text-decoration: none; color: inherit; display: block; padding: 15px; border-radius: 12px; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.03)'" onmouseout="this.style.background='transparent'">
                  <h4 style="margin: 0 0 8px 0; font-size: 20px; color: var(--accent-blue);">⚡ 深度工作：在碎片化时代重夺专注力</h4>
                  <p style="margin: 0; color: #666; font-size: 14px;">我们正处在“分心流行病”中，如何开启上帝模式？...</p>
                </a>
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

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};
