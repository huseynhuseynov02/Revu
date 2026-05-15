"use client"

import { Bookmark, MapPin, Star, Trash2, Calendar, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import { useApp } from "@/lib/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

export function MyPlansView() {
  const { places, bookings, toggleBookmark, goToPlace } = useApp()
  const [activeTab, setActiveTab] = useState<"bookings" | "saved">("bookings")
  
  const bookmarked = useMemo(() => places.filter((p) => p.isBookmarked), [places])

  return (
    <div className="flex-1 flex flex-col h-full p-8 min-w-0 mx-auto w-full overflow-y-auto pb-10 bg-transparent">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-8 flex-shrink-0">
        <div>
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            My Activity
          </motion.h1>
          <p className="text-slate-400">
            Manage your reservations and saved discovery spots.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab("bookings")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all relative z-10",
              activeTab === "bookings" ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {activeTab === "bookings" && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 bg-[#3B82F6] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Calendar className="w-4 h-4 relative z-20" />
            <span className="relative z-20">Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all relative z-10",
              activeTab === "saved" ? "text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {activeTab === "saved" && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 bg-[#3B82F6] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Bookmark className="w-4 h-4 relative z-20" />
            <span className="relative z-20">Saved ({bookmarked.length})</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        <AnimatePresence mode="wait">
          {activeTab === "bookings" ? (
            <motion.div
              key="bookings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {bookings.length === 0 ? (
                <EmptyState icon={Calendar} title="No Active Bookings" description="You haven't made any reservations yet. Discover top spots and book your table!" />
              ) : (
                bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center group hover:bg-white/[0.07] transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => goToPlace(booking.placeId)}
                  >
                    <div className="w-full md:w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                      <img 
                        src={places.find(p => p.id === booking.placeId)?.videoThumbnail} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt="" 
                      />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-1">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Confirmed</span>
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">{booking.placeName}</h4>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 text-sm mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> {booking.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> {booking.time}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" /> {booking.guests} Guests
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold text-white transition-all">
                        Modify
                      </button>
                    </div>
                    
                    <ArrowRight className="hidden md:block w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="saved-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {bookmarked.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState icon={Bookmark} title="Your saves are empty" description="Bookmark places you love to easily find them later and plan your visits." />
                </div>
              ) : (
                bookmarked.map((place, index) => (
                  <motion.div
                    key={place.id}
                    className="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-white/5 hover:border-[#3B82F6]/30 shadow-xl"
                    onClick={() => goToPlace(place.id)}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={place.videoThumbnail}
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <motion.button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-all border border-white/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(place.id)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                          <span className="text-sm font-bold text-white">{place.weightedRating}</span>
                        </div>
                        <h4 className="font-bold text-white text-lg truncate leading-tight">{place.name}</h4>
                      </div>
                    </div>

                    <div className="p-5 flex items-center justify-between bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>{place.distance} · {place.vibeTag}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-[#3B82F6]" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-64 text-center p-8 bg-white/[0.02] border border-white/5 rounded-[40px] mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-20 h-20 rounded-[28px] bg-slate-800/50 flex items-center justify-center mb-6 shadow-inner border border-white/5">
        <Icon className="w-10 h-10 text-slate-600" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
