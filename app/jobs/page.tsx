"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, DollarSign, Clock, Search, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase, type Job } from "@/lib/supabase";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setJobs(data);
        // Extract unique categories and locations
        const uniqueCategories = [
          "All",
          ...new Set(data.map((job) => job.category)),
        ];
        const uniqueLocations = [
          "All",
          ...new Set(data.map((job) => job.country)),
        ];
        setCategories(uniqueCategories);
        setLocations(uniqueLocations);
      }
      setLoading(false);
    };

    fetchJobs();

    // Real-time subscription
    const subscription = supabase
      .channel("jobs_page_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        (payload) => {
          if (
            payload.eventType === "INSERT" &&
            payload.new.status === "active"
          ) {
            setJobs((prev) => [payload.new as Job, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setJobs((prev) =>
              prev.map((job) =>
                job.id === payload.new.id ? (payload.new as Job) : job
              )
            );
          } else if (payload.eventType === "DELETE") {
            setJobs((prev) => prev.filter((job) => job.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All" || job.country === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleWhatsAppContact = (job: Job) => {
    const phoneNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+9779876543210";
    const message = `Hello! I'm interested in the ${job.title} position at ${job.company}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-64 mx-auto mb-6" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Available Jobs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our latest job opportunities across 15+ countries with
              competitive salaries and excellent benefits.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
                onClick={() => setSelectedJob(job)}
              >
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={
                      job.image_url || "/placeholder.svg?height=250&width=400"
                    }
                    alt={job.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-xl font-bold text-center px-4">
                        {job.title}
                      </h3>
                    </div>
                  </div>
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

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No jobs found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

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
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    {selectedJob.company}
                  </p>
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
                    <p className="text-muted-foreground">
                      {selectedJob.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Salary</p>
                    <p className="text-muted-foreground">
                      {selectedJob.salary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-muted-foreground">
                      {selectedJob.job_type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Job Description
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedJob.description}
                  </p>

                  {selectedJob.requirements &&
                    selectedJob.requirements.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
