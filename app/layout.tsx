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
  title: "EXITour | 프리미엄 맞춤 여행 상담",
  description: "휴양, 가족여행, 프리미엄 단독 자연여행을 위한 EXITour. 호텔, 차량, 현지 투어를 연결해 여행 조건에 맞는 일정을 상담합니다.",
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
