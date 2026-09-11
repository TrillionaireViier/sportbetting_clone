import React from "react";
import { Search, Bell, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 bg-[#151b2b] border-b border-[#1e2638] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-white">
          Bet<span className="text-[#39ff14]">Sport</span>
        </h1>
        <div className="relative hidden md:block ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            className="bg-[#0b0f19] border border-[#1e2638] text-sm rounded-full py-1.5 pl-9 pr-4 text-white focus:outline-none focus:border-[#39ff14] transition-colors w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/admin" className="text-xs font-bold text-[#ff007f] border border-[#ff007f] px-3 py-1 rounded-full hover:bg-[#ff007f] hover:text-white transition-colors">
          ADMIN
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[#94a3b8] text-sm">Balance:</span>
          <span className="text-[#39ff14] font-bold">€ 1,240.50</span>
        </div>
        <button className="text-[#94a3b8] hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff007f] rounded-full border border-[#151b2b]"></span>
        </button>
        <button className="bg-[#1e2638] hover:bg-[#334155] p-2 rounded-full transition-colors text-white">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
