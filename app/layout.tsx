import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Layout/sidebar/page";
import UseAuth from "./auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <div className="flex h-screen">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5">{children}</div>
        </div>
      <UseAuth />
      </body>
    </html>
  );
}