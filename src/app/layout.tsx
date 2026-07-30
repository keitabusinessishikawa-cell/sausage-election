import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mplusRounded = M_PLUS_Rounded_1c({
  variable: "--font-mplus-rounded",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ソーセージ総選挙 | いちのせきミート",
  description:
    "ビアフェス会場限定！お気に入りのソーセージに投票しよう。いちのせきミート ソーセージ総選挙。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff3de",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${inter.variable} ${mplusRounded.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
