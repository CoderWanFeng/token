"use client";

import { Search, BarChart3, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    title: "评估需求",
    description: "确定你的项目规模、API 调用频率和具体使用场景。考虑是个人项目还是企业级应用。",
    icon: Search,
  },
  {
    number: 2,
    title: "比较方案",
    description: "对比不同服务商的免费额度、功能限制和技术特点。关注模型能力、响应速度和稳定性。",
    icon: BarChart3,
  },
  {
    number: 3,
    title: "开始使用",
    description: "注册并获取 API Key，快速集成到你的项目中。多数平台提供详细的文档和 SDK 支持。",
    icon: Rocket,
  },
];

export function HowToChoose() {
  return (
    <section id="how-to-choose" className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-14 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">如何选择合适的 Coding Plan</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            遵循这三个简单步骤，找到最适合你项目的方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "relative text-center p-10",
                "bg-surface border border-border rounded-2xl",
                "animate-in fade-in slide-in-from-bottom-4 duration-500",
                "hover:border-primary/50 transition-colors duration-300"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/25">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
