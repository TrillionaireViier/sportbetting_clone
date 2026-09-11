"use client";

import React from "react";
import MatchCard from "@/components/MatchCard";
import { useData } from "@/context/DataContext";
import { Trophy, Target, Disc, Crosshair, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = typeof params.category === "string" ? params.category : "";
  
  // Format the category from URL (e.g., "local-matches" -> "Local Matches")
  const formattedCategory = categoryParam
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { matches } = useData();
  
  // Filter matches based on the exact sport category
  // If it's Local Matches, just filter by a specific mock criteria (e.g. Football) for now
  const filteredMatches = matches.filter(m => 
    formattedCategory === "Local Matches" 
      ? m.sport === "Football" && m.isLive 
      : m.sport === formattedCategory
  );

  const getCategoryIcon = () => {
    switch (formattedCategory) {
      case "Football": return <Trophy className="w-6 h-6 text-[#39ff14]" />;
      case "Basketball": return <Target className="w-6 h-6 text-[#39ff14]" />;
      case "Tennis": return <Disc className="w-6 h-6 text-[#39ff14]" />;
      case "Esports": return <Crosshair className="w-6 h-6 text-[#39ff14]" />;
      case "Local Matches": return <MapPin className="w-6 h-6 text-[#39ff14]" />;
      default: return <Trophy className="w-6 h-6 text-[#39ff14]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-[#151b2b] to-[#0b0f19] border border-[#1e2638] rounded-2xl p-8 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-[#1e2638] p-4 rounded-xl border border-[#334155]">
            {getCategoryIcon()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">
              {formattedCategory} Matches
            </h2>
            <p className="text-[#94a3b8] mt-1">Browse all available {formattedCategory.toLowerCase()} events</p>
          </div>
        </div>
      </div>

      <section>
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20 bg-[#151b2b] rounded-xl border border-[#1e2638]">
            <p className="text-[#64748b] text-lg">No matches currently available for this category.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
