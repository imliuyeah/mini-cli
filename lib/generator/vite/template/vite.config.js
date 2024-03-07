import { UserConfig, ConfigEnv, loadEnv } from "vite";
import path from "path";

const pathResolve = (pathStr) => {
  return path.resolve(__dirname, pathStr);
};

export default ({ command, mode }) => {
  const isBuild = command === "build";
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".scss",
        ".css"
      ],
      alias: {
        "@": pathResolve("./src"),
        "@type": pathResolve("./types")
      }
    },

    // css
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/index.scss";'
        },
        javascriptEnabled: true
      }
    },

    // server
    server: {
      hmr: { overlay: false },
      // 服务配置
      port: 3000,
      open: false,
      cors: false,
      host: "0.0.0.0", // IP配置，支持从IP启动
      proxy: {
        "/api/": {
          target: "",
          changeOrigin: true
        }
      }
    },
    build: {
      sourcemap: false,
      minify: "esbuild", // 构建时的压缩方式
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]" // 资源文件像 字体，图片等
        }
      }
    }
  };
};
