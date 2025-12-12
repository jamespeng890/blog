import { marked } from 'marked';
import { appleStyle } from '../style';

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, params, env } = context;
  const slug = params.slug as string;

  const url = new URL(request.url);
  const mdUrl = `${url.origin}/blog-md/${slug}.md`;
  
  const mdResponse = await fetch(mdUrl);
  
  if (!mdResponse.ok) {
    // 汉化错误提示
    return new Response("文章未找到 (Blog post not found)", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  const markdownText = await mdResponse.text();
  const contentHtml = marked.parse(markdownText);

  const { results: comments } = await env.DB.prepare(
    "SELECT * FROM comments WHERE post_slug = ? ORDER BY created_at DESC"
  ).bind(slug).all();

  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN"> <head>
        <title>${slug}</title>
        <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1">
        ${appleStyle}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
      </head>
      <body>
        <div class="container">
          <nav style="margin-bottom: 20px;">
             <a href="/" style="font-weight:500;">← 返回首页</a>
          </nav>
          
          <article class="glass-card">
            ${contentHtml}
          </article>

          <div class="glass-card">
            <h3>评论 (${comments.length})</h3>
            ${comments.length === 0 ? '<p style="color:#999;">暂无评论，来抢沙发吧~</p>' : ''}
            
            ${comments.map(c => `
                <div style="border-bottom:1px solid #eee; padding: 15px 0;">
                    <div style="font-size: 0.85em; color: #86868b; margin-bottom: 4px;">用户 #${c.user_id} 说：</div>
                    <div style="color: #1d1d1f;">${c.content}</div>
                </div>
            `).join('')}
            
            <form style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">发表评论（需登录）</p>
                <textarea placeholder="写下你的想法..." rows="3"></textarea>
                <button type="button" disabled style="background:#ccc; cursor: not-allowed;">请先登录</button>
            </form>
          </div>
        </div>
      </body>
    </html>
  `;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
