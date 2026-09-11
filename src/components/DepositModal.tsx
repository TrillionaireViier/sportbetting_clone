"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bitcoin, Copy, CheckCircle2, QrCode } from "lucide-react";
import { useData } from "@/context/DataContext";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { depositFunds } = useData();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockAddress = "TYourMockTrc20DepositAddressHere99X";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#151b2b] border border-[#1e2638] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#64748b] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 border-b border-[#1e2638] flex items-center gap-3">
                <Bitcoin className="w-8 h-8 text-[#f7931a]" />
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Deposit USDT</h3>
                  <p className="text-[#39ff14] text-xs font-bold uppercase tracking-widest mt-1 bg-[#39ff14]/10 inline-block px-2 py-0.5 rounded">TRC20 Network</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-[#0b0f19] p-6 rounded-xl border border-[#1e2638] flex flex-col items-center justify-center space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-inner">
                    <QrCode className="w-32 h-32 text-black" />
                  </div>
                  <p className="text-xs text-[#64748b] text-center max-w-[200px]">Scan this QR code or copy the address below to deposit USDT (TRC20).</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#94a3b8] mb-2 uppercase">Deposit Address</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      readOnly 
                      value={mockAddress}
                      className="flex-1 bg-[#0b0f19] border border-[#1e2638] text-[#39ff14] text-sm px-4 py-3 rounded-l-lg focus:outline-none"
                    />
                    <button 
                      onClick={handleCopy}
                      className="bg-[#1e2638] border border-l-0 border-[#1e2638] hover:bg-[#334155] text-white px-4 rounded-r-lg transition-colors flex items-center justify-center w-14"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-[#39ff14]" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#1e2638] pt-6 mt-6">
                  <h4 className="font-bold text-white mb-4 text-sm text-center">Simulate Instant Deposit</h4>
                  <form onSubmit={handleDeposit} className="space-y-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]">USDT</span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0b0f19] border border-[#1e2638] text-white pl-14 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#39ff14] transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#39ff14] text-[#0b0f19] font-bold py-3 rounded-lg hover:bg-[#32e011] transition-transform active:scale-95 uppercase tracking-wider"
                    >
                      Confirm Simulation
                    </button>
                    
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[#39ff14] text-sm text-center font-bold mt-2"
                        >
                          Funds added to balance instantly!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
