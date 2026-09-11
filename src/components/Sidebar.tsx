"use client";

import React from "react";
import { Trophy, Flame, Target, Disc, Crosshair, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const categories = [
    { name: "Live", icon: Flame, path: "/", badge: 12 },
    { name: "Football", icon: Trophy, path: "/sports/football" },
    { name: "Basketball", icon: Target, path: "/sports/basketball" },
    { name: "Tennis", icon: Disc, path: "/sports/tennis" },
    { name: "Esports", icon: Crosshair, path: "/sports/esports" },
    { name: "Local Matches", icon: MapPin, path: "/sports/local-matches" },
  ];

  return (
    <aside className="w-64 bg-[#0b0f19] border-r border-[#1e2638] h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block sticky top-16">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4 px-2">Sports</h3>
        <nav className="space-y-1">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            // Exact match for home "/", otherwise startswith check or exact match
            const isActive = cat.path === "/" 
              ? pathname === "/"
              : pathname.startsWith(cat.path);

            return (
              <Link
                key={idx}
                href={cat.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                  isActive 
                    ? "bg-[#151b2b] text-white border-l-2 border-[#39ff14]" 
                    : "text-[#94a3b8] hover:bg-[#151b2b] hover:text-white border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#39ff14]" : "text-[#64748b]"}`} />
                  <span className="font-medium text-sm">{cat.name}</span>
                </div>
                {cat.badge && (
                  <span className="bg-[#ff007f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
