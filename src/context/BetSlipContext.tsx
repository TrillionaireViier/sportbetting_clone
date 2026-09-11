"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Match, Market, Odds } from "@/lib/mockData";

export interface SelectedBet {
  matchId: string;
  matchName: string; // "HomeTeam vs AwayTeam"
  marketName: string;
  oddsId: string;
  oddsName: string;
  oddsValue: number;
}

interface BetSlipContextProps {
  selectedBets: SelectedBet[];
  addBet: (bet: SelectedBet) => void;
  removeBet: (oddsId: string) => void;
  clearBets: () => void;
  totalOdds: number;
}

const BetSlipContext = createContext<BetSlipContextProps | undefined>(undefined);

export const BetSlipProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBets, setSelectedBets] = useState<SelectedBet[]>([]);

  const addBet = (bet: SelectedBet) => {
    // If odds already selected, remove it
    if (selectedBets.some((b) => b.oddsId === bet.oddsId)) {
      removeBet(bet.oddsId);
      return;
    }
    
    // Only one selection per market allowed, remove existing in same market
    const filteredBets = selectedBets.filter(
      (b) => b.matchId !== bet.matchId || b.marketName !== bet.marketName
    );
    
    setSelectedBets([...filteredBets, bet]);
  };

  const removeBet = (oddsId: string) => {
    setSelectedBets((prev) => prev.filter((b) => b.oddsId !== oddsId));
  };

  const clearBets = () => {
    setSelectedBets([]);
  };

  const totalOdds = selectedBets.reduce((acc, bet) => acc * bet.oddsValue, 1);

  return (
    <BetSlipContext.Provider value={{ selectedBets, addBet, removeBet, clearBets, totalOdds }}>
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error("useBetSlip must be used within a BetSlipProvider");
  }
  return context;
};
