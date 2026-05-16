"use client"

import { memo, useEffect, useRef, useCallback } from "react"
import { VideoCard } from "./video-card"
import { useAppState, useAppActions } from "@/lib/AppContext"
import type { Place } from "@/lib/mockData"

const FeedPlaceCard = memo(function FeedPlaceCard({ place }: { place: Place }) {
  const { toggleLike, toggleBookmark } = useAppActions()

  return (
    <div
      className="feed-card flex items-center justify-center snap-center py-6 px-2"
      data-place-card={place.id}
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
    </div>
  )
}, (prev, next) => {
  const a = prev.place
  const b = next.place
  return (
    a.id === b.id &&
    a.isLiked === b.isLiked &&
    a.isBookmarked === b.isBookmarked &&
    a.likeCount === b.likeCount
  )
})

export function DiscoverFeed() {
  const { places, feedScrollRef } = useAppState()
  const { setActivePlaceIndex } = useAppActions()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const placeCount = places.length

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect()

    const root = feedScrollRef.current
    if (!root) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number(entry.target.getAttribute("data-index"))
          if (!Number.isNaN(index)) setActivePlaceIndex(index)
        }
      },
      { root, threshold: 0.6 }
    )

    root.querySelectorAll("[data-place-card]").forEach((card, i) => {
      card.setAttribute("data-index", String(i))
      observerRef.current?.observe(card)
    })
  }, [feedScrollRef, setActivePlaceIndex])

  useEffect(() => {
    const frame = requestAnimationFrame(setupObserver)
    return () => {
      cancelAnimationFrame(frame)
      observerRef.current?.disconnect()
    }
  }, [setupObserver, placeCount])

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full w-full relative bg-transparent overflow-hidden">
      <div className="px-6 pt-8 pb-5 flex-shrink-0 w-full relative z-10">
        <div className="text-center">
          <h1
            className="text-4xl font-black text-white mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Discover
          </h1>
          <p className="text-zinc-400 text-sm">Swipe through the best spots in town</p>
        </div>
      </div>

      <div
        ref={feedScrollRef}
        className="flex-1 overflow-y-auto px-6 pb-10 snap-y snap-mandatory overscroll-contain"
      >
        <div className="flex flex-col w-full gap-8 pb-10">
          {places.map((place) => (
            <FeedPlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  )
}
