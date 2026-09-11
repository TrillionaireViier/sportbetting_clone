"use client";

import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { motion } from "framer-motion";

export default function AdminPage() {
  const { matches, updateMatchScore, toggleMatchLive, updateOdds } = useData();
  const [editingScore, setEditingScore] = useState<{ id: string; score: string } | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-[#151b2b] p-6 rounded-xl border border-[#1e2638] shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
          <span className="bg-[#ff007f] w-3 h-8 rounded-sm"></span>
          Admin Dashboard
        </h2>
        
        <div className="space-y-8">
          {matches.map((match) => (
            <div key={match.id} className="bg-[#0b0f19] p-4 rounded-lg border border-[#1e2638]">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#1e2638]">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {match.homeTeam} vs {match.awayTeam}
                  </h3>
                  <p className="text-sm text-[#64748b]">{match.sport}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleMatchLive(match.id)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      match.isLive
                        ? "bg-[#ff007f] text-white"
                        : "bg-[#1e2638] text-[#94a3b8] hover:text-white"
                    }`}
                  >
                    {match.isLive ? "LIVE" : "SET LIVE"}
                  </button>
                </div>
              </div>

              {match.isLive && (
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[#94a3b8] text-sm">Score:</span>
                  {editingScore?.id === match.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingScore.score}
                        onChange={(e) => setEditingScore({ ...editingScore, score: e.target.value })}
                        className="bg-[#151b2b] border border-[#39ff14] text-white px-2 py-1 rounded text-sm w-24 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          updateMatchScore(match.id, editingScore.score);
                          setEditingScore(null);
                        }}
                        className="bg-[#39ff14] text-[#0b0f19] px-2 py-1 rounded text-xs font-bold"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span className="text-white font-bold">{match.score || "0 - 0"}</span>
                      <button
                        onClick={() => setEditingScore({ id: match.id, score: match.score || "0 - 0" })}
                        className="text-[#64748b] hover:text-[#39ff14] text-xs underline"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-[#94a3b8] mb-3">Markets</h4>
                {match.markets.map((market) => (
                  <div key={market.id} className="mb-4">
                    <p className="text-xs text-[#64748b] mb-2">{market.name}</p>
                    <div className="flex gap-4">
                      {market.odds.map((odd) => (
                        <div key={odd.id} className="flex items-center gap-2 bg-[#151b2b] px-3 py-2 rounded border border-[#1e2638]">
                          <span className="text-white text-sm">{odd.name}:</span>
                          <input
                            type="number"
                            step="0.01"
                            value={odd.value}
                            onChange={(e) => updateOdds(match.id, market.id, odd.id, parseFloat(e.target.value) || 0)}
                            className="bg-[#0b0f19] border border-[#1e2638] text-[#39ff14] font-bold px-2 py-1 rounded text-sm w-20 focus:outline-none focus:border-[#39ff14]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
