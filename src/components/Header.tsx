"use client";

import React, { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { AnimatePresence, motion } from "framer-motion";
import ProfileModal from "@/components/ProfileModal";
import DepositModal from "@/components/DepositModal";

export default function Header() {
  const { notifications, clearNotifications, balance } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <header className="h-16 bg-[#151b2b] border-b border-[#1e2638] flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Bet<span className="text-[#39ff14]">Sport</span>
          </h1>
        </Link>
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
          <div className="flex items-center gap-2 bg-[#1e2638] px-3 py-1.5 rounded-lg border border-[#334155]">
            <span className="text-[#94a3b8] text-sm">Balance:</span>
            <span className="text-[#39ff14] font-bold">€ {balance.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => setShowDeposit(true)}
            className="bg-[#39ff14] hover:bg-[#32e011] text-[#0b0f19] font-bold px-3 py-1.5 rounded-lg text-sm transition-colors uppercase tracking-wider"
          >
            Deposit
          </button>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[#94a3b8] hover:text-white transition-colors relative block"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#ff007f] text-[8px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-72 bg-[#151b2b] border border-[#1e2638] rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-3 border-b border-[#1e2638] flex justify-between items-center bg-[#0b0f19]">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  {notifications.length > 0 && (
                    <button onClick={clearNotifications} className="text-xs text-[#64748b] hover:text-[#ff007f]">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-[#64748b] text-sm">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 border-b border-[#1e2638] last:border-0 hover:bg-[#1e2638] transition-colors">
                        <p className="text-xs text-white mb-1">{n.message}</p>
                        <p className="text-[10px] text-[#64748b]">{n.time}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button 
          onClick={() => setShowProfile(true)}
          className="bg-[#1e2638] hover:bg-[#334155] p-2 rounded-full transition-colors text-white"
        >
          <User className="w-5 h-5" />
        </button>
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
    </header>
  );
}
