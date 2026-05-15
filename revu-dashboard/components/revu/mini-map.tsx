"use client"

import { MapPin, Maximize2 } from "lucide-react"
import { useApp } from "@/lib/AppContext"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function MiniMap() {
  const { places, activePlaceIndex, goToPlace, setActiveView } = useApp()

  return (
    <div className="glass-card rounded-2xl p-4 h-[280px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Live Hotspots</h3>
        <button
          onClick={() => setActiveView("livemap")}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
          title="Open Full Map"
        >
          <Maximize2 className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-[#0a0a0f]">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mini-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mini-grid)" />
          </svg>
        </div>

        {/* Street Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 L100,30" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <path d="M0,70 L100,70" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <path d="M30,0 L30,100" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <path d="M70,0 L70,100" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <path d="M0,50 Q50,45 100,55" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
        </svg>

        {/* Place Pins */}
        {places.slice(0, 8).map((place, index) => {
          const isActive = index === activePlaceIndex
          const isHot = place.crowdLevel > 70

          return (
            <motion.div
              key={place.id}
              className="absolute group cursor-pointer"
              style={{ left: `${place.mapX}%`, top: `${place.mapY}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => goToPlace(place.id)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Pulse Ring */}
              <div
                className={cn(
                  "absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  isActive ? "animate-ping-slow bg-[#0057FF]/40" :
                  isHot ? "animate-ping-slow bg-[#EF4444]/30" : "animate-ping-slow bg-[#0057FF]/20"
                )}
                style={{ animationDuration: isActive ? "1.5s" : "2.5s", left: "50%", top: "50%" }}
              />
              {/* Pin */}
              <div
                className={cn(
                  "relative w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-[#0057FF] w-5 h-5 ring-2 ring-white/40 shadow-[0_0_15px_rgba(0,87,255,0.7)]"
                    : isHot
                    ? "bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    : "bg-[#0057FF] shadow-[0_0_8px_rgba(0,87,255,0.4)]"
                )}
              >
                <div className={cn("rounded-full bg-white", isActive ? "w-2 h-2" : "w-1.5 h-1.5")} />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="glass px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap">
                  {place.name}
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* User Location */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-[#0057FF] flex items-center justify-center animate-glow-pulse">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-zinc-500">Hot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#0057FF]" />
            <span className="text-zinc-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
