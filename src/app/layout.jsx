"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Play",
//   description: "Watch Video and Tweet on video",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Toaster position="top-right"/>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
