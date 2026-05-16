"use client"

import { useMemo, useState, memo } from "react"
import { MapPin, Star, CalendarDays, Lock } from "lucide-react"
import { useAppState, useAppActions } from "@/lib/AppContext"
import { cn } from "@/lib/utils"

const MapPinMarker = memo(function MapPinMarker({
  place,
  isActive,
  onSelect,
  onOpen,
}: {
  place: {
    id: string
    name: string
    category: string
    weightedRating: number
    liveStatus: string
    mapX: number
    mapY: number
    visited?: boolean
  }
  isActive: boolean
  onSelect: () => void
  onOpen: () => void
}) {
  const isUnlocked = Boolean(place.visited)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={isUnlocked ? `Open ${place.name}` : `${place.name} (locked)`}
      onClick={() => {
        onSelect()
        if (isUnlocked) onOpen()
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
          if (isUnlocked) onOpen()
        }
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full transition-transform hover:scale-105"
      style={{ top: `${place.mapY}%`, left: `${place.mapX}%` }}
      onMouseEnter={onSelect}
    >
      <div className="relative flex items-center justify-center">
        {isUnlocked && (
          <span className="absolute h-10 w-10 rounded-full bg-[#3B82F6]/20 blur-md" />
        )}
        <div
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md",
            isUnlocked
              ? "border-[#93C5FD]/40 bg-[#1D4ED8]/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
              : "border-white/25 bg-zinc-600/55 text-zinc-100 shadow-[0_0_12px_rgba(0,0,0,0.22)]"
          )}
        >
          {isUnlocked ? (
            <MapPin className="h-5 w-5 text-[#93C5FD]" />
          ) : (
            <Lock className="h-4 w-4 text-white/80" />
          )}
        </div>
      </div>

      {isActive && (
        <div
          className="absolute bottom-full left-1/2 z-20 mb-3 w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/90 p-3 text-left shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{place.name}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                <span>{place.weightedRating}</span>
                <span className="text-slate-500">•</span>
                <span>{place.category}</span>
              </div>
            </div>
            {!isUnlocked && (
              <span className="shrink-0 rounded-full border border-white/20 bg-zinc-600/50 p-1">
                <Lock className="h-3 w-3 text-white/75" />
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <CalendarDays
                className={cn("h-3.5 w-3.5", isUnlocked ? "text-[#3B82F6]" : "text-zinc-400")}
              />
              {isUnlocked ? place.liveStatus : "Visit to unlock"}
            </div>
            {isUnlocked ? (
              <button
                type="button"
                onClick={onOpen}
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
        </div>
      )}
    </div>
  )
})

export function LiveMapView() {
  const { places } = useAppState()
  const { goToPlace } = useAppActions()
  const [activePinId, setActivePinId] = useState<string | null>(places[0]?.id ?? null)

  const mapPlaces = useMemo(
    () => [...places].sort((a, b) => b.weightedRating - a.weightedRating),
    [places]
  )

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[url('/baku-map.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/15" />

      {mapPlaces.map((place) => (
        <MapPinMarker
          key={place.id}
          place={place}
          isActive={activePinId === place.id}
          onSelect={() => setActivePinId(place.id)}
          onOpen={() => goToPlace(place.id)}
        />
      ))}
    </div>
  )
}
