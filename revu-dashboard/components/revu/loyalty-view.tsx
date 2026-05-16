"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Award, BadgePercent, Coins, Gift, MapPin, Sparkles, Ticket } from "lucide-react"
import { useAppState } from "@/lib/AppContext"
import { cn } from "@/lib/utils"

function getLoyaltyCoins(visits: number, isRewarded: boolean) {
  const baseCoins = visits * 120
  return isRewarded ? baseCoins + 300 : baseCoins
}

export function LoyaltyView() {
  const { places, bookings } = useAppState()

  const loyaltyPlaces = useMemo(
    () => places.filter((place) => place.loyaltyReward),
    [places]
  )

  const visitedLoyaltyPlaces = useMemo(
    () => loyaltyPlaces.filter((place) => place.visited),
    [loyaltyPlaces]
  )

  const totalCoins = useMemo(
    () =>
      visitedLoyaltyPlaces.reduce(
        (sum) => sum + getLoyaltyCoins(1, true),
        bookings.length * 40
      ),
    [bookings.length, visitedLoyaltyPlaces]
  )

  const nextReward = loyaltyPlaces.find((place) => !place.visited) ?? loyaltyPlaces[0]

  const coinProgress = Math.min((visitedLoyaltyPlaces.length / Math.max(loyaltyPlaces.length, 1)) * 100, 100)

  const milestones = [
    { label: "Check-ins", value: `${visitedLoyaltyPlaces.length}/${loyaltyPlaces.length || 0}` },
    { label: "Bookings", value: `${bookings.length}` },
    { label: "Redemptions", value: `${Math.max(Math.floor(totalCoins / 500), 0)}` },
  ]

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto w-full bg-transparent pb-12 custom-scrollbar">
      <div className="px-8 pt-8 pb-8 flex-shrink-0">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" />
          Loyalty rewards
        </motion.div>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              Your Coins
            </motion.h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Collect coins by visiting rewarded spots, completing bookings, and unlocking partner offers.
            </p>
          </div>

          <motion.div
            className="min-w-[220px] rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#FBBF24] border border-white/10">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {totalCoins}
                  </span>
                  <span className="text-sm font-medium text-slate-400">coins</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.section
          className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Progress to the next drop
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 max-w-xl">
                Finish more visits to unlock cashback, perks, and special offers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-left xl:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Next reward</p>
              <p className="mt-1 text-sm font-medium text-slate-100 leading-relaxed">{nextReward?.loyaltyReward ?? "Keep exploring for more rewards"}</p>
            </div>
          </div>

          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
              initial={{ width: 0 }}
              animate={{ width: `${coinProgress}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {milestones.map((milestone) => (
              <div key={milestone.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">{milestone.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100" style={{ fontFamily: "var(--font-display)" }}>
                  {milestone.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {loyaltyPlaces.map((place, index) => {
              const earned = place.visited
              return (
                <motion.div
                  key={place.id}
                  className={cn(
                    "flex items-center gap-4 rounded-3xl border p-4 transition-colors",
                    earned
                      ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                      : "border-white/8 bg-white/[0.02]"
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-800 flex-shrink-0 border border-white/5">
                    <img src={place.videoThumbnail} alt={place.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-slate-100">{place.name}</h3>
                      {earned ? (
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          Collected
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Available
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-400 leading-relaxed">{place.loyaltyReward}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-200">
                      <Coins className="h-4 w-4 text-[#FBBF24]" />
                      {earned ? "+420" : "+120"}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <motion.aside
          className="space-y-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-300 border border-white/10">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Redeemable perks
                </h3>
                <p className="text-sm text-slate-400">What your current coins can unlock</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                { name: "Free upgrade drink", cost: 300 },
                { name: "Priority booking", cost: 500 },
                { name: "Cashback voucher", cost: 800 },
              ].map((perk) => (
                <div key={perk.name} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <span className="text-sm font-medium text-slate-200">{perk.name}</span>
                  <span className="text-sm font-semibold text-slate-400">{perk.cost} coins</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-300 border border-white/10">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Featured reward
                </h3>
                <p className="text-sm text-slate-400">Most recently unlocked partner deal</p>
              </div>
            </div>
            <div className="mt-5 rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                <BadgePercent className="h-3.5 w-3.5 text-[#FBBF24]" />
                Cashback offer
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Visit {nextReward?.name ?? "partner spots"} to keep stacking coins toward cashback and table perks.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {nextReward?.distance ?? "Nearby rewards available"}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-300 border border-white/10">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  How it works
                </h3>
                <p className="text-sm text-slate-400">Simple actions that earn rewards</p>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">Check in to rewarded venues to earn coins automatically.</li>
              <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">Complete bookings for extra bonus coins.</li>
              <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">Reach redemption thresholds to unlock cashback and perks.</li>
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}