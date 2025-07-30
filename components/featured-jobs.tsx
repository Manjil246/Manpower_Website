"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, DollarSign, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { supabase, type Job } from "@/lib/supabase"

export function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(6)

      if (data && !error) {
        setJobs(data)
      }
      setLoading(false)
    }

    fetchJobs()

    // Real-time subscription
    const subscription = supabase
      .channel("featured_jobs_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "jobs" }, (payload) => {
        if (payload.eventType === "INSERT" && payload.new.status === "active") {
          setJobs((prev) => [payload.new as Job, ...prev.slice(0, 5)])
        } else if (payload.eventType === "UPDATE") {
          setJobs((prev) => prev.map((job) => (job.id === payload.new.id ? (payload.new as Job) : job)))
        } else if (payload.eventType === "DELETE") {
          setJobs((prev) => prev.filter((job) => job.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const nextJobs = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, jobs.length - 2))
  }

  const prevJobs = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, jobs.length - 2)) % Math.max(1, jobs.length - 2))
  }

  const handleWhatsAppContact = (job: Job) => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210"
    const message = `Hello! I'm interested in the ${job.title} position at ${job.company}. Can you provide more information?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Jobs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest job opportunities with competitive salaries and excellent benefits.
          </p>
        </div>

        {jobs.length > 0 ? (
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(currentIndex, currentIndex + 3).map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={job.image_url || "/placeholder.svg?height=200&width=300"}
                      alt={job.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{job.job_type}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{job.company}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.salary}
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {jobs.length > 3 && (
              <>
                <button
                  onClick={prevJobs}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-background shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextJobs}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-background shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No featured jobs available at the moment.</p>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8">
          <Link href="/jobs">
            <Button size="lg">View All Jobs</Button>
          </Link>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <Image
                src={selectedJob.image_url || "/placeholder.svg"}
                alt={selectedJob.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 text-xl w-10 h-10 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
                  <p className="text-xl text-muted-foreground">{selectedJob.company}</p>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {selectedJob.job_type}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{selectedJob.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Salary</p>
                    <p className="text-muted-foreground">{selectedJob.salary}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-muted-foreground">{selectedJob.job_type}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                  <p className="text-muted-foreground mb-6">{selectedJob.description}</p>

                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div>
                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-3">Benefits & Perks:</h4>
                      <ul className="space-y-2 mb-6">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/want-job" className="flex-1">
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  size="lg"
                  onClick={() => handleWhatsAppContact(selectedJob)}
                >
                  Contact via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
