import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// src/analytics.ts 或直接在 main.tsx 中添加
const initAnalytics = () => {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    // 只有当环境变量存在且不为空时才加载分析脚本
    if (endpoint && websiteId) {
        const script = document.createElement('script');
        script.src = `${endpoint}/umami`;
        script.setAttribute('data-website-id', websiteId);
        script.defer = true;
        script.async = true;

        document.head.appendChild(script);
    } else {
        console.log('Analytics not configured');
    }
};

// 在应用初始化时调用
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
