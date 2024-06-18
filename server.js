const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 8080;

// 代理配置
app.use('/api', createProxyMiddleware({
    target: 'https://api.aag.moe',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // 移除路径中的 `/api`
    },
}));

app.use(express.static('public')); // 假设你的前端代码在 `public` 文件夹下

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
