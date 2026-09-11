"use client";

import React from "react";
import MatchCard from "@/components/MatchCard";
import { useData } from "@/context/DataContext";
import { useState } from "react";
import DepositModal from "@/components/DepositModal";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { matches } = useData();
  const [showDeposit, setShowDeposit] = useState(false);
  const liveMatches = matches.filter((m) => m.isLive);
  const upcomingMatches = matches.filter((m) => !m.isLive);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Premium Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#1e2638] via-[#151b2b] to-[#0b0f19] border border-[#334155] rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-lg mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Seamless betting with <span className="text-[#39ff14]">instant updates</span> and premium features.
          </h2>
          <p className="text-[#94a3b8] text-sm">Experience the thrill of live sports with instant deposits and dynamic odds.</p>
        </div>
        <button 
          onClick={() => setShowDeposit(true)}
          className="relative z-10 bg-[#39ff14] hover:bg-[#32e011] text-[#0b0f19] font-bold px-8 py-4 rounded-xl uppercase tracking-widest transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(57,255,20,0.4)] whitespace-nowrap"
        >
          Deposit Now
        </button>
      </motion.section>

      {/* Live Matches Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-[#ff007f] w-5 h-5 animate-pulse" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">Live Right Now</h3>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {liveMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </motion.div>
      </section>

      {/* Upcoming Matches Section */}
      <section>
        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Upcoming Matches</h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
        >
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </motion.div>
      </section>

      <DepositModal isOpen={showDeposit} onClose={() => setShowDeposit(false)} />
    </div>
  );
}
