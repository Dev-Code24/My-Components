import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";

const fira_sans = Fira_Sans({
  variable: "--font-fira-sans",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Components",
  description: "A Components library by Rajeev Lochan Muduli ( Dev Code24 )",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira_sans.className}`}>{children}</body>
    </html>
  );
}
