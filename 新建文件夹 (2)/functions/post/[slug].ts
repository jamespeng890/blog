import { marked } from 'marked';
import { appleStyle } from '../style';

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, params, env } = context;
  const slug = params.slug as string; // 获取 URL 中的文件名

  // 1. 获取 Markdown 内容 (通过 fetch 静态资源)
  // 假设你的域名是 example.com，Markdown 文件在 /blog-md/xxxx.md
  const url = new URL(request.url);
  const mdUrl = `${url.origin}/blog-md/${slug}.md`;
  
  const mdResponse = await fetch(mdUrl);
  
  if (!mdResponse.ok) {
    return new Response("Blog post not found", { status: 404 });
  }

  const markdownText = await mdResponse.text();
  const contentHtml = marked.parse(markdownText);

  // 2. 获取评论 (D1)
  const { results: comments } = await env.DB.prepare(
    "SELECT * FROM comments WHERE post_slug = ? ORDER BY created_at DESC"
  ).bind(slug).all();

  // 3. 渲染页面
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${slug}</title>
        ${appleStyle}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
      </head>
      <body>
        <div class="container">
          <nav style="margin-bottom: 20px;">
             <a href="/" style="text-decoration:none; color: var(--accent-blue); font-weight:500;">← Back</a>
          </nav>
          
          <article class="glass-card">
            ${contentHtml}
          </article>

          <div class="glass-card">
            <h3>Comments</h3>
            ${comments.map(c => `
                <div style="border-bottom:1px solid #eee; padding: 10px 0;">
                    <strong style="font-size: 0.9em; color: #666;">User #${c.user_id}</strong>
                    <p style="margin: 5px 0;">${c.content}</p>
                </div>
            `).join('')}
            
            <form style="margin-top: 20px;">
                <textarea placeholder="Add a comment..." rows="3"></textarea>
                <button type="button" disabled>Login to Comment</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  `;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
};