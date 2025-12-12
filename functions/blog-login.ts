import { parse, serialize } from 'cookie';
import { appleStyle } from './style';

interface Env {
  DB: D1Database;
  ADMIN_USER: string;
  ADMIN_PASS: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method === "POST") {
    const formData = await request.formData();
    const user = formData.get("username") as string;
    const pass = formData.get("password") as string;

    // 1. 检查管理员 (环境变量)
    if (user === env.ADMIN_USER && pass === env.ADMIN_PASS) {
      const cookie = serialize('auth_token', 'admin_session', { httpOnly: true, path: '/' });
      return new Response("Redirecting...", { status: 302, headers: { Location: "/blog-admin", "Set-Cookie": cookie } });
    }

    // 2. 检查普通用户 (D1数据库)
    const dbUser = await env.DB.prepare("SELECT * FROM users WHERE username = ? AND password = ?").bind(user, pass).first();
    
    if (dbUser) {
        // 简化的 session 逻辑，生产环境请用 JWT 或 Session ID
        const cookie = serialize('auth_token', `user_${dbUser.id}`, { httpOnly: true, path: '/' });
        return new Response("Login Success", { status: 302, headers: { Location: "/", "Set-Cookie": cookie } });
    }

    // 登录失败提示 (中文)
    return new Response("账号或密码错误 (Invalid credentials)", { status: 401, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  // 渲染登录页面 (中文)
  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <title>用户登录</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${appleStyle}
      </head>
      <body>
        <div class="container">
          <div class="glass-card" style="max-width: 360px; margin: 80px auto;">
            <h2 style="text-align:center; margin-bottom: 30px;">登录</h2>
            <form method="POST">
              <input type="text" name="username" placeholder="用户名 / Apple ID" required />
              <input type="password" name="password" placeholder="密码" required />
              <button type="submit" style="width:100%; margin-top: 10px;">登录</button>
            </form>
            <p style="text-align: center; font-size: 13px; color: #888; margin-top: 20px;">
              管理员请直接使用环境变量账号登录
            </p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="/" style="font-size: 14px;">← 返回首页</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
  
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
