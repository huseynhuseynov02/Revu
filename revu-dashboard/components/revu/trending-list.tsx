"use client"

import { TrendingUp, Users } from "lucide-react"
import { useApp } from "@/lib/AppContext"
import { motion } from "framer-motion"
import { useMemo } from "react"

function getLiveStatusColor(status: string) {
  switch (status) {
    case "Packed":
      return "bg-[#EF4444] text-white"
    case "Busy":
      return "bg-[#F59E0B] text-black"
    case "Moderate":
      return "bg-[#22C55E] text-black"
    default:
      return "bg-zinc-600 text-white"
  }
}

export function TrendingList() {
  const { places, goToPlace } = useApp()

  const trending = useMemo(
    () => [...places].sort((a, b) => b.crowdLevel - a.crowdLevel).slice(0, 3),
    [places]
  )

  return (
    <div className="glass-card rounded-2xl p-4 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0057FF]" />
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Trending Now</h3>
        </div>
        <button className="text-sm text-[#0057FF] font-medium hover:underline">
          See All
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {trending.map((place, index) => (
          <motion.div
            key={place.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group"
            onClick={() => goToPlace(place.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Rank */}
            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-zinc-500 flex-shrink-0">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={place.videoThumbnail}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              {/* Live Indicator */}
              <div className="absolute top-1 right-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse-live" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm truncate">{place.name}</h4>
              <p className="text-xs text-zinc-500">{place.category}</p>
            </div>

            {/* Status & Trend */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getLiveStatusColor(place.liveStatus)}`}>
                {place.liveStatus}
              </span>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-zinc-500" />
                <span className="text-xs text-[#22C55E] font-medium">{place.trendPercent}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Bar */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
          <span>Overall Activity</span>
          <span className="text-[#0057FF] font-medium">High</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0057FF] to-[#22D3EE]"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
