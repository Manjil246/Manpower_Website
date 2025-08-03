"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dsatsojpo/image/upload/v1754079155/Gemini_Generated_Image_i0cl5bi0cl5bi0cl_qeptck.png",
    title: "Build Your Future Abroad",
    subtitle:
      "Join thousands of Nepalese workers who found success in construction jobs worldwide",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dsatsojpo/image/upload/v1754079117/Gemini_Generated_Image_i0cl5ci0cl5ci0cl_sdfnmq.png",
    title: "Hospitality Opportunities",
    subtitle:
      "Discover rewarding careers in hotels and restaurants across the globe",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dsatsojpo/image/upload/v1754079087/unnamed_yey7mo.png",
    title: "Security & Safety Jobs",
    subtitle:
      "Professional security positions with competitive salaries and benefits",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/want-job">
              <Button size="lg" className="text-lg px-8 py-3">
                Apply Now
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-black"
              >
                View Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
