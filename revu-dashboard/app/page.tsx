"use client"

import dynamic from "next/dynamic"
import { Sidebar } from "@/components/revu/sidebar"
import { useAppState } from "@/lib/AppContext"
import { AuthPage } from "@/components/revu/auth-page"

const DiscoverFeed = dynamic(
  () => import("@/components/revu/discover-feed").then((m) => m.DiscoverFeed),
  { loading: () => <ViewLoading /> }
)
const LiveMapView = dynamic(
  () => import("@/components/revu/live-map-view").then((m) => m.LiveMapView),
  { loading: () => <ViewLoading /> }
)
const MyPlansView = dynamic(
  () => import("@/components/revu/my-plans-view").then((m) => m.MyPlansView),
  { loading: () => <ViewLoading /> }
)
const LoyaltyView = dynamic(
  () => import("@/components/revu/loyalty-view").then((m) => m.LoyaltyView),
  { loading: () => <ViewLoading /> }
)
const AnalyticsView = dynamic(
  () => import("@/components/revu/analytics-view").then((m) => m.AnalyticsView),
  { loading: () => <ViewLoading /> }
)
const RightPanel = dynamic(
  () => import("@/components/revu/right-panel").then((m) => m.RightPanel),
  { loading: () => null }
)

function ViewLoading() {
  return (
    <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
      Loading…
    </div>
  )
}

function CenterView() {
  const { activeView } = useAppState()

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto pb-10 border-r border-white/10 bg-[#0B0B10] view-fade-in">
      {activeView === "discover" && <DiscoverFeed />}
      {activeView === "livemap" && <LiveMapView />}
      {activeView === "myplans" && <MyPlansView />}
      {activeView === "loyalty" && <LoyaltyView />}
      {activeView === "analytics" && <AnalyticsView />}
    </div>
  )
}

function DashboardLayout() {
  const { userRole } = useAppState()

  return (
    <div className="min-h-screen h-screen bg-black overflow-hidden">
      <main className="flex h-full w-full bg-[#09090B] border border-white/10 overflow-hidden">
        <Sidebar />
        <CenterView />
        {userRole !== "business" && <RightPanel />}
      </main>
    </div>
  )
}

export default function Home() {
  const { isAuthenticated } = useAppState()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen h-screen bg-black flex items-center justify-center overflow-hidden">
        <AuthPage />
      </div>
    )
  }

  return <DashboardLayout />
}
