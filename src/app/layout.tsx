import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coding Plan 对比 - 各大云服务商 AI 开发计划",
  description: "聚合各大云服务商的 Coding Plan 与 Token Plan，助你轻松对比免费额度、功能特色和定价方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
