"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, CalendarDays } from "lucide-react"
import { useApp } from "@/lib/AppContext"

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
        return (
          <motion.button
            key={place.id}
            type="button"
            aria-label={`Open ${place.name}`}
            onClick={() => {
              setActivePinId(place.id)
              goToPlace(place.id)
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ top: `${place.mapY}%`, left: `${place.mapX}%` }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.03 * index }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setActivePinId(place.id)}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-10 w-10 rounded-full bg-[#3B82F6]/25 blur-md" />
              <span className="absolute h-6 w-6 rounded-full bg-[#3B82F6]/40 animate-ping-slow" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-transform duration-200">
                <MapPin className="h-5 w-5 text-[#93C5FD]" />
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute bottom-full left-1/2 mb-3 w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                >
                  <div className="text-sm font-semibold text-white truncate">{place.name}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                    <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{place.weightedRating}</span>
                    <span className="text-slate-500">•</span>
                    <span>{place.category}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-[#3B82F6]" />
                      {place.liveStatus}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        goToPlace(place.id)
                      }}
                      className="rounded-full bg-[#3B82F6] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#2563EB]"
                    >
                      Book
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
