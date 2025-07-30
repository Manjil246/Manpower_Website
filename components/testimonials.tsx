"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase, type Testimonial } from "@/lib/supabase"

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })

      if (data && !error) {
        setTestimonials(data)
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((t) => t.category).filter(Boolean))]
        setCategories(uniqueCategories)
      }
      setLoading(false)
    }

    fetchTestimonials()

    // Real-time subscription
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

  const filteredTestimonials =
    selectedCategory === "All" ? testimonials : testimonials.filter((t) => t.category === selectedCategory)

  useEffect(() => {
    if (filteredTestimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [filteredTestimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-6" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-6" />
                  <div className="flex items-center justify-center mb-4 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="text-left">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Workers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our successfully placed workers who are now building their careers abroad.
          </p>
        </div>

        {categories.length > 1 && (
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-8">
              {categories.slice(0, 5).map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="max-w-4xl mx-auto">
                  {filteredTestimonials.length > 0 ? (
                    <div className="relative">
                      <Card className="overflow-hidden">
                        <CardContent className="p-8">
                          <div className="text-center">
                            <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50" />

                            <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic leading-relaxed">
                              "{filteredTestimonials[currentIndex]?.testimonial}"
                            </blockquote>

                            <div className="flex items-center justify-center mb-4">
                              {[...Array(filteredTestimonials[currentIndex]?.rating || 5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                              ))}
                            </div>

                            <div className="flex items-center justify-center space-x-4 mb-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage
                                  src={filteredTestimonials[currentIndex]?.image_url || "/placeholder.svg"}
                                  alt={filteredTestimonials[currentIndex]?.name}
                                />
                                <AvatarFallback>
                                  {filteredTestimonials[currentIndex]?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                <h4 className="font-semibold text-lg">{filteredTestimonials[currentIndex]?.name}</h4>
                                <p className="text-muted-foreground">{filteredTestimonials[currentIndex]?.job_title}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {filteredTestimonials[currentIndex]?.location}
                                  </Badge>
                                  {filteredTestimonials[currentIndex]?.salary && (
                                    <Badge variant="secondary" className="text-xs">
                                      {filteredTestimonials[currentIndex]?.salary}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Navigation Arrows */}
                      {filteredTestimonials.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-transparent"
                            onClick={prevTestimonial}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-transparent"
                            onClick={nextTestimonial}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No testimonials available for this category.</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Indicators */}
                  {filteredTestimonials.length > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
                      {filteredTestimonials.map((_, index) => (
                        <Button
                          key={index}
                          variant={index === currentIndex ? "default" : "outline"}
                          size="sm"
                          className="w-3 h-3 rounded-full p-0"
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  )
}
