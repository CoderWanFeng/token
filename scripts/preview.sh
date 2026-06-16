#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 开始清理项目..."
echo ""

cd "$PROJECT_ROOT"

if [ -d "node_modules" ]; then
    echo "📦 删除 node_modules..."
    rm -rf node_modules
    echo "✅ 已删除 node_modules"
fi

if [ -d ".vite" ]; then
    echo "🗑️  删除 .vite 构建缓存..."
    rm -rf .vite
    echo "✅ 已删除 .vite"
fi

if [ -d "dist" ]; then
    echo "🗑️  删除 dist 目录..."
    rm -rf dist
    echo "✅ 已删除 dist"
fi

echo ""
echo "📥 开始安装依赖..."
npm install

echo ""
echo "✨ 启动开发服务器..."
echo "🌐 预览地址: http://localhost:5173"
echo ""

npm run dev
