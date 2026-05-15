"use client"

import { Compass, Map, Calendar, BarChart3, Settings, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp, type ActiveView } from "@/lib/AppContext"
import { motion } from "framer-motion"

const menuItems: { icon: typeof Compass; label: string; view: ActiveView }[] = [
  { icon: Compass, label: "Discover", view: "discover" },
  { icon: Map, label: "Live Map", view: "livemap" },
  { icon: Crown, label: "My Bookings", view: "myplans" },
  { icon: BarChart3, label: "Business Insights", view: "analytics" },
]

export function Sidebar() {
  const { activeView, setActiveView, userRole, setRole } = useApp()

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter(item => {
    if (userRole === "business") {
      // Business mode only needs insights
      return item.view === "analytics"
    } else {
      // User mode gets everything except analytics
      return item.view !== "analytics"
    }
  })

  return (
    <aside className="w-72 h-full flex flex-col bg-[#0B0B10] border-r border-white/10 px-6 py-6 relative z-10 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <motion.div
          className="relative w-10 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-[#0057FF] rounded-xl neon-glow" />
          <span className="relative text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>R</span>
          <svg
            className="absolute -top-1 -right-1 w-4 h-4 text-[#0057FF]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
        <span className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>Revu</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto min-h-0 pr-2 scrollbar-hide">
        {filteredMenuItems.map((item) => {
          const isActive = activeView === item.view
          return (
            <motion.button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors duration-200 group relative",
                isActive
                  ? "text-[#0057FF]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-[#0057FF]/12 rounded-xl neon-glow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_rgba(0,87,255,0.8)]"
                )}
              />
              <span className={cn(
                "font-medium text-[15px] relative z-10",
                isActive && "neon-text"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0057FF] shadow-[0_0_8px_rgba(0,87,255,0.8)] relative z-10"
                  layoutId="sidebar-dot"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 flex flex-col gap-4 flex-shrink-0 border-t border-white/10 pb-2">
        {/* Toggle Portal */}
        <motion.button
          onClick={() => setRole(userRole === "user" ? "business" : "user")}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-3.5 font-bold transition-all w-full rounded-xl border relative overflow-hidden group shadow-lg",
            userRole === "user"
              ? "bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/40 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-[#22D3EE]/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
              : "bg-[#0057FF]/20 text-[#0057FF] border-[#0057FF]/40 shadow-[0_0_15px_rgba(0,87,255,0.4)] hover:bg-[#0057FF]/30 hover:shadow-[0_0_25px_rgba(0,87,255,0.6)]"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 uppercase tracking-wide text-xs">
            {userRole === "user" ? "Switch to Business Portal" : "Switch to User Portal"}
          </span>
        </motion.button>

        {/* Settings */}
        <motion.button
          className="flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-zinc-300 transition-colors w-full rounded-xl hover:bg-white/5"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[15px]">Settings</span>
        </motion.button>

        {/* User / Business Profile */}
        {userRole === "business" ? (
          <motion.div
            className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors border border-[#22D3EE]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#0057FF] p-[2px]">
                <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center overflow-hidden relative">
                  <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>NC</span>
                  {/* Subtle glow inside */}
                  <div className="absolute inset-0 bg-[#22D3EE]/20 blur-md" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#09090B] rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-[#22D3EE] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-white truncate" style={{ fontFamily: "var(--font-display)" }}>Neon Club</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase tracking-wider text-[#22D3EE] font-bold bg-[#22D3EE]/10 px-2 py-0.5 rounded-full">Business</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="glass rounded-full p-2 pr-4 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              {/* Using a reliable UI faces URL, removed the old one just in case it caused the 'N' issue */}
              <img
                src="https://i.pravatar.cc/150?u=sarah"
                alt="Sarah"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#09090B] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-[#0057FF] rounded-full shadow-[0_0_8px_rgba(0,87,255,0.6)]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">Sarah C.</p>
              <p className="text-xs text-zinc-500 truncate">Foodie & Explorer</p>
            </div>
          </motion.div>
        )}
      </div>
    </aside>
  )
}
