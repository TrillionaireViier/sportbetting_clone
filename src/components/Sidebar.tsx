import React from "react";
import { Trophy, Flame, Target, Disc, Crosshair, MapPin } from "lucide-react";

export default function Sidebar() {
  const categories = [
    { name: "Live", icon: Flame, active: true, badge: 12 },
    { name: "Football", icon: Trophy, active: false },
    { name: "Basketball", icon: Target, active: false },
    { name: "Tennis", icon: Disc, active: false },
    { name: "Esports", icon: Crosshair, active: false },
    { name: "Local Matches", icon: MapPin, active: false },
  ];

  return (
    <aside className="w-64 bg-[#0b0f19] border-r border-[#1e2638] h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block sticky top-16">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4 px-2">Sports</h3>
        <nav className="space-y-1">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <a
                key={idx}
                href="#"
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                  cat.active 
                    ? "bg-[#151b2b] text-white border-l-2 border-[#39ff14]" 
                    : "text-[#94a3b8] hover:bg-[#151b2b] hover:text-white border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${cat.active ? "text-[#39ff14]" : "text-[#64748b]"}`} />
                  <span className="font-medium text-sm">{cat.name}</span>
                </div>
                {cat.badge && (
                  <span className="bg-[#ff007f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
