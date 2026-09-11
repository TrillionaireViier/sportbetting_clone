"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { mockMatches, Match } from "@/lib/mockData";

interface DataContextProps {
  matches: Match[];
  updateMatchScore: (matchId: string, newScore: string) => void;
  toggleMatchLive: (matchId: string) => void;
  updateOdds: (matchId: string, marketId: string, oddsId: string, newValue: number) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>(mockMatches);

  const updateMatchScore = (matchId: string, newScore: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, score: newScore } : match
      )
    );
  };

  const toggleMatchLive = (matchId: string) => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId ? { ...match, isLive: !match.isLive } : match
      )
    );
  };

  const updateOdds = (matchId: string, marketId: string, oddsId: string, newValue: number) => {
    setMatches((prev) =>
      prev.map((match) => {
        if (match.id !== matchId) return match;
        return {
          ...match,
          markets: match.markets.map((market) => {
            if (market.id !== marketId) return market;
            return {
              ...market,
              odds: market.odds.map((odd) =>
                odd.id === oddsId ? { ...odd, value: newValue } : odd
              ),
            };
          }),
        };
      })
    );
  };

  return (
    <DataContext.Provider value={{ matches, updateMatchScore, toggleMatchLive, updateOdds }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
