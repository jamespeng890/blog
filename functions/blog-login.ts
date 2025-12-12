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

    return new Response("Invalid credentials", { status: 401 });
  }

  // 渲染登录页面
  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Login</title>${appleStyle}</head>
      <body>
        <div class="container">
          <div class="glass-card" style="max-width: 400px; margin: 100px auto;">
            <h2 style="text-align:center; margin-bottom: 30px;">Sign In</h2>
            <form method="POST">
              <input type="text" name="username" placeholder="Apple ID / Username" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" style="width:100%">Sign In</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  `;
  
  return new Response(html, { headers: { "Content-Type": "text/html" } });
};