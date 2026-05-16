"use client"

import { Heart, MessageCircle, Share2, Star, Zap, MapPin, Bookmark, X, Users, Clock, CheckCircle, BadgeCheck, Gift, Sparkles, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCount } from "@/lib/mockData"
import { useAppActions } from "@/lib/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useEffect, memo } from "react"
import { createPortal } from "react-dom"

interface VideoCardProps {
  id: string
  image: string
  title: string
  distance: string
  vibe: string
  rating: number
  reviews: number
  likes: number
  comments: number
  isLiked: boolean
  isBookmarked: boolean
  isVerified?: boolean
  isBusiness?: boolean
  promoBadge?: string
  loyaltyReward?: string
  eventDateTime?: string
  uploader?: {
    name: string
    handle?: string
    avatar: string
  }
  caption?: string
  onLike: () => void
  onBookmark: () => void
}

function VideoCardComponent({
  id,
  image,
  title,
  distance,
  vibe,
  rating,
  reviews,
  likes,
  comments,
  isLiked,
  isBookmarked,
  isVerified = false,
  isBusiness = false,
  promoBadge,
  loyaltyReward,
  eventDateTime,
  uploader,
  caption,
  onLike,
  onBookmark,
}: VideoCardProps) {
  const { addBooking } = useAppActions()
  const [showHeartBurst, setShowHeartBurst] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isBookingOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isBookingOpen])

  const handleDoubleTap = useCallback(() => {
    if (!isLiked) {
      onLike()
    }
    setShowHeartBurst(true)
    setTimeout(() => setShowHeartBurst(false), 800)
  }, [isLiked, onLike])

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    setBookingStatus("loading")
    
    // Simulate API delay
    setTimeout(() => {
      addBooking({
        placeId: id,
        placeName: title,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        guests: formData.get("guests") as string,
      })
      
      setBookingStatus("success")
      setTimeout(() => {
        setIsBookingOpen(false)
        setBookingStatus("idle")
      }, 1500)
    }, 1000)
  }

  return (
    <>
      <div
        className="relative w-full max-w-[390px] mx-auto h-[min(700px,80vh)] rounded-[32px] overflow-hidden group snap-card border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.4)]"
        onDoubleClick={handleDoubleTap}
      >
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Double-tap Heart Burst */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1.2, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
          <motion.div
            className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-xs font-semibold text-white">Vibe: {vibe}</span>
          </motion.div>

          {promoBadge && (
            <motion.div
              className={cn(
                "glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border",
                promoBadge === "Sponsored"
                  ? "border-amber-300/30 bg-amber-400/10 text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.25)]"
                  : "border-cyan-300/30 bg-cyan-400/10 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">{promoBadge}</span>
            </motion.div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-20">
          {/* Like Button */}
          <motion.button
            className="flex flex-col items-center gap-1"
            onClick={(e) => { e.stopPropagation(); onLike() }}
            whileTap={{ scale: 0.85 }}
          >
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300",
                isLiked ? "bg-red-500/20 border-red-500/30" : "hover:bg-white/10"
              )}
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isLiked
                    ? "text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                    : "text-white"
                )}
              />
            </motion.div>
            <motion.span
              className="text-xs font-medium text-white"
              key={likes}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {formatCount(likes)}
            </motion.span>
          </motion.button>

          {/* Comment Button */}
          <ActionButton icon={MessageCircle} count={formatCount(comments)} />

          {/* Share Button */}
          <ActionButton icon={Share2} />

          {/* Bookmark Button */}
          <motion.button
            className="flex flex-col items-center gap-1"
            onClick={(e) => { e.stopPropagation(); onBookmark() }}
            whileTap={{ scale: 0.85 }}
          >
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300",
                isBookmarked ? "bg-amber-500/20 border-amber-500/30" : "hover:bg-white/10"
              )}
              animate={isBookmarked ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Bookmark
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isBookmarked
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                    : "text-white"
                )}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom Content + CTA */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col max-h-[72%]">
          <div className="overflow-y-auto min-h-0 p-5 pb-3">
          {/* UGC Info: Uploader and Caption */}
          {uploader && (
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={uploader.avatar}
                  alt={uploader.name}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-semibold text-sm leading-tight truncate">{uploader.name}</p>
                    {isBusiness && <BadgeCheck className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.65)]" />}
                  </div>
                  {!isBusiness && uploader.handle && <p className="text-slate-300 text-xs leading-tight">{uploader.handle}</p>}
                </div>
              </div>
              {isBusiness && loyaltyReward && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-100 shadow-[0_0_26px_rgba(16,185,129,0.18)] backdrop-blur-md">
                  <Gift className="w-4 h-4 text-emerald-300" />
                  <span className="text-[11px] font-semibold leading-tight">{loyaltyReward}</span>
                </div>
              )}
              {caption && (
                <p className="text-sm text-slate-100 font-medium mb-3 max-w-[90%] leading-relaxed drop-shadow-md">
                  {caption}
                </p>
              )}
            </div>
          )}

          {/* Location Info */}
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{distance}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 text-balance drop-shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h3>

          {/* Rating with Trust Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div className="relative">
                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                {isVerified && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#3B82F6] rounded-full shadow-[0_0_5px_#3B82F6]" />
                )}
              </div>
              <span className="text-white font-bold text-sm">{rating}</span>
              <span className="text-slate-300 text-xs">({reviews.toLocaleString()})</span>
            </div>
            {isVerified && !isBusiness && (
              <div className="flex items-center gap-1.5 text-xs text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1.5 rounded-full border border-[#3B82F6]/20 backdrop-blur-md">
                <svg className="w-3.5 h-3.5 drop-shadow-[0_0_5px_#3B82F6]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold tracking-wide">Trusted Reviewer</span>
              </div>
            )}
          </div>

          {isBusiness && eventDateTime && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-1.5 text-slate-100 shadow-[0_0_30px_rgba(15,23,42,0.4)] backdrop-blur-md">
              <CalendarDays className="w-4 h-4 text-cyan-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">{eventDateTime}</span>
            </div>
          )}
          </div>

          <div className="px-4 pb-4 pt-1 flex-shrink-0">
            <motion.button
              type="button"
              className="w-full bg-[#3B82F6] text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-[0_8px_28px_rgba(59,130,246,0.42)] hover:shadow-[0_10px_32px_rgba(59,130,246,0.26)] hover:bg-[#2563EB] flex items-center justify-center gap-2 border border-white/10"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBookingOpen(true)}
            >
              <CalendarIcon className="w-5 h-5" />
              Book a Table
            </motion.button>
          </div>
        </div>
      </div>

      {/* Booking Modal — portaled so fixed positioning isn't trapped by card transforms */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isBookingOpen && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
              >
                <div
                  className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                  onClick={() => setIsBookingOpen(false)}
                />
                <motion.div
                  className="relative z-10 flex w-full max-w-md max-h-[min(640px,calc(100vh-2rem))] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
                  initial={{ scale: 0.95, y: 16 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 16 }}
                  onClick={(e) => e.stopPropagation()}
                >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
              <button 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white z-10"
                onClick={() => setIsBookingOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto overscroll-contain">
              {bookingStatus === "success" ? (
                <div className="px-6 py-12 flex flex-col items-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle className="w-16 h-16 text-[#10B981]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    Reservation Confirmed!
                  </h3>
                  <p className="text-slate-400">Your table at {title} is booked successfully.</p>
                </div>
              ) : (
                <div className="px-6 py-6">
                  <div className="mb-6 pr-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100 mb-4">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Premium reservation
                    </div>
                    <h3 id="booking-modal-title" className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      Book a Table
                    </h3>
                    <p className="text-slate-400 text-sm">at {title}</p>
                  </div>

                  <form onSubmit={handleBooking} className="flex flex-col gap-4">
                    <BookingField label="Date" icon={CalendarDays}>
                      <input
                        type="date"
                        name="date"
                        required
                        className="booking-input min-w-0 flex-1 bg-transparent text-white outline-none"
                        style={{ colorScheme: "dark" }}
                      />
                    </BookingField>

                    <BookingField label="Time" icon={Clock}>
                      <input
                        type="time"
                        name="time"
                        required
                        className="booking-input min-w-0 flex-1 bg-transparent text-white outline-none"
                        style={{ colorScheme: "dark" }}
                      />
                    </BookingField>

                    <BookingField label="Guests" icon={Users}>
                      <select
                        name="guests"
                        required
                        className="booking-input min-w-0 flex-1 appearance-none bg-transparent text-white outline-none cursor-pointer"
                      >
                        <option value="1" className="bg-slate-950">1 Guest</option>
                        <option value="2" className="bg-slate-950">2 Guests</option>
                        <option value="3" className="bg-slate-950">3 Guests</option>
                        <option value="4" className="bg-slate-950">4 Guests</option>
                        <option value="5" className="bg-slate-950">5 Guests</option>
                        <option value="6" className="bg-slate-950">6+ Guests</option>
                      </select>
                    </BookingField>

                    <button
                      type="submit"
                      disabled={bookingStatus === "loading"}
                      className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#10B981] px-5 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.18)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {bookingStatus === "loading" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        "Confirm Reservation"
                      )}
                    </button>
                  </form>
                </div>
              )}
              </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

function BookingField({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300 uppercase tracking-[0.22em] ml-1">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-all focus-within:border-cyan-300/60 focus-within:bg-white/[0.08] focus-within:ring-2 focus-within:ring-cyan-300/20">
        <Icon className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
        {children}
      </div>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  count,
}: {
  icon: React.ElementType
  count?: string
}) {
  return (
    <button type="button" className="flex flex-col items-center gap-1 group/btn active:scale-95">
      <div className="w-12 h-12 rounded-full glass flex items-center justify-center transition-colors group-hover/btn:bg-white/10">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {count && <span className="text-xs font-medium text-white">{count}</span>}
    </button>
  )
}

export const VideoCard = memo(VideoCardComponent)

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
