"use client"

import { motion } from "framer-motion"
import { useAppActions } from "@/lib/AppContext"
import { User, Building2, ArrowRight } from "lucide-react"

export function AuthPage() {
  const { login } = useAppActions()

  return (
    <main className="flex h-[calc(100vh-64px)] w-full max-w-[1600px] bg-[#09090B] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-[40px] border border-white/5">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0057FF]/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22D3EE]/8 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 gap-12">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0057FF] rounded-2xl neon-glow animate-glow-pulse" />
            <span
              className="relative text-4xl font-black text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              R
            </span>
          </div>
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Revu
            </h1>
            <p className="text-zinc-500 mt-1 text-sm">Discover your next experience</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* User */}
          <motion.button
            onClick={() => login("user")}
            className="flex-1 flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#0057FF]/40 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0057FF]/0 to-[#0057FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 rounded-2xl bg-[#0057FF]/15 border border-[#0057FF]/20 flex items-center justify-center group-hover:bg-[#0057FF]/25 transition-colors duration-300">
              <User className="w-7 h-7 text-[#0057FF]" />
            </div>
            <div className="text-center relative z-10">
              <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Continue as User
              </p>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Discover spots, save places & follow friends
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#0057FF] group-hover:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>

          {/* Business */}
          <motion.button
            onClick={() => login("business")}
            className="flex-1 flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#22D3EE]/40 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#22D3EE]/0 to-[#22D3EE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center group-hover:bg-[#22D3EE]/20 transition-colors duration-300">
              <Building2 className="w-7 h-7 text-[#22D3EE]" />
            </div>
            <div className="text-center relative z-10">
              <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Continue as Business
              </p>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Manage your venue, analytics & promotions
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-[#22D3EE] group-hover:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>
        </motion.div>
      </div>
    </main>
  )
}
