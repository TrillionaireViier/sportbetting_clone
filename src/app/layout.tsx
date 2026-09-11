import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BetSlip from "@/components/BetSlip";
import { BetSlipProvider } from "@/context/BetSlipContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BetSport - Premium Sports Betting",
  description: "Live sports betting, top odds, and live matches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#0b0f19] text-[#f8fafc]`}>
        <BetSlipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-6 bg-[#0b0f19]">
                {children}
              </main>
              <BetSlip />
            </div>
          </div>
        </BetSlipProvider>
      </body>
    </html>
  );
}
