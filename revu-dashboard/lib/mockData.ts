export interface Place {
  id: string
  name: string
  type: "rooftop" | "club" | "cafe" | "restaurant" | "lounge" | "bar" | "bistro"
  distance: string
  distanceKm: number
  weightedRating: number
  reviewCount: number
  vibeTag: string
  videoThumbnail: string
  isLiked: boolean
  isBookmarked: boolean
  likeCount: number
  commentCount: number
  shareCount: number
  description: string
  crowdLevel: number
  liveStatus: "Packed" | "Busy" | "Moderate" | "Quiet"
  trendPercent: string
  mapX: number
  mapY: number
  category: string
  uploader?: {
    name: string
    handle?: string
    avatar: string
  }
  caption?: string
  isVerified?: boolean
  isBusiness?: boolean
  promoBadge?: string
  loyaltyReward?: string
  eventDateTime?: string
  visited?: boolean
}

export const mockPlaces: Place[] = [
  {
    id: "chill-vibes-feed",
    uploader: { name: "Chill Vibes", handle: "@chill_vibes", avatar: "https://i.pravatar.cc/150?u=3" },
    caption: "Late-night bites, loud music, and the best rooftop energy in the city.",
    visited: false,
    name: "Cangi Cafe & Restaurant",
    type: "cafe",
    distance: "2.4 km away",
    distanceKm: 2.4,
    weightedRating: 4.8,
    reviewCount: 1247,
    vibeTag: "Energetic",
    videoThumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop",
    isLiked: false,
    isBookmarked: false,
    likeCount: 12400,
    commentCount: 892,
    shareCount: 341,
    description: "The trendiest spot in Baku with craft cocktails and DJ sets every weekend.",
    crowdLevel: 85,
    liveStatus: "Busy",
    trendPercent: "+24%",
    mapX: 35,
    mapY: 25,
    category: "Cafe & Restaurant",
  },
  {
    id: "flame-tower-sky-bar",
    uploader: { name: "Flame Tower Sky Bar", avatar: "https://i.pravatar.cc/150?u=11" },
    caption: "Elevated cocktails, skyline sunsets, and a loyalty offer that keeps guests coming back.",
    visited: true,
    name: "Flame Tower Sky Bar",
    type: "rooftop",
    distance: "1.5 km away",
    distanceKm: 1.5,
    weightedRating: 4.9,
    reviewCount: 2890,
    vibeTag: "Sponsored",
    videoThumbnail: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=1200&fit=crop",
    isLiked: false,
    isBookmarked: false,
    likeCount: 51200,
    commentCount: 3100,
    shareCount: 1890,
    description: "Iconic rooftop bar at Flame Towers with 360° views of Baku and the Caspian Sea.",
    crowdLevel: 88,
    liveStatus: "Packed",
    trendPercent: "+27%",
    mapX: 55,
    mapY: 20,
    category: "Rooftop Bar",
    isBusiness: true,
    isVerified: true,
    promoBadge: "Sponsored",
    loyaltyReward: "Loyalty: Get 20% Cashback on your 5th visit",
  },
  {
    id: "neon-nights-club",
    uploader: { name: "Neon Nights Club", avatar: "https://i.pravatar.cc/150?u=21" },
    caption: "🔥 Special Guest DJ Set! Early bird tickets available now.",
    visited: true,
    name: "Neon Nights Club",
    type: "club",
    distance: "3.1 km away",
    distanceKm: 3.1,
    weightedRating: 4.6,
    reviewCount: 3412,
    vibeTag: "Upcoming Event",
    videoThumbnail: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=1200&fit=crop",
    isLiked: false,
    isBookmarked: false,
    likeCount: 45200,
    commentCount: 2800,
    shareCount: 1230,
    description: "Baku's ultimate nightlife destination with world-class DJs and immersive light shows.",
    crowdLevel: 92,
    liveStatus: "Packed",
    trendPercent: "+31%",
    mapX: 25,
    mapY: 60,
    category: "Nightclub",
    isBusiness: true,
    isVerified: true,
    promoBadge: "Upcoming Event",
    eventDateTime: "This Friday, 11:00 PM",
  },
]

export function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  }
  return count.toString()
}
