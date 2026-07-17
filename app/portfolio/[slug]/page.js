"use client";

import React, { useRef, use } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { FeatureCard, TestimonialCard } from "@/components/ui/card";
import { BeforeAfterSlider } from "@/components/ui/before-after";
import { Icon } from "@/components/common/icon";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Mock Data for the template
const PROJECT_DATA = {
  title: "Fifth Avenue Penthouse",
  location: "New York City, NY",
  client: "Private Family",
  scope: "Full Interior Architecture & Furnishing",
  size: "8,500 sq ft",
  completed: "Fall 2023",
  heroImage: "/images/portfolio-hero.png",
  overview: "Perched above the Manhattan skyline, this 8,000 sq ft penthouse represents the pinnacle of our design philosophy. The clients desired a sanctuary that felt removed from the chaos of the city, yet deeply connected to its breathtaking panoramic views. We completely gutted the original structure to create a flowing, open-plan layout characterized by custom travertine floors, hand-carved wood paneling, and a meticulously curated art collection.",
  gallery: [
    "/images/portfolio-res-2.png",
    "/images/service-detail-1.png",
    "/images/service-detail-3.png"
  ],
  beforeImage: "/images/hero-bg-2.jpg", // Using as mock before
  afterImage: "/images/portfolio-res-1.png",
  challenges: [
    { title: "Structural Limitations", desc: "The original 1980s layout featured low drop ceilings and obstructive structural columns that broke the visual flow." },
    { title: "Acoustic Isolation", desc: "Being in the heart of Manhattan, achieving absolute silence required commercial-grade acoustic treatments." }
  ],
  solutions: [
    { title: "Architectural Redesign", desc: "We raised the ceilings by 3 feet and clad the structural columns in seamless bookmatched marble to turn them into sculptural features." },
    { title: "Sound Mitigation", desc: "Implementation of floating floors and specialized acoustic drywall ensured a serene, library-like atmosphere." }
  ],
  timeline: [
    { phase: "Concept & Planning", duration: "3 Months" },
    { phase: "Demolition & Architecture", duration: "6 Months" },
    { phase: "Bespoke Fabrication", duration: "4 Months" },
    { phase: "Installation & Styling", duration: "1 Month" }
  ],
  materials: [
    { name: "Honed Roman Travertine", image: "/images/service-detail-2.png" }, // Reusing for texture
    { name: "Fumed Walnut", image: "/images/service-detail-1.png" },
    { name: "Brushed Unlacquered Brass", image: "/images/portfolio-res-2.png" }
  ],
  testimonial: {
    quote: "LuxeSpace didn't just redesign our home; they fundamentally changed how we experience our daily lives. The peace and clarity we feel walking through the door is indescribable.",
    author: "M. & S. Reynolds",
    title: "Homeowners"
  }
};

export default function ProjectDetailsPage({ params }) {
  const containerRef = useRef(null);
  
  // Unwrap params using React.use() as per Next.js 15+ patterns for async params if needed, 
  // but here we just safely mock it.
  const resolvedParams = use(params); 
  const slug = resolvedParams.slug; // Could be used to fetch real data

  useGSAP(() => {
    // Reveal all elements with .gsap-reveal class
    const revealElements = gsap.utils.toArray('.gsap-reveal');
    
    // Immediately hide all reveal elements (before first paint)
    gsap.set(revealElements, { y: 40, opacity: 0 });

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

  return (
    <main ref={containerRef} className="bg-background min-h-screen pb-0">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[90svh] w-full overflow-hidden flex items-end pb-24">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src={PROJECT_DATA.heroImage} 
            alt={PROJECT_DATA.title}
            className="w-full h-full object-cover gsap-parallax absolute inset-0"
            wrapperClassName="w-full h-full"
            overlay={true}
            priority
          />
        </div>
        <div className="relative z-10 px-container w-full max-w-[1440px] mx-auto">
          <span className="text-caption text-white/80 uppercase tracking-widest mb-4 block gsap-reveal">
            {PROJECT_DATA.location}
          </span>
          <h1 className="text-display-lg text-white font-serif gsap-reveal">
            {PROJECT_DATA.title}
          </h1>
        </div>
      </section>

      {/* 2. Project Overview */}
      <section className="py-section px-container bg-background">
        <div className="container-base mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Stats Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {[
                { label: "Client", value: PROJECT_DATA.client },
                { label: "Scope", value: PROJECT_DATA.scope },
                { label: "Size", value: PROJECT_DATA.size },
                { label: "Completed", value: PROJECT_DATA.completed }
              ].map((stat, i) => (
                <div key={i} className="gsap-reveal border-t border-border/50 pt-4">
                  <div className="text-caption text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-body text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <h2 className="text-h3 font-serif mb-8 leading-tight gsap-reveal">
                {PROJECT_DATA.overview}
              </h2>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Image Gallery */}
      <section className="pb-section px-container">
        <div className="container-base mx-auto space-y-6 lg:space-y-8">
          {PROJECT_DATA.gallery.map((img, i) => (
            <div key={i} className={`relative w-full overflow-hidden rounded-xl gsap-reveal ${i % 2 === 0 ? 'h-[70vh]' : 'h-[50vh]'}`}>
               <LuxuryImage 
                  src={img} 
                  alt={`${PROJECT_DATA.title} Gallery Image ${i+1}`}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                  hoverEffect="zoom"
                />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Before & After */}
      <section className="py-section px-container bg-surface overflow-hidden">
        <div className="container-base mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-4 block">Transformation</span>
            <h2 className="text-h2 font-serif">Before & After</h2>
          </div>
          
          <div className="gsap-reveal">
            <BeforeAfterSlider 
              beforeImage={PROJECT_DATA.beforeImage} 
              afterImage={PROJECT_DATA.afterImage} 
              beforeLabel="Existing Shell"
              afterLabel="Completed Design"
            />
          </div>
        </div>
      </section>

      {/* 5. Challenges & Solutions */}
      <section className="py-section px-container">
        <div className="container-content mx-auto">
          <div className="mb-16 gsap-reveal text-center">
            <h2 className="text-h2 font-serif">The Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-12">
              <h3 className="text-h4 font-serif text-muted-foreground border-b border-border/50 pb-4 gsap-reveal">Challenges</h3>
              {PROJECT_DATA.challenges.map((item, i) => (
                <div key={i} className="gsap-reveal">
                  <h4 className="text-h5 font-serif mb-3">{item.title}</h4>
                  <p className="text-body text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-12">
              <h3 className="text-h4 font-serif text-primary border-b border-border/50 pb-4 gsap-reveal">Solutions</h3>
              {PROJECT_DATA.solutions.map((item, i) => (
                <div key={i} className="gsap-reveal">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon icon={CheckCircle2} size="sm" className="text-primary" />
                    <h4 className="text-h5 font-serif">{item.title}</h4>
                  </div>
                  <p className="text-body text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Materials */}
      <section className="py-section px-container bg-surface">
        <div className="container-base mx-auto">
          <div className="mb-16 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-4 block">The Palette</span>
            <h2 className="text-h2 font-serif">Bespoke Materials</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECT_DATA.materials.map((mat, i) => (
              <div key={i} className="flex flex-col gap-4 gsap-reveal group">
                <div className="relative aspect-square overflow-hidden rounded-full max-w-[200px]">
                  <LuxuryImage 
                    src={mat.image} 
                    alt={mat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    wrapperClassName="w-full h-full"
                    hoverEffect="none"
                  />
                </div>
                <h4 className="text-h6 font-serif">{mat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Timeline */}
      <section className="py-section px-container">
        <div className="container-content mx-auto">
           <div className="text-center mb-16 gsap-reveal">
            <h2 className="text-h2 font-serif">Project Timeline</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between relative">
             <div className="hidden md:block absolute top-[23px] left-0 right-0 h-[1px] bg-border/50 z-0" />
             {PROJECT_DATA.timeline.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4 relative z-10 mb-8 md:mb-0 gsap-reveal">
                  <div className="w-12 h-12 rounded-full bg-background border border-primary text-primary flex items-center justify-center font-serif text-small">
                    0{i+1}
                  </div>
                  <div>
                    <h4 className="text-h6 font-serif">{item.phase}</h4>
                    <span className="text-caption text-muted-foreground uppercase tracking-widest">{item.duration}</span>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonial */}
      <section className="py-section px-container bg-surface/50">
        <div className="container-content mx-auto gsap-reveal">
          <TestimonialCard 
            quote={PROJECT_DATA.testimonial.quote}
            author={PROJECT_DATA.testimonial.author}
            title={PROJECT_DATA.testimonial.title}
          />
        </div>
      </section>

      {/* 9. Next Project Footer */}
      <section className="relative h-[60svh] w-full overflow-hidden flex items-center justify-center cursor-pointer group">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src="/images/portfolio-res-2.png" 
            alt="Next Project"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            wrapperClassName="w-full h-full"
            overlay={true}
            hoverEffect="none"
          />
        </div>
        <div className="relative z-10 text-center px-container">
          <span className="text-caption text-white/70 uppercase tracking-widest mb-4 block">Next Project</span>
          <h2 className="text-h1 text-white font-serif mb-6 group-hover:text-primary transition-colors duration-300">
            The Aspen Chalet
          </h2>
          <Link href="/portfolio/the-aspen-chalet" className="inline-flex items-center gap-2 text-button text-white hover:text-primary transition-colors">
            View Case Study
            <Icon icon={ArrowRight} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-[120px] px-container bg-foreground text-background text-center">
        <div className="container-content mx-auto gsap-reveal">
          <span className="text-caption text-white/50 uppercase tracking-widest mb-6 block">Take the next step</span>
          <h2 className="text-display-md font-serif mb-6">Commission a Project</h2>
          <Button variant="primary" size="lg" className="bg-primary text-primary-foreground hover:bg-white hover:text-foreground">
            Inquire Now
          </Button>
        </div>
      </section>

    </main>
  );
}
