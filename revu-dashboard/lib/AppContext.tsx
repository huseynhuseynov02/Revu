"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react"
import { mockPlaces, type Place } from "./mockData"

export type ActiveView = "discover" | "livemap" | "myplans" | "loyalty" | "analytics"

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

export interface AppState {
  places: Place[]
  bookings: Booking[]
  activeView: ActiveView
  activePlaceIndex: number
  isAuthenticated: boolean
  userRole: UserRole | null
  feedScrollRef: React.RefObject<HTMLDivElement | null>
}

export interface AppActions {
  setActiveView: (view: ActiveView) => void
  setActivePlaceIndex: (index: number) => void
  setRole: (role: UserRole) => void
  toggleLike: (id: string) => void
  toggleBookmark: (id: string) => void
  goToPlace: (id: string) => void
  addBooking: (booking: Omit<Booking, "id" | "status">) => void
  login: (role: UserRole) => void
  logout: () => void
}

const AppStateContext = createContext<AppState | null>(null)
const AppActionsContext = createContext<AppActions | null>(null)

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
  const placesRef = useRef(places)
  placesRef.current = places

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
      status: "confirmed",
    }
    setBookings((prev) => [newBooking, ...prev])
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === bookingData.placeId ? { ...p, visited: true } : p
      )
    )
  }, [])

  const goToPlace = useCallback((id: string) => {
    const index = placesRef.current.findIndex((p) => p.id === id)
    if (index === -1) return

    setActivePlaceIndex(index)
    setActiveView("discover")

    requestAnimationFrame(() => {
      const container = feedScrollRef.current
      if (!container) return
      const card = container.querySelectorAll("[data-place-card]")[index]
      card?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }, [])

  const setRole = useCallback((role: UserRole) => {
    setUserRole(role)
    setActiveView(role === "business" ? "analytics" : "discover")
  }, [])

  const state = useMemo<AppState>(
    () => ({
      places,
      bookings,
      activeView,
      activePlaceIndex,
      isAuthenticated,
      userRole,
      feedScrollRef,
    }),
    [places, bookings, activeView, activePlaceIndex, isAuthenticated, userRole]
  )

  const actions = useMemo<AppActions>(
    () => ({
      setActiveView,
      setActivePlaceIndex,
      setRole,
      toggleLike,
      toggleBookmark,
      goToPlace,
      addBooking,
      login,
      logout,
    }),
    [
      toggleLike,
      toggleBookmark,
      goToPlace,
      addBooking,
      login,
      logout,
      setRole,
    ]
  )

  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        {children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error("useAppState must be used within AppProvider")
  return ctx
}

export function useAppActions(): AppActions {
  const ctx = useContext(AppActionsContext)
  if (!ctx) throw new Error("useAppActions must be used within AppProvider")
  return ctx
}

/** Full store — prefer useAppState / useAppActions when you only need one side. */
export function useApp(): AppState & AppActions {
  return { ...useAppState(), ...useAppActions() }
}
