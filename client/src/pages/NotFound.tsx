import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-slate-900">404</h1>
          <h2 className="text-2xl font-bold text-slate-700">页面未找到</h2>
          <p className="text-slate-600">
            抱歉，您访问的页面不存在。让我们回到校园智行者的主页吧！
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            返回首页
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
