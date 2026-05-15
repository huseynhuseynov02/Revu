"use client"

import { Sparkles, Users, Music, Activity, Star, TrendingUp, Heart, CheckCircle2, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsView() {
  return (
    <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto w-full bg-transparent pb-10 custom-scrollbar">
      {/* Header */}
      <div className="mb-10 flex-shrink-0 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <motion.div 
            className="flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#3B82F6]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Revu AI Insights
            </div>
            <span className="text-slate-400 text-sm font-medium">Last updated: Just now</span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-medium text-slate-100 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Here is your AI Business Intelligence<br/>
            <span className="text-slate-400">for Cangi Cafe</span>
          </motion.h1>
        </div>

        {/* Live Vibe Score */}
        <motion.div 
          className="bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl flex items-center gap-5 border border-white/10 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Overall Vibe Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]" style={{ fontFamily: "var(--font-display)" }}>8.4</span>
              <span className="text-slate-500 font-medium text-lg">/10</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/20">
            <Heart className="w-6 h-6 text-[#10B981] fill-[#10B981]/20" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
        {/* Card 1: Ambiance & Environment */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl rounded-3xl card-pad border border-white/10 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Music className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
                Ambiance & Environment
              </h3>
              <p className="text-sm text-slate-400 font-normal mt-0.5">How your guests feel in your space</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm mb-3 items-end">
                <span className="text-slate-200 font-medium">Music Volume</span>
                <span className="text-slate-400 font-normal">Moderate</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
                <motion.div className="h-full bg-gradient-to-r from-[#F43F5E] to-rose-400 rounded-full" initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.2, delay: 0.4 }} />
              </div>
              <p className="text-sm text-slate-400 mt-3 font-normal leading-relaxed flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                A bit loud after 9 PM. Consider lowering it for better conversations.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-3 items-end">
                <span className="text-slate-200 font-medium">Lighting Vibe</span>
                <span className="text-[#10B981] font-medium">Excellent</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
                <motion.div className="h-full bg-gradient-to-r from-[#10B981] to-emerald-400 rounded-full" initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.2, delay: 0.5 }} />
              </div>
              <p className="text-sm text-slate-400 mt-3 font-normal leading-relaxed flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                Perfectly rated for dates! Guests love the warm aesthetic.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Staff & Worker Insight */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl rounded-3xl card-pad border border-white/10 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Users className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
                Staff & Service Quality
              </h3>
              <p className="text-sm text-slate-400 font-normal mt-0.5">Mentions and team performance</p>
            </div>
          </div>

          <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/10 rounded-2xl p-6 mb-5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-[#3B82F6]/10 flex-shrink-0">
                <Star className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]/20" />
              </div>
              <div>
                <h4 className="text-slate-200 font-medium mb-1.5">Staff Highlight: Alex the Bartender</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                  Alex received <strong className="text-slate-200 font-semibold">14 compliments</strong> this week for their signature cocktails and friendly attitude.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-white/5 flex-shrink-0">
                <Activity className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h4 className="text-slate-200 font-medium mb-1.5">Overall Response Time</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                  Waitstaff response time is <strong className="text-[#10B981] font-semibold">optimal</strong>. Guests feel attended to without feeling rushed.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Foot Traffic & Demographics */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl rounded-3xl card-pad border border-white/10 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
                Foot Traffic & Crowd
              </h3>
              <p className="text-sm text-slate-400 font-normal mt-0.5">Live check-ins and demographic trends</p>
            </div>
          </div>

          <div className="h-40 flex items-end gap-3 mt-4 relative mb-8">
            {/* Smooth Curved Area Chart */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="smoothArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
              {/* Smooth Actual Area */}
              <path
                d="M0,90 C20,90 30,50 50,50 C70,50 80,30 100,40 L100,100 L0,100 Z"
                fill="url(#smoothArea)"
              />
              <motion.path
                d="M0,90 C20,90 30,50 50,50 C70,50 80,30 100,40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0px 4px 10px rgba(59,130,246,0.3))" }}
              />
            </svg>
            
            {/* Grid lines & Labels */}
            <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-slate-700/50 pb-6 pl-3">
              <div className="w-full h-px bg-slate-800/50" />
              <div className="w-full h-px bg-slate-800/50" />
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-[11px] text-slate-500 pl-3 font-medium">
              <span>6 PM</span>
              <span>8 PM</span>
              <span>10 PM</span>
              <span>12 AM</span>
            </div>
          </div>

          <div className="bg-[#10B981]/5 rounded-2xl p-5 border border-[#10B981]/10">
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              <strong className="text-slate-100 font-semibold">75%</strong> of your crowd is Gen-Z. Table turnover is healthy at <strong className="text-[#10B981] font-semibold">45 mins</strong>.
            </p>
          </div>
        </motion.div>

        {/* Card 4: AI Recommendations (Soft & Welcoming) */}
        <motion.div
          className="bg-white/[0.03] backdrop-blur-xl rounded-3xl card-pad relative overflow-hidden group shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Subtle Glowing Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] via-transparent to-[#10B981] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
          
          <div className="relative h-full bg-[#0F172A]/95 rounded-[22px] p-8 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 flex items-center justify-center border border-[#3B82F6]/30">
                <Sparkles className="w-7 h-7 text-[#3B82F6]" />
              </div>
              
              <div>
                <h3 className="text-2xl font-medium text-slate-100 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  AI Recommendations
                </h3>
                <p className="text-[#3B82F6] text-sm font-medium">Personalized for your venue</p>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mt-2">
                <p className="text-slate-300 text-[15px] leading-relaxed font-normal">
                  <span className="text-slate-100 font-medium">Hey there! 👋</span> We expect a traffic surge this Saturday at 10 PM. Consider bringing in 2 extra servers and lowering the music slightly to maximize table retention.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
