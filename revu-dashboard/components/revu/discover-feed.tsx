"use client"

import { VideoCard } from "./video-card"
import { useApp } from "@/lib/AppContext"
import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

export function DiscoverFeed() {
  const { places, setActivePlaceIndex, toggleLike, toggleBookmark, feedScrollRef } = useApp()
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(index)) {
              setActivePlaceIndex(index)
            }
          }
        })
      },
      {
        root: feedScrollRef.current,
        threshold: 0.6,
      }
    )

    const cards = feedScrollRef.current?.querySelectorAll("[data-place-card]")
    cards?.forEach((card, i) => {
      card.setAttribute("data-index", String(i))
      observerRef.current?.observe(card)
    })
  }, [feedScrollRef, setActivePlaceIndex])

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupObserver, 200)
    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [setupObserver, places])

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full w-full relative bg-transparent overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-8 pb-5 flex-shrink-0 w-full relative z-10">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <motion.h1
              className="text-4xl font-black text-white mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Discover
            </motion.h1>
            <motion.p
              className="text-zinc-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Swipe through the best spots in town
            </motion.p>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div
        ref={feedScrollRef}
        className="flex-1 overflow-y-auto px-6 pb-10 snap-y snap-mandatory"
      >
        <div className="flex flex-col w-full gap-8 pb-10">
          {places.map((place, index) => (
            <motion.div
              key={place.id}
              className="flex items-center justify-center snap-center py-6 px-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.5) }}
            >
              <VideoCard
                id={place.id}
                image={place.videoThumbnail}
                title={place.name}
                distance={place.distance}
                vibe={place.vibeTag}
                rating={place.weightedRating}
                reviews={place.reviewCount}
                likes={place.likeCount}
                comments={place.commentCount}
                isLiked={place.isLiked}
                isBookmarked={place.isBookmarked}
                isVerified={place.isVerified}
                isBusiness={place.isBusiness}
                uploader={place.uploader}
                caption={place.caption}
                promoBadge={place.promoBadge}
                loyaltyReward={place.loyaltyReward}
                eventDateTime={place.eventDateTime}
                onLike={() => toggleLike(place.id)}
                onBookmark={() => toggleBookmark(place.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
