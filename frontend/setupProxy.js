import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://37.230.196.234",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
}

