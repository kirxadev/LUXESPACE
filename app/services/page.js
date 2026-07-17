"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuxuryImage } from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { ServiceCard, FeatureCard } from "@/components/ui/card";
import { Icon } from "@/components/common/icon";
import { 
  Home, 
  Sofa, 
  Grid, 
  PenTool, 
  ChevronDown,
  ChevronUp
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ServicesPage() {
  const containerRef = useRef(null);
  
  // FAQ State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "What is the typical timeline for a full residential project?",
      answer: "A comprehensive residential project usually spans between 8 to 14 months, depending on the scope, scale, and the lead times for bespoke furnishings and rare materials."
    },
    {
      question: "Do you procure furniture and art directly?",
      answer: "Yes, we handle all procurement. We have exclusive access to rare materials, antiques, and gallery-level art pieces globally, ensuring your space is curated with unparalleled exclusivity."
    },
    {
      question: "How do you handle the architectural execution?",
      answer: "We work hand-in-hand with top-tier contractors and master artisans. Our team oversees every detail of the execution to ensure the built environment exactly matches our exact specifications."
    },
    {
      question: "Do you take on international projects?",
      answer: "Yes. While based in our primary studio, a significant portion of our portfolio consists of international estates, luxury chalets, and private penthouses across the globe."
    }
  ];

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

  return (
    <main ref={containerRef} className="bg-background min-h-screen pb-0">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[80svh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform z-0">
          <LuxuryImage 
            src="/images/services-hero.png" 
            alt="Bespoke Luxury Services"
            className="w-full h-full object-cover gsap-parallax absolute inset-0"
            wrapperClassName="w-full h-full"
            overlay={true}
            priority
          />
        </div>
        <div className="relative z-10 text-center px-container mt-16 max-w-4xl mx-auto">
          <span className="text-caption text-white/80 uppercase tracking-widest mb-4 block gsap-reveal">Our Expertise</span>
          <h1 className="text-display-lg text-white font-serif mb-6 gsap-reveal">Bespoke Services.</h1>
          <p className="text-body-lg text-white/90 gsap-reveal">
            Crafting environments of unparalleled elegance, calm, and enduring architectural significance.
          </p>
        </div>
      </section>

      {/* 2. Services Grid Overview */}
      <section className="py-section px-container relative -mt-24 z-20">
        <div className="container-base mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="gsap-reveal delay-[100ms]">
              <ServiceCard 
                icon={Home} 
                title="Interior Architecture" 
                description="Structural reimagining, spatial flow, and master detailing." 
                className="h-full bg-background shadow-card border-border/40"
              />
            </div>
            <div className="gsap-reveal delay-[200ms]">
              <ServiceCard 
                icon={Sofa} 
                title="Custom Furnishings" 
                description="Bespoke furniture design and curation of rare vintage pieces." 
                className="h-full bg-background shadow-card border-border/40"
              />
            </div>
            <div className="gsap-reveal delay-[300ms]">
              <ServiceCard 
                icon={Grid} 
                title="Space Planning" 
                description="Optimizing layouts for harmony, proportion, and effortless living." 
                className="h-full bg-background shadow-card border-border/40"
              />
            </div>
            <div className="gsap-reveal delay-[400ms]">
              <ServiceCard 
                icon={PenTool} 
                title="Art & Styling" 
                description="Procurement of fine art and final layer curation." 
                className="h-full bg-background shadow-card border-border/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Service Cards */}
      <section className="py-section px-container overflow-hidden">
        <div className="container-base mx-auto space-y-32">
          
          {/* Detail 1: Architecture (Image Left) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[600px] w-full overflow-hidden rounded-xl gsap-reveal order-2 lg:order-1">
               <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                 <LuxuryImage 
                    src="/images/service-detail-2.png"
                    alt="Interior Architecture"
                    className="w-full h-full object-cover absolute inset-0 gsap-parallax"
                    wrapperClassName="w-full h-full"
                  />
               </div>
            </div>
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <span className="text-caption text-primary uppercase tracking-widest gsap-reveal">01 — The Foundation</span>
              <h2 className="text-h2 font-serif gsap-reveal">Interior Architecture</h2>
              <p className="text-body text-muted-foreground gsap-reveal">
                Great design begins with impeccable bones. We work closely with architects and engineers to refine the structural envelope of your property. From custom millwork and intricate ceiling details to the precise selection of stone and timber, we ensure the canvas is flawless before a single piece of furniture is placed.
              </p>
              <ul className="space-y-3 mt-4 gsap-reveal">
                {['Material Specification & Sourcing', 'Custom Millwork & Joinery Design', 'Lighting Architecture & Control', 'Construction Documentation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-small text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detail 2: Furnishings (Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="flex flex-col gap-6">
              <span className="text-caption text-primary uppercase tracking-widest gsap-reveal">02 — The Tactile</span>
              <h2 className="text-h2 font-serif gsap-reveal">Bespoke Furnishings</h2>
              <p className="text-body text-muted-foreground gsap-reveal">
                We believe that standard solutions yield standard results. Our studio designs bespoke furniture pieces tailored exactly to the proportions and acoustic needs of your space. Combined with our global network of antique dealers and galleries, we curate a collection of furnishings that are as unique as they are comfortable.
              </p>
              <ul className="space-y-3 mt-4 gsap-reveal">
                {['Custom Furniture Design', 'Antique & Vintage Procurement', 'Bespoke Textiles & Rugs', 'White-Glove Installation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-small text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[600px] w-full overflow-hidden rounded-xl gsap-reveal">
               <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                 <LuxuryImage 
                    src="/images/service-detail-1.png"
                    alt="Bespoke Furnishings"
                    className="w-full h-full object-cover absolute inset-0 gsap-parallax"
                    wrapperClassName="w-full h-full"
                  />
               </div>
            </div>
          </div>

          {/* Detail 3: Art (Image Left) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[600px] w-full overflow-hidden rounded-xl gsap-reveal order-2 lg:order-1">
               <div className="w-full h-[120%] -top-[10%] absolute will-change-transform">
                 <LuxuryImage 
                    src="/images/service-detail-3.png"
                    alt="Art Curation"
                    className="w-full h-full object-cover absolute inset-0 gsap-parallax"
                    wrapperClassName="w-full h-full"
                  />
               </div>
            </div>
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <span className="text-caption text-primary uppercase tracking-widest gsap-reveal">03 — The Soul</span>
              <h2 className="text-h2 font-serif gsap-reveal">Art & Object Curation</h2>
              <p className="text-body text-muted-foreground gsap-reveal">
                The final layer is what gives a home its soul. Our dedicated curation team scours international galleries, auction houses, and private collections to acquire pieces that resonate with your personal narrative. We handle the framing, placement, and lighting to ensure every object is displayed to its absolute best advantage.
              </p>
              <ul className="space-y-3 mt-4 gsap-reveal">
                {['Gallery & Auction Representation', 'Collection Strategy & Advising', 'Custom Framing & Pedestals', 'Specialized Art Lighting'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-small text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Service Process */}
      <section className="py-section px-container bg-surface">
        <div className="container-base mx-auto">
          <div className="text-center mb-20 gsap-reveal">
            <span className="text-caption text-primary uppercase tracking-widest mb-4 block">Methodology</span>
            <h2 className="text-h2 font-serif">Our Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { num: '01', title: 'Discovery', desc: 'An intimate dialogue to understand your lifestyle, aesthetic preferences, and the architectural context of the property.' },
              { num: '02', title: 'Concept', desc: 'Development of the visual language, spatial layouts, and initial material palettes, presented through detailed renderings.' },
              { num: '03', title: 'Execution', desc: 'Rigorous project management, technical drafting, procurement, and collaboration with master craftsmen.' },
              { num: '04', title: 'Handover', desc: 'The white-glove installation phase, where every piece of art is hung and every cushion is styled before you walk through the door.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col gap-4 gsap-reveal relative">
                {/* Connecting Line (Desktop) */}
                {i < 3 && <div className="hidden lg:block absolute top-6 left-12 right-0 h-[1px] bg-border/50" />}
                
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-small font-serif text-primary relative z-10">
                  {step.num}
                </div>
                <h4 className="text-h5 font-serif mt-2">{step.title}</h4>
                <p className="text-small text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-section px-container">
        <div className="container-content mx-auto">
          <div className="mb-16 gsap-reveal">
            <h2 className="text-h2 font-serif mb-6">The LuxeSpace Standard</h2>
            <p className="text-body text-muted-foreground max-w-2xl">
              We do not compromise. Our discerning clients expect absolute perfection, and our studio is structured to deliver exactly that.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="gsap-reveal">
              <FeatureCard 
                title="Unparalleled Network" 
                description="Decades in the ultra-luxury market have granted us exclusive access to artisans, quarries, and galleries not available to the public."
              />
            </div>
            <div className="gsap-reveal">
              <FeatureCard 
                title="Absolute Discretion" 
                description="We operate with the highest level of confidentiality, protecting the privacy of our high-profile and international clientele."
              />
            </div>
            <div className="gsap-reveal">
              <FeatureCard 
                title="Holistic Management" 
                description="From the first architectural sketch to the final styling of the bookshelves, we provide a seamless, single-point-of-contact experience."
              />
            </div>
            <div className="gsap-reveal">
              <FeatureCard 
                title="Enduring Quality" 
                description="We specify materials and construction methods designed to last generations, ensuring your investment stands the test of time."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs */}
      <section className="py-section px-container bg-surface/50">
        <div className="container-content mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <h2 className="text-h2 font-serif">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-background rounded-xl border border-border/40 overflow-hidden gsap-reveal transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <span className="text-h6 font-serif pr-8">{faq.question}</span>
                    <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}>
                      <Icon icon={ChevronDown} />
                    </div>
                  </button>
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="text-body text-muted-foreground pb-6">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Consultation CTA */}
      <section className="py-[120px] px-container bg-foreground text-background text-center">
        <div className="container-content mx-auto gsap-reveal">
          <span className="text-caption text-white/50 uppercase tracking-widest mb-6 block">Take the next step</span>
          <h2 className="text-display-md font-serif mb-6">Ready to elevate your space?</h2>
          <p className="text-body-lg text-white/70 mb-12 max-w-xl mx-auto">
            Schedule a private consultation with our principal architects to discuss your vision, requirements, and timeline.
          </p>
          <Button variant="primary" size="lg" className="bg-primary text-primary-foreground hover:bg-white hover:text-foreground">
            Request a Consultation
          </Button>
        </div>
      </section>

    </main>
  );
}
