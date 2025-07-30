"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Globe, Calendar, Award } from "lucide-react"
import { supabase, type CompanyStats } from "@/lib/supabase"

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

export function StatsCounter() {
  const [stats, setStats] = useState<CompanyStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("company_stats").select("*").single()

      if (data && !error) {
        setStats(data)
      }
      setLoading(false)
    }

    fetchStats()

    // Real-time subscription
    const subscription = supabase
      .channel("stats_channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "company_stats" }, (payload) => {
        setStats(payload.new as CompanyStats)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const statsData = [
    {
      icon: Users,
      label: "Workers Placed",
      value: stats?.workers_placed || 0,
      suffix: "+",
      color: "from-slate-600 to-slate-700",
    },
    {
      icon: Globe,
      label: "Countries",
      value: stats?.countries_served || 0,
      suffix: "+",
      color: "from-slate-600 to-slate-700",
    },
    {
      icon: Calendar,
      label: "Years Experience",
      value: stats?.years_experience || 0,
      suffix: "+",
      color: "from-slate-600 to-slate-700",
    },
    {
      icon: Award,
      label: "Success Rate",
      value: stats?.success_rate || 0,
      suffix: "%",
      color: "from-slate-600 to-slate-700",
    },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence and success in foreign employment services.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-sm md:text-base opacity-90">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
