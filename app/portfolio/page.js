"use client";

import React, { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Portfolio Data
const PORTFOLIO_ITEMS = [
  { id: 1, title: "Fifth Avenue Penthouse", category: "Residential", image: "/images/portfolio-res-1.png", size: "large" },
  { id: 2, title: "The Aspen Chalet", category: "Residential", image: "/images/portfolio-res-2.png", size: "small" },
  { id: 3, title: "Aman Tokyo Lobby", category: "Hospitality", image: "/images/service-detail-1.png", size: "medium" }, // Reused image due to rate limits
  { id: 4, title: "Boutique Flagship Milan", category: "Commercial", image: "/images/service-detail-2.png", size: "large" }, // Reused image due to rate limits
  { id: 5, title: "Private Estate Monaco", category: "Residential", image: "/images/services-hero.png", size: "medium" }, // Reused image due to rate limits
  { id: 6, title: "Nobu Restaurant Kyoto", category: "Hospitality", image: "/images/nobu_kyoto_restaurant.png", size: "small" } // Reused image
];

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality"];

export default function PortfolioPage() {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  useGSAP(() => {
    // Reveal all elements with .gsap-reveal class
    const revealElements = gsap.utils.toArray('.gsap-reveal');
    
    // Immediately hide all reveal elements (before first paint)
    gsap.set(revealElements, { y: 50, opacity: 0 });

    revealElements.forEach((el) => {
      gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Parallax elements
    const parallaxElements = gsap.utils.toArray('.gsap-parallax');
    parallaxElements.forEach((el) => {
      gsap.to(el, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: containerRef });

  // When filter changes, animate gallery items in
  useGSAP(() => {
    if (galleryRef.current) {
      const items = gsap.utils.toArray('.gallery-item', galleryRef.current);
      gsap.fromTo(items, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, { dependencies: [activeFilter], scope: containerRef });

  return (
    <main ref={containerRef} className="bg-background min-h-screen pb-0">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[70svh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src="/images/portfolio-hero.png" 
            alt="Selected Works"
            className="w-full h-full object-cover gsap-parallax absolute inset-0"
            wrapperClassName="w-full h-full"
            overlay={true}
            priority
          />
        </div>
        <div className="relative z-10 text-center px-container mt-16 max-w-4xl mx-auto">
          <span className="text-caption text-white/80 uppercase tracking-widest mb-4 block gsap-reveal">Portfolio</span>
          <h1 className="text-display-lg text-white font-serif mb-6 gsap-reveal">Selected Works.</h1>
          <p className="text-body-lg text-white/90 gsap-reveal">
            A curated collection of our most defining architectural and interior achievements.
          </p>
        </div>
      </section>

      {/* 2. Filter UI & Gallery */}
      <section className="py-section px-container relative bg-background z-20 -mt-10 rounded-t-[40px]">
        <div className="container-base mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16 gsap-reveal">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-small uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
                  activeFilter === category 
                    ? "text-primary border-primary" 
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Gallery Grid */}
          <div ref={galleryRef} className="columns-1 md:columns-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8 min-h-[600px]">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer"
              >
                {/* Dynamically adjust aspect ratio based on 'size' for masonry variety */}
                <div className={`relative w-full ${item.size === 'large' ? 'aspect-[3/4]' : item.size === 'medium' ? 'aspect-square' : 'aspect-[4/3]'}`}>
                  <LuxuryImage 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                    hoverEffect="none"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                    <span className="text-caption uppercase tracking-widest text-white/70 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
                    <h3 className="text-h4 font-serif transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 3. Featured Project */}
      <section className="py-section px-container bg-surface overflow-hidden">
        <div className="container-base mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-4 block">Masterpiece</span>
            <h2 className="text-h2 font-serif">Featured Project</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-8 relative h-[60svh] w-full overflow-hidden rounded-xl gsap-reveal">
               <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                 <LuxuryImage 
                    src="/images/portfolio-hero.png"
                    alt="The Crown Penthouse"
                    className="w-full h-full object-cover absolute inset-0 gsap-parallax"
                    wrapperClassName="w-full h-full"
                  />
               </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 gsap-reveal">
              <h3 className="text-h3 font-serif">The Crown Penthouse</h3>
              <p className="text-body text-muted-foreground">
                Perched above the Manhattan skyline, this 8,000 sq ft penthouse represents the pinnacle of our design philosophy. Custom travertine floors, hand-carved wood paneling, and a meticulously curated art collection create a sanctuary of absolute calm above the city.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-button text-primary hover:text-foreground transition-colors group">
                View Case Study
                <Icon icon={ArrowRight} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Awards & Recognition */}
      <section className="py-section px-container border-t border-border/50">
        <div className="container-content mx-auto text-center">
          <span className="text-caption text-muted-foreground uppercase tracking-widest mb-12 block gsap-reveal">Recognized Globally</span>
          
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale gsap-reveal">
            {/* Using text representations as mock logos for awards */}
            <h4 className="text-h4 font-serif tracking-tight">AD100</h4>
            <h4 className="text-h4 font-serif italic">Elle Decor A-List</h4>
            <h4 className="text-h4 font-sans tracking-widest font-bold">FRAME</h4>
            <h4 className="text-h4 font-serif uppercase tracking-widest">Dezeen</h4>
          </div>
        </div>
      </section>

      {/* 5. Consultation CTA */}
      <section className="py-[120px] px-container bg-foreground text-background text-center">
        <div className="container-content mx-auto gsap-reveal">
          <span className="text-caption text-white/50 uppercase tracking-widest mb-6 block">Take the next step</span>
          <h2 className="text-display-md font-serif mb-6">Commission a Project</h2>
          <p className="text-body-lg text-white/70 mb-12 max-w-xl mx-auto">
            Our waitlist is currently open for full-scale residential and commercial commissions for the upcoming year.
          </p>
          <Button variant="primary" size="lg" className="bg-primary text-primary-foreground hover:bg-white hover:text-foreground">
            Inquire Now
          </Button>
        </div>
      </section>

    </main>
  );
}
