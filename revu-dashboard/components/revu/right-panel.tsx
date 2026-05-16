"use client"

import { memo, useMemo } from "react"
import { Bell, Search, Flame, MapPin, ArrowRight } from "lucide-react"
import { useAppState, useAppActions } from "@/lib/AppContext"

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop"

function parseTrend(value: string) {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
}

function RightPanelInner() {
  const { places } = useAppState()
  const { goToPlace } = useAppActions()

  const visitedCount = useMemo(
    () => places.filter((p) => p.visited).length,
    [places]
  )
  const discoveryGoal = 16
  const progressPercent = (visitedCount / discoveryGoal) * 100

  const trendingPlaces = useMemo(
    () =>
      [...places]
        .sort((a, b) => parseTrend(b.trendPercent) - parseTrend(a.trendPercent))
        .slice(0, 6),
    [places]
  )

  return (
    <aside className="w-[360px] h-full flex flex-col px-6 py-6 pb-10 gap-8 flex-shrink-0 relative overflow-y-auto overflow-x-hidden bg-[#0B0B10] border-l border-white/10 custom-scrollbar">
      <div className="flex items-center gap-3 relative z-10">
        <div className="relative flex-1 flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-[#3B82F6]/50 focus-within:border-[#3B82F6]/50 transition-all">
          <Search className="w-4 h-4 text-slate-500 shrink-0 pointer-events-none" aria-hidden />
          <input
            type="text"
            placeholder="Search places..."
            className="flex-1 min-w-0 bg-transparent border-0 p-0 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 font-medium"
          />
        </div>
        <button
          type="button"
          className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3B82F6] text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 relative z-10 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
            Places Discovered
          </h3>
          <span className="text-xs font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full border border-[#3B82F6]/20">
            {visitedCount} / {discoveryGoal}
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] transition-[width] duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-3 text-center uppercase tracking-wider font-semibold">
          Explore more to unlock local rewards
        </p>
      </div>

      <section className="flex-1 flex flex-col min-h-0">
        <header className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-[#F43F5E]" />
          <h3 className="font-semibold text-slate-100 text-lg" style={{ fontFamily: "var(--font-display)" }}>
            Trending This Week
          </h3>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <ul className="divide-y divide-white/5">
            {trendingPlaces.map((place, index) => (
              <li key={place.id}>
                <button
                  type="button"
                  className="w-full p-3 flex items-center gap-4 text-left hover:bg-white/[0.05] transition-colors cursor-pointer group"
                  onClick={() => goToPlace(place.id)}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                    <img
                      src={place.videoThumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.currentTarget
                        if (img.src !== FALLBACK_THUMBNAIL) img.src = FALLBACK_THUMBNAIL
                      }}
                    />
                    <span className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-slate-200 truncate group-hover:text-[#3B82F6] transition-colors">
                      {place.name}
                    </h4>
                    <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{place.category}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">
                        ↑ {place.trendPercent}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                        <span className="text-[#F59E0B]">★</span> {place.weightedRating}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="w-full py-3 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-t border-white/5 transition-all"
          >
            View all trending
          </button>
        </div>
      </section>
    </aside>
  )
}

export const RightPanel = memo(RightPanelInner)
