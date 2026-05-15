"use client"

import { Sidebar } from "@/components/revu/sidebar"
import { DiscoverFeed } from "@/components/revu/discover-feed"
import { RightPanel } from "@/components/revu/right-panel"
import { LiveMapView } from "@/components/revu/live-map-view"
import { MyPlansView } from "@/components/revu/my-plans-view"
import { AnalyticsView } from "@/components/revu/analytics-view"
import { useApp } from "@/lib/AppContext"
import { AnimatePresence, motion } from "framer-motion"

import { AuthPage } from "@/components/revu/auth-page"

function CenterView() {
  const { activeView } = useApp()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeView}
        className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto pb-10 border-r border-white/10 bg-[#0B0B10]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >
        <div className="w-full flex-1 flex flex-col min-h-0">
          {activeView === "discover" && <DiscoverFeed />}
          {activeView === "livemap" && <LiveMapView />}
          {activeView === "myplans" && <MyPlansView />}
          {activeView === "analytics" && <AnalyticsView />}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function DashboardLayout() {
  const { userRole } = useApp()

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
  const { isAuthenticated } = useApp()

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="auth"
          className="min-h-screen h-screen bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <AuthPage />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <DashboardLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
