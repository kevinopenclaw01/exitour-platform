import type { Metadata } from "next";
import { Archivo, Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const body = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "variable",
});

const headline = Black_Han_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://exitour.co.kr"),
  title: "EXITour | 우리끼리 맞춤 패키지 · 내맘대로 단품 투어",
  description: "우리 그룹 전담 가이드와 만드는 맞춤 패키지, 필요한 서비스만 고르는 단품 투어. EXITour와 우리에게 맞는 여행을 준비하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${body.variable} ${headline.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
