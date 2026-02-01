import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

/**
 * 游戏页面：展示算法演示、交互控制、以及答题区域
 * 设计理念：现代教育科技风格
 * 布局：上方 60% 为算法演示区，下方 40% 为交互与题目区
 */

type GameLevel = "sorting" | "pathfinding" | "greedy";

interface GamePageProps {
  params: {
    level?: GameLevel;
  };
}

export default function Game({ params }: GamePageProps) {
  const level = params?.level || "sorting";
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  // 模拟排序演示数据
  const [sortingData, setSortingData] = useState([5, 2, 9, 1, 5, 6]);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);

  // 排序算法演示
  useEffect(() => {
    if (!isRunning || level !== "sorting") return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 20) {
          setIsRunning(false);
          return prev;
        }
        // 模拟排序步骤
        setHighlightIndices([prev % sortingData.length, (prev + 1) % sortingData.length]);
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, level, sortingData]);

  const handleSubmitAnswer = () => {
    const correctAnswers: Record<GameLevel, string> = {
      sorting: "B",
      pathfinding: "B",
      greedy: "C",
    };

    if (answer === correctAnswers[level]) {
      setFeedback("correct");
      setScore((prev) => prev + 10);
    } else {
      setFeedback("incorrect");
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setAnswer("");
    setFeedback(null);
    setHighlightIndices([]);
    setSortingData([5, 2, 9, 1, 5, 6]);
  };

  const renderSortingDemo = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">当前数组状态</h4>
        <div className="flex justify-center gap-3 flex-wrap">
          {sortingData.map((num, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: highlightIndices.includes(idx) ? 1.2 : 1,
                backgroundColor: highlightIndices.includes(idx)
                  ? "#0891b2"
                  : "#1e40af",
              }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shadow-lg"
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-4">算法说明</h4>
        <div className="bg-white rounded-lg p-4 border border-slate-200 font-mono text-sm text-slate-700 overflow-x-auto">
          <pre>{`def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[0]
  left = [x for x in arr[1:] if x <= pivot]
  right = [x for x in arr[1:] if x > pivot]
  return quick_sort(left) + [pivot] + quick_sort(right)`}</pre>
        </div>
      </div>
    </div>
  );

  const renderPathfindingDemo = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-8 border border-cyan-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">校园地图</h4>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, idx) => {
            const row = Math.floor(idx / 6);
            const col = idx % 6;
            const isStart = row === 0 && col === 0;
            const isEnd = row === 5 && col === 5;
            const isObstacle = (row === 1 && col === 1) || (row === 3 && col === 3);
            const isPath =
              (row === 0 && col <= 2) ||
              (col === 2 && row <= 3) ||
              (row === 3 && col >= 2);

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isPath ? 1.05 : 1,
                  backgroundColor: isStart
                    ? "#16a34a"
                    : isEnd
                      ? "#16a34a"
                      : isObstacle
                        ? "#374151"
                        : isPath
                          ? "#0891b2"
                          : "#e5e7eb",
                }}
                className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center text-xs font-bold"
              >
                {isStart && "S"}
                {isEnd && "E"}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGreedyDemo = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">活动时间表</h4>
        <div className="space-y-3">
          {[
            { name: "机器人社", start: 14, end: 15, selected: true },
            { name: "文学社", start: 14, end: 16, selected: false },
            { name: "足球队", start: 15, end: 17, selected: true },
            { name: "编程社", start: 16, end: 18, selected: true },
            { name: "艺术团", start: 17, end: 19, selected: false },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              animate={{
                opacity: activity.selected ? 1 : 0.5,
                scale: activity.selected ? 1 : 0.95,
              }}
              className={`p-4 rounded-lg border-2 ${
                activity.selected
                  ? "bg-green-100 border-green-500"
                  : "bg-slate-100 border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{activity.name}</span>
                <span className="text-sm text-slate-600">
                  {activity.start}:00 - {activity.end}:00
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const questions: Record<GameLevel, { question: string; options: string[] }> = {
    sorting: {
      question: "快速排序在平均情况下的时间复杂度是多少？",
      options: ["A. O(n)", "B. O(n log n)", "C. O(n²)"],
    },
    pathfinding: {
      question: "BFS 算法通常使用哪种数据结构来实现？",
      options: ["A. 栈 (Stack)", "B. 队列 (Queue)", "C. 树 (Tree)"],
    },
    greedy: {
      question: "在区间调度问题中，贪心策略是按什么排序？",
      options: ["A. 开始时间", "B. 持续时间", "C. 结束时间"],
    },
  };

  const currentQuestion = questions[level];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Button>
          </Link>
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">
              {level === "sorting"
                ? "图书馆整理"
                : level === "pathfinding"
                  ? "晨读不迟到"
                  : "社团活动达人"}
            </h2>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-blue-600">得分: {score}</div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：算法演示区 (占 60%) */}
          <div className="lg:col-span-2">
            <Card className="h-full border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-200">
                <CardTitle className="text-xl">算法演示</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {level === "sorting" && renderSortingDemo()}
                {level === "pathfinding" && renderPathfindingDemo()}
                {level === "greedy" && renderGreedyDemo()}

                {/* 控制按钮 */}
                <div className="flex gap-4 mt-8 justify-center">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        暂停
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        开始演示
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：题目与反馈区 (占 40%) */}
          <div className="lg:col-span-1">
            <Card className="h-full border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-slate-200">
                <CardTitle className="text-lg">思考题</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="font-semibold text-slate-900 mb-4">
                    {currentQuestion.question}
                  </p>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setAnswer(option[0])}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          answer === option[0]
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span className="font-semibold text-slate-900">
                          {option}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 反馈区域 */}
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      feedback === "correct"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        feedback === "correct"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {feedback === "correct"
                        ? "✓ 正确！加 10 分"
                        : "✗ 错误，请重试"}
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!answer}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  提交答案
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
