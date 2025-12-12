// functions/style.ts
export const appleStyle = `
<style>
  :root {
    --bg-color: #f5f5f7;
    --card-bg: rgba(255, 255, 255, 0.65);
    --text-primary: #1d1d1f;
    --accent-blue: #0071e3;
    --danger: #ff3b30;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    margin: 0;
    padding: 20px;
    line-height: 1.6;
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
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    border: 1px solid rgba(255,255,255,0.4);
    margin-bottom: 20px;
  }
  h1 { font-weight: 700; letter-spacing: -0.02em; }
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
    padding: 12px 24px;
    border-radius: 980px; /* Pill shape */
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.1s;
  }
  button:active { transform: scale(0.98); }
  .logout { background: transparent; color: var(--danger); border: 1px solid rgba(0,0,0,0.1); }
</style>
`;