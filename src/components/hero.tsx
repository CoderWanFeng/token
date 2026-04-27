"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(ellipse_at_50%_50%,rgba(34,211,238,0.05),transparent_70%)]" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-4 h-4" />
          开发者工具箱
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <span className="gradient-text">找到最适合你的</span>
          <br />
          <span className="text-text-primary">AI 开发计划</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          聚合各大云服务商的 Coding Plan 与 Token Plan，助你轻松对比免费额度、功能特色和定价方案，降低开发成本，加速项目落地。
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button size="lg" asChild>
            <a href="#providers">
              浏览服务商
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#how-to-choose">如何选择</a>
          </Button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Link 
            href="/token-guide" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm"
          >
            <BookOpen className="w-4 h-4" />
            还不了解 Token？点击了解 Token 入门指南 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <StatCard value="12+" label="热门云服务商" />
          <StatCard value="100K+" label="免费 Token 额度" />
          <StatCard value="100%" label="免费体验" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-accent font-mono mb-2">{value}</div>
      <div className="text-text-secondary">{label}</div>
    </div>
  );
}
