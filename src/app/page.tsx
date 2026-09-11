import React from "react";
import MatchCard from "@/components/MatchCard";
import { mockMatches } from "@/lib/mockData";
import { Activity } from "lucide-react";

export default function Home() {
  const liveMatches = mockMatches.filter(m => m.isLive);
  const upcomingMatches = mockMatches.filter(m => !m.isLive);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#151b2b] to-[#0b0f19] border border-[#1e2638] rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#39ff14] opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00f3ff] opacity-5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <h2 className="text-3xl font-bold text-white mb-2 relative z-10">
          Welcome to <span className="text-[#39ff14]">BetSport</span>
        </h2>
        <p className="text-[#94a3b8] max-w-lg mb-6 relative z-10">
          Get the best odds on live and upcoming matches. Experience seamless betting with instant updates and premium features.
        </p>
        <button className="bg-[#39ff14] hover:bg-[#32e011] text-[#0b0f19] font-bold py-2.5 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(57,255,20,0.3)] relative z-10">
          Deposit Now
        </button>
      </div>

      {/* Live Matches Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-[#ff007f] w-5 h-5 animate-pulse" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">Live Right Now</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section>
        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Upcoming Matches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  );
}
