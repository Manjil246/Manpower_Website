"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Job {
  id: number
  title: string
  company: string
  location: string
  country: string
  salary: string
  job_type: string
  category: string
  status: string
  description: string
  requirements: string[]
  benefits: string[]
  image_url: string
  created_at: string
  updated_at: string
}

export interface JobCategory {
  id: number
  name: string
  icon: string
  color: string
  job_count: number
  description?: string
  average_salary?: string
  top_countries?: string[]
  created_at: string
}

export interface JobApplication {
  id: number
  name: string
  email: string
  phone: string
  job_id: number
  job_title: string
  company: string
  location: string
  status: string
  applied_date: string
  experience: string
  passport_status: string
  cv_url?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  job_title: string
  location: string
  rating: number
  testimonial: string
  image_url: string
  is_featured: boolean
  category: string
  salary?: string
  created_at: string
}

export interface CompanyStats {
  id: number
  workers_placed: number
  countries_served: number
  years_experience: number
  success_rate: number
  updated_at: string
}

export interface ContactInquiry {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}

export interface AdminUser {
  id: number
  username: string
  email: string
  role: string
  is_active: boolean
  last_login: string
  created_at: string
}

// Real-time hooks
export const useRealtimeJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })

      if (data && !error) {
        setJobs(data)
      }
      setLoading(false)
    }

    fetchJobs()

    const subscription = supabase
      .channel("jobs_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "jobs" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setJobs((prev) => [payload.new as Job, ...prev])
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

  return { jobs, loading }
}

export const useRealtimeJobApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (data && !error) {
        setApplications(data)
      }
      setLoading(false)
    }

    fetchApplications()

    const subscription = supabase
      .channel("job_applications_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "job_applications" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setApplications((prev) => [payload.new as JobApplication, ...prev])
        } else if (payload.eventType === "UPDATE") {
          setApplications((prev) =>
            prev.map((app) => (app.id === payload.new.id ? (payload.new as JobApplication) : app)),
          )
        } else if (payload.eventType === "DELETE") {
          setApplications((prev) => prev.filter((app) => app.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { applications, loading }
}

export const useRealtimeTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })

      if (data && !error) {
        setTestimonials(data)
      }
      setLoading(false)
    }

    fetchTestimonials()

    const subscription = supabase
      .channel("testimonials_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "testimonials" }, (payload) => {
        if (payload.eventType === "INSERT" && payload.new.is_featured) {
          setTestimonials((prev) => [payload.new as Testimonial, ...prev])
        } else if (payload.eventType === "UPDATE") {
          setTestimonials((prev) =>
            prev.map((testimonial) => (testimonial.id === payload.new.id ? (payload.new as Testimonial) : testimonial)),
          )
        } else if (payload.eventType === "DELETE") {
          setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { testimonials, loading }
}

export const useRealtimeStats = () => {
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

  return { stats, loading }
}

export const useRealtimeJobCategories = () => {
  const [categories, setCategories] = useState<JobCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("job_categories").select("*").order("job_count", { ascending: false })

      if (data && !error) {
        setCategories(data)
      }
      setLoading(false)
    }

    fetchCategories()

    const subscription = supabase
      .channel("job_categories_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "job_categories" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setCategories((prev) => [...prev, payload.new as JobCategory])
        } else if (payload.eventType === "UPDATE") {
          setCategories((prev) => prev.map((cat) => (cat.id === payload.new.id ? (payload.new as JobCategory) : cat)))
        } else if (payload.eventType === "DELETE") {
          setCategories((prev) => prev.filter((cat) => cat.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { categories, loading }
}

// Helper functions for database operations
export const updateApplicationStatus = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from("job_applications")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  return { data, error }
}

export const createJob = async (jobData: Omit<Job, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase.from("jobs").insert([jobData]).select()

  return { data, error }
}

export const updateJob = async (id: number, jobData: Partial<Job>) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({ ...jobData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  return { data, error }
}

export const deleteJob = async (id: number) => {
  const { data, error } = await supabase.from("jobs").delete().eq("id", id)

  return { data, error }
}

export const submitContactInquiry = async (inquiryData: Omit<ContactInquiry, "id" | "status" | "created_at">) => {
  const { data, error } = await supabase.from("contact_inquiries").insert([inquiryData]).select()

  return { data, error }
}
