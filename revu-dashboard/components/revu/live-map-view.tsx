"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { useApp } from "@/lib/AppContext"

const pinPositions = [
  { top: "29%", left: "24%" },
  { top: "41%", left: "56%" },
  { top: "61%", left: "42%" },
  { top: "24%", left: "70%" },
  { top: "76%", left: "67%" },
]

export function LiveMapView() {
  const { places, goToPlace } = useApp()
  const pins = [...places].slice(0, pinPositions.length).map((place, index) => ({ place, ...pinPositions[index] }))

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[url('/baku-map.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />
      {pins.map(({ place, top, left }, index) => (
        <motion.button
          key={place.id}
          type="button"
          aria-label={`Open ${place.name}`}
          onClick={() => goToPlace(place.id)}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 * index }}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute h-10 w-10 rounded-full bg-[#3B82F6]/25 blur-md" />
            <span className="absolute h-6 w-6 rounded-full bg-[#3B82F6]/40 animate-ping-slow" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md shadow-[0_0_24px_rgba(59,130,246,0.35)]">
              <MapPin className="h-5 w-5 text-[#93C5FD]" />
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
