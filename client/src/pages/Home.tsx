import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Brain, Target } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

/**
 * 首页：展示游戏主题、关卡介绍、以及开始按钮
 * 设计理念：现代教育科技风格，采用非对称布局
 * 色彩：深蓝 (#1e40af) + 青绿 (#0891b2)
 * 排版：Poppins 用于标题，Inter 用于正文
 */

interface LevelCard {
  id: string;
  title: string;
  description: string;
  algorithm: string;
  complexity: string;
  icon: React.ReactNode;
  color: string;
  image: string;
}

const levels: LevelCard[] = [
  {
    id: "sorting",
    title: "图书馆整理",
    description: "使用快速排序算法将乱序的书籍编号按从小到大排列。体验分治思想的魅力。",
    algorithm: "快速排序 (Quick Sort)",
    complexity: "O(n log n)",
    icon: <Zap className="w-8 h-8" />,
    color: "from-blue-500 to-blue-600",
    image: "/images/sorting-icon.png",
  },
  {
    id: "pathfinding",
    title: "晨读不迟到",
    description: "在校园地图中找到从校门到教室的最短路径。掌握广度优先搜索的精妙之处。",
    algorithm: "广度优先搜索 (BFS)",
    complexity: "O(V + E)",
    icon: <Target className="w-8 h-8" />,
    color: "from-cyan-500 to-cyan-600",
    image: "/images/pathfinding-icon.png",
  },
  {
    id: "greedy",
    title: "社团活动达人",
    description: "在有限的时间内参加尽可能多的社团活动。学习贪心算法的优雅解法。",
    algorithm: "贪心算法 (Greedy)",
    complexity: "O(n log n)",
    icon: <Brain className="w-8 h-8" />,
    color: "from-orange-500 to-orange-600",
    image: "/images/greedy-icon.png",
  },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">校园智行者</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#levels" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
              关卡
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">
              关于
            </a>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文本内容 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  🚀 计算思维教育平台
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  用算法<br />
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    探索校园
                  </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  在趣味益智游戏中掌握快速排序、图搜索、贪心算法等核心编程概念。通过实际场景理解计算思维，成为算法高手。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/game">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto">
                    开始挑战 <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 w-full sm:w-auto">
                  了解更多
                </Button>
              </div>

              {/* 统计信息 */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">3</div>
                  <p className="text-sm text-slate-600">个精彩关卡</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600">∞</div>
                  <p className="text-sm text-slate-600">无限挑战</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">100%</div>
                  <p className="text-sm text-slate-600">免费体验</p>
                </div>
              </div>
            </motion.div>

            {/* 右侧英雄图像 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-full"
            >
              <img
                src="/images/hero-bg.png"
                alt="校园智行者"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 关卡介绍区域 */}
      <section id="levels" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-slate-900 mb-4">三大关卡挑战</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              每个关卡都融合了真实的校园场景与经典的计算机算法，让你在游戏中学习，在学习中成长。
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {levels.map((level, idx) => (
              <motion.div key={level.id} variants={itemVariants}>
                <Link href={`/game/${level.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-slate-200 overflow-hidden">
                    {/* 卡片头部背景 */}
                    <div className={`h-32 bg-gradient-to-br ${level.color} relative overflow-hidden`}>
                      <img
                        src={level.image}
                        alt={level.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl text-slate-900">{level.title}</CardTitle>
                        <div className="text-blue-600 group-hover:scale-110 transition-transform">
                          {level.icon}
                        </div>
                      </div>
                      <CardDescription className="text-sm text-slate-600">
                        {level.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">算法：</span>
                          <span className="font-mono text-blue-600 font-semibold">{level.algorithm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">时间复杂度：</span>
                          <span className="font-mono text-cyan-600 font-semibold">{level.complexity}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        进入关卡 →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 特性介绍 */}
      <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-slate-900 mb-4">为什么选择校园智行者？</h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "可视化演示",
                description: "实时动画展示算法执行过程，让复杂逻辑一目了然",
                icon: "🎬",
              },
              {
                title: "游戏化体验",
                description: "关卡解锁、得分反馈、成就系统，学习变得有趣",
                icon: "🎮",
              },
              {
                title: "学术严谨",
                description: "涵盖复杂度分析、数据结构等核心计算思维概念",
                icon: "📚",
              },
              {
                title: "完全免费",
                description: "无广告、无付费内容，为所有学生提供平等的学习机会",
                icon: "🎁",
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white">
              准备好成为算法高手了吗？
            </h3>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              现在就开始挑战，在校园场景中体验计算思维的力量。
            </p>
            <Link href="/game">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                立即开始 <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">校园智行者</h4>
              <p className="text-sm">
                一个为中学生设计的计算思维教育平台，通过游戏化学习掌握核心编程算法。
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#levels" className="hover:text-white transition">关卡介绍</a></li>
                <li><a href="#about" className="hover:text-white transition">关于我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">学习资源</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">算法指南</a></li>
                <li><a href="#" className="hover:text-white transition">代码示例</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">联系我们</h4>
              <p className="text-sm">
                有问题或建议？<br />
                欢迎反馈！
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 校园智行者。保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
