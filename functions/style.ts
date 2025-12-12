// functions/style.ts
export const appleStyle = `
<style>
  :root {
    --bg-color: #f5f5f7;
    --card-bg: rgba(255, 255, 255, 0.72); /* 稍微增加不透明度 */
    --text-primary: #1d1d1f;
    --text-secondary: #86868b;
    --accent-blue: #0071e3;
    --danger: #ff3b30;
  }
  body {
    /* 增加了 PingFang SC (苹果中文) 和 Microsoft YaHei (Win中文) */
    font-family: "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    margin: 0;
    padding: 20px;
    line-height: 1.8; /* 增加行高，中文阅读更舒服 */
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  .container {
    width: 100%;
    max-width: 720px;
  }
  .glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 18px;
    padding: 40px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.04);
    border: 1px solid rgba(255,255,255,0.6);
    margin-bottom: 24px;
  }
  h1, h2, h3, h4 { font-weight: 700; letter-spacing: -0.01em; margin-top: 1.5em; margin-bottom: 0.8em; }
  h1 { font-size: 32px; }
  p { margin-bottom: 1.2em; text-align: justify; }
  
  /* 代码块样式优化 */
  pre {
    background: #f0f0f5;
    padding: 15px;
    border-radius: 12px;
    overflow-x: auto;
    font-family: "SF Mono", Consolas, monospace;
    font-size: 14px;
  }
  blockquote {
    border-left: 4px solid var(--accent-blue);
    margin: 0;
    padding-left: 15px;
    color: var(--text-secondary);
    background: rgba(0,113,227,0.05);
    padding: 10px 15px;
    border-radius: 8px;
  }
  
  /* 按钮和输入框 */
  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #d2d2d7;
    background: rgba(255,255,255,0.8);
    font-size: 16px;
    margin-bottom: 16px;
    box-sizing: border-box;
    outline: none;
    transition: all 0.2s;
  }
  input:focus, textarea:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px rgba(0,113,227,0.1); }
  button {
    background: var(--accent-blue);
    color: white;
    border: none;
    padding: 10px 22px;
    border-radius: 980px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.1s;
  }
  button:active { transform: scale(0.98); }
  .logout { background: transparent; color: var(--danger); border: 1px solid rgba(255, 59, 48, 0.2); }
  a { color: var(--accent-blue); text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
`;
