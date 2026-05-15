"use client"

import React, { createContext, useContext, useState, useCallback, useRef } from "react"
import { mockPlaces, type Place } from "./mockData"

export type ActiveView = "discover" | "livemap" | "myplans" | "analytics"

export type UserRole = "user" | "business"

export interface Booking {
  id: string
  placeId: string
  placeName: string
  date: string
  time: string
  guests: string
  status: "confirmed" | "pending" | "cancelled"
}

interface AppContextType {
  places: Place[]
  bookings: Booking[]
  activeView: ActiveView
  activePlaceIndex: number
  isAuthenticated: boolean
  userRole: UserRole | null
  setActiveView: (view: ActiveView) => void
  setActivePlaceIndex: (index: number) => void
  setRole: (role: UserRole) => void
  toggleLike: (id: string) => void
  toggleBookmark: (id: string) => void
  goToPlace: (id: string) => void
  addBooking: (booking: Omit<Booking, "id" | "status">) => void
  login: (role: UserRole) => void
  logout: () => void
  feedScrollRef: React.RefObject<HTMLDivElement | null>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(() =>
    mockPlaces.map((p) => ({ ...p }))
  )
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeView, setActiveView] = useState<ActiveView>("discover")
  const [activePlaceIndex, setActivePlaceIndex] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const feedScrollRef = useRef<HTMLDivElement | null>(null)

  const login = useCallback((role: UserRole) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }, [])
  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUserRole(null)
  }, [])

  const toggleLike = useCallback((id: string) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p
      )
    )
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    )
  }, [])

  const addBooking = useCallback((bookingData: Omit<Booking, "id" | "status">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: "confirmed"
    }
    setBookings(prev => [newBooking, ...prev])
    
    // Mark the place as visited when booked
    setPlaces(prev => prev.map(p => 
      p.id === bookingData.placeId ? { ...p, visited: true } : p
    ))
  }, [])

  const goToPlace = useCallback(
    (id: string) => {
      const index = places.findIndex((p) => p.id === id)
      if (index !== -1) {
        setActivePlaceIndex(index)
        setActiveView("discover")
        // Scroll to the card in the feed
        setTimeout(() => {
          const container = feedScrollRef.current
          if (container) {
            const cards = container.querySelectorAll("[data-place-card]")
            if (cards[index]) {
              cards[index].scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }
        }, 100)
      }
    },
    [places]
  )

  const setRole = useCallback((role: UserRole) => {
    setUserRole(role)
    if (role === "business") {
      setActiveView("analytics")
    } else {
      setActiveView("discover")
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        places,
        bookings,
        activeView,
        activePlaceIndex,
        isAuthenticated,
        userRole,
        setActiveView,
        setActivePlaceIndex,
        setRole,
        toggleLike,
        toggleBookmark,
        goToPlace,
        addBooking,
        login,
        logout,
        feedScrollRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
