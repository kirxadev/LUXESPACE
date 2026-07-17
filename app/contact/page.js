"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { FormField, Input, Textarea, Radio, Checkbox } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/icon";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "residential",
    budget: "",
    message: "",
    newsletter: false
  });

  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setFormStatus({ submitted: true, error: false });
    setTimeout(() => {
      setFormStatus({ submitted: false, error: false });
      setFormData({ name: "", email: "", projectType: "residential", budget: "", message: "", newsletter: false });
    }, 4000);
  };

  return (
    <main ref={containerRef} className="bg-background min-h-screen pb-0">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[60svh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src="/images/services-hero.png" // Fallback luxury image
            alt="Get in Touch"
            className="w-full h-full object-cover gsap-parallax absolute inset-0 opacity-80"
            wrapperClassName="w-full h-full bg-black"
            overlay={true}
            priority
          />
        </div>
        <div className="relative z-10 text-center px-container mt-16 max-w-3xl mx-auto">
          <span className="text-caption text-white/80 uppercase tracking-widest mb-4 block gsap-reveal">Contact Us</span>
          <h1 className="text-display-lg text-white font-serif mb-6 gsap-reveal">Get in Touch.</h1>
          <p className="text-body-lg text-white/90 gsap-reveal">
            We look forward to discussing your next vision and how LuxeSpace can bring it to life.
          </p>
        </div>
      </section>

      {/* 2. Contact Information & Form Split */}
      <section className="py-section px-container relative bg-background z-20 -mt-10 rounded-t-[40px]">
        <div className="container-base mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-4 flex flex-col gap-16">
              
              <div className="gsap-reveal">
                <h3 className="text-h4 font-serif mb-6">General Inquiries</h3>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <a href="mailto:studio@luxespace.com" className="flex items-center gap-4 hover:text-primary transition-colors">
                    <Icon icon={Mail} size="sm" /> studio@luxespace.com
                  </a>
                  <a href="tel:+12125550198" className="flex items-center gap-4 hover:text-primary transition-colors">
                    <Icon icon={Phone} size="sm" /> +1 (212) 555-0198
                  </a>
                </div>
              </div>

              <div className="gsap-reveal">
                <h3 className="text-h4 font-serif mb-6">Press & Media</h3>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <a href="mailto:press@luxespace.com" className="flex items-center gap-4 hover:text-primary transition-colors">
                    <Icon icon={Mail} size="sm" /> press@luxespace.com
                  </a>
                </div>
              </div>

              <div className="gsap-reveal">
                <h3 className="text-h4 font-serif mb-6">Connect</h3>
                <div className="flex gap-8 text-body text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors tracking-widest uppercase text-small">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-primary transition-colors tracking-widest uppercase text-small">
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Luxury Form */}
            <div className="lg:col-span-8">
              <div className="bg-surface p-8 md:p-16 rounded-2xl gsap-reveal">
                <div className="mb-12">
                  <h2 className="text-h3 font-serif mb-4">Project Inquiry</h2>
                  <p className="text-body text-muted-foreground">Please provide details about your upcoming project. Our studio director will respond within 48 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <FormField label="Full Name *">
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Jane Doe" 
                        required 
                      />
                    </FormField>
                    <FormField label="Email Address *">
                      <Input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="jane@example.com" 
                        required 
                      />
                    </FormField>
                  </div>

                  <FormField label="Project Type">
                    <div className="flex flex-wrap gap-8 mt-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <Radio 
                          name="projectType" 
                          value="residential" 
                          checked={formData.projectType === 'residential'}
                          onChange={handleChange}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">Residential</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <Radio 
                          name="projectType" 
                          value="commercial" 
                          checked={formData.projectType === 'commercial'}
                          onChange={handleChange}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">Commercial</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <Radio 
                          name="projectType" 
                          value="hospitality" 
                          checked={formData.projectType === 'hospitality'}
                          onChange={handleChange}
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">Hospitality</span>
                      </label>
                    </div>
                  </FormField>

                  <FormField label="Estimated Budget">
                    <Input 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleChange} 
                      placeholder="e.g. $500k+" 
                    />
                  </FormField>

                  <FormField label="Project Details *">
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Please describe the scope, location, and timeline of your project." 
                      required 
                    />
                  </FormField>

                  <label className="flex items-center gap-4 cursor-pointer group">
                    <Checkbox 
                      name="newsletter" 
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Subscribe to the LuxeSpace Journal for exclusive studio updates.
                    </span>
                  </label>

                  <Button 
                    type="submit" 
                    className="w-full md:w-auto mt-8 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[220px] h-14 rounded-md text-[13px] tracking-widest uppercase transition-colors"
                    disabled={formStatus.submitted}
                  >
                    {formStatus.submitted ? "Inquiry Sent" : "Submit Inquiry"}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Office Locations */}
      <section className="py-section px-container bg-background">
        <div className="container-base mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-4 block">Global Presence</span>
            <h2 className="text-h2 font-serif">Our Studios</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* New York Studio */}
            <div className="flex flex-col gap-8 group gsap-reveal">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                 <LuxuryImage 
                    src="/images/service-detail-2.png" // Fallback interior image
                    alt="New York Studio"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                    hoverEffect="none"
                  />
              </div>
              <div>
                <h3 className="text-h4 font-serif mb-4 flex items-center gap-2">
                  <Icon icon={MapPin} className="text-primary" /> New York
                </h3>
                <p className="text-body text-muted-foreground mb-1">100 11th Avenue, Suite 1500</p>
                <p className="text-body text-muted-foreground mb-6">New York, NY 10011</p>
                <div className="text-small text-foreground font-medium uppercase tracking-widest">
                  Mon — Fri: 9am — 6pm
                </div>
              </div>
            </div>

            {/* Paris Studio */}
            <div className="flex flex-col gap-8 group gsap-reveal delay-[100ms]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                 <LuxuryImage 
                    src="/images/portfolio-res-2.png" // Fallback interior image
                    alt="Paris Studio"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                    hoverEffect="none"
                  />
              </div>
              <div>
                <h3 className="text-h4 font-serif mb-4 flex items-center gap-2">
                  <Icon icon={MapPin} className="text-primary" /> Paris
                </h3>
                <p className="text-body text-muted-foreground mb-1">25 Rue de la Paix</p>
                <p className="text-body text-muted-foreground mb-6">75002 Paris, France</p>
                <div className="text-small text-foreground font-medium uppercase tracking-widest">
                  Mon — Fri: 10am — 7pm
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Map Placeholder CTA */}
      <section className="relative h-[50svh] w-full overflow-hidden flex items-center justify-center mt-24">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src="/images/hero-bg-2.jpg" 
            alt="LuxeSpace Locations Map"
            className="w-full h-full object-cover gsap-parallax absolute inset-0 opacity-40"
            wrapperClassName="w-full h-full bg-black"
            overlay={true}
          />
        </div>
        <div className="relative z-10 text-center px-container">
          <h2 className="text-h2 text-white font-serif mb-6 gsap-reveal">Wherever You Are.</h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto gsap-reveal">
            Our teams are ready to deploy globally. We oversee projects in North America, Europe, and the Middle East.
          </p>
          <Button asChild variant="outline" className="text-white border-white/30 hover:bg-white hover:text-black gsap-reveal h-14 px-8 text-[13px] uppercase tracking-widest rounded-md mt-4">
            <Link href="/portfolio">
              View Global Portfolio
            </Link>
          </Button>
        </div>
      </section>

    </main>
  );
}
