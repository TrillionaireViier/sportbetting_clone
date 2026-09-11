"use client";

import React from "react";
import { Match } from "@/lib/mockData";
import { useBetSlip } from "@/context/BetSlipContext";
import { Clock, Tv } from "lucide-react";
import { motion } from "framer-motion";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { selectedBets, addBet } = useBetSlip();

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-[#151b2b] rounded-xl border border-[#1e2638] overflow-hidden hover:border-[#334155] transition-colors group"
    >
      {/* Match Header */}
      <div className="bg-[#0b0f19] px-4 py-3 border-b border-[#1e2638] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
            {match.sport}
          </span>
          {match.isLive ? (
            <span className="flex items-center gap-1.5 text-xs text-[#ff007f] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-pulse"></span>
              LIVE
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <Clock className="w-3.5 h-3.5" />
              {match.startTime}
            </span>
          )}
        </div>
        {match.isLive && (
          <div className="flex items-center gap-1 text-[#39ff14] text-xs">
            <Tv className="w-3.5 h-3.5" />
            <span className="font-semibold">{match.startTime}</span>
          </div>
        )}
      </div>

      {/* Teams & Score */}
      <div className="p-4 flex justify-between items-center">
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">{match.homeTeam}</span>
            {match.score && (
              <span className="text-[#39ff14] font-bold ml-4">
                {match.score.split("-")[0].trim()}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">{match.awayTeam}</span>
            {match.score && (
              <span className="text-[#39ff14] font-bold ml-4">
                {match.score.split("-")[1].trim()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Markets & Odds */}
      <div className="px-4 pb-4">
        {match.markets.map((market) => (
          <div key={market.id} className="mt-4 first:mt-0">
            <div className="text-xs text-[#64748b] mb-2 font-medium">{market.name}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {market.odds.map((odd) => {
                const isSelected = selectedBets.some((b) => b.oddsId === odd.id);
                return (
                  <button
                    key={odd.id}
                    onClick={() =>
                      addBet({
                        matchId: match.id,
                        matchName: `${match.homeTeam} vs ${match.awayTeam}`,
                        marketName: market.name,
                        oddsId: odd.id,
                        oddsName: odd.name,
                        oddsValue: odd.value,
                      })
                    }
                    className={`flex justify-between items-center p-2.5 rounded-lg border text-sm transition-all ${
                      isSelected
                        ? "bg-[rgba(57,255,20,0.1)] border-[#39ff14] text-[#39ff14]"
                        : "bg-[#0b0f19] border-[#1e2638] text-white hover:border-[#334155] hover:bg-[#1e2638]"
                    }`}
                  >
                    <span className={isSelected ? "text-white" : "text-[#94a3b8]"}>{odd.name}</span>
                    <span className="font-bold">{odd.value.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
