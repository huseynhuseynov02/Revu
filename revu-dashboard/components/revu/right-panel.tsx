"use client"

import { Bell, Search, Flame, MapPin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/AppContext"

export function RightPanel() {
  const { places, goToPlace } = useApp()

  const visitedCount = places.filter(p => p.visited).length
  const totalCount = places.length || 50
  const progressPercent = (visitedCount / totalCount) * 100
  
  // Get top 3 trending places (highest trendPercent or just top 3 for mock)
  const trendingPlaces = [...places].sort((a, b) => parseInt(b.trendPercent) - parseInt(a.trendPercent)).slice(0, 3)

  return (
    <aside className="w-[360px] h-full flex flex-col px-6 py-6 pb-10 gap-8 flex-shrink-0 relative overflow-y-auto overflow-x-hidden bg-[#0B0B10] border-l border-white/10 custom-scrollbar">
      {/* Top Bar */}
      <motion.div
        className="flex items-center gap-3 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search places..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6]/50 transition-all font-medium"
          />
        </div>
        <motion.button
          className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3B82F6] text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </motion.button>
      </motion.div>

      {/* Gamification Progress Widget */}
      <motion.div
        className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 relative z-10 border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
            Places Discovered
          </h3>
          <span className="text-xs font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full border border-[#3B82F6]/20">
            {visitedCount} / {totalCount}
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: "linear-gradient(90deg, #3B82F6, #10B981)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" style={{ transform: "skewX(-20deg)" }} />
          </motion.div>
        </div>
        <p className="text-[11px] text-slate-500 mt-3 text-center uppercase tracking-wider font-semibold">
          Explore more to unlock local rewards
        </p>
      </motion.div>

      {/* Trending This Week */}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-[#F43F5E]" />
          <h3 className="font-semibold text-slate-100 text-lg" style={{ fontFamily: "var(--font-display)" }}>
            Trending This Week
          </h3>
        </div>

        <div className="space-y-3">
          {trendingPlaces.map((place, index) => (
            <motion.div 
              key={place.id}
              className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all rounded-2xl p-3 flex gap-4 cursor-pointer group"
              onClick={() => goToPlace(place.id)}
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={place.videoThumbnail} alt={place.name} className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-[10px] font-bold text-white backdrop-blur-md">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h4 className="text-sm font-semibold text-slate-200 truncate group-hover:text-[#3B82F6] transition-colors">{place.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{place.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                    ↑ {place.trendPercent}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                    <span className="text-[#F59E0B]">★</span> {place.weightedRating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="mt-4 w-full py-3 text-sm font-medium text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
          View all trending
        </button>
      </motion.div>
    </aside>
  )
}
