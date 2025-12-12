import { parse } from 'cookie';
import { appleStyle } from './style';

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cookie = parse(request.headers.get("Cookie") || "");

  // 简单的权限验证
  if (cookie.auth_token !== 'admin_session') {
     return new Response("Unauthorized", { status: 302, headers: { Location: "/blog-login" } });
  }

  // 获取所有评论和用户数据
  const { results: comments } = await env.DB.prepare("SELECT * FROM comments ORDER BY created_at DESC").all();
  const { results: users } = await env.DB.prepare("SELECT * FROM users").all();

  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Admin Dashboard</title>${appleStyle}</head>
      <body>
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h1>Dashboard</h1>
            <a href="/logout"><button class="logout">Log Out</button></a>
          </div>

          <div class="glass-card">
            <h3>Manage Comments (${comments.length})</h3>
            <table style="width:100%; border-collapse: collapse;">
                <thead><tr style="text-align:left;"><th>Post</th><th>Content</th><th>Action</th></tr></thead>
                <tbody>
                    ${comments.map(c => `
                        <tr style="border-top:1px solid #eee;">
                            <td style="padding:10px;">${c.post_slug}</td>
                            <td style="padding:10px;">${c.content}</td>
                            <td><button style="background:var(--danger); padding: 4px 12px; font-size:12px;">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
          </div>

          <div class="glass-card">
            <h3>Registered Users (${users.length})</h3>
            </div>
        </div>
      </body>
    </html>
  `;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};