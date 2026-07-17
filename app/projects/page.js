"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { Icon } from "@/components/common/icon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Mock Projects List
const PROJECTS = [
  {
    id: "fifth-avenue-penthouse",
    title: "Fifth Avenue Penthouse",
    location: "New York City, NY",
    category: "Residential",
    image: "/images/portfolio-hero.png",
    description: "A sanctuary of absolute calm perched above the Manhattan skyline, featuring custom travertine floors and hand-carved wood paneling."
  },
  {
    id: "the-aspen-chalet",
    title: "The Aspen Chalet",
    location: "Aspen, CO",
    category: "Residential",
    image: "/images/portfolio-res-2.png",
    description: "An ultra-luxury mountain retreat blending brutalist architecture with warm, inviting natural textures and monumental glazing."
  },
  {
    id: "boutique-flagship-milan",
    title: "Boutique Flagship",
    location: "Milan, Italy",
    category: "Commercial",
    image: "/images/service-detail-2.png",
    description: "A monolithic and minimalist retail environment designed to elevate the brand experience through pure geometry and light."
  }
];

export default function ProjectsIndexPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal all elements with .gsap-reveal class
    const revealElements = gsap.utils.toArray('.gsap-reveal');
    
    // Immediately hide all reveal elements (before first paint)
    gsap.set(revealElements, { y: 50, opacity: 0 });

    revealElements.forEach((el) => {
      gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.2,
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
    <main ref={containerRef} className="bg-background min-h-screen pt-32 pb-section">
      
      {/* Header */}
      <section className="px-container mb-24 text-center">
        <div className="max-w-4xl mx-auto gsap-reveal">
          <span className="text-caption text-primary uppercase tracking-widest mb-4 block">Case Studies</span>
          <h1 className="text-display-md font-serif mb-6">Our Projects</h1>
          <p className="text-body-lg text-muted-foreground">
            Explore our most prestigious interior and architectural commissions from around the world.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="px-container">
        <div className="container-base mx-auto space-y-32">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center group">
              
              {/* Image (Alternating Left/Right) */}
              <div className={`lg:col-span-8 relative h-[60svh] w-full overflow-hidden rounded-xl cursor-pointer gsap-reveal ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                 <Link href={`/projects/${project.id}`}>
                   <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                     <LuxuryImage 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover absolute inset-0 gsap-parallax transition-transform duration-1000 group-hover:scale-105"
                        wrapperClassName="w-full h-full"
                        hoverEffect="none"
                      />
                   </div>
                 </Link>
              </div>

              {/* Content */}
              <div className={`lg:col-span-4 flex flex-col gap-6 gsap-reveal ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-caption text-primary uppercase tracking-widest block mb-2">{project.category} — {project.location}</span>
                  <h2 className="text-h2 font-serif group-hover:text-primary transition-colors">
                    <Link href={`/projects/${project.id}`}>{project.title}</Link>
                  </h2>
                </div>
                <p className="text-body text-muted-foreground">
                  {project.description}
                </p>
                <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-button text-primary hover:text-foreground transition-colors mt-4">
                  Explore Case Study
                  <Icon icon={ArrowRight} className="transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
