"use client";

import React, { useState } from "react";
import { useBetSlip } from "@/context/BetSlipContext";
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";

export default function BetSlip() {
  const { selectedBets, removeBet, clearBets, totalOdds } = useBetSlip();
  const { placeBet, balance } = useData();
  const [stake, setStake] = useState<number | "">("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePlaceBet = () => {
    if (!stake || stake <= 0) {
      setError("Please enter a valid stake");
      return;
    }
    if (stake > balance) {
      setError("Insufficient balance");
      return;
    }

    const success = placeBet(stake, totalOdds, selectedBets);
    if (success) {
      setSuccess(true);
      setError("");
      setTimeout(() => {
        setSuccess(false);
        clearBets();
        setStake("");
      }, 2000);
    }
  };

  const potentialWin = typeof stake === "number" ? (stake * totalOdds).toFixed(2) : "0.00";

  return (
    <aside className="w-80 bg-[#151b2b] border-l border-[#1e2638] h-[calc(100vh-4rem)] flex flex-col sticky top-16 right-0 z-10 hidden xl:flex">
      <div className="p-4 border-b border-[#1e2638] flex justify-between items-center bg-[#0b0f19]">
        <h2 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
          Bet Slip
          <span className="bg-[#39ff14] text-[#0b0f19] text-xs px-2 py-0.5 rounded-full font-bold">
            {selectedBets.length}
          </span>
        </h2>
        {selectedBets.length > 0 && (
          <button onClick={clearBets} className="text-[#64748b] hover:text-[#ff007f] transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {selectedBets.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#64748b] mt-10"
          >
            <p className="text-sm">Your bet slip is empty.</p>
            <p className="text-xs mt-1">Please make a selection to place a bet.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {selectedBets.map((bet) => (
              <motion.div 
                key={bet.oddsId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-[#0b0f19] rounded-lg p-3 border border-[#1e2638] relative group"
              >
                <button
                  onClick={() => removeBet(bet.oddsId)}
                  className="absolute top-2 right-2 text-[#64748b] hover:text-[#ff007f] opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-[#94a3b8] font-semibold mb-1">{bet.marketName}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">{bet.oddsName}</span>
                  <span className="text-[#39ff14] font-bold">{bet.oddsValue.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#64748b] mt-2 truncate pr-4">{bet.matchName}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {selectedBets.length > 0 && (
        <div className="p-4 bg-[#0b0f19] border-t border-[#1e2638]">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-[#94a3b8]">Total Odds:</span>
            <span className="text-white font-bold">{totalOdds.toFixed(2)}</span>
          </div>
          
          <div className="mb-4">
            <label className="text-xs text-[#94a3b8] block mb-1">Stake Amount (€)</label>
            <input
              type="number"
              min="0"
              placeholder="0.00"
              value={stake}
              onChange={(e) => setStake(e.target.value ? Number(e.target.value) : "")}
              className="w-full bg-[#151b2b] border border-[#1e2638] rounded-md py-2 px-3 text-white focus:outline-none focus:border-[#39ff14] transition-colors"
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <span className="text-[#94a3b8] font-bold">Potential Win:</span>
            <span className="text-[#39ff14] font-bold text-lg">€ {potentialWin}</span>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#ff007f] text-xs font-bold mb-3 text-center">
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#39ff14] text-xs font-bold mb-3 text-center">
                Bet Placed Successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handlePlaceBet}
            disabled={success}
            className="w-full bg-[#39ff14] hover:bg-[#32e011] text-[#0b0f19] font-bold py-3 rounded-lg uppercase tracking-wide transition-colors transform hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50"
          >
            {success ? "Success!" : "Place Bet"}
          </button>
        </div>
      )}
    </aside>
  );
}
