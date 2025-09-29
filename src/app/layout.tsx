import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yasod Kavindu - Software Engineer",
  description: "Software Engineering undergraduate with hands-on experience in Java, Spring Boot, React, Flutter, and Firebase. Passionate about full-stack development and building impactful applications.",
  keywords: "Software Engineer, Full Stack Developer, Java, Spring Boot, React, Flutter, Firebase, Portfolio",
  authors: [{ name: "Yasod Kavindu" }],
  openGraph: {
    title: "Yasod Kavindu - Software Engineer",
    description: "Software Engineering undergraduate with hands-on experience in Java, Spring Boot, React, Flutter, and Firebase.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
