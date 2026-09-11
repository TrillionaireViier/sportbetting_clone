"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bitcoin, User, History, Wallet, Receipt } from "lucide-react";
import { useData } from "@/context/DataContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { balance, depositFunds, betHistory } = useData();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      depositFunds(amount);
      setDepositAmount("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#151b2b] border border-[#1e2638] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#64748b] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="p-6 border-b border-[#1e2638] flex items-center gap-4">
                <div className="bg-[#1e2638] p-3 rounded-full">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">VIP User</h3>
                  <p className="text-[#64748b] text-sm">user@betsport.com</p>
                </div>
              </div>

              {/* Balance & Stats */}
              <div className="p-6 grid grid-cols-2 gap-4 bg-[#0b0f19]">
                <div className="bg-[#151b2b] p-4 rounded-xl border border-[#1e2638]">
                  <div className="flex items-center gap-2 text-[#94a3b8] mb-1">
                    <Wallet className="w-4 h-4" />
                    <span className="text-xs font-semibold">Total Balance</span>
                  </div>
                  <p className="text-xl font-bold text-[#39ff14]">€ {balance.toFixed(2)}</p>
                </div>
                <div className="bg-[#151b2b] p-4 rounded-xl border border-[#1e2638]">
                  <div className="flex items-center gap-2 text-[#94a3b8] mb-1">
                    <History className="w-4 h-4" />
                    <span className="text-xs font-semibold">Total Bets</span>
                  </div>
                  <p className="text-xl font-bold text-white">{betHistory.length}</p>
                </div>
              </div>

              {/* Crypto Deposit Section */}
              <div className="p-6 border-t border-[#1e2638]">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Bitcoin className="w-5 h-5 text-[#f7931a]" />
                  Crypto Deposit
                </h4>
                <form onSubmit={handleDeposit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#94a3b8] mb-1">Amount to Deposit (USDT/EUR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]">€</span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0b0f19] border border-[#1e2638] text-white pl-8 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#39ff14] text-[#0b0f19] font-bold py-3 rounded-lg hover:bg-[#32e011] transition-transform active:scale-95"
                  >
                    Deposit Crypto
                  </button>
                  
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[#39ff14] text-sm text-center font-bold mt-2"
                      >
                        Deposit successful!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* My Bets History Section */}
              <div className="p-6 border-t border-[#1e2638] bg-[#0b0f19]">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#ff007f]" />
                  My Bets
                </h4>
                <div className="space-y-4">
                  {betHistory.length === 0 ? (
                    <p className="text-[#64748b] text-sm text-center py-4">No bets placed yet.</p>
                  ) : (
                    betHistory.map((bet) => (
                      <div key={bet.id} className="bg-[#151b2b] rounded-xl border border-[#1e2638] p-4">
                        <div className="flex justify-between items-center mb-3 border-b border-[#1e2638] pb-3">
                          <span className="text-xs text-[#64748b]">{bet.date}</span>
                          <span className="text-xs font-bold text-white bg-[#1e2638] px-2 py-1 rounded">
                            {bet.selections.length > 1 ? "Accumulator" : "Single"}
                          </span>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          {bet.selections.map((sel, idx) => (
                            <div key={idx} className="flex justify-between items-start text-sm">
                              <div>
                                <p className="text-white font-medium">{sel.matchName}</p>
                                <p className="text-xs text-[#94a3b8]">{sel.marketName} - {sel.oddsName}</p>
                              </div>
                              <span className="text-[#39ff14] font-bold">{sel.oddsValue.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-[#0b0f19] rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-[#64748b]">Total Stake</p>
                            <p className="text-sm font-bold text-white">€ {bet.stake.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#64748b]">Potential Win</p>
                            <p className="text-sm font-bold text-[#39ff14]">€ {bet.potentialWin.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
