"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, CalendarDays, Lock } from "lucide-react"
import { useApp } from "@/lib/AppContext"
import { cn } from "@/lib/utils"

export function LiveMapView() {
  const { places, goToPlace } = useApp()
  const [activePinId, setActivePinId] = useState<string | null>(places[0]?.id ?? null)

  const mapPlaces = useMemo(() => {
    return [...places].sort((a, b) => b.weightedRating - a.weightedRating)
  }, [places])

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[url('/baku-map.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/15" />

      {mapPlaces.map((place, index) => {
        const isActive = activePinId === place.id
        const isUnlocked = Boolean(place.visited)

        return (
          <motion.div
            key={place.id}
            role="button"
            tabIndex={0}
            aria-label={isUnlocked ? `Open ${place.name}` : `${place.name} (locked)`}
            onClick={() => {
              setActivePinId(place.id)
              if (isUnlocked) goToPlace(place.id)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setActivePinId(place.id)
                if (isUnlocked) goToPlace(place.id)
              }
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
            style={{ top: `${place.mapY}%`, left: `${place.mapX}%` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.03 * index }}
            whileHover={{ scale: isUnlocked ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setActivePinId(place.id)}
          >
            <div className="relative flex items-center justify-center">
              {isUnlocked ? (
                <>
                  <span className="absolute h-10 w-10 rounded-full bg-[#3B82F6]/25 blur-md" />
                  <span className="absolute h-6 w-6 rounded-full bg-[#3B82F6]/40 animate-ping-slow" />
                </>
              ) : (
                <span className="absolute h-9 w-9 rounded-full bg-white/15 blur-sm" />
              )}
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-transform duration-200",
                  isUnlocked
                    ? "border-[#93C5FD]/40 bg-[#1D4ED8]/50 text-white shadow-[0_0_24px_rgba(59,130,246,0.45)]"
                    : "border-white/25 bg-zinc-600/55 text-zinc-100 shadow-[0_0_14px_rgba(0,0,0,0.22)]"
                )}
              >
                {isUnlocked ? (
                  <MapPin className="h-5 w-5 text-[#93C5FD]" />
                ) : (
                  <Lock className="h-4 w-4 text-white/80" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute bottom-full left-1/2 mb-3 w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{place.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                        <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{place.weightedRating}</span>
                        <span className="text-slate-500">•</span>
                        <span>{place.category}</span>
                      </div>
                    </div>
                    {!isUnlocked && (
                      <span className="flex-shrink-0 rounded-full border border-white/20 bg-zinc-600/50 p-1">
                        <Lock className="h-3 w-3 text-white/75" />
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CalendarDays className={cn("h-3.5 w-3.5", isUnlocked ? "text-[#3B82F6]" : "text-zinc-400")} />
                      {isUnlocked ? place.liveStatus : "Visit to unlock"}
                    </div>
                    {isUnlocked ? (
                      <button
                        type="button"
                        onClick={() => goToPlace(place.id)}
                        className="rounded-full bg-[#3B82F6] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#2563EB]"
                      >
                        Book
                      </button>
                    ) : (
                      <span className="rounded-full border border-white/20 bg-zinc-600/50 px-3 py-1.5 text-[11px] font-semibold text-zinc-200">
                        Locked
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
