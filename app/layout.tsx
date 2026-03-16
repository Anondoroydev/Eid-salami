import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ঈদ মোবারক | Eid Mubarak",
  description:
    "ঈদের শুভেচ্ছা জানান প্রিয়জনদের - বিকাশ, নগদ, রকেট দিয়ে ঈদি পাঠান",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${geistMono.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
